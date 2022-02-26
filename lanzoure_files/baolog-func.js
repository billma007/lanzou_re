//----------------------content function
//fold
$(".fold-plane-title").click(function(a) {
    $(this).hasClass("fold-plane-title-zk") ? ($(this).removeClass("fold-plane-title-zk"), $(this).next().slideUp()) : ($(this).addClass("fold-plane-title-zk"), $(this).next().slideDown())
});
//like
$(document).on('click', '.js-haya-favorite-tip', function () {

        $.fn.postLike = function () {
            var post_id = $(".js-haya-favorite-tip").attr("data-id");
            if ($(this).hasClass('done')) {
                $.alert('您已赞过本博客啦~', 30, {size: 'sm'});
                return false;
            } else if (getCookie('specs_zan_' + post_id) != '') {
                $.alert('您已赞过本博客啦~', 30, {size: 'sm'});
                return false;
            } else {
                $(this).addClass('done');
                var id = $(this).data("id"),
                    action = $(this).data('action'),
                    rateHolder = $(this).children('.count');
                var ajax_data = {
                    action: "specs_zan",
                    um_id: id,
                    um_action: action
                };
                $.post("/wp-admin/admin-ajax.php", ajax_data,
                    function (data) {
                        $(rateHolder).html(data);
                    });
                $.alert('感谢喜欢~', 30, {size: 'sm'});
                return false;
            }

        };
        $(document).on("click", ".js-haya-favorite-tip",
            function () {
                $(this).postLike();
            });
});

//获取cookie
function getCookie(cookieName) {
    var cookieValue = "";
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            if (cookie.substring(0, cookieName.length + 2).trim() == cookieName.trim() + "=") {
                cookieValue = cookie.substring(cookieName.length + 2, cookie.length);
                break;
            }
        }
    }
    return cookieValue;
}

//top function
$(document).ready(function () {
    //首先将#back-to-top隐藏
    //当滚动条的位置处于距顶部600像素以下时，跳转链接出现，否则消失
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop() > 200) {
                $("#gotop").fadeIn(500);
                document.getElementById("gotop").style = "display: list-item;"
            } else {
                $("#gotop").fadeOut(500);
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $("#gotop").click(function () {
            $('body,html').animate({scrollTop: 0}, 500);
            return false;
        });
    });
});


//----------------------page function
//lanzou
$(document).on('click','#button-lanzou',function () {
    var input_value = $('#input-lanzou').val();
    var input_value_reg = input_value.match("(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?")
    if (input_value == ""){
        $.alert('请输入链接~', 30, {size: 'sm'});
        return false;
    }else if(!input_value_reg){
        $.alert('请输入正确的链接哦，要带http://或者https://~', 30, {size: 'sm'});
        return false;
    }
    $('#input-result').val("正在解析中...");
    $.get("https://api.vvhan.com/api/lz",{'url':input_value},function (res) {
        if (res.success){
            $('#input-result').val(res.download);
        }else{
            $.alert('解析失败啦，等修理一下吧~', 30, {size: 'sm'});
        }
    });
});
$(document).on('click','#button-lanzou-copy',function () {
    var result = $('#input-result').val()
    var ct =new copy_txt();
    if(result == ""){
        $.alert('先解析再复制吧~', 30, {size: 'sm'});
    }else{
        ct.copy(result);
        $.alert('已经复制到剪辑版啦~', 30, {size: 'sm'});
    }
});
$(document).on('click','#button-lanzou-clear',function () {
    $('#input-lanzou').val("")
    $.alert('已经清空~', 30, {size: 'sm'});
});
var copy_txt=function(){//无组件复制
    var _this =this;
    this.copy=function(txt){
        $("#input_copy_txt_to_board").val(txt);//赋值
        $("#input_copy_txt_to_board").removeClass("hide");//显示
        $("#input_copy_txt_to_board").focus();//取得焦点
        $("#input_copy_txt_to_board").select();//选择
        document.execCommand("Copy");
        $("#input_copy_txt_to_board").addClass("hide");//隐藏
    }
    let html ='<input type class="hide" id="input_copy_txt_to_board" value="" />';//添加一个隐藏的元素
    $("body").append(html);
};
