$(document).ready(function() {
    $.ajax({
        url:'/api/userInfo',
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                console.log(data);
                $("#handImage").attr('src', data.handleData.uHead);
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX请求失败: " +xhr.responseText);
        }
    });
});