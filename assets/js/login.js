// console.log(1);
$('#link_reg').on('click', function () {
  $('.login-box').hide()
  $('.reg-box').show()
})
$('#link_login').on('click', function () {
  $('.reg-box').hide()
  $('.login-box').show()
})

const form = layui.form
form.verify({
  pwd: [
    /^[\S]{6,12}$/
    , '密码必须6到12位，且不能出现空格'
  ],
  repwd: (val) => {
    const pwd = $(".reg-box [name=password]").val();
    // console.log(pwd);
    if (pwd !== val) return "两次密码不一致"
  }
});
// 注册
const layer = layui.layer;

$('#form_reg').on('submit', function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: "/api/reguser",
    data,
    success: res => {
      // console.log(res);
      const { message, status } = res
      if (status != 0) return layer.msg(message)
      $('#link_login').click()
    }
  })
})

//  登录
$('#form_login').on('submit', function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: res => {
      // console.log(res);
      const { message, status, token } = res
      if (status != 0) return layer.msg(message)
      localStorage.setItem('token', token);
      location.href = '/index.html';
    }
  })
})