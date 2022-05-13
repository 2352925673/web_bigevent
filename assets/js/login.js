$(function () {

  // 点击"去注册账号"的连接
  $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击"去登录"的连接
  $('#link_login').on('click', function() {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // BUG：
  // 从 layui 中获取 from 对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 from.verify() 函数自定义校验规则
  form.verify({

    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,

    repwd:function(value){
      // 通过形参拿到的是确认密码的内容
      // 还需要拿到密码框中的内容
      // 判断
      // 判断失败 return 提示信息
      var pwd = $('.reg-box [name=password]').val();
      if(pwd != value) {
        return '两次密码不一致'
      }
    },


  })

  // 监听注册表单提交事件
  $('#form_reg').on('submit', function (e) {
    // 1、组织表单默认提交行为
    e.preventDefault()
    // 2、发起 Ajax 的post请求
    var data = {username: $('#form_reg [name=username]').val() , password:  $('#form_reg [name=password]').val()}

    $.post('/api/reguser', data, function (res) {
      if(res.status !== 0) {
        // return console.log(res.message)
        return layer.msg(res.message)
      }
      // console.log('注册成功!')
       layer.msg('注册成功！')

      //  注册成功 模拟点击登录
      $('#link_login').click()
    })
  })

  // 监听登陆表单事件
  $('#form_login').submit(function(e) {
  // 阻止默认提交表单
  e.preventDefault()
  $.ajax({
    url: '/api/login',
    method: 'POST',
    // 快速获取表单数据
    data: $(this).serialize(),
    success:function(res) {
      if(res.status != 0) return layer.msg('登陆失败！')
      layer.msg('登录成功！')
      console.log(res.token)
      // 登录成功后 将 token字符串 保存到 localStorage
      localStorage.setItem('token', res.token)
      // 跳转到后台主页
      // location.href = '/index.html'
    }
  })
})


})

