/**
 * index页面处理逻辑
 */
var globalPatient;
$(document).ready(function() {
    //sub_btn_view_Click();

    // 挂号日期按钮获取时间逻辑
    $('#registration-time-btn').click(function() {
        // 获取当前日期和时间
        $('#registration-time').val(getCurrentTime());
    });
    /*按钮响应逻辑*/
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
                    //console.log('点击"查询"按钮', this.id);
                    break;
                case 'gh_save':
                    //console.log('点击"保存"按钮', this.id);
                    //console.log("患者ID:"+globalPatient.patient_id);
                    update_gh_handle();
                    break;
                case 'gh_cancel':
                    //console.log('点击"退号"按钮', this.id);
                    break;
            }
        });
    });
    /*按钮响应逻辑*/

    /*弹窗逻辑*/
    let modal = $("#modal");
    let closeBtn = $(".modal-close").first();
    /*显示弹窗的函数*/
    function showModal() {
        modal.css("display", "block");
    }
    /*函数调用隐藏*/
    function hideModal() {
        modal.css("display", "none");
    }
    /*按钮隐藏弹窗的函数*/
    closeBtn.on("click", function() {
        modal.css("display", "none");
    });
    /*弹窗逻辑*/

    /*挂号逻辑函数*/
    function add_Patient(){
        showModal();
        $('#read-idCard-btn').on('click',function (){
            if($('#read-idCard-input').val().trim()!==''){
                //console.log("身份证号:",$('#read-idCard-input').val());
                getPatientInfoHandle($('#read-idCard-input').val());
            }else{
                nullBtn_confirm_model('身份证为空,请检查输入!', function(confirmed) {
                    if (confirmed) {
                        $('#read-idCard-input').val('');
                    } else {
                        $('#read-idCard-input').val('');
                    }
                });
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
                    //console.log(data);
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
                }else{
                    /*患者尚未注册,询问是否跳转注册*/
                    confirm_cancel_model('患者尚未注册,是否前往注册?', function(confirmed) {
                        if (confirmed) {
                            //console.log("用户点击了确定");
                            hideModal();
                            openPage(2);
                            $('#read-idCard-input').val('');
                        } else {
                            //console.log("用户取消了操作");
                            hideModal();
                            $('#read-idCard-input').val('');
                        }
                    });
                }
            },
            error: function(xhr, status, error) {
                //console.error("请求失败: " +error);
                model_unCallback('发送数据到后端时出错:'+error);
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
            //alert("请新增患者信息!");
            model_unCallback('请新增患者信息!');
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
                        //console.log('数据成功发送到后端',response);
                        clearPage1ViewElement();//清空用户信息
                        gh_print(globalPatient,response.handleData);/*打印*/
                    }else{
                        alert("异常:"+response.handleMessage);
                    }
                },
                error: function(error) {
                    //console.error('发送数据到后端时出错:', error);
                    //alert('发送数据到后端时出错:'+error);
                    model_unCallback('发送数据到后端时出错:'+error);
                }
            });
        }
    }

    /*表格逻辑*/
    $.ajax({
        url:'/api/gh_current_day',/* /check */
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                // 初始填充表格
                //console.log("获取的数据:"+data.handleData)
                bindTableData(data.handleData);
            }
        },
        error: function(xhr, status, error) {
            console.error("请求失败: " +error);
            model_unCallback("请求失败: " +error);
        }
    });
    // 函数：填充表格数据
    function bindTableData(data) {
        var tableBody = $('#gh_data_table_body'); // 获取tbody元素
        // 清空tbody中的现有内容
        tableBody.empty();
        // 遍历数据数组
        $.each(data, function(index, item) {
            // 创建一个新的tr元素
            var row = $('<tr>');
            // 为每个属性创建td元素并添加到tr中
            row.append($('<td>').text(item.gh_number));
            row.append($('<td>').text(item.expense_type));
            row.append($('<td>').text(item.patient_id));
            row.append($('<td>').text(item.patient_name));
            row.append($('<td>').text(item.gh_createTime));
            row.append($('<td>').text(item.gh_department));
            // 将tr添加到tbody中
            tableBody.append(row);
        })
    }
    //实现查找功能
    document.getElementById('searchInput').addEventListener('input', function() {
        var filter = this.value.toUpperCase(); // 获取输入框的值并转为大写
        var table = document.getElementById('gh_data_table');
        var thead = table.getElementsByTagName('thead')[0]; // 获取表头
        var tbody = table.getElementsByTagName('tbody')[0]; // 获取表格主体
        var trs = tbody ? tbody.getElementsByTagName('tr') : []; // 只获取数据行
        // 遍历数据行,隐藏不包含查找文本的行
        for (var i = 0; i < trs.length; i++) {
            var tds = trs[i].getElementsByTagName('td');
            var found = false;
            for (var j = 0; j < tds.length; j++) {
                if (tds[j].textContent.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
            trs[i].style.display = found ? '' : 'none'; // 根据是否找到文本显示或隐藏行
        }
        //确保表头始终可见
        thead.style.display = 'table-header-group';
    });
});