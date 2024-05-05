// document.addEventListener('DOMContentLoaded', function() {
$(document).ready(function() {
    viewHandel();

    // 获取时间
    $('#registration-time-btn').click(function() {
        // 获取当前日期和时间
        //var now = new Date();
        // 格式化日期和时间"YYYY-MM-DD HH:mm:ss"
        //var formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
        // 设置到input元素的value中
        $('#registration-time').val(getCurrentTime());
    });
});

/**
 * 主界面UI切换逻辑
 */
function viewHandel(){
    /*获取按钮数*/
    //let lis = document.getElementById("button-parent-view").children;
    let $lis = $("#button-parent-view").children();
    // 遍历所有子元素并添加点击事件
    for (let i = 0; i < $lis.length; i++) {
        $lis[i].addEventListener('click', function() {
            openPage(i);
        });
    }
}
/**
 * 打开页面逻辑
 * @param index
 */
function openPage(index) {
    /*获取按钮数*/
    let $lis = $("#button-parent-view").children();
    for (let i = 0; i < $lis.length; i++) {
        let pageId = "page" + (i + 1);
        /*使用classList.toggle()简化操作*/
        document.getElementById(pageId).classList.toggle("open", index === i);
        document.getElementById(pageId).classList.toggle("close", index !== i);
        $lis[i].classList.toggle("matrix-button-active", index === i);
        $lis[i].classList.toggle("matrix-button-notActive", index !== i);
    }
}