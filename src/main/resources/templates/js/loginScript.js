//确保DOM完全加载后再执行JavaScript代码
$(document).ready(function() {
    /**
     * 切换注册与登录视图
     */
    $('.img-btn').click(function() {
        $('.cont').toggleClass('s-signup');
    });

    /**登录**/
    // $("#login-btn").click(function (){
    //     var account=$("#account").val();
    //     var password=$("#password").val();
    //     if(account.trim()===''|password.trim()===''){
    //         alert("请检查输入情况!");
    //     }
    //     $.ajax({
    //         url:'/UserInfo/handleLogin',
    //         type: 'Post',
    //         data: {
    //             account: account,
    //             password:password
    //         },
    //         //dataType: 'json',
    //         success: function(data) {
    //             if(data=="success"){
    //                 //alert("登录成功!");
    //                 window.location.href = '/index';
    //             }
    //         },
    //         error: function(xhr, status, error) {
    //             console.error("AJAX请求失败: " +xhr.responseText);
    //         }
    //     });
    // })
    /**注册**/
    $("#register-btn").click(function (){
        var name=$("#re_name").val();
        var account=$("#re_account").val();
        var password=$("#re_password").val();
        var confirm_pass=$("#re_confirm_pass").val();
        if(name.trim()===''|account.trim()===''|password.trim()===''|confirm_pass.trim()===''){
            alert("请检查输入!");
        }else{
            if (password != confirm_pass) {
                alert("密码不一致!");
            }else{
                var isChecked=$('#agreement').prop('checked')
                if (!isChecked) {
                    // 如果没有勾选，则显示提示
                    alert('请勾选“我同意注册协议”以完成注册！');
                }else{
                    alert('注册完成!');
                }
            }
        }
    });
});