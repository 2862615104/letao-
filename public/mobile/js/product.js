$(function () {
    init();
    function init() {      
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50,//可选,默认50.触发下拉刷新拖动距离,
                    auto: true,//可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        queryProductDetail(function (result) {
                            result.sizeArr = $.sizeFormat(result.size);
                            // console.log(result); 
                            //渲染轮播图
                            var html = template("mainTp",result);
                            // console.log(html);
                            $(".mui-scroll").html(html)
                            // 索引器
                            var gallery = mui('.mui-slider');
                            // console.log(gallery);
                            gallery.slider({
                                interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
                            });

                            // 初始化数字输入框
                            mui(".mui-numbox").numbox();
                            // 结束下拉刷新
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        })
                    }
                },
            }
            
        })
        $(".mui-scroll").on("tap",".tl_size span",function () {
            // console.log(this);
            $(this).addClass("active").siblings().removeClass("active")
        })
        //购物车
        $(".addCartBtn").on("tap",function () {
            if ($(".tl_size span.active").length<1) {
                mui.toast("请选择尺码")
                return;
            }
            if ($(".mui-numbox-input").val()<1) {
                mui.toast("请选择数量");
                return;
            }
            var obj={
                productId: $.getQueryString("id"),
                num: $(".mui-numbox-input").val(),
                size: $(".pro_size span.active").html()
            };
            $.ltAjax({
                url: "/cart/addCart",
                type: "post",
                data: obj,
                success: function (result) {

                    // console.log("此时是登录过了的成功的执行回调");
                    mui.confirm("是否跳转到购物车", "温馨提示", ["是", "否"], function (a) {
                        if (a.index == 0) {
                            // 是 跳转页面到购物车 cart.html
                            location.href = "./cart.html";
                        } else {
                            // 否 
                        }
                    });
                }
            });
        })
    }
    
    function queryProductDetail(callback) {
        $.get("/product/queryProductDetail?id=" + $.getQueryString("id"),function (result) {
            callback && callback(result)
            // console.log(callback);
        })
        
    }
})