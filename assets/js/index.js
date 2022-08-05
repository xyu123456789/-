function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: "/my/userinfo",
    data: null,
    //  已经放入bsaeAPI拦截器中
    // headers: {
    //     Authorization: localStorage.getItem("token"),
    // },
    success: res => {
      // console.log(res);
      const { status, message } = res
      if (status != 0) return layer.msg(message)
      renderAvatar(res.data)
    }
  })
}
const renderAvatar = (data) => {
  let name = data.nickname || data.username
  //  设置欢迎文本
  $('#welcome').html('欢迎' + name)
  if (data.user_pic !== null) {
    // console.log(1);
    $(".layui-nav-img").attr('src', data.user_pic)
    $('.text-avatar').hide()
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
}
getUserInfo()
// 退出登录
$("#exitBtn").click(() => {
  layui.layer.confirm(
    "666？",
    { icon: 3, title: "" },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem("token");
      // 跳转到登录页面
      location.href = "/login.html";
    }
  );
});
