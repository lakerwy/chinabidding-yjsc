//下拉列表框：招标信息分类，回显及初始化页面时调用
function zbxx_type_huixian(table_type,selectname){
    //alert("table_type:"+table_type);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6;
    $("select[name='"+selectname+"']").empty();
    var temp = table_type;
    opt0 = $("<option>").attr("value","0").html("全部");
    if(temp == "001" || temp == "01" || temp == "1")
        opt1 = $("<option>").attr("value","001").attr("selected",true).html("工程招标");
    else
        opt1 = $("<option>").attr("value","001").html("工程招标");
    if(temp == "002" || temp == "02" || temp == "2")
        opt2 = $("<option>").attr("value","002").attr("selected",true).html("货物招标");
    else
        opt2 = $("<option>").attr("value","002").html("货物招标");
    if(temp == "003" || temp == "03" || temp == "3")
        opt3 = $("<option>").attr("value","003").attr("selected",true).html("服务招标");
    else
        opt3 = $("<option>").attr("value","003").html("服务招标");
    if(temp == "1030")
        opt4 = $("<option>").attr("value","1030").attr("selected",true).html("招标预告");
    else
        opt4 = $("<option>").attr("value","1030").html("招标预告");
    if(temp == "1020")
        opt5 = $("<option>").attr("value","1020").attr("selected",true).html("中标公示");
    else
        opt5 = $("<option>").attr("value","1020").html("中标公示");
    if(temp == "1040")
        opt6 = $("<option>").attr("value","1040").attr("selected",true).html("招投标动态");
    else
        opt6 = $("<option>").attr("value","1040").html("招投标动态");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6);

}

//下拉列表框：采购信息分类，回显及初始化页面时调用
function cgxx_type_huixian(table_type,selectname){
    //alert("table_type:"+table_type);
    var opt0,opt1,opt2;
    $("select[name='"+selectname+"']").empty();
    var temp = table_type;
    opt0 = $("<option>").attr("value","0").html("全部");
    if(temp == "2010")
        opt1 = $("<option>").attr("value","2010").attr("selected",true).html("政府采购");
    else
        opt1 = $("<option>").attr("value","2010").html("政府采购");
    if(temp == "2020")
        opt2 = $("<option>").attr("value","2020").attr("selected",true).html("企业采购");
    else
        opt2 = $("<option>").attr("value","2020").html("企业采购");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt2);

}

//下拉列表框：项目信息分类，回显及初始化页面时调用
function xmxx_type_huixian(table_type,selectname){
    //alert("table_type:"+table_type);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7;
    $("select[name='"+selectname+"']").empty();
    var temp = table_type;
    opt0 = $("<option>").attr("value","0").html("全部");
    if(temp == "3030")
        opt1 = $("<option>").attr("value","3030").attr("selected",true).html("VIP项目");
    else
        opt1 = $("<option>").attr("value","3030").html("VIP项目");
    if(temp == "3080")
        opt2 = $("<option>").attr("value","3080").attr("selected",true).html("重点招商项目");
    else
        opt2 = $("<option>").attr("value","3080").html("重点招商项目");
    if(temp == "3050")
        opt3 = $("<option>").attr("value","3050").attr("selected",true).html("项目动态");
    else
        opt3 = $("<option>").attr("value","3050").html("项目动态");
    if(temp == "3070")
        opt4 = $("<option>").attr("value","3070").attr("selected",true).html("项目跟踪");
    else
        opt4 = $("<option>").attr("value","3070").html("项目跟踪");
    if(temp == "3010")
        opt5 = $("<option>").attr("value","3010").attr("selected",true).html("拟在建项目");
    else
        opt5 = $("<option>").attr("value","3010").html("拟在建项目");
    if(temp == "3040")
        opt6 = $("<option>").attr("value","3040").attr("selected",true).html("VIP资料");
    else
        opt6 = $("<option>").attr("value","3040").html("VIP资料");
    if(temp == "3020")
        opt7 = $("<option>").attr("value","3020").attr("selected",true).html("项目备案核准");
    else
        opt7 = $("<option>").attr("value","3020").html("项目备案核准");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7);
}
function xmxx_type_huixian2(table_type,selectname){
    //alert("table_type:"+table_type);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7;
    $("select[name='"+selectname+"']").empty();
    var temp = table_type;
    opt0 = $("<option>").attr("value","0").html("全部");
    if(temp == "3030")
        opt1 = $("<option>").attr("value","3030").attr("selected",true).html("VIP项目");
    else
        opt1 = $("<option>").attr("value","3030").html("VIP项目");
    if(temp == "3020")
        opt7 = $("<option>").attr("value","3020").attr("selected",true).html("项目备案核准");
    else
        opt7 = $("<option>").attr("value","3020").html("项目备案核准");
    if(temp == "3050")
        opt3 = $("<option>").attr("value","3050").attr("selected",true).html("项目动态");
    else
        opt3 = $("<option>").attr("value","3050").html("项目动态");
    if(temp == "3070")
        opt4 = $("<option>").attr("value","3070").attr("selected",true).html("项目跟踪");
    else
        opt4 = $("<option>").attr("value","3070").html("项目跟踪");
    if(temp == "3080")
        opt2 = $("<option>").attr("value","3080").attr("selected",true).html("重点招商项目");
    else
        opt2 = $("<option>").attr("value","3080").html("重点招商项目");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt7).append(opt3).append(opt4).append(opt2);
}
function xmxx_type_huixian3(table_type,selectname){
    //alert("table_type:"+table_type);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7;
    $("select[name='"+selectname+"']").empty();
    var temp = table_type;
    opt0 = $("<option>").attr("value","0").html("全部");
    if(temp == "3030")
        opt1 = $("<option>").attr("value","3030").attr("selected",true).html("VIP项目");
    else
        opt1 = $("<option>").attr("value","3030").html("VIP项目");
    if(temp == "3020")
        opt7 = $("<option>").attr("value","3020").attr("selected",true).html("项目备案核准");
    else
        opt7 = $("<option>").attr("value","3020").html("项目备案核准");
    if(temp == "3050")
        opt3 = $("<option>").attr("value","3050").attr("selected",true).html("项目动态");
    else
        opt3 = $("<option>").attr("value","3050").html("项目动态");
    if(temp == "3070")
        opt4 = $("<option>").attr("value","3070").attr("selected",true).html("项目跟踪");
    else
        opt4 = $("<option>").attr("value","3070").html("项目跟踪");
    if(temp == "3080")
        opt2 = $("<option>").attr("value","3080").attr("selected",true).html("重点招商项目");
    else
        opt2 = $("<option>").attr("value","3080").html("重点招商项目");
    if(temp == "3090")
        opt5 = $("<option>").attr("value","3090").attr("selected",true).html("国外商机");
    else
        opt5 = $("<option>").attr("value","3090").html("国外商机");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt7).append(opt3).append(opt4).append(opt2).append(opt5);
}
function xmxx_jzjd_huixian(classb_id,selectname){
    //alert("classb_id:"+classb_id);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7;
    $("select[name='"+selectname+"']").empty();
    var temp = classb_id;
    opt0 = $("<option>").attr("value","0").html("-项目进展阶段-");
    if(temp == "2")
        opt1 = $("<option>").attr("value","2").attr("selected",true).html("项目建议书阶段");
    else
        opt1 = $("<option>").attr("value","2").html("项目建议书阶段");
    if(temp == "3")
        opt7 = $("<option>").attr("value","3").attr("selected",true).html("可行性研究报告阶段");
    else
        opt7 = $("<option>").attr("value","3").html("可行性研究报告阶段");
    if(temp == "4")
        opt3 = $("<option>").attr("value","4").attr("selected",true).html("项目审批核查");
    else
        opt3 = $("<option>").attr("value","4").html("项目审批核查");
    if(temp == "6")
        opt4 = $("<option>").attr("value","6").attr("selected",true).html("工程设计");
    else
        opt4 = $("<option>").attr("value","6").html("工程设计");
    if(temp == "10")
        opt2 = $("<option>").attr("value","10").attr("selected",true).html("施工准备");
    else
        opt2 = $("<option>").attr("value","10").html("施工准备");
    if(temp == "11")
        opt5 = $("<option>").attr("value","11").attr("selected",true).html("在建阶段");
    else
        opt5 = $("<option>").attr("value","11").html("在建阶段");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt7).append(opt3).append(opt4).append(opt2).append(opt5);
}

//下拉列表框：查询方式，回显及初始化页面时调用----标题，内容，招标编号----默认：标题
function search_type_huixian(search_type,selectname){
    //alert("search_type:"+search_type);
    var opt1,opt2,opt3;
    $("select[name='"+selectname+"']").empty();
    var temp = search_type;
    opt1 = $("<option>").attr("value","TITLE").attr("selected",true).html("标题");
    if(temp == "CONTEXT")
        opt2 = $("<option>").attr("value","CONTEXT").attr("selected",true).html("内容");
    else
        opt2 = $("<option>").attr("value","CONTEXT").html("内容");
    if(temp == "BIDDINGNO")
        opt3 = $("<option>").attr("value","BIDDINGNO").attr("selected",true).html("招标编号");
    else
        opt3 = $("<option>").attr("value","BIDDINGNO").html("招标编号");
    $("select[name='"+selectname+"']").append(opt1).append(opt2).append(opt3);

}
//下拉列表框：查询方式，回显及初始化页面时调用----标题，内容，附件，招标编号----默认：标题
function search_type_huixian1(search_type,selectname){
    //alert("search_type:"+search_type);
    var opt1,opt2,opt3,opt4;
    $("select[name='"+selectname+"']").empty();
    var temp = search_type;
    opt1 = $("<option>").attr("value","TITLE").attr("selected",true).html("标题");
    if(temp == "CONTEXT")
        opt2 = $("<option>").attr("value","CONTEXT").attr("selected",true).html("内容");
    else
        opt2 = $("<option>").attr("value","CONTEXT").html("内容");
    if(temp == "FJ")
        opt4 = $("<option>").attr("value","FJ").attr("selected",true).html("附件");
    else
        opt4 = $("<option>").attr("value","FJ").html("附件");
    if(temp == "BIDDINGNO")
        opt3 = $("<option>").attr("value","BIDDINGNO").attr("selected",true).html("招标编号");
    else
        opt3 = $("<option>").attr("value","BIDDINGNO").html("招标编号");
    $("select[name='"+selectname+"']").append(opt1).append(opt2).append(opt4).append(opt3);
}
//下拉列表框：查询方式，回显及初始化页面时调用----标题，内容----默认：标题
function search_type_huixian2(search_type,selectname){
    //alert("search_type:"+search_type);
    var opt1,opt2;
    $("select[name='"+selectname+"']").empty();
    var temp = search_type;
    opt1 = $("<option>").attr("value","TITLE").attr("selected",true).html("标题");
    if(temp == "CONTEXT")
        opt2 = $("<option>").attr("value","CONTEXT").attr("selected",true).html("内容");
    else
        opt2 = $("<option>").attr("value","CONTEXT").html("内容");
    $("select[name='"+selectname+"']").append(opt1).append(opt2);

}
//下拉列表框：查询方式，回显及初始化页面时调用----标题，内容----默认：内容
function search_type_huixian25(search_type,selectname){
    //alert("search_type:"+search_type);
    var opt1,opt2;
    $("select[name='"+selectname+"']").empty();
    var temp = search_type;
    opt1 = $("<option>").attr("value","CONTEXT").attr("selected",true).html("内容");
    if(temp == "TITLE")
        opt2 = $("<option>").attr("value","TITLE").attr("selected",true).html("标题");
    else
        opt2 = $("<option>").attr("value","TITLE").html("标题");
    $("select[name='"+selectname+"']").append(opt1).append(opt2);

}
//下拉列表框：查询方式，回显及初始化页面时调用----标题，内容，附件----默认：标题
function search_type_huixian3(search_type,selectname){
    //alert("search_type:"+search_type);
    var opt1,opt2,opt4;
    $("select[name='"+selectname+"']").empty();
    var temp = search_type;
    opt1 = $("<option>").attr("value","TITLE").attr("selected",true).html("标题");
    if(temp == "CONTEXT")
        opt2 = $("<option>").attr("value","CONTEXT").attr("selected",true).html("内容");
    else
        opt2 = $("<option>").attr("value","CONTEXT").html("内容");
    if(temp == "FJ")
        opt4 = $("<option>").attr("value","FJ").attr("selected",true).html("附件");
    else
        opt4 = $("<option>").attr("value","FJ").html("附件");
    $("select[name='"+selectname+"']").append(opt1).append(opt2).append(opt4);
}
//下拉列表框：查询方式，回显及初始化页面时调用----标题，内容，附件----默认：内容
function search_type_huixian35(search_type,selectname){
    //alert("search_type:"+search_type);
    var opt1,opt2,opt4;
    $("select[name='"+selectname+"']").empty();
    var temp = search_type;
    opt1 = $("<option>").attr("value","CONTEXT").attr("selected",true).html("内容");
    if(temp == "TITLE")
        opt2 = $("<option>").attr("value","TITLE").attr("selected",true).html("标题");
    else
        opt2 = $("<option>").attr("value","TITLE").html("标题");
    if(temp == "FJ")
        opt4 = $("<option>").attr("value","FJ").attr("selected",true).html("附件");
    else
        opt4 = $("<option>").attr("value","FJ").html("附件");
    $("select[name='"+selectname+"']").append(opt1).append(opt2).append(opt4);
}

//下拉列表框：地区，回显及初始化页面时调用
function area_huixian(area,selectname){
    //alert("area:"+area);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10,opt11,opt12,opt13,opt14,opt15,opt16,opt17,opt18,opt19,opt20,opt21,opt22,opt23,opt24,opt25,opt26,opt27,opt28,opt29,opt30,opt31,opt32,opt33,opt34,opt36,opt43,opt44,opt45,opt46,opt47,opt48,opt49,opt50;
    $("select[name='"+selectname+"']").empty();
    var temp = area;
    opt0 = $("<option>").attr("value","0").html("-地区-");
    if(temp == "1")
        opt1 = $("<option>").attr("value","1").attr("selected",true).html("北京");
    else
        opt1 = $("<option>").attr("value","1").html("北京");
    if(temp == "2")
        opt2 = $("<option>").attr("value","2").attr("selected",true).html("上海");
    else
        opt2 = $("<option>").attr("value","2").html("上海");
    if(temp == "3")
        opt3 = $("<option>").attr("value","3").attr("selected",true).html("天津");
    else
        opt3 = $("<option>").attr("value","3").html("天津");
    if(temp == "4")
        opt4 = $("<option>").attr("value","4").attr("selected",true).html("重庆");
    else
        opt4 = $("<option>").attr("value","4").html("重庆");
    if(temp == "5")
        opt5 = $("<option>").attr("value","5").attr("selected",true).html("河北");
    else
        opt5 = $("<option>").attr("value","5").html("河北");
    if(temp == "6")
        opt6 = $("<option>").attr("value","6").attr("selected",true).html("山西");
    else
        opt6 = $("<option>").attr("value","6").html("山西");
    if(temp == "7")
        opt7 = $("<option>").attr("value","7").attr("selected",true).html("内蒙古");
    else
        opt7 = $("<option>").attr("value","7").html("内蒙古");
    if(temp == "8")
        opt8 = $("<option>").attr("value","8").attr("selected",true).html("辽宁");
    else
        opt8 = $("<option>").attr("value","8").html("辽宁");
    if(temp == "9")
        opt9 = $("<option>").attr("value","9").attr("selected",true).html("吉林");
    else
        opt9 = $("<option>").attr("value","9").html("吉林");
    if(temp == "10")
        opt10 = $("<option>").attr("value","10").attr("selected",true).html("黑龙江");
    else
        opt10 = $("<option>").attr("value","10").html("黑龙江");
    if(temp == "11")
        opt11 = $("<option>").attr("value","11").attr("selected",true).html("江苏");
    else
        opt11 = $("<option>").attr("value","11").html("江苏");
    if(temp == "12")
        opt12 = $("<option>").attr("value","12").attr("selected",true).html("浙江");
    else
        opt12 = $("<option>").attr("value","12").html("浙江");
    if(temp == "13")
        opt13 = $("<option>").attr("value","13").attr("selected",true).html("安徽");
    else
        opt13 = $("<option>").attr("value","13").html("安徽");
    if(temp == "14")
        opt14 = $("<option>").attr("value","14").attr("selected",true).html("福建");
    else
        opt14 = $("<option>").attr("value","14").html("福建");
    if(temp == "15")
        opt15 = $("<option>").attr("value","15").attr("selected",true).html("江西");
    else
        opt15 = $("<option>").attr("value","15").html("江西");
    if(temp == "16")
        opt16 = $("<option>").attr("value","16").attr("selected",true).html("山东");
    else
        opt16 = $("<option>").attr("value","16").html("山东");
    if(temp == "17")
        opt17 = $("<option>").attr("value","17").attr("selected",true).html("河南");
    else
        opt17 = $("<option>").attr("value","17").html("河南");
    if(temp == "18")
        opt18 = $("<option>").attr("value","18").attr("selected",true).html("湖北");
    else
        opt18 = $("<option>").attr("value","18").html("湖北");
    if(temp == "19")
        opt19 = $("<option>").attr("value","19").attr("selected",true).html("湖南");
    else
        opt19 = $("<option>").attr("value","19").html("湖南");
    if(temp == "20")
        opt20 = $("<option>").attr("value","20").attr("selected",true).html("广东");
    else
        opt20 = $("<option>").attr("value","20").html("广东");
    if(temp == "21")
        opt21 = $("<option>").attr("value","21").attr("selected",true).html("广西");
    else
        opt21 = $("<option>").attr("value","21").html("广西");
    if(temp == "22")
        opt22 = $("<option>").attr("value","22").attr("selected",true).html("海南");
    else
        opt22 = $("<option>").attr("value","22").html("海南");
    if(temp == "23")
        opt23 = $("<option>").attr("value","23").attr("selected",true).html("贵州");
    else
        opt23 = $("<option>").attr("value","23").html("贵州");
    if(temp == "24")
        opt24 = $("<option>").attr("value","24").attr("selected",true).html("云南");
    else
        opt24 = $("<option>").attr("value","24").html("云南");
    if(temp == "25")
        opt25 = $("<option>").attr("value","25").attr("selected",true).html("西藏");
    else
        opt25 = $("<option>").attr("value","25").html("西藏");
    if(temp == "26")
        opt26 = $("<option>").attr("value","26").attr("selected",true).html("陕西");
    else
        opt26 = $("<option>").attr("value","26").html("陕西");
    if(temp == "27")
        opt27 = $("<option>").attr("value","27").attr("selected",true).html("四川");
    else
        opt27 = $("<option>").attr("value","27").html("四川");
    if(temp == "28")
        opt28 = $("<option>").attr("value","28").attr("selected",true).html("甘肃");
    else
        opt28 = $("<option>").attr("value","28").html("甘肃");
    if(temp == "29")
        opt29 = $("<option>").attr("value","29").attr("selected",true).html("青海");
    else
        opt29 = $("<option>").attr("value","29").html("青海");
    if(temp == "30")
        opt30 = $("<option>").attr("value","30").attr("selected",true).html("新疆");
    else
        opt30 = $("<option>").attr("value","30").html("新疆");
    if(temp == "31")
        opt31 = $("<option>").attr("value","31").attr("selected",true).html("宁夏");
    else
        opt31 = $("<option>").attr("value","31").html("宁夏");
    if(temp == "32")
        opt32 = $("<option>").attr("value","32").attr("selected",true).html("香港");
    else
        opt32 = $("<option>").attr("value","32").html("香港");
    if(temp == "33")
        opt33 = $("<option>").attr("value","33").attr("selected",true).html("澳门");
    else
        opt33 = $("<option>").attr("value","33").html("澳门");
    if(temp == "34")
        opt34 = $("<option>").attr("value","34").attr("selected",true).html("台湾");
    else
        opt34 = $("<option>").attr("value","34").html("台湾");
    if(temp == "36")
        opt36 = $("<option>").attr("value","36").attr("selected",true).html("跨省");
    else
        opt36 = $("<option>").attr("value","36").html("跨省");
    if(temp == "43")
        opt43 = $("<option>").attr("value","43").attr("selected",true).html("亚洲");
    else
        opt43 = $("<option>").attr("value","43").html("亚洲");
    if(temp == "44")
        opt44 = $("<option>").attr("value","44").attr("selected",true).html("欧洲");
    else
        opt44 = $("<option>").attr("value","44").html("欧洲");
    if(temp == "45")
        opt45 = $("<option>").attr("value","45").attr("selected",true).html("非洲");
    else
        opt45 = $("<option>").attr("value","45").html("非洲");
    if(temp == "46")
        opt46 = $("<option>").attr("value","46").attr("selected",true).html("北美洲");
    else
        opt46 = $("<option>").attr("value","46").html("北美洲");
    if(temp == "47")
        opt47 = $("<option>").attr("value","47").attr("selected",true).html("南美洲");
    else
        opt47 = $("<option>").attr("value","47").html("南美洲");
    if(temp == "48")
        opt48 = $("<option>").attr("value","48").attr("selected",true).html("大洋洲");
    else
        opt48 = $("<option>").attr("value","48").html("大洋洲");
    if(temp == "49")
        opt49 = $("<option>").attr("value","49").attr("selected",true).html("中美洲");
    else
        opt49 = $("<option>").attr("value","49").html("中美洲");
    if(temp == "50")
        opt50 = $("<option>").attr("value","50").attr("selected",true).html("加勒比");
    else
        opt50 = $("<option>").attr("value","50").html("加勒比");
    $("select[name='areaid']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7).append(opt8).append(opt9).append(opt10).append(opt11).append(opt12).append(opt13).append(opt14).append(opt15).append(opt16).append(opt17).append(opt18).append(opt19).append(opt20).append(opt21).append(opt22).append(opt23).append(opt24).append(opt25).append(opt26).append(opt27).append(opt28).append(opt29).append(opt30).append(opt31).append(opt32).append(opt33).append(opt34).append(opt36).append(opt43).append(opt44).append(opt45).append(opt46).append(opt47).append(opt48).append(opt49).append(opt50);
}

//下拉列表框：行业，回显及初始化页面时调用
function category_huixian(category,selectname){
    //alert("categoryid:"+categoryid);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10,opt11,opt12,opt13,opt14,opt15,opt16,opt17,opt18;
    $("select[name='"+selectname+"']").empty();
    var temp = category;
    opt0 = $("<option>").attr("value","0").html("-请选择-");
    if(temp == "1")
        opt1 = $("<option>").attr("value","1").attr("selected",true).html("交通运输");
    else
        opt1 = $("<option>").attr("value","1").html("交通运输");
    if(temp == "5")
        opt5 = $("<option>").attr("value","5").attr("selected",true).html("机械电子电器");
    else
        opt5 = $("<option>").attr("value","5").html("机械电子电器");
    //if(temp == "7")
    //    opt7 = $("<option>").attr("value","7").attr("selected",true).html("能源化工");
    //else
    //    opt7 = $("<option>").attr("value","7").html("能源化工");
    //拆分也下面两个
    if(temp == "17")
        opt17 = $("<option>").attr("value","17").attr("selected",true).html("能源");
    else
        opt17 = $("<option>").attr("value","17").html("能源");
    if(temp == "18")
        opt18 = $("<option>").attr("value","18").attr("selected",true).html("化工");
    else
        opt18 = $("<option>").attr("value","18").html("化工");
    if(temp == "10")
        opt10 = $("<option>").attr("value","10").attr("selected",true).html("冶金矿产原材料");
    else
        opt10 = $("<option>").attr("value","10").html("冶金矿产原材料");
    if(temp == "2")
        opt2 = $("<option>").attr("value","2").attr("selected",true).html("网络通讯计算机");
    else
        opt2 = $("<option>").attr("value","2").html("网络通讯计算机");
    if(temp == "3")
        opt3 = $("<option>").attr("value","3").attr("selected",true).html("市政房地产建筑");
    else
        opt3 = $("<option>").attr("value","3").html("市政房地产建筑");
    if(temp == "4")
        opt4 = $("<option>").attr("value","4").attr("selected",true).html("水利桥梁");
    else
        opt4 = $("<option>").attr("value","4").html("水利桥梁");
    if(temp == "6")
        opt6 = $("<option>").attr("value","6").attr("selected",true).html("环保");
    else
        opt6 = $("<option>").attr("value","6").html("环保");
    if(temp == "8")
        opt8 = $("<option>").attr("value","8").attr("selected",true).html("医疗卫生");
    else
        opt8 = $("<option>").attr("value","8").html("医疗卫生");
    if(temp == "9")
        opt9 = $("<option>").attr("value","9").attr("selected",true).html("科技文教旅游");
    else
        opt9 = $("<option>").attr("value","9").html("科技文教旅游");
    if(temp == "11")
        opt11 = $("<option>").attr("value","11").attr("selected",true).html("出版印刷");
    else
        opt11 = $("<option>").attr("value","11").html("出版印刷");
    if(temp == "12")
        opt12 = $("<option>").attr("value","12").attr("selected",true).html("轻工纺织食品");
    else
        opt12 = $("<option>").attr("value","12").html("轻工纺织食品");
    if(temp == "13")
        opt13 = $("<option>").attr("value","13").attr("selected",true).html("农林牧渔");
    else
        opt13 = $("<option>").attr("value","13").html("农林牧渔");
    if(temp == "14")
        opt14 = $("<option>").attr("value","14").attr("selected",true).html("商业服务");
    else
        opt14 = $("<option>").attr("value","14").html("商业服务");
    if(temp == "15")
        opt15 = $("<option>").attr("value","15").attr("selected",true).html("其它");
    else
        opt15 = $("<option>").attr("value","15").html("其它");
    if(temp == "16")
        opt16 = $("<option>").attr("value","16").attr("selected",true).html("园林绿化");
    else
        opt16 = $("<option>").attr("value","16").html("园林绿化");
    $("select[name='categoryid']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt17).append(opt18).append(opt8).append(opt9).append(opt10).append(opt11).append(opt12).append(opt13).append(opt14).append(opt15).append(opt16);
}

//下拉列表框：项目信息，行业分类，numa，numb，回显
function numa_numb_huixian(numa,numb,selectname,selectname2){
    numa_huixian(numa,selectname);
    var nb = numb;
    var xmxfValue = numa;
    //alert("numa:"+numa+"\tnumb:"+numb+"\txmxfValue:"+xmxfValue);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10;
    if(xmxfValue == 0){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        $("select[name='"+selectname2+"']").append(opt0);
    }
    else if(xmxfValue == 1){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 101)
            opt1 = $("<option>").attr("value","101").attr("selected",true).html("高速公路、道路");
        else
            opt1 = $("<option>").attr("value","101").html("高速公路、道路");
        if(nb == 102)
            opt2 = $("<option>").attr("value","102").attr("selected",true).html("桥梁、立交桥");
        else
            opt2 = $("<option>").attr("value","102").html("桥梁、立交桥");
        if(nb == 103)
            opt3 = $("<option>").attr("value","103").attr("selected",true).html("机场");
        else
            opt3 = $("<option>").attr("value","103").html("机场");
        if(nb == 104)
            opt4 = $("<option>").attr("value","104").attr("selected",true).html("铁路、轨道交通");
        else
            opt4 = $("<option>").attr("value","104").html("铁路、轨道交通");
        if(nb == 105)
            opt5 = $("<option>").attr("value","105").attr("selected",true).html("航道、水利枢纽");
        else
            opt5 = $("<option>").attr("value","105").html("航道、水利枢纽");
        if(nb == 106)
            opt6 = $("<option>").attr("value","106").attr("selected",true).html("港口、码头、泊位、渔港");
        else
            opt6 = $("<option>").attr("value","106").html("港口、码头、泊位、渔港");
        if(nb == 107)
            opt7 = $("<option>").attr("value","107").attr("selected",true).html("客运站、交通枢纽");
        else
            opt7 = $("<option>").attr("value","107").html("客运站、交通枢纽");
        if(nb == 108)
            opt8 = $("<option>").attr("value","108").attr("selected",true).html("隧道");
        else
            opt8 = $("<option>").attr("value","108").html("隧道");
        if(nb == 109)
            opt9 = $("<option>").attr("value","109").attr("selected",true).html("物流");
        else
            opt9 = $("<option>").attr("value","109").html("物流");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7).append(opt8).append(opt9);
    }
    else if(xmxfValue == 2){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 201)
            opt1 = $("<option>").attr("value","201").attr("selected",true).html("火电");
        else
            opt1 = $("<option>").attr("value","201").html("火电");
        if(nb == 202)
            opt2 = $("<option>").attr("value","202").attr("selected",true).html("核电");
        else
            opt2 = $("<option>").attr("value","202").html("核电");
        if(nb == 203)
            opt3 = $("<option>").attr("value","203").attr("selected",true).html("水电");
        else
            opt3 = $("<option>").attr("value","203").html("水电");
        if(nb == 204)
            opt4 = $("<option>").attr("value","204").attr("selected",true).html("风电");
        else
            opt4 = $("<option>").attr("value","204").html("风电");
        if(nb == 205)
            opt5 = $("<option>").attr("value","205").attr("selected",true).html("电网建设");
        else
            opt5 = $("<option>").attr("value","205").html("电网建设");
        if(nb == 206)
            opt6 = $("<option>").attr("value","206").attr("selected",true).html("太阳能、光伏发电");
        else
            opt6 = $("<option>").attr("value","206").html("太阳能、光伏发电");
        if(nb == 207)
            opt7 = $("<option>").attr("value","207").attr("selected",true).html("垃圾焚烧发电及其他新能源发电");
        else
            opt7 = $("<option>").attr("value","207").html("垃圾焚烧发电及其他新能源发电");
        if(nb == 208)
            opt8 = $("<option>").attr("value","208").attr("selected",true).html("水泥余热发电");
        else
            opt8 = $("<option>").attr("value","208").html("水泥余热发电");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7).append(opt8);
    }
    else if(xmxfValue == 3){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 301)
            opt1 = $("<option>").attr("value","301").attr("selected",true).html("天然气、输气管道");
        else
            opt1 = $("<option>").attr("value","301").html("天然气、输气管道");
        if(nb == 302)
            opt1 = $("<option>").attr("value","302").attr("selected",true).html("石油、石化");
        else
            opt2 = $("<option>").attr("value","302").html("石油、石化");
        if(nb == 303)
            opt2 = $("<option>").attr("value","303").attr("selected",true).html("有机化学");
        else
            opt3 = $("<option>").attr("value","303").html("有机化学");
        if(nb == 304)
            opt3 = $("<option>").attr("value","304").attr("selected",true).html("无机化学");
        else
            opt4 = $("<option>").attr("value","304").html("无机化学");
        if(nb == 305)
            opt4 = $("<option>").attr("value","305").attr("selected",true).html("煤化工");
        else
            opt5 = $("<option>").attr("value","305").html("煤化工");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5);
    }else if(xmxfValue == 4){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 401)
            opt1 = $("<option>").attr("value","401").attr("selected",true).html("选煤厂、煤矿、尾矿");
        else
            opt1 = $("<option>").attr("value","401").html("选煤厂、煤矿、尾矿");
        if(nb == 402)
            opt2 = $("<option>").attr("value","402").attr("selected",true).html("矿山、矿产、矿石");
        else
            opt2 = $("<option>").attr("value","402").html("矿山、矿产、矿石");
        if(nb == 403)
            opt3 = $("<option>").attr("value","403").attr("selected",true).html("水泥生产线、混凝土");
        else
            opt3 = $("<option>").attr("value","403").html("水泥生产线、混凝土");
        if(nb == 404)
            opt4 = $("<option>").attr("value","404").attr("selected",true).html("金属冶炼");
        else
            opt4 = $("<option>").attr("value","404").html("金属冶炼");
        if(nb == 405)
            opt5 = $("<option>").attr("value","405").attr("selected",true).html("钢厂、钢结构");
        else
            opt5 = $("<option>").attr("value","405").html("钢厂、钢结构");
        if(nb == 406)
            opt6 = $("<option>").attr("value","406").attr("selected",true).html("玻璃及其他");
        else
            opt6 = $("<option>").attr("value","406").html("玻璃及其他");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6);
    }else if(xmxfValue == 5){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 501)
            opt1 = $("<option>").attr("value","501").attr("selected",true).html("机械产品、厂房、生产车间");
        else
            opt1 = $("<option>").attr("value","501").html("机械产品、厂房、生产车间");
        if(nb == 502)
            opt2 = $("<option>").attr("value","502").attr("selected",true).html("医疗器械、电子产品、电器产品");
        else
            opt2 = $("<option>").attr("value","502").html("医疗器械、电子产品、电器产品");
        if(nb == 503)
            opt3 = $("<option>").attr("value","503").attr("selected",true).html("造船、造车");
        else
            opt3 = $("<option>").attr("value","503").html("造船、造车");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3);
    }
    else if(xmxfValue == 6){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 601)
            opt1 = $("<option>").attr("value","601").attr("selected",true).html("网络通讯计算机");
        else
            opt1 = $("<option>").attr("value","601").html("网络通讯计算机");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 7){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 701)
            opt1 = $("<option>").attr("value","701").attr("selected",true).html("房地产建筑");
        else
            opt1 = $("<option>").attr("value","701").html("房地产建筑");
        if(nb == 702)
            opt2 = $("<option>").attr("value","702").attr("selected",true).html("供热");
        else
            opt2 = $("<option>").attr("value","702").html("供热");
        if(nb == 704)
            opt4 = $("<option>").attr("value","704").attr("selected",true).html("排水");
        else
            opt4 = $("<option>").attr("value","704").html("排水");
        if(nb == 705)
            opt5 = $("<option>").attr("value","705").attr("selected",true).html("土地治理");
        else
            opt5 = $("<option>").attr("value","705").html("土地治理");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt4).append(opt5);
    }else if(xmxfValue == 8){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 801)
            opt1 = $("<option>").attr("value","801").attr("selected",true).html("水厂、供水");
        else
            opt1 = $("<option>").attr("value","801").html("水厂、供水");
        if(nb == 802)
            opt2 = $("<option>").attr("value","802").attr("selected",true).html("灌溉");
        else
            opt2 = $("<option>").attr("value","802").html("灌溉");
        if(nb == 803)
            opt3 = $("<option>").attr("value","803").attr("selected",true).html("围海造地");
        else
            opt3 = $("<option>").attr("value","803").html("围海造地");
        if(nb == 804)
            opt4 = $("<option>").attr("value","804").attr("selected",true).html("水库、引水");
        else
            opt4 = $("<option>").attr("value","804").html("水库、引水");
        if(nb == 805)
            opt5 = $("<option>").attr("value","805").attr("selected",true).html("防护堤、防洪堤");
        else
            opt5 = $("<option>").attr("value","805").html("防护堤、防洪堤");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt5).append(opt3).append(opt4);
    }else if(xmxfValue == 9){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 901)
            opt1 = $("<option>").attr("value","901").attr("selected",true).html("垃圾");
        else
            opt1 = $("<option>").attr("value","901").html("垃圾");
        if(nb == 902)
            opt2 = $("<option>").attr("value","902").attr("selected",true).html("水处理");
        else
            opt2 = $("<option>").attr("value","902").html("水处理");
        if(nb == 903)
            opt3 = $("<option>").attr("value","903").attr("selected",true).html("废弃物处理");
        else
            opt3 = $("<option>").attr("value","903").html("废弃物处理");
        if(nb == 904)
            opt4 = $("<option>").attr("value","904").attr("selected",true).html("脱硫脱硝、除尘除渣");
        else
            opt4 = $("<option>").attr("value","904").html("脱硫脱硝、除尘除渣");
        if(nb == 905)
            opt5 = $("<option>").attr("value","905").attr("selected",true).html("污泥治理");
        else
            opt5 = $("<option>").attr("value","905").html("污泥治理");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5);
    }else if(xmxfValue == 10){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 1001)
            opt1 = $("<option>").attr("value","1001").attr("selected",true).html("医院");
        else
            opt1 = $("<option>").attr("value","1001").html("医院");
        if(nb == 1002)
            opt2 = $("<option>").attr("value","1002").attr("selected",true).html("制药制剂");
        else
            opt2 = $("<option>").attr("value","1002").html("制药制剂");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2);
    }else if(xmxfValue == 11){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 1105)
            opt1 = $("<option>").attr("value","1105").attr("selected",true).html("科技文教旅游");
        else
            opt1 = $("<option>").attr("value","1105").html("科技文教旅游");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 12){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 1205)
            opt1 = $("<option>").attr("value","1205").attr("selected",true).html("出版印刷");
        else
            opt1 = $("<option>").attr("value","1205").html("出版印刷");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 13){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 1301)
            opt1 = $("<option>").attr("value","1301").attr("selected",true).html("纺织");
        else
            opt1 = $("<option>").attr("value","1301").html("纺织");
        if(nb == 1302)
            opt2 = $("<option>").attr("value","1302").attr("selected",true).html("食品生产");
        else
            opt2 = $("<option>").attr("value","1302").html("食品生产");
        if(nb == 1303)
            opt3 = $("<option>").attr("value","1303").attr("selected",true).html("肉类加工、屠宰");
        else
            opt3 = $("<option>").attr("value","1303").html("肉类加工、屠宰");
        if(nb == 1304)
            opt4 = $("<option>").attr("value","1304").attr("selected",true).html("造纸");
        else
            opt4 = $("<option>").attr("value","1304").html("造纸");
        if(nb == 1305)
            opt5 = $("<option>").attr("value","1305").attr("selected",true).html("粮食储备");
        else
            opt5 = $("<option>").attr("value","1305").html("粮食储备");
        if(nb == 1306)
            opt6 = $("<option>").attr("value","1306").attr("selected",true).html("卷烟物流");
        else
            opt6 = $("<option>").attr("value","1306").html("卷烟物流");
        if(nb == 1307)
            opt7 = $("<option>").attr("value","1307").attr("selected",true).html("其他");
        else
            opt7 = $("<option>").attr("value","1307").html("其他");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7);
    }else if(xmxfValue == 14){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 1405)
            opt1 = $("<option>").attr("value","1405").attr("selected",true).html("农林牧渔");
        else
            opt1 = $("<option>").attr("value","1405").html("农林牧渔");
        $("select[name='"+selectname2+"']").append(opt1);
    }else if(xmxfValue == 15){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 1505)
            opt1 = $("<option>").attr("value","1505").attr("selected",true).html("商业服务");
        else
            opt1 = $("<option>").attr("value","1505").html("商业服务");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 16){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        if(nb == 1605)
            opt1 = $("<option>").attr("value","1605").attr("selected",true).html("园林绿化");
        else
            opt1 = $("<option>").attr("value","1605").html("园林绿化");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }
}
//下拉列表框：项目信息，行业分类，numa，numb，改变
function numa_numb_change(selectname,selectname2){
    //numa_change(selectname);
    var xmxfValue = $("select[name='"+selectname+"']").val();
    //alert("1xmxfValue:"+xmxfValue);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10;
    if(xmxfValue == 0){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
        $("select[name='"+selectname2+"']").append(opt0);
    }
    else if(xmxfValue == 1){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","101").html("高速公路、道路");
            opt2 = $("<option>").attr("value","102").html("桥梁、立交桥");
            opt3 = $("<option>").attr("value","103").html("机场");
            opt4 = $("<option>").attr("value","104").html("铁路、轨道交通");
            opt5 = $("<option>").attr("value","105").html("航道、水利枢纽");
            opt6 = $("<option>").attr("value","106").html("港口、码头、泊位、渔港");
            opt7 = $("<option>").attr("value","107").html("客运站、交通枢纽");
            opt8 = $("<option>").attr("value","108").html("隧道");
            opt9 = $("<option>").attr("value","109").html("物流");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7).append(opt8).append(opt9);
    }
    else if(xmxfValue == 2){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","201").html("火电");
            opt2 = $("<option>").attr("value","202").html("核电");
            opt3 = $("<option>").attr("value","203").html("水电");
            opt4 = $("<option>").attr("value","204").html("风电");
            opt5 = $("<option>").attr("value","205").html("电网建设");
            opt6 = $("<option>").attr("value","206").html("太阳能、光伏发电");
            opt7 = $("<option>").attr("value","207").html("垃圾焚烧发电及其他新能源发电");
            opt8 = $("<option>").attr("value","208").html("水泥余热发电");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7).append(opt8);
    }
    else if(xmxfValue == 3){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","301").html("天然气、输气管道");
            opt2 = $("<option>").attr("value","302").html("石油、石化");
            opt3 = $("<option>").attr("value","303").html("有机化学");
            opt4 = $("<option>").attr("value","304").html("无机化学");
            opt5 = $("<option>").attr("value","305").html("煤化工");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5);
    }else if(xmxfValue == 4){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","401").html("选煤厂、煤矿、尾矿");
            opt2 = $("<option>").attr("value","402").html("矿山、矿产、矿石");
            opt3 = $("<option>").attr("value","403").html("水泥生产线、混凝土");
            opt4 = $("<option>").attr("value","404").html("金属冶炼");
            opt5 = $("<option>").attr("value","405").html("钢厂、钢结构");
            opt6 = $("<option>").attr("value","406").html("玻璃及其他");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6);
    }else if(xmxfValue == 5){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","501").html("机械产品、厂房、生产车间");
            opt2 = $("<option>").attr("value","502").html("医疗器械、电子产品、电器产品");
            opt3 = $("<option>").attr("value","503").html("造船、造车");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3);
    }
    else if(xmxfValue == 6){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","601").html("网络通讯计算机");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 7){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","701").html("房地产建筑");
            opt2 = $("<option>").attr("value","702").html("供热");
            opt4 = $("<option>").attr("value","704").html("排水");
            opt5 = $("<option>").attr("value","705").html("土地治理");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt4).append(opt5);
    }else if(xmxfValue == 8){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","801").html("水厂、供水");
            opt2 = $("<option>").attr("value","802").html("灌溉");
            opt3 = $("<option>").attr("value","803").html("围海造地");
            opt4 = $("<option>").attr("value","804").html("水库、引水");
            opt5 = $("<option>").attr("value","805").html("防护堤、防洪堤");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt5).append(opt3).append(opt4);
    }else if(xmxfValue == 9){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","901").html("垃圾");
            opt2 = $("<option>").attr("value","902").html("水处理");
            opt3 = $("<option>").attr("value","903").html("废弃物处理");
            opt4 = $("<option>").attr("value","904").html("脱硫脱硝、除尘除渣");
            opt5 = $("<option>").attr("value","905").html("污泥治理");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5);
    }else if(xmxfValue == 10){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","1001").html("医院");
            opt2 = $("<option>").attr("value","1002").html("制药制剂");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2);
    }else if(xmxfValue == 11){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","1105").html("科技文教旅游");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 12){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","1205").html("出版印刷");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 13){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","1301").html("纺织");
            opt2 = $("<option>").attr("value","1302").html("食品生产");
            opt3 = $("<option>").attr("value","1303").html("肉类加工、屠宰");
            opt4 = $("<option>").attr("value","1304").html("造纸");
            opt5 = $("<option>").attr("value","1305").html("粮食储备");
            opt6 = $("<option>").attr("value","1306").html("卷烟物流");
            opt7 = $("<option>").attr("value","1307").html("其他");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7);
    }else if(xmxfValue == 14){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","1405").html("农林牧渔");
        $("select[name='"+selectname2+"']").append(opt1);
    }else if(xmxfValue == 15){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","1505").html("商业服务");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }else if(xmxfValue == 16){
        $("select[name='"+selectname2+"']").empty();
        opt0 = $("<option>").attr("value","0").html("--二级行业--");
            opt1 = $("<option>").attr("value","1605").html("园林绿化");
        $("select[name='"+selectname2+"']").append(opt0).append(opt1);
    }
    var b_date = 'b_date';
    var bdateValue = $("select[name='"+b_date+"']").val();
    shijianduan_huixian_xmxx(bdateValue,b_date);
    //alert("2xmxfValue:"+xmxfValue);
}
//下拉列表框：项目信息，行业分类，numa，回显，这个方法由numa_numb_huixian(numa,numb)调用
function numa_huixian(numa,selectname){
    //alert("numa:"+numa);
    var opt0,opt1,opt2,opt3,opt4,opt5,opt6,opt7,opt8,opt9,opt10,opt11,opt12,opt13,opt14,opt15,opt16;
    $("select[name='"+selectname+"']").empty();
    var temp = numa;
    opt0 = $("<option>").attr("value","0").html("-一级行业-");
    if(temp == "1")
        opt1 = $("<option>").attr("value","1").attr("selected",true).html("交通运输");
    else
        opt1 = $("<option>").attr("value","1").html("交通运输");
    if(temp == "2")
        opt2 = $("<option>").attr("value","2").attr("selected",true).html("能源化工--电力");
    else
        opt2 = $("<option>").attr("value","2").html("能源化工--电力");
    if(temp == "3")
        opt3 = $("<option>").attr("value","3").attr("selected",true).html("能源化工--化工");
    else
        opt3 = $("<option>").attr("value","3").html("能源化工--化工");
    if(temp == "4")
        opt4 = $("<option>").attr("value","4").attr("selected",true).html("冶金矿产");
    else
        opt4 = $("<option>").attr("value","4").html("冶金矿产");
    if(temp == "5")
        opt5 = $("<option>").attr("value","5").attr("selected",true).html("机械电子");
    else
        opt5 = $("<option>").attr("value","5").html("机械电子");
    if(temp == "6")
        opt6 = $("<option>").attr("value","6").attr("selected",true).html("网络通讯计算机");
    else
        opt6 = $("<option>").attr("value","6").html("网络通讯计算机");
    if(temp == "7")
        opt7 = $("<option>").attr("value","7").attr("selected",true).html("市政房地产建筑");
    else
        opt7 = $("<option>").attr("value","7").html("市政房地产建筑");
    if(temp == "8")
        opt8 = $("<option>").attr("value","8").attr("selected",true).html("水利");
    else
        opt8 = $("<option>").attr("value","8").html("水利");
    if(temp == "9")
        opt9 = $("<option>").attr("value","9").attr("selected",true).html("环保");
    else
        opt9 = $("<option>").attr("value","9").html("环保");
    if(temp == "10")
        opt10 = $("<option>").attr("value","10").attr("selected",true).html("医疗卫生");
    else
        opt10 = $("<option>").attr("value","10").html("医疗卫生");
    if(temp == "11")
        opt11 = $("<option>").attr("value","11").attr("selected",true).html("科技文教旅游");
    else
        opt11 = $("<option>").attr("value","11").html("科技文教旅游");
    if(temp == "12")
        opt12 = $("<option>").attr("value","12").attr("selected",true).html("出版印刷");
    else
        opt12 = $("<option>").attr("value","12").html("出版印刷");
    if(temp == "13")
        opt13 = $("<option>").attr("value","13").attr("selected",true).html("轻工纺织食品");
    else
        opt13 = $("<option>").attr("value","13").html("轻工纺织食品");
    if(temp == "14")
        opt14 = $("<option>").attr("value","14").attr("selected",true).html("农林牧渔");
    else
        opt14 = $("<option>").attr("value","14").html("农林牧渔");
    if(temp == "15")
        opt15 = $("<option>").attr("value","15").attr("selected",true).html("商业服务");
    else
        opt15 = $("<option>").attr("value","15").html("商业服务");
    if(temp == "16")
        opt16 = $("<option>").attr("value","16").attr("selected",true).html("园林绿化");
    else
        opt16 = $("<option>").attr("value","16").html("园林绿化");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5).append(opt6).append(opt7).append(opt8).append(opt9).append(opt10).append(opt11).append(opt12).append(opt13).append(opt14).append(opt15).append(opt16);
}
//下拉列表框：项目信息，二级行业分类带动时间改变，numb，b_date，改变
function numb_b_date_change(numb,b_date){
    var bdateValue = $("select[name='"+b_date+"']").val();
    shijianduan_huixian_xmxx(bdateValue,b_date);
}

//下拉列表框：时间段，回显及初始化页面时调用，显示到近一年
function shijianduan_huixian(b_date,selectname){
    //alert("b_date:"+b_date);
    var numbValue = $("select[name='numb']").val();
    //alert("numbValue:"+numbValue);
    var opt0,opt1,opt2,opt3,opt4,opt5;
    $("select[name='"+selectname+"']").empty();
    var temp = b_date;
    opt0 = $("<option>").attr("value","week").html("近一周");
    if(temp == "day")
        opt1 = $("<option>").attr("value","day").attr("selected",true).html("近一天");
    else
        opt1 = $("<option>").attr("value","day").html("近一天");
    if(temp == "month")
        opt2 = $("<option>").attr("value","month").attr("selected",true).html("近一月");
    else
        opt2 = $("<option>").attr("value","month").html("近一月");
    if(temp == "quarter")
        opt3 = $("<option>").attr("value","quarter").attr("selected",true).html("近三月");
    else
        opt3 = $("<option>").attr("value","quarter").html("近三月");
    if(numbValue == undefined || numbValue == 0 )
    if(temp == "6month" )
        opt4 = $("<option>").attr("value","6month").attr("selected",true).html("近半年");
    else
        opt4 = $("<option>").attr("value","6month").html("近半年");
    if(numbValue == undefined || numbValue == 0 )
    if(temp == "year" )
        opt5 = $("<option>").attr("value","year").attr("selected",true).html("近一年");
    else
        opt5 = $("<option>").attr("value","year").html("近一年");
    $("select[name='"+selectname+"']").append(opt0).append(opt1).append(opt2).append(opt3).append(opt4).append(opt5);

}
//下拉列表框：时间段，回显及初始化页面时调用，显示到近一年
function shijianduan_huixian_xmxx(b_date,selectname){
    //alert("b_date:"+b_date);
    var numbValue = $("select[name='numb']").val();
    //alert("numbValue:"+numbValue);
    var opt0,opt2,opt3,opt4,opt5;
    $("select[name='"+selectname+"']").empty();
    var temp = b_date;
    opt0 = $("<option>").attr("value","month").html("近一月");
    if(temp == "month")
        opt2 = $("<option>").attr("value","month").attr("selected",true).html("近一月");
    else
        opt2 = $("<option>").attr("value","month").html("近一月");
    if(temp == "quarter")
        opt3 = $("<option>").attr("value","quarter").attr("selected",true).html("近三月");
    else
        opt3 = $("<option>").attr("value","quarter").html("近三月");
    //if(numbValue == undefined || numbValue == 0 )
    if(temp == "6month" )
        opt4 = $("<option>").attr("value","6month").attr("selected",true).html("近半年");
    else
        opt4 = $("<option>").attr("value","6month").html("近半年");
    //if(numbValue == undefined || numbValue == 0 )
    if(temp == "year" )
        opt5 = $("<option>").attr("value","year").attr("selected",true).html("近一年");
    else
        opt5 = $("<option>").attr("value","year").html("近一年");
    $("select[name='"+selectname+"']").append(opt0).append(opt2).append(opt3).append(opt4).append(opt5);

}
//