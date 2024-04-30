//确保DOM完全加载后再执行JQuery代码
/*导航栏通过JQuery渲染*/

// 权限全局变量
var globalAuthority;

$(document).ready(function() {
    initIndexData();
    getAuthority();
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
 * 获取权限
 */
function getAuthority(){
    $.ajax({
        url:'/api/authority',/* /check */
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                console.log(data);
                globalAuthority=data.handleData[0].authority_code;
                createHtmlView();
            }
        },
        error: function(xhr, status, error) {
            console.error("AJAX请求失败: " +error);
        }
    });
}

/**
 * 创建视图html
 */
function createHtmlView(){
    console.log("createHtmlView: " +globalAuthority);
    // 动态创建导航菜单
    var wrapHTML = '<div class="menu">';
    // 创建菜单项函数
    function createMenuItem(iconClass, title, href) {
        return '<div>' +
            '<a href="' + href + '">' +
            '<div class="item">' +
            '<div class="light"></div>' +
            '<div class="l-icon"><span class="fa ' + iconClass + '"></span></div>' +
            '<div class="con">' + title + '</div>' +
            // '<div class="r-icon"></div>' +
            '</div>' +
            '</a>' +
            '</div>';
    }
    switch (globalAuthority){
        case '5226320001':
            // 使用函数创建菜单项:图标,Title,连接
            wrapHTML += createMenuItem('fa-plus', '门诊挂号', '');/*fa-home*/
            wrapHTML +=createMenuItem("fa-stethoscope","门诊医生","#")
            wrapHTML += createMenuItem('fa-user-plus', '门诊护士', '#');
            wrapHTML += createMenuItem('fa-user-md', '住院医生', '#');
            wrapHTML += createMenuItem('fa-user-plus', '住院护士', '#');
            wrapHTML += createMenuItem('fa-bed', '住院管理', '#');
            break;
        case '5226320002':
            wrapHTML +=createMenuItem("fa-stethoscope","门诊医生","#")
            wrapHTML += createMenuItem('fa-user-md', '住院医生', '#');
            break;
        case '5226320003':
            wrapHTML += createMenuItem('fa-user-plus', '门诊护士', '#');
            wrapHTML += createMenuItem('fa-user-plus', '住院护士', '#');
            break;
    }

    wrapHTML += '</div>'; // 结束menu的div
    //wrapHTML += '</div>'; // 结束nav的div
    // 将动态生成的HTML插入到wrap元素中
    $('#main-bar-menu').html(wrapHTML);
}