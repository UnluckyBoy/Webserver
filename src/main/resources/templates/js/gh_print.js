/*打印格式*/
function gh_print(Param1,Param2){
    //let oldHtml=document.body.innerHTML;
    let printHead = "";//头部
    let printFoot = "";//尾部
    /*打印区域*/
    let printArea =
        '<div class="print-area">' +
            '<div class="center-item">'+
                '<p class="center-text bold-text large-text">挂号单</p><br>' +
                // '<div class="inline-elements">'+
                //     '<p class="center-text">患者:'+ Param1.patient_name +
                //     '<p class="center-text">性别:'+Param1.patient_gender+'</p>' +
                // '</div>'+
                // '<div class="inline-elements">'+
                //     '<p class="center-text">年龄:'+Param1.patient_age+'</p>' +
                //     '<p class="center-text">科室:'+ Param2.gh_department+'</p>'+
                // '</div>'+
                '<p class="center-text">患者:'+ Param1.patient_name +
                '<p class="center-text">性别:'+Param1.patient_gender+'</p>' +
                '<p class="center-text">年龄:'+Param1.patient_age+'</p>' +
                '<p class="center-text">科室:'+ Param2.gh_department+'</p>'+
                '<p class="center-text">挂号日期:'+ Param2.gh_createTime+'</p>'+
                '<svg class="center-text" id="barcode">'+'</svg>'+
            '</div>'+
        '</div>';
    document.body.innerHTML=printHead+printArea+printFoot; //把需要打印的指定内容赋给body.innerHTML
    JsBarcode("#barcode", Param1.patient_idCard, {
        format: "CODE128",  /*条形码格式,可以根据需要选择*/
        lineColor: "#000000", /*条形颜色*/
        width: 2,/*条形宽度*/
        height: 40,/*条形高度*/
        displayValue: true /*是否显示条形码下方的值*/
    });
    window.print(); //调用浏览器的打印功能打印指定区域
    location.reload();
}