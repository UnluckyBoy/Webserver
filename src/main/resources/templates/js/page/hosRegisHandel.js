/**
 * 挂号页面处理逻辑
 */
var globalPatient;
$(document).ready(function() {
    /*加载前提数据*/
    init_currentDay_datas();/*当日挂号数据*/
    init_currentMonth_patients();/*近2月注册数据*/

    btn_Click();/*按钮事件*/

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

    /*挂号页按钮响应逻辑*/
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
                case 'gh_appointment':
                    /*appointment-预约*/
                    console.log('预约');
                    break;
                case 'gh_save':
                    /*挂号*/
                    update_gh_handle();
                    break;
            }
        });
    });
    /*挂号页按钮响应逻辑*/

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
                            openPage(1);
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
                dataType: 'json',
                success: function(response) {
                    if(response.handleType){
                        //console.log('数据成功发送到后端',response);
                        clearPage1ViewElement();//清空用户信息
                        //gh_print_styles(globalPatient,response.handleData);/*打印*/
                        gh_print(globalPatient,response.handleData);
                        init_currentDay_datas();/*挂号后重载数据*/
                        globalPatient=null;/*置空患者信息*/
                    }else{
                        model_unCallback("异常:"+response.handleMessage);
                    }
                },
                error: function(error) {
                    //console.error('发送数据到后端时出错:', error);
                    model_unCallback('发送数据到后端时出错:'+error.toString());
                }
            });
        }
    }

    /*身份证号检测转出生日期及年龄*/
    $('#createArea').mousedown(function (event){
        var idCard=$('#create-patient-idCard').val().trim();
        var birthTime=$('#create-patient-birth').val().trim();
        if (event.which === 1&&idCard!=='') {
            if(event.which === 1&&idCard.length<18){
                nullBtn_confirm_model('身份证号不正确！请检查...',function (){
                    clear_create_patient_view();
                });
            }else{
                //model_unCallback('鼠标左键被按下！');
                let temp=idCard.substring(6, 14);
                /*添加'-01'作为日期部分，因为<input type="date">需要完整的日期*/
                let format_birthDate = temp.substring(0, 4) + '-' + temp.substring(4, 6) +'-' + temp.substring(6, 8);
                $('#create-patient-birth').val(format_birthDate); // 显示在指定的div元素中
                calculateAge(format_birthDate);
            }
        }else if(event.which === 1&&birthTime!==''){
            calculateAge(birthTime);
        }
    });
});

/*计算年龄*/
function calculateAge(birthTime){
    // 将生日字符串转换为Date对象
    let birthday = new Date(birthTime);
    // 获取当前日期
    let today = new Date();
    // 计算年龄(假设birthday和today都是有效的Date对象)
    let age = today.getFullYear() - birthday.getFullYear();
    let m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
        if (age === 0) {
            m += 12; // 将月份差转换为正数
            age = 0;
        }
    }
    if(age>0){
        $('#create-patient-age').val(age+'岁');
    }else{
        //age=m;
        $('#create-patient-age').val(m+'月');
    }
}

/*按钮事件逻辑*/
function btn_Click(){
    // 挂号日期按钮获取时间逻辑
    $('#registration-time-btn').click(function() {
        // 获取当前日期和时间
        $('#registration-time').val(getCurrentTime());
    });

    /*注册按钮逻辑*/
    $('#create_btn').click(function (){
        push_patient_date('regis');
    });
}

/*当日挂号表格逻辑*/
function init_currentDay_datas(){
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
            //console.error("请求失败: " +error);
            model_unCallback("请求失败: " +error);
        }
    });
    // 函数：填充表格数据
    function bindTableData(data) {
        var tableBody = $('#gh_data_table_body'); // 获取tbody元素
        // 清空tbody中的现有内容
        tableBody.empty();
        var checkedCheckbox = null; // 用于存储当前被选中的复选框
        // 遍历数据数组
        $.each(data, function(index, item) {
            // 创建一个新的tr元素
            var row = $('<tr>');

            // 初始化颜色变量
            let textColor = 'black';
            if (item.cancel_sign === '是') {
                textColor = 'orangered';
            }else if (item.receive_sign === '是') {
                textColor = '#06b9ee';
            }
            // 为复选框添加点击事件处理程序
            var checkbox = $('<input type="checkbox">').on('change', function() {
                let cancelBtn=$('#gh_cancel');
                if (this.checked){
                    $('input[type="checkbox"]').not(this).prop('disabled', true);
                    checkedCheckbox = $(this); // 存储当前被选中的复选框
                    cancelBtn.toggle();

                    // this指向被点击复选框
                    //let parentRow = checkedCheckbox.closest('tr'); // 找到包含复选框的tr元素
                    //let ghNumberCell = parentRow.find('td:eq(1)'); // 找到第二个td元素（索引从0开始）
                    //let ghNumber = ghNumberCell.text(); // 获取第二个td元素的文本内容，即gh_number
                    cancelBtn.on('click', function(){
                        cancelBtn.css('display','none');
                        cancel_regis(checkedCheckbox.closest('tr').find('td:eq(1)').text(),getCurrentTime());/*退号*/
                    });
                    //console.log('if:'+checkedCheckbox.closest('tr').find('td:eq(1)').text());
                }else if (checkedCheckbox && checkedCheckbox[0] === this) {
                    // 如果当前被禁用的复选框（即之前被选中的）被取消选中
                    $('input[type="checkbox"]').prop('disabled', false);
                    checkedCheckbox = null; // 清除存储的复选框
                    cancelBtn.toggle();
                }
            });

            // 为每个属性创建td元素并添加到tr中
            row.append($('<td>').append(checkbox));
            row.append($('<td>').text(item.gh_number).css('color',textColor));/*.addClass(textColor)没起作用*/
            row.append($('<td>').text(item.expense_type).css('color',textColor));
            row.append($('<td>').text(item.gh_type).css('color',textColor));
            row.append($('<td>').text(item.patient_id).css('color',textColor));
            row.append($('<td>').text(item.patient_name).css('color',textColor));
            row.append($('<td>').text(item.gh_createTime).css('color',textColor));
            row.append($('<td>').text(item.gh_department).css('color',textColor));
            row.append($('<td>').text(item.cancel_sign).css('color',textColor));
            row.append($('<td>').text(item.gh_fee_sign).css('color',textColor));
            row.append($('<td>').text(item.receive_sign).css('color',textColor));
            // 将tr添加到tbody中
            tableBody.append(row);
        })
    }
    /*实现查找功能*/
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
}

/*近2月内注册患者信息*/
function init_currentMonth_patients() {
    $.ajax({
        url: '/api/get_two_month_patients',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.handleType) {
                bindPatientData(data.handleData);
            }
        },
        error: function (xhr, status, error) {
            //console.error("请求失败: " +error);
            model_unCallback("请求失败: " + error);
        }
    });
    // 绑定表格数据
    function bindPatientData(data) {
        var tableBody = $('#patient_table_body'); // 获取tbody元素
        tableBody.empty();
        var createCheckbox = null; // 用于存储当前被选中的复选框
        // 遍历数据数组
        $.each(data, function (index, item) {
            // 创建一个新的tr元素
            var row = $('<tr>');
            // 为复选框添加点击事件处理程序
            var patient_checkbox = $('<input type="checkbox">').on('change', function() {
                let edit_Btn=$('#edit_btn');
                if (this.checked){
                    $('input[type="checkbox"]').not(this).prop('disabled', true);
                    createCheckbox = $(this); // 存储当前被选中的复选框
                    edit_Btn.toggle();
                    get_patient_data(createCheckbox.closest('tr').find('td:eq(2)').text(),getCurrentTime());/*绑定数据*/

                    $('#create-patient-name').prop('readonly', true);
                    $('#create-patient-idCard').prop('readonly', true);

                    // this指向被点击复选框
                    // let parentRow = $(this).closest('tr'); // 找到包含复选框的tr元素
                    // let patient_IDCard_Cell = parentRow.find('td:eq(2)'); // 找到第3个td元素（索引从0开始）
                    // let patient_IDCard = patient_IDCard_Cell.text(); // 获取第3个td元素的文本内容
                    edit_Btn.on('click', function(){
                        push_patient_date('update');
                        edit_Btn.css('display','none');
                    });
                }else if (createCheckbox && createCheckbox[0] === this) {
                    // 如果当前被禁用的复选框（即之前被选中的）被取消选中
                    $('input[type="checkbox"]').prop('disabled', false);
                    createCheckbox = null; // 清除存储的复选框
                    edit_Btn.toggle();
                    clear_create_patient_view();/*清空视图*/
                    input_active();
                }
            });
            // 为每个属性创建td元素并添加到tr中
            row.append($('<td>').append(patient_checkbox));
            row.append($('<td>').text(item.patient_name));
            row.append($('<td>').text(item.patient_idCard));
            row.append($('<td>').text(item.patient_gender));
            row.append($('<td>').text(item.patient_birth));
            row.append($('<td>').text(item.patient_age));
            row.append($('<td>').text(item.patient_occupation));
            row.append($('<td>').text(item.patient_nation));
            row.append($('<td>').text(item.create_time));
            row.append($('<td>').text(item.patient_phone));
            row.append($('<td>').text(item.patient_homeAddress));
            row.append($('<td>').text(item.patient_maritalStatus));
            row.append($('<td>').text(item.poverty_sign));
            row.append($('<td>').text(item.patient_emergencyContact));
            row.append($('<td>').text(item.patient_relationship));
            row.append($('<td>').text(item.patient_contactPhone));
            // 将tr添加到tbody中
            tableBody.append(row);
        })
    }
    document.getElementById('searchPatient').addEventListener('input', function() {
        var filter = this.value.toUpperCase(); // 获取输入框的值并转为大写
        var table = document.getElementById('patient_table');
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
}

/*退号逻辑*/
function cancel_regis(gh_number,cancel_time){
    var requestBody = {
        cancel_operator:$('#uName').text(),
        cancel_time: cancel_time,
        gh_number: gh_number
    };
    $.ajax({
        url:'/api/gh_cancel',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                nullBtn_confirm_model(data.handleMessage,function (){
                    init_currentDay_datas();
                });
            }else{
                nullBtn_confirm_model(data.handleMessage,function (){
                    init_currentDay_datas();
                });
            }
        },
        error: function(xhr, status, error) {
            //console.error("请求失败: " +error);
            nullBtn_confirm_model(data.handleMessage,function (){
                init_currentDay_datas();
            });
        }
    });
}

/*获取用户数据*/
function get_patient_data(patient){
    $.ajax({
        url:'/api/patientInfo',
        type: 'POST',
        data:{"patient":patient},
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                /*绑定信息*/
                $('#create-patient-name').val(data.handleData.patient_name);
                $('#create-patient-gender').val(data.handleData.patient_gender);
                $('#create-patient-idCard').val(data.handleData.patient_idCard);
                $('#create-patient-birth').val(data.handleData.patient_birth);
                $('#create-patient-nationality').val(data.handleData.patient_nationality);
                $('#create-patient-nativePlace').val(data.handleData.patient_nativePlace);
                $('#create-patient-nation').val(data.handleData.patient_nation);
                $('#create-patient-occupation').val(data.handleData.patient_occupation);
                $('#create-patient-maritalStatus').val(data.handleData.patient_maritalStatus);
                $('#create-patient-phone').val(data.handleData.patient_phone);
                $('#create-patient-age').val(data.handleData.patient_age);
                $('#create-poverty-sign').val(data.handleData.poverty_sign);
                $('#create-patient-emergencyContact').val(data.handleData.patient_emergencyContact);
                $('#create-emergencyContact-relationship').val(data.handleData.patient_relationship);
                $('#create-patient-contactPhone').val(data.handleData.patient_contactPhone);
                $('#create-patient-homeAddress').val(data.handleData.patient_homeAddress);
                $('#create-patient-workAddress').val(data.handleData.patient_workAddress);
                $('#create-nowAddress-province').val(data.handleData.nowAddress_province);
                $('#create-nowAddress-town').val(data.handleData.nowAddress_town);
                $('#create-nowAddress-prefecture').val(data.handleData.nowAddress_prefecture);
                if(data.handleData.child_sign==='是'){
                    $('#create-child-sign').prop('checked', true).trigger('change');
                }else{
                    $('#create-child-sign').prop('checked', false).trigger('change');
                }
                $('#create-child-sign').prop('disabled', false);
                $('#create-guardian-name').val(data.handleData.guardian_name);
                $('#create-guardian-idCard').val(data.handleData.guardian_idCard);
                $('#create-guardian-phone').val(data.handleData.guardian_phone);
            }else{
                nullBtn_confirm_model(data.handleMessage,function (){
                    clear_create_patient_view();
                });
            }
        },
        error: function(xhr, status, error) {
            nullBtn_confirm_model('发送数据到后端异常:'+status,function (){
                clear_create_patient_view();
            });
        }
    });
}

/*清空挂号组件*/
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
/*清空注册视图组件数据*/
function clear_create_patient_view(){
    $('#create-patient-name').val('');
    $('#create-patient-gender').val($('#create-patient-gender option').first().val()).trigger('change');
    $('#create-patient-idCard').val('');
    $('#create-patient-birth').val('');
    $('#create-patient-nationality').val('');
    $('#create-patient-nativePlace').val('');
    $('#create-patient-nation').val($('#create-patient-nation option').first().val()).trigger('change');
    $('#create-patient-occupation').val($('#create-patient-occupation option').first().val()).trigger('change');
    $('#create-patient-maritalStatus').val($('#create-patient-maritalStatus option').first().val()).trigger('change');
    //$('#create-patient-nation').val($('#create-patient-nation option:first').val()).trigger('change');
    //$('#create-patient-occupation').val($('#create-patient-occupation option:first').val()).trigger('change');
    //$('#create-patient-maritalStatus').val($('#create-patient-maritalStatus').eq(0).val()).trigger('change');
    $('#create-patient-phone').val('');
    $('#create-patient-age').val('');
    //$('#create-poverty-sign').val($('#create-poverty-sign').eq(0).val()).trigger('change');
    $('#create-poverty-sign').val($('#create-poverty-sign option').first().val()).trigger('change');
    $('#create-patient-emergencyContact').val('');
    $('#create-emergencyContact-relationship').val('');
    $('#create-patient-contactPhone').val('');
    $('#create-patient-homeAddress').val('');
    $('#create-patient-workAddress').val('');
    $('#create-nowAddress-province').val('');
    $('#create-nowAddress-town').val('');
    $('#create-nowAddress-prefecture').val('');
    $('#create-child-sign').prop('checked', false).trigger('change');
    // 触发checkbox的change事件
    //$('#create-child-sign').trigger('change');
    $('#create-guardian-name').val('');
    $('#create-guardian-idCard').val('');
    $('#create-guardian-phone').val('');
}

/*注册患者逻辑*/
function push_patient_date(type){
    let regis_name=$('#create-patient-name').val().trim();
    let regis_gender=$('#create-patient-gender').val().trim();
    let regis_idCard=$('#create-patient-idCard').val().trim();
    let regis_birth=$('#create-patient-birth').val().trim();
    let regis_nationality=$('#create-patient-nationality').val().trim();
    let regis_nativePlace=$('#create-patient-nativePlace').val().trim();
    let regis_nation=$('#create-patient-nation').val().trim();
    let regis_occupation=$('#create-patient-occupation').val().trim();
    let regis_maritalStatus=$('#create-patient-maritalStatus').val().trim();
    let regis_phone=$('#create-patient-phone').val().trim();
    let regis_age=$('#create-patient-age').val().trim();
    let regis_poverty_sign=$('#create-poverty-sign').val().trim();
    let regis_emergencyContact=$('#create-patient-emergencyContact').val().trim();
    let regis_emergencyContact_relationship=$('#create-emergencyContact-relationship').val().trim();
    let regis_contactPhone=$('#create-patient-contactPhone').val().trim();
    let regis_homeAddress=$('#create-patient-homeAddress').val().trim();
    let regis_workAddress=$('#create-patient-workAddress').val().trim();
    let regis_nowAddress_province=$('#create-nowAddress-province').val().trim();
    let regis_nowAddress_town=$('#create-nowAddress-town').val().trim();
    let regis_nowAddress_prefecture=$('#create-nowAddress-prefecture').val().trim();
    let regis_child_sign='';
    if ($('#create-child-sign').is(':checked')) {
        regis_child_sign='是';
    } else {
        regis_child_sign='否';
    }
    let regis_guardian_name=$('#create-guardian-name').val().trim();
    let regis_guardian_idCard=$('#create-guardian-idCard').val().trim();
    let regis_guardian_phone=$('#create-guardian-phone').val().trim();

    /*数据封装*/
    let requestBody={
        type:type,
        name:regis_name,
        gender:regis_gender,
        idCard:regis_idCard,
        birth:regis_birth,
        create_time:getCurrentTime(),
        nationality:regis_nationality,
        nativePlace:regis_nativePlace,
        nation:regis_nation,
        occupation:regis_occupation,
        maritalStatus:regis_maritalStatus,
        phone:regis_phone,
        age:regis_age,
        poverty_sign:regis_poverty_sign,
        emergencyContact:regis_emergencyContact,
        emergencyContact_relationship:regis_emergencyContact_relationship,
        contactPhone:regis_contactPhone,
        homeAddress:regis_homeAddress,
        workAddress:regis_workAddress,
        nowAddress_province:regis_nowAddress_province,
        nowAddress_town:regis_nowAddress_town,
        nowAddress_prefecture:regis_nowAddress_prefecture,
        child_sign:regis_child_sign,
        guardian_name:regis_guardian_name,
        guardian_idCard:regis_guardian_idCard,
        guardian_phone:regis_guardian_phone
    };

    let requiredFields = [
        'name', 'gender', 'idCard','nativePlace', 'nation', 'phone','homeAddress'
    ];
    for (let i = 0; i < requiredFields.length; i++) {
        let fieldName = requiredFields[i];
        let fieldValue = requestBody[fieldName];
        console.log("输入值为:"+fieldValue);
        // 检查字段值是否为空、未定义、null或空字符串
        if (!fieldValue || fieldValue === '' || fieldValue === null || fieldValue === undefined) {
            switch (fieldName){
                case 'name':
                    model_unCallback('姓名不能为空！');
                    break;
                case 'gender':
                    model_unCallback('性别不能为空！');
                    break;
                case 'idCard':
                    model_unCallback('身份证不能为空！');
                    break;
                case 'nativePlace':
                    model_unCallback('籍贯不能为空！');
                    break;
                case 'nation':
                    model_unCallback('民族不能为空！');
                    break;
                case 'phone':
                    model_unCallback('电话不能为空！');
                    break;
                case 'homeAddress':
                    model_unCallback('家庭住址不能为空！');
                    break;
            }
            return false;
        }
    }
    $.ajax({
        url:'/api/regis_update_patient',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        dataType: 'json',
        success: function(data) {
            if(data.handleType){
                nullBtn_confirm_model(data.handleMessage,function (){
                    clear_create_patient_view();
                    init_currentMonth_patients();
                    input_active();
                });
            }else{
                nullBtn_confirm_model(data.handleMessage,function (){
                    clear_create_patient_view();
                    init_currentMonth_patients();
                    input_active();
                });
            }
        },
        error: function(xhr, status, error) {
            nullBtn_confirm_model(data.handleMessage,function (){
                clear_create_patient_view();
                init_currentMonth_patients();
                input_active();
            });
        }
    });
}

function input_active(){
    $('#create-patient-name').prop('readonly', false);
    $('#create-patient-idCard').prop('readonly', false);
}