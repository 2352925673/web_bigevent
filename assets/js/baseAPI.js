// z注意： 每次调用 $.get() 或 $.post() $.ajax()的时候
// 会先调用 $.ajaxPrefilter 这个函数
// 在这个函数中 可以拿到我们给 Ajax 提供的配置对象
$.ajaxPrefilter(function(option) {
  // console.log(option.url)
  // 再发起正真的 Ajax 请求之前 统一拼接请求根路径
  option.url='http://127.0.0.1:3007' + option.url
  console.log(option.url)
})