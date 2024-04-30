$(document).ready(function() {
    initIndexData();
    dropdownHandel();
});

/**
 * 加载用户信息
 */
function initIndexData(){
    $.ajax({
        url:'/api/userInfo',/* /check */
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                console.log(data);
                $("#handImage").attr('src', '/upload'+data.handleData.uHead);
                $("#uName").text(data.handleData.uName)
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX请求失败: " +error);
        }
    });
}

/**
 * 初始化下拉框
 */
function dropdownHandel(){
    $('#handImage').click(function() {
        $(this).next('.matrix-dropdown-menu').toggle();
        return !$(this).next('.matrix-dropdown-menu').is(':hidden');
    });
}