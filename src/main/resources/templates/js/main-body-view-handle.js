/**
 * 页面主体逻辑切换
 * 使用时,添加如下:
 */
/*
<div class="main-sub-view">
    <div class="main-sub-child-title" id="button-parent-view">
        <button class="matrix-button matrix-button-active">XXX</button>
        //...
    </div>
    <div class="main-sub-child-body">
        <!--id必须以page+数字,style可不用修改-->
        <div id="page1" class="page-view open" style="--view-back:rgba(255,0,0,0.2)">
            <div class="sub-btn-view">
                <button class="sub-matrix-button">XXX</button>
                //...
            </div>
            <div class="sub-child-body">
                //添加主体div
            </div>
        </div>
    </div>
</div>
 */
$(document).ready(function() {
    /*获取按钮数*/
    //let lis = document.getElementById("button-parent-view").children;
    //let $lis = $("#button-parent-view").children();
    let $lis=$('.main-sub-child-title').children();
    // 遍历所有子元素并添加点击事件
    for (let i = 0; i < $lis.length; i++) {
        $lis[i].addEventListener('click', function() {
            openPage(i);
        });
    }
});
/**
 * 打开页面逻辑
 * @param index
 */
function openPage(index) {
    /*获取按钮数*/
    let $lis = $(".main-sub-child-title").children();
    for (let i = 0; i < $lis.length; i++) {
        let pageId = "page" + (i + 1);
        /*使用classList.toggle()简化操作*/
        document.getElementById(pageId).classList.toggle("open", index === i);
        document.getElementById(pageId).classList.toggle("close", index !== i);
        $lis[i].classList.toggle("matrix-button-active", index === i);
        $lis[i].classList.toggle("matrix-button-notActive", index !== i);
    }
}