/*打印格式*/
function gh_print_styles(Param1, Param2){
    //let oldHtml=document.body.innerHTML;
    let printHead = "";//头部
    let printFoot = "";//尾部
    /*打印区域*/
    let printArea =
        '<div class="print-area">' +
            '<div class="center-item">'+
                '<p class="center-text bold-text large-text">挂号单</p><br>' +
                '<p class="center-text">患者:'+ Param1.patient_name +
                '<p class="center-text">性别:'+Param1.patient_gender+'</p>' +
                '<p class="center-text">年龄:'+Param1.patient_age+'</p>' +
                '<p class="center-text">科室:'+ Param2.gh_department+'</p>'+
                '<p class="center-text">挂号日期:'+ Param2.gh_createTime+'</p>'+
                '<svg class="center-text" id="barcode">'+'</svg>'+
            '</div>'+
        '</div>';
    document.body.innerHTML=printHead+printArea+printFoot; //把需要打印的指定内容赋给body.innerHTML
    JsBarcode("#barcode", Param2.gh_number, {
        format: "CODE128",  /*条形码格式,可以根据需要选择*/
        lineColor: "#000000", /*条形颜色*/
        width: 2,/*条形宽度*/
        height: 40,/*条形高度*/
        displayValue: true /*是否显示条形码下方的值*/
    });
    window.print(); //调用浏览器的打印功能打印指定区域
    location.reload();
}

/*测试hiprint*/
function gh_Hiprint(){
    var printTemplate = new hiprint.PrintTemplate({ template: JSON.parse($('#print_textarea').val()) });
    console.log('打印格式；'+$('#print_textarea').val());
    var $html = printTemplate.getHtml([{patient_name: '测试患者',patient_gender: '男',
        patient_age: '27',gh_department: '疼痛科',gh_createTime: '2024-06-16 13:44:25', gh_number: '20240615000001' }]);
    printTemplate.printByHtml($html);

    // $('#barcode_button_preview').click(function () {
    //     var barCodehiprintTemplate = new hiprint.PrintTemplate({ template: JSON.parse($('#textarea_barcode').val()) });
    //     var $html = barCodehiprintTemplate.getHtml([{ name: '黄山', barcode: '13234567' },
    //         { name: '黄波', barcode: '1224567' }, { name: '黄磊', barcode: '1234567' }, {
    //         name: '黄磊', barcode: '1234567' }, { name: '古丽娜', barcode: '7654321' }])
    //     $('#myModal .modal-body .prevViewDiv').html($html)
    //     $('#myModal').modal('show')
    // });

    // $('#barcode_button_print').click(function () {
    //     var barCodehiprintTemplate = new hiprint.PrintTemplate({ template: JSON.parse($('#textarea_barcode').val()) });
    //     var $html = barCodehiprintTemplate.getHtml([{ name: '黄山', barcode: '13234567' },
    //         { name: '黄波', barcode: '1224567' }, { name: '黄磊', barcode: '1234567' },
    //         { name: '黄磊', barcode: '1234567' }, { name: '古丽娜', barcode: '7654321' }])
    //     barCodehiprintTemplate.printByHtml($html);
    // });
}