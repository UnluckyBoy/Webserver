//确保DOM完全加载后再执行JQuery代码
/*导航栏通过JQuery渲染*/

// 权限全局变量
// var globalAuthority;

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
                createHtmlView(data.handleData.authorities);
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

/**
 * 创建视图html
 */
function createHtmlView(authorities){
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
            '</div>' +
            '</a>' +
            '</div>';
    }
    for (let item of authorities) {
        switch (item){
            case '5226320001':
                // 使用函数创建菜单项:图标,Title,连接
                wrapHTML += createMenuItem('fa-plus', '预约挂号', '');/*fa-home*/
                wrapHTML +=createMenuItem("fa-stethoscope","门诊医生","#")
                wrapHTML += createMenuItem('fa-user-md', '住院医生', '#');
                wrapHTML += createMenuItem('fa-user-plus', '住院护士', '#');
                wrapHTML += createMenuItem('fa-bed', '住院管理', '#');
                //wrapHTML += createMenuItem('fa-user-plus', '门诊护士', '#');
                wrapHTML += createMenuItem('fa-clipboard', '药库管理', '#');
                wrapHTML += createMenuItem('fa-archive', '药房管理', '#');
                wrapHTML += createMenuItem('fa-bar-chart', '统计分析', '#');
                break;
            case '5226320002':
                wrapHTML += createMenuItem('fa-plus', '预约挂号', '');
                break;
            case '5226320003':
                wrapHTML +=createMenuItem("fa-stethoscope","门诊医生","#")
                wrapHTML += createMenuItem('fa-user-md', '住院医生', '#');
                break;
            case '5226320004':
                wrapHTML += createMenuItem('fa-user-plus', '住院护士', '#');
                break;
        }
    }

    wrapHTML += '</div>'; // 结束menu的div
    // 将动态生成的HTML插入到wrap元素中
    $('#main-bar-menu').html(wrapHTML);
}