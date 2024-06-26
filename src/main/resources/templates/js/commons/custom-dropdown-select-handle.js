/**
 * 自定义下拉框逻辑
 * 使用时:加入如下
 */
/*
<div id="dropdown-select-container">
    <input list="dropdown-select-list" class="default-text" id="emergencyContact-relationship" type="text">
    <datalist id="dropdown-select-list">
        <option value="XXX"></option>
        //...
    </datalist>
    <div class="dropdown-option" data-value="XXX"></div>
    //...
</div>
 */
$(document).ready(function() {
    // 监听输入框的focus事件以显示选项列表
    $('#create-emergencyContact-relationship').on('focus', function() {
        showOptions();
    });
    // 监听输入框的blur事件以隐藏选项列表
    $('#create-emergencyContact-relationship').on('blur', function() {
        hideOptions();
    });
    // 初始化选项(如果需要)
    // showOptions();
    // 显示与输入框值匹配的选项
    function showOptions() {
        $('.dropdown-option').hide().removeClass('active'); // 隐藏所有选项
        var inputValue = $(this).val().trim(); // 获取输入框的值
        // 如果输入框有值且不是选项列表中的值，则不显示选项列表
        if (inputValue && !$('#dropdown-select-list option[value="' + inputValue + '"]').length) {
            return;
        }
        // 显示与输入框值匹配的选项（如果需要模糊匹配，可以修改此逻辑）
        $('.dropdown-option').each(function() {
            if ($(this).data('value').indexOf(inputValue) === 0) {
                $(this).show().addClass('active');
            }
        });
        // 监听选项的点击事件以设置输入框的值
        $('#dropdown-select-container').on('click', '.dropdown-option.active', function() {
            $('#dropdown-select-input').val($(this).data('value')).trigger('input'); // 更新输入框的值并触发input事件（如果需要）
            hideOptions(); // 隐藏所有选项
        });
    }
    // 隐藏所有选项
    function hideOptions() {
        $('.dropdown-option').hide().removeClass('active');
    }
    // 监听键盘事件以处理Enter键等（如果需要）

    /*民族*/
    // $('#create-patient-nation').select2({
    //     tags: true, // 允许用户添加新标签（即输入新值）
    //     //tokenSeparators: [',', ' '], // 允许用户通过逗号或空格分隔输入多个值（如果需要的话）
    //     placeholder: '请输入', // 设置占位符
    //     allowClear: true // 允许用户清除已选值
    // });
});