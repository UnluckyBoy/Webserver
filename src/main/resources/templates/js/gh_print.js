/*打印格式*/
function gh_print(requestBody){
    //let oldHtml=document.body.innerHTML;
    let printHead = "";//头部
    let printFoot = "";//尾部
    let printArea = '<div class="print-area"></div><h1>挂号打印</h1><p>用户信息:'+ requestBody.patient_id +'</p></div>'; //打印区域
    document.body.innerHTML=printHead+printArea+printFoot; //把需要打印的指定内容赋给body.innerHTML
    window.print(); //调用浏览器的打印功能打印指定区域
    //window.document.body.innerHTML=oldHtml;//重新给页面内容赋值
    location.reload();
    //return false;
}