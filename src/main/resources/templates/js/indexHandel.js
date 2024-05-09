/**
 * index页面处理逻辑
 */
// document.addEventListener('DOMContentLoaded', function() {
var globalPatient;
$(document).ready(function() {
    //sub_btn_view_Click();

    // 挂号日期按钮获取时间逻辑
    $('#registration-time-btn').click(function() {
        // 获取当前日期和时间
        $('#registration-time').val(getCurrentTime());
    });

    /**
     * 按钮响应逻辑
     */
    // function sub_btn_view_Click(){
    // }
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
                    console.log("患者ID:"+globalPatient.patient_id);
                    break;
                case 'gh_cancel':
                    console.log('点击"退号"按钮', this.id);
                    break;
            }
        });
    });

    /**
     * 获取组件
     */
    function clearPage1ViewElement(){
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
                    globalPatient=data.handleData;
                    /*绑定信息*/
                    //$("#insurance-id").val(globalPatient.);
                    //$("#appointment-date").val();
                    $("#patient-name").val(globalPatient.patient_name);
                    $('#patient-gender').val(globalPatient.patient_gender);
                    $('#patient-idCard').val(globalPatient.patient_idCard);
                    $('#patient-birth').val(globalPatient.patient_birth);
                    $('#patient-nationality').val(globalPatient.patient_nationality);
                    $('#patient-nativePlace').val(globalPatient.patient_nativePlace);
                    $('#patient-nation').val(globalPatient.patient_nation);
                    $('#patient-occupation').val(globalPatient.patient_occupation);
                    $('#patient-maritalStatus').val(globalPatient.patient_maritalStatus);
                    $('#patient-phone').val(globalPatient.patient_phone);
                    $('#patient-age').val(globalPatient.patient_age);
                    $('#poverty-sign').val(globalPatient.poverty_sign);
                    $('#patient-emergencyContact').val(globalPatient.patient_emergencyContact);
                    $('#emergencyContact-relationship').val(globalPatient.patient_relationship);
                    $('#patient-contactPhone').val(globalPatient.patient_contactPhone);
                    $('#patient-homeAddress').val(globalPatient.patient_homeAddress);
                    $('#patient-workAddress').val(globalPatient.patient_workAddress);
                    $('#nowAddress-province').val(globalPatient.nowAddress_province);
                    $('#nowAddress-town').val(globalPatient.nowAddress_town);
                    $('#nowAddress-prefecture').val(globalPatient.nowAddress_prefecture);
                    $('#child-sign').val(globalPatient.child_sign);
                    $('#guardian-name').val(globalPatient.guardian_name);
                    $('#guardian-idCard').val(globalPatient.guardian_idCard);
                    $('#guardian-phone').val(globalPatient.guardian_phone);
                }
            },
            error: function(xhr, status, error) {
                console.error("请求失败: " +error);
            }
        });
    }
});