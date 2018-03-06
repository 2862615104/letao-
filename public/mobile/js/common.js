$.extend($, {
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    },
    /* 尺寸 */
    sizeFormat:function (str) {
        // console.log(str);
        var arr = [];
        // split("需要分割的字符") 返回数组
        var startNum = str.split("-")[0];
        // console.log(startNum);
        var endNum = str.split("-")[1];
        // console.log(endNum);
        for (var i = startNum; i <= endNum; i++) {
            arr.push(i);
        }
        return arr;
        
    },

    ltAjax: function (option) {
        $.ajax({
            url: option.url,
            type: option.type || "get",
            data: option.data || "",
            success: function (result) {
                if (result.error && result.error == 400) {
                    // 未登录
                    // 统一都跳转到登录页面
                    // 路径要写绝对的 避免了不同目录下的文件寻找登录页面的路径不一致的问题

                   
                    //location.href = "/mobile/user/login.html?returnURL=" + location.href;
                    location.href = "/mobile/user/login.html?returnURL=" + location.href; 
                } else {
                    option.success && option.success(result);
                }

            }
        });

    },
})      