$(function () {
    init();
    function init() {
        //登录
       
        $(".ltBtn").on("tap",function () {
            console.log("登录");
            var username = $.trim($(".username").val())
            var password  = $.trim($(".password").val())
            // console.log(password);
            if (username.length < 6) {
                mui.toast("用户名不合法");
                return;
            }
            if (password.length < 6) {
                mui.toast("密码不合法");
                return;
            }
            // console.log("ok");
            $.post("/user/login", $(".lt_form").serialize(), function (result) {
                   console.log(result);
                // if (result.error) {
                //     mui.toast(result.message);
                // } else {
                //     // 登录成功
                //      console.log("ok")
                //     // 判断url上有没有 returnURL 有的话就跳这
                //     // 没有的话就跳首页
                //     var returnURL = $.getQueryString("returnURL");

                //     if (returnURL) {
                //         location.href = returnURL;
                //     } else {
                //         location.href = "../index.html";
                //     }
                // }
            })
        })
    }
})