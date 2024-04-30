$(document).ready(function() {
    dropdownHandel();
});

/**
 * 初始化下拉框
 */
function dropdownHandel(){
    $('#handImage').click(function() {
        $(this).next('.matrix-dropdown-menu').toggle();
        return !$(this).next('.matrix-dropdown-menu').is(':hidden');
    });
}