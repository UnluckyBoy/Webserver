// 使用jQuery获取弹窗和关闭按钮的DOM元素
var modal = $("#modal");
var closeBtn = $(".model-close").first(); // 或者使用 $(".close").eq(0);
// 显示弹窗的函数
function showModal() {
    modal.css("display", "block");
}
//函数调用隐藏
function hideModal() {
    modal.css("display", "none");
}
// 按钮隐藏弹窗的函数
closeBtn.on("click", function() {
    modal.css("display", "none");
});