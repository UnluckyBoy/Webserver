$(document).ready(function() {
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
});