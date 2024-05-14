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
                    add_Patient();
                    break;
                case 'gh_query':
                    console.log('点击"查询"按钮', this.id);
                    break;
                case 'gh_save':
                    //console.log('点击"保存"按钮', this.id);
                    //console.log("患者ID:"+globalPatient.patient_id);
                    update_gh_handle();
                    break;
                case 'gh_cancel':
                    console.log('点击"退号"按钮', this.id);
                    break;
            }
        });
    });

    /**
     * 挂号
     */
    function add_Patient(){
        showModal();
        $('#read-idCard-btn').on('click',function (){
            if($('#read-idCard-input').val().trim()!==''){
                console.log("身份证号:",$('#read-idCard-input').val());
                getPatientInfoHandle($('#read-idCard-input').val());
            }else{
                alert("身份证为空");
            }
        });
    }
    /*清空组件*/
    function clearPage1ViewElement(){
        $('#patient-name').val('');
        $('#patient-gender').val('');
        $('#patient-idCard').val('');
        $('#patient-birth').val('');
        $('#patient-nationality').val('');
        $('#patient-nativePlace').val('');
        $('#patient-nation').val('');
        $('#patient-occupation').val('');
        $('#patient-maritalStatus').val('');
        $('#patient-phone').val('');
        $('#patient-age').val('');
        $('#poverty-sign').val('');
        $('#patient-emergencyContact').val('');
        $('#emergencyContact-relationship').val('');
        $('#patient-contactPhone').val('');
        $('#patient-homeAddress').val('');
        $('#patient-workAddress').val('');
        $('#nowAddress-province').val('');
        $('#nowAddress-town').val('');
        $('#nowAddress-prefecture').val('');
        $('#child-sign').val('');
        $('#guardian-name').val('');
        $('#guardian-idCard').val('');
        $('#guardian-phone').val('');
    }

    /*查询用户信息*/
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
                    $('#patient-name').val(globalPatient.patient_name);
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
    /*挂号逻辑*/
    function update_gh_handle(){
        var gh_type=$('#registration-type').val().trim();
        var insurance_type=$('#insurance-type').val().trim();
        var expense_type=$('#registration-variety').val().trim();
        var gh_createTime=$('#registration-time').val().trim();
        var gh_department=$('#registration-department').val().trim();
        var receive_physician=$('#receive_physician').val().trim();
        var exigency_sign,repeated_sign;
        if($('#reexamination').prop('checked')){
            exigency_sign='是';
        }else{
            exigency_sign='否';
        }
        if($('#emergency-treatment').prop('checked')){
            repeated_sign='是';
        }else{
            repeated_sign='否';
        }
        if(gh_createTime===''){/*如果没有在前端点击获取日期，则自动补全*/
            gh_createTime=getCurrentTime();
        }

        /*检查挂号之前是否获取了患者信息*/
        if(globalPatient==null){
            alert("请新增患者信息!")
        }else{
            // 封装数据
            var requestBody = {
                gh_type:gh_type,
                insurance_type: insurance_type,
                expense_type: expense_type,
                patient_id: globalPatient.patient_id,
                operator_account: $('#uName').text(),
                gh_createTime: gh_createTime,
                gh_department: gh_department,
                receive_physician: receive_physician,
                exigency_sign: exigency_sign,
                repeated_sign: repeated_sign
            };
            $.ajax({
                url: '/api/gh_update_data',  // 替换为实际的 Spring Boot 后端端点
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestBody),
                success: function(response) {
                    if(response.handleType){
                        console.log('数据成功发送到后端',response);
                        clearPage1ViewElement();//清空用户信息
                        /*打印*/
                        // window.print();
                        gh_print(globalPatient,requestBody);
                    }else{
                        alert("异常:"+response.handleMessage);
                    }
                },
                error: function(error) {
                    console.error('发送数据到后端时出错', error);
                }
            });
        }
    }
});