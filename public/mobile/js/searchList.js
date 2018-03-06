$(function () {
    var Qobj = {
        proName: $.getQueryString("key"),
        brandId: "",
        price: '',
        bun: '',
        page: 1,
        pageSize: 4,
    }
    var ToatalPa = 1;
    inti()
    function inti() {
        // 初始化下拉是刷新和上拉加载
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
                        // 在触发下拉的时候 把page重新设为1 
                        Qobj.page = 1;
                        // 发送请求
                        queryProduct(function (result) {
                            // 渲染模版
                            var html = template("goodsTpl", result);
                            $(".lt_nommodity_ul").html(html);
                            // 结束下拉刷新
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        })
                    }
                },
                up: {
                    height: 50,//可选.默认50.触发上拉加载拖动距离
                    auto: true,//可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        if (Qobj.page >= ToatalPa) {
                            // 结束上拉
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                            return;
                        } else {
                            Qobj.page++;
                            queryProduct(function (result) {
                                // 渲染模版
                                var html = template("goodsTpl", result);
                                //appdend()方法在被选元素的结尾
                                $(".lt_nommodity_ul").append(html);
                                // 结束上拉刷新
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            })
                        }


                    }
                }
            }
        });

        //点击搜索按钮
        $(".secheBut").on("tap", function () {
            // console.log(123);
            //val（）返回值
            var key = $(".secchTx").val();
            //   console.log(key);
            Qobj.proName = key;
            console.log(Qobj);
            // 手动触发下拉刷新
            mui("#refreshContainer").pullRefresh().pulldownLoading();

        })
        //点击排序
        $(".od_tool>a").on("tap", function (e) {
            // console.log(e);
            var aDom = e.target.nodeName == "A" ? e.target : e.target.parentNode;
            // console.log(aDom)
            //获取内容
            var sortName = aDom.dataset.sortname;
            // console.log(sortName);
            //改变箭头
            $(aDom).find(".mui-icon").toggleClass("mui-icon-arrowdown mui-icon-arrowup ")
            //升序
            var litre = 1;
            if ($(aDom).find(".mui-icon").hasClass("mui-icon-arrowdown")) {
                litre = 2;
            } else {
                litre = 1
            }
            Qobj.num = "";
            Qobj.price = "";
            Qobj[sortName] = litre;
            // 手动触发下拉刷新
            mui("#refreshContainer").pullRefresh().pulldownLoading();

        })
        //启动跳转
        $(".lt_nommodity_ul").on("tap", "a", function (e) {
            console.log(e);
                //  console.log(e);
            var aDom = e.target;
            console.log(aDom);
            // 页面跳转
            location.href=aDom.href;
        })
    }
    //请求方式
    function queryProduct(callback) {
        // console.log(Qobj);
        $.get("/product/queryProduct", Qobj, function (result) {
            // console.log(result);
            callback && callback(result)
            // 总页面数据
            ToatalPa = Math.ceil(result.count / Qobj.pageSize)
            // console.log(ToatalPa);
        })

    }
})