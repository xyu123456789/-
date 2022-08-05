// 删除文章分类
$("#tb").on("click", ".btn-delete", function () {
  let id = $(this).attr("data-id");
  layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
    // 提示用户是否删除
    $.ajax({
      method: "GET",
      url: "/my/article/deletecate/" + id,
      data: null,
      success: (res) => {
        const { status, message } = res
        layer.msg("message")
        if (status !== 0) return
        initArtCateList();

      },
    });
  })
 

});