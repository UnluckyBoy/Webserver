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

/**
 * 按钮响应逻辑
 */
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
                    clearPage1ViewElement();
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

/**
 * 获取组件
 */
function clearPage1ViewElement(){
    //console.log("info-view的子组件:",$('.info-view').children())
    // $("#insurance-id").val('');
    // $("#appointment-date").val('');
    // $("#patient-name").val('');
    // $('#patient-gender').prop('selectedIndex', 0).change(); //直接设置selectedIndex
    // $('#patient-idCard').val('');
    // $('#patient-idCard').val('');
    showModal();
    $('#read-idCard-btn').on('click',function (){
        if($('#read-idCard-input').val().trim()!==''){
            console.log("身份证号:",$('#read-idCard-input').val());
            getPatientInfoHandle($('#read-idCard-input').val());
            //hideModal();
        }else{
            alert("身份证为空");
        }
    });
}
function getPatientInfoHandle(patient){
    $.ajax({
        url:'/api/patientInfo',
        type: 'POST',
        data:{"patient":patient},
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                console.log(data);
                hideModal();//隐藏弹窗
                /*绑定信息*/
                //$("#insurance-id").val(data.handleData.);
                //$("#appointment-date").val();
                $("#patient-name").val(data.handleData.patient_name);
                $('#patient-gender').val(data.handleData.patient_gender);
                $('#patient-idCard').val(data.handleData.patient_idCard);
                $('#patient-birth').val(data.handleData.patient_birth);
                $('#patient-nationality').val(data.handleData.patient_nationality);
                $('#patient-nativePlace').val(data.handleData.patient_nativePlace);
                $('#patient-nation').val(data.handleData.patient_nation);
                $('#patient-occupation').val(data.handleData.patient_occupation);
                $('#patient-maritalStatus').val(data.handleData.patient_maritalStatus);
                $('#patient-phone').val(data.handleData.patient_phone);
                $('#patient-age').val(data.handleData.patient_age);
                $('#poverty-sign').val(data.handleData.poverty_sign);
                $('#patient-emergencyContact').val(data.handleData.patient_emergencyContact);
                $('#emergencyContact-relationship').val(data.handleData.patient_relationship);
                $('#patient-contactPhone').val(data.handleData.patient_contactPhone);
                $('#patient-homeAddress').val(data.handleData.patient_homeAddress);
                $('#patient-workAddress').val(data.handleData.patient_workAddress);
                $('#nowAddress-province').val(data.handleData.nowAddress_province);
                $('#nowAddress-town').val(data.handleData.nowAddress_town);
                $('#nowAddress-prefecture').val(data.handleData.nowAddress_prefecture);
                if(data.handleData.child_sign==='是'){
                    $('#child-sign').prop('checked')
                }
                $('#guardian-name').val(data.handleData.guardian_name);
                $('#guardian-idCard').val(data.handleData.guardian_idCard);
                $('#guardian-phone').val(data.handleData.guardian_phone);
            }
        },
        error: function(xhr, status, error) {
            console.error("请求失败: " +error);
        }
    });
}