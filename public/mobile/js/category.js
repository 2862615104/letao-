$(function () {
    init();
    function init() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        queryTopCategory(function (result) {
            //没点击时渲染在页面
            var id=result.rows[0].id;
            querySecondCategory(id);
           
        })
        $(".left_menu_ul").on("tap", "li", function () {
            //获取一级的id
            var id = $(this).data("id");
            // console.log(id);
            querySecondCategory(id);
        })
    }
//一级
    function queryTopCategory(callback) {
        $.get("/category/queryTopCategory",function (result) {
            // console.log(result.rows);
           var rows=result.rows;
           var ros=rows.map(function (v,i) {
            
               return '<li data-id= ' + rows[i].id+'><a href="javascript:;">' + v.categoryName+'</a></li>'
           })
            var html=ros.join('');
            //渲染在html页面
            var htmlS=html;
            $(".left_menu_ul").html(html)
            // callback && callback(result);
            callback && callback(result);
        })
    }
    //二级
    function querySecondCategory (id) {
        $.get(" /category/querySecondCategory?id="+id,function (result) {
           
            var rows = result.rows;
            var ros = rows.map(function (v, i) {

                return ' <a href="javascript:;"><img src="' + rows[i].brandLogo+'" alt=""><p>' + rows[i].brandName+'</p></a>'
            })
            var html = ros.join('');
            //渲染在html页面
            var htmlS = html;
            $(".lt_item").html(html)
        })
    }
   
})