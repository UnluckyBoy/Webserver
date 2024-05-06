/**
 * index页面处理逻辑
 */
// document.addEventListener('DOMContentLoaded', function() {
$(document).ready(function() {
    sub_btn_view_Click();

    // 挂号日期按钮获取时间逻辑
    $('#registration-time-btn').click(function() {
        // 获取当前日期和时间
        $('#registration-time').val(getCurrentTime());
    });
});

function sub_btn_view_Click(){
    let $btn=$('#page1').children(0).children();
    $btn.each(function(i, btn) { //使用.each()遍历jQuery对象
        // 使用$(btn)将原生的DOM元素转换成jQuery对象
        $(btn).on('click', function() {
            //console.log('点击了按钮,其ID为:', this.id);
            switch (this.id){
                case 'gh_add':
                    //console.log('点击"新增"按钮', this.id);
                    //location.reload();
                    break;
                case 'gh_query':
                    console.log('点击"查询"按钮', this.id);
                    break;
                case 'gh_save':
                    console.log('点击"保存"按钮', this.id);
                    break;
                case 'gh_cancel':
                    console.log('点击"退号"按钮', this.id);
                    break;
            }
        });
    });
}