//确保DOM完全加载后再执行JQuery代码
/*导航栏通过JQuery渲染*/
$(document).ready(function() {
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
    // 使用函数创建菜单项:图标,Title,连接
    wrapHTML += createMenuItem('fa-plus', '门诊挂号', '');/*fa-home*/
    wrapHTML +=createMenuItem("fa-stethoscope","门诊医生","#")
    wrapHTML += createMenuItem('fa-user-plus', '门诊护士', '#');
    wrapHTML += createMenuItem('fa-user-md', '住院医生', '#');
    wrapHTML += createMenuItem('fa-user-plus', '住院护士', '#');
    wrapHTML += createMenuItem('fa-bed', '住院管理', '#');

    wrapHTML += '</div>'; // 结束menu的div
    //wrapHTML += '</div>'; // 结束nav的div
    // 将动态生成的HTML插入到wrap元素中
    $('#main-bar-menu').html(wrapHTML);
});