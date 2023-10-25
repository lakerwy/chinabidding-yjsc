var searchArray = {};
searchArray["CONTEXT"] = "-内容-";
searchArray["TITLE"] = "-标题-";
searchArray["FJ"] = "-附件-";
searchArray["BIDDINGNO"] = "招标编号";

var tableArray = {};
tableArray["1"] = "工程招标";
tableArray["2"] = "货物招标";
tableArray["3"] = "服务招标";
tableArray["4"] = "招标预告";
tableArray["5"] = "中标公示";
tableArray["6"] = "政府采购";
tableArray["7"] = "企业采购";

var areaArray = [];
areaArray[0] = "";
areaArray[1] = "北京";
areaArray[2] = "上海";
areaArray[3] = "天津";
areaArray[4] = "重庆";
areaArray[5] = "河北";
areaArray[6] = "山西";
areaArray[7] = "内蒙古";
areaArray[8] = "辽宁";
areaArray[9] = "吉林";
areaArray[10] = "黑龙江";
areaArray[11] = "江苏";
areaArray[12] = "浙江";
areaArray[13] = "安徽";
areaArray[14] = "福建";
areaArray[15] = "江西";
areaArray[16] = "山东";
areaArray[17] = "河南";
areaArray[18] = "湖北";
areaArray[19] = "湖南";
areaArray[20] = "广东";
areaArray[21] = "广西";
areaArray[22] = "海南";
areaArray[23] = "贵州";
areaArray[24] = "云南";
areaArray[25] = "西藏";
areaArray[26] = "陕西";
areaArray[27] = "四川";
areaArray[28] = "甘肃";
areaArray[29] = "青海";
areaArray[30] = "新疆";
areaArray[31] = "宁夏";
areaArray[32] = "香港";
areaArray[33] = "澳门";
areaArray[34] = "台湾";
areaArray[35] = "";
areaArray[36] = "跨省";
areaArray[37] = "";
areaArray[38] = "";
areaArray[39] = "";
areaArray[40] = "海外";
areaArray[43] = "亚洲";
areaArray[41] = "";
areaArray[42] = "";
areaArray[44] = "欧洲";
areaArray[45] = "非洲";
areaArray[46] = "北美洲";
areaArray[47] = "南美洲";
areaArray[48] = "大洋洲";
areaArray[49] = "中美洲";
areaArray[50] = "加勒比";

var categoryArray = [];
categoryArray[0] = "";
categoryArray[1] = "交通运输";
categoryArray[2] = "网络通讯计算机";
categoryArray[3] = "市政房地产建筑";
categoryArray[4] = "水利桥梁";
categoryArray[5] = "机械电子电器";
categoryArray[6] = "环保";
categoryArray[7] = "能源化工";
categoryArray[8] = "医疗卫生";
categoryArray[9] = "科技文教旅游";
categoryArray[10] = "冶金矿产原材料";
categoryArray[11] = "出版印刷";
categoryArray[12] = "轻工纺织食品";
categoryArray[13] = "农林牧渔";
categoryArray[14] = "商业服务";
categoryArray[15] = "其它";
categoryArray[16] = "园林绿化";
categoryArray[17] = "能源";
categoryArray[18] = "化工";

var dateArray = {};
dateArray["day"] = "近一天";
dateArray["week"] = "近一周";
dateArray["two"] = "近二周";
dateArray["month"] = "近一月";
dateArray["quarter"] = "近三月";
dateArray["year"] = "近一年";

var collectflag = true;  //收藏的节流flag

$(document).ready(function () {
    //    $("#dialog-search").hide();
    //    $("#dialog-table").hide();
    //    $("#dialog-area").hide();
    //    $("#dialog-category").hide();
    //    $("#dialog-date").hide();
    //    $("#hui").hide();

    //    search_type_hx("${search_type}");
    // keywords_hx("${keywords}");
    //    table_type_hx("${table_type}");
    //    areaid_hx("${areaid}");
    //    categoryid_hx("${categoryid}");
    //    b_date_hx("${b_date}");
    //在线客服 位置
    function erweima() {
        $("#toolbar").css("left", $("#g_zheng").offset().left + $("#g_zheng").width());
    }
    erweima();
    $(window).resize(function () {
        erweima();
    });

});

$('input:radio[name="b_date"]').change(function () {
    // <!--var b_date = $('input:radio[name="b_date"]:checked').val();-->
    b_date = $('input:radio[name="b_date"]:checked').val();
    // popupInit.getSearchList();
    // <!--jQuery.ajax({-->
    // <!--    async: false,-->
    // <!--    type: "post",-->
    // <!--    data: {-->
    // <!--        "b_date": b_date-->
    // <!--    },-->
    // <!--    url: "/search/Searchgj/checkBdate",-->
    // <!--    success: function (result) {-->
    // <!--        var flag = result.type;-->
    // <!--        if (flag == "nologin") {-->
    // <!--            // var jumpUrl = $("#jumpUrl").val();-->
    // <!--            // xsdl(jumpUrl);-->
    // <!--            setRegFlag(true);-->
    // <!--            $("#month").prop("checked", true);-->
    // <!--        } else if (flag == "free") {-->
    // <!--            showInformation("如需查看更多，请联系电话" + result.phone);-->
    // <!--            $("#month").prop("checked", true);-->
    // <!--        }-->
    // <!--    }-->
    // <!--})-->
})

function showInformation(text) {
    var hint_div = "<div id=\"renew_pop\"><div id=\"msg\"><div id=\"msg_top\">提示</div><div id=\"msg_cont\">" + text + "</div><div id=\"msg_close\" onclick='closeInformation()'>确定</div></div>\n</div>";
    $("body").append(hint_div)
    $('body').css('overflow', 'hidden');
}

function closeInformation() {
    $('body').css('overflow', 'auto');
    $("#renew_pop").remove()
}

function title_bh(keywords) {
    var bh = document.getElementsByName("titlebh");
    if (keywords.indexOf(" ") >= 0) {
        var n = keywords.split(" ");
        for (j = 0; j < n.length; j++) {
            for (i = 0; i < bh.length; i++) {
                var yuan = bh[i].innerHTML;
                var xin = yuan.replace(n[j], "<span style = 'color:red' >" + n[j] + "</span>");
                bh[i].innerHTML = xin;
            }
        }
    } else {
        for (i = 0; i < bh.length; i++) {
            var yuan = bh[i].innerHTML;
            var xin = yuan.replace(keywords, "<span style = 'color:red' >" + keywords + "</span>");
            bh[i].innerHTML = xin;
        }
    }
}
function kai() {
    var w = $(window).width();
    var h = $(window).height();
    $("#hui").css({ "width": w, "height": h }); //灰屏高度不够
    $("#hui").show();
}
function guan() {
    $("#hui").css("display", "none");
}

function search_type_hx(search_type) {
    $("#search_x").text(searchArray[search_type]);
    $("#search_type").val(search_type);
}
var search_b = false;
function search_click(search_z) {
    if (search_z == 0) {
        search_z = $("#search_type").val();
    }

    if (search_b) {
        $("#dialog-search").hide();
        $("#search_x").removeClass();
        $("#search_x").addClass("neir fl");
        search_b = false;
    } else {
        $("#dialog-search").show();
        $("#search_x").removeClass();
        $("#search_x").addClass("neir_x fl");
        search_b = true;
    }
    $("#search_x").text(searchArray[search_z]);
    $("#search_type").val(search_z);
}

function keywords_hx(key) {
    console.log(key);
    if (key == "") {
        $("#text").hide();
        $("#text_x").show();
        $("#text_x").val("输入您想查找的关键词 多个词可以输入空格隔开！");
    } else {
        $("#text_x").hide();
        $("#text").show();
        $("#text").val(key);
    }
}
function changeBegin() {
    $("#text_x").hide();
    $("#text").show();
    $("#text").focus();
}

function table_type_hx(table_type) {
    var nnn = $("[name='table']");
    var nn = nnn.length;
    var nu = [];
    nu = table_type.split(",");
    var n = nu.length;
    var str = "";
    var str1 = "";
    var num = 0;
    if (n == 1) {
        $("#table_x").text("请选择：栏目");
        $("#table_x").attr('title', "");
        $("#table_type").val("");
        $("[name='table']").removeAttr("checked");
        $("#table_x").removeClass();
        $("#table_x").addClass("quanxuan fl");
    } else {
        for (i = 0; i < n - 1; i++) {
            str1 += tableArray[nu[i]] + " ";
            num += 1;
            $("[name='table']").each(function () {
                if ($(this).val() == nu[i]) {
                    $(this).attr("checked", 'true');
                }
            });
        }
        //                    $("#table_x").text("已选择："+tableArray[nu[0]] + " ...");
        $("#table_x").text("栏目已选：" + num + "项");
        $("#table_x").attr('title', str1);
        $("#table_type").val(table_type);
        $("#table_x").removeClass();
        $("#table_x").addClass("quanxuan_end fl");
    }
}

var type_b = false;
function type_x() {
    if (type_b) {
        $("#dialog-table").hide();
        type_b = false;
        guan();
    } else {
        $("#dialog-table").show();
        type_b = true;
        kai();
    }
}

function qd_table() {
    var n = $("[name='table']:checked").length;
    var str = "";
    var str1 = "";
    var num = 0;
    if (n == 7) {
        $("#table_x").text("栏目：全选");
        $("#table_x").attr('title', "");
        $("#table_type").val("");
        $("#table_x").removeClass();
        $("#table_x").addClass("quanxuan_end fl");
    } else if (n == 0) {
        $("#table_x").text("请选择：栏目");
        $("#table_x").attr('title', "");
        $("#table_type").val("");
        $("#table_x").removeClass();
        $("#table_x").addClass("quanxuan fl");
    } else {
        $("[name='table']:checked").each(function () {
            str1 += tableArray[$(this).val()] + " ";
            str += $(this).val() + ",";
            num += 1;
        });
        //                    var nu = new Array();
        //                    nu = str1.split(" ");
        $("#table_x").text("栏目已选：" + num + "项");
        $("#table_x").attr('title', str1);
        $("#table_type").val(str);
        $("#table_x").removeClass();
        $("#table_x").addClass("quanxuan_end fl");
    }
    $("#dialog-table").hide();
    type_b = false;
    guan();
}

function qx_table() {
    $("#dialog-table").hide();
    type_b = false;
    guan();
}
function quan_table() {
    $("[name='table']").attr("checked", 'true');
}
function fan_table() {
    $("[name='table']").each(function () {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked", 'true');
        }
    });
}

function areaid_hx(area) {
    var nnn = $("[name='area']");
    var nn = nnn.length;
    var nu = [];
    nu = area.split(",");
    var n = nu.length;
    var str = "";
    var str1 = "";
    var num = 0;
    if (n == 1) {
        $("#area_x").text("请选择：地区");
        $("#area_x").attr('title', "");
        $("#areaid").val("");
        $("[name='area']").removeAttr("checked");
        $("#area_x").removeClass();
        $("#area_x").addClass("quanxuan fl");
    } else {
        for (i = 0; i < n - 1; i++) {
            str1 += areaArray[nu[i]] + "+";
            num += 1;
            $("[name='area']").each(function () {
                if ($(this).val() == nu[i]) {
                    $(this).attr("checked", 'true');
                }
            });
        }
        $("#areaid").val(area);
        $("#area_x").attr('title', str1);
        $("#area_x").text("地区已选：" + num + "项");
        $("#area_x").removeClass();
        $("#area_x").addClass("quanxuan_end fl");
    }
}
var area_b = false;
function area_click() {
    if (area_b) {
        $("#dialog-area").hide();
        area_b = false;
        guan();
    } else {
        $("#dialog-area").show();
        area_b = true;
        kai();
    }
}
function qd_area() {
    var n = $("[name='area']:checked").length;
    var str = "";
    var str1 = "";
    var num = 0;
    if (n == 36) {
        $("#area_x").text("地区：全选");
        $("#area_x").attr('title', "");
        $("#areaid").val("");
        $("#area_x").removeClass();
        $("#area_x").addClass("quanxuan_end fl");
    } else if (n == 0) {
        $("#area_x").text("请选择：地区");
        $("#area_x").attr('title', "");
        $("#areaid").val("");
        $("#area_x").removeClass();
        $("#area_x").addClass("quanxuan fl");
    } else {
        $("[name='area']:checked").each(function () {
            if (areaArray[$(this).val()] == null) {
            } else {
                str1 += areaArray[$(this).val()] + " ";
                str += $(this).val() + ",";
                num += 1;
            }
        })
        $("#areaid").val(str);
        $("#area_x").attr('title', str1);
        //                    var nu = new Array();
        //                    nu = str1.split(" ");
        $("#area_x").text("地区已选：" + num + "项");
        $("#area_x").removeClass();
        $("#area_x").addClass("quanxuan_end fl");
    }
    $("#dialog-area").hide();
    area_b = false;
    guan();
}
function qx_area() {
    $("#dialog-area").hide();
    area_b = false;
    guan();
}
function quan_area() {
    $("[name='area']").attr("checked", 'true');
}
function fan_area() {
    $("[name='area']").each(function () {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked", 'true');
        }
    });
}
function area_l1() {
    if ($("#l1 :checkbox").length == $("#l1 :checkbox:checked").length) {
        $("#l1 :checkbox").removeAttr("checked");
    } else {
        $("#l1 :checkbox").attr("checked", 'true');
    }
}
function area_l2() {
    if ($("#l2 :checkbox").length == $("#l2 :checkbox:checked").length) {
        $("#l2 :checkbox").removeAttr("checked");
    } else {
        $("#l2 :checkbox").attr("checked", 'true');
    }
}
function area_l3() {
    if ($("#l3 :checkbox").length == $("#l3 :checkbox:checked").length) {
        $("#l3 :checkbox").removeAttr("checked");
    } else {
        $("#l1 :checkbox").attr("checked", 'true');
    }
}
function area_l3() {
    if ($("#l3 :checkbox").length == $("#l3 :checkbox:checked").length) {
        $("#l3 :checkbox").removeAttr("checked");
    } else {
        $("#l3 :checkbox").attr("checked", 'true');
    }
}
function area_l4() {
    if ($("#l4 :checkbox").length == $("#l4 :checkbox:checked").length) {
        $("#l4 :checkbox").removeAttr("checked");
    } else {
        $("#l4 :checkbox").attr("checked", 'true');
    }
}
function area_l5() {
    if ($("#l5 :checkbox").length == $("#l5 :checkbox:checked").length) {
        $("#l5 :checkbox").removeAttr("checked");
    } else {
        $("#l5 :checkbox").attr("checked", 'true');
    }
}
function area_l6() {
    if ($("#l6 :checkbox").length == $("#l6 :checkbox:checked").length) {
        $("#l6 :checkbox").removeAttr("checked");
    } else {
        $("#l6 :checkbox").attr("checked", 'true');
    }
}
function area_l7() {
    if ($("#l7 :checkbox").length == $("#l7 :checkbox:checked").length) {
        $("#l7 :checkbox").removeAttr("checked");
    } else {
        $("#l7 :checkbox").attr("checked", 'true');
    }
}
function area_l8() {
    if ($("#l8 :checkbox").length == $("#l8 :checkbox:checked").length) {
        $("#l8 :checkbox").removeAttr("checked");
    } else {
        $("#l8 :checkbox").attr("checked", 'true');
    }
}
function categoryid_hx(categoryid) {
    if (categoryid.lastIndexOf(",") == categoryid.length - 1) {
        categoryid = categoryid.substring(0, categoryid.length - 1);
    }
    var nu = [];
    nu = categoryid.split(",");
    var n = nu.length;
    var str1 = "";
    var num = 0;
    if (n == 1 && nu[0] == "") {
        $("#category_x").text("请选择：行业");
        $("#category_x").attr('title', "");
        $("#categoryid").val("");
        $("[name='category']").removeAttr("checked");
        $("#category_x").removeClass();
        $("#category_x").addClass("quanxuan fl");
    } else {
        for (i = 0; i < n; i++) {
            str1 += categoryArray[nu[i]] + " ";
            num += 1;
            $("[name='category']").each(function () {
                if ($(this).val() == nu[i]) {
                    $(this).attr("checked", 'true');
                }
            });
        }
        $("#categoryid").val(categoryid);
        $("#category_x").attr('title', str1);
        $("#category_x").text("行业已选：" + num + "项");
        $("#category_x").removeClass();
        $("#category_x").addClass("quanxuan_end fl");
    }
}

var category_b = false;
function category_click() {
    if (category_b) {
        $("#dialog-category").hide();
        category_b = false;
        guan();
    } else {
        $("#dialog-category").show();
        category_b = true;
        kai();
    }
}
function qd_category() {
    var n = $("[name='category']:checked").length;
    var str = "";
    var str1 = "";
    var num = 0;
    if (n == 17) {
        $("#category_x").text("行业：全选");
        $("#category_x").attr('title', "");
        $("#categoryid").val("");
        $("#category_x").removeClass();
        $("#category_x").addClass("quanxuan_end fl");
    } else if (n == 0) {
        $("#category_x").text("请选择：行业");
        $("#category_x").attr('title', "");
        $("#categoryid").val("");
        $("#category_x").removeClass();
        $("#category_x").addClass("quanxuan fl");
    } else {
        $("[name='category']:checked").each(function () {
            str1 += categoryArray[$(this).val()] + " ";
            str += $(this).val() + ",";
            num += 1;
        });
        $("#categoryid").val(str);
        $("#category_x").attr('title', str1);
        //                    var nu = new Array();
        //                    nu = str1.split(" ");
        $("#category_x").text("行业已选：" + num + "项");
        $("#category_x").removeClass();
        $("#category_x").addClass("quanxuan_end fl");
    }
    $("#dialog-category").hide();
    category_b = false;
    guan();
}
function qx_category() {
    $("#dialog-category").hide();
    category_b = false;
    guan();
}
function quan_category() {
    $("[name='category']").attr("checked", 'true');
}
function fan_category() {
    $("[name='category']").each(function () {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked", 'true');
        }
    })
}

function b_date_hx(b_date) {
    $("#date_x").text(dateArray[b_date]);
    $("#b_date").val(b_date);
}
var date_b = false;
function date_click(date_z) {

    if (date_z == 0) {
        date_z = $("#b_date").val();
    }

    if (date_b) {
        $("#dialog-date").hide();
        $("#date_x").removeClass();
        $("#date_x").addClass("neir fl");
        date_b = false;
    } else {
        $("#dialog-date").show();
        $("#date_x").removeClass();
        $("#date_x").addClass("neir_x fl");
        date_b = true;
    }
    $("#date_x").text(dateArray[date_z]);
    $("#b_date").val(date_z);
}
$(function () {
    console.log($("#s_type").val());
    if ($("#s_type").val() == "0") {
        var table_type = $("#table_type").val();
        var keywords = $("#text").val();
        var search_type = $("#search_type").val();
        var areaid = $("#areaid").val();
        var categoryid = $("#categoryid").val();
        var b_date = $("#b_date").val();

        table_type_hx(table_type);
        keywords_hx(keywords);
        search_type_hx(search_type);
        areaid_hx(areaid);
        categoryid_hx(categoryid);
        b_date_hx(b_date);
    }


    $("body").bind({
        mousedown: function (e) {
            var targ;
            if (!e) {
                var e = window.event;
            }
            if (e.target) {
                targ = e.target;
            } else if (e.srcElement) {
                targ = e.srcElement;
            }
            if (targ.nodeType == 3) {
            }
            var tname;
            tname = targ.tagName;
            if (targ.id != "search_x" && targ.id != "date_x") {
                if (tname != "A") {
                    $("#dialog-date").hide();
                    $("#date_x").removeClass();
                    $("#date_x").addClass("neir fl");
                    date_b = false;
                    $("#dialog-search").hide();
                    $("#search_x").removeClass();
                    $("#search_x").addClass("neir fl");
                    search_b = false;
                }
            }
        }
    });
    $("#text").bind({
        blur: function () {
            var key = $("#text").val();
            if (key == "") {
                $("#text_x").show();
                $("#text").hide();
                $("#text_x").val("输入您想查找的关键词 多个词可以输入空格隔开！");
            }
        }
    });
    //支持回车键
    $("#searchgjForm").keyup(function (event) {
        if (event.keyCode == 13) {
            submitForm();
        }
    });


    var da = new Date();
    $.post('/cblcn/Home/logincheck', 't:' + da.getTime(), function (date) {
        if (date == null || date == "" || date.login_id == "") {
            $("#searchC").hide();
            var nowPage = $("#nowPage").val();
            var jumpUrl = $("#jumpUrl").val();
            if (nowPage > 3) {
                $("#isDrec").val("false");
                // xsdl(jumpUrl);
                setRegFlag(true, jumpUrl);
            }
        } else {
            var metaName = date.metaName;
            var metaPhone = date.metaPhone;
            if (metaName == "" || metaName == null) { //名字
                metaName = "专属客服";
            }
            if (metaPhone == "" || metaPhone == null) { //电话
                metaPhone = "400-006-6655";
            }
            $("#warn_notice").text("提醒：如需同步主账户保存的搜索条件，请联系专属客服：" + metaName + " " + metaPhone);
            if (sessionStorage.getItem('infoId')) {
                jumpAndCollect(sessionStorage.getItem('infoId'));
            }
            loadCondition();
            sczt();
        }
    });


    //收藏滑动过后变颜色
    $(".x_sc").hover(function () {
            $(this).find("img").attr("src", "../search/searchadvzbxx/test/images/souc_hua_h.jpg");
            $(this).find("span").css("color", "#ce5a0d");
        },
        function () {
            $(this).find("img").attr("src", "../search/searchadvzbxx/test/images/souc_11.jpg");
            $(this).find("span").css("color", "#000");
        });

    //为提示按钮适应位置
    //    alert(" w1= " + screen.width);
    //    alert(" document-w = " + $(document).width());
    //    alert(" window-w= " + $(window).width());
    var offleft = $("#g_zheng").offset().left;
    $("#ts1").css("left", offleft + 575);
    $("#ts2").css("left", offleft + 785);
    //       checkCache();
    window.onresize = function () {
        //alert( $(document).width() );
    };


    //提示输入中文
    var text = $("#text").val();
    var ret = /.*[a-z0-9A-Z~!@#$%^&*()_+|<>,.?/:;'\[\]{}\"【】（）]+.*/;
    if (ret.test(text)) {
        showHint();
        // alert("您搜索的关键词包含“数字、字母或字符”，搜索结果可能有偏差！\r\n" +
        //     "如果信息没有搜索到，请换成“文字”关键词再次搜索。\r\n" +
        //     "如需帮助，请拨打：400-006-6655");
    }
});

//提交form表单
function submitForm() {
    //    if(document.getElementById("text_x")){
    //        var str = document.getElementById("text_x").value;
    //        if(str!=""){
    //            $("#text_x").attr("disabled","true");
    //        }
    //    }
    var val = $('#searchgjForm input[name="b_date"]:checked ').val();
    if (val == "custom") {
        var mydate = new Date();
        var currentYear = mydate.getFullYear() - 1;
        var currentMonth = mydate.getMonth() + 1;
        var currentDate = mydate.getDate();
        var current = currentYear + "-" + currentMonth + "-" + p(currentDate);
        // console.log(current);
        var oneyearBefore = new Date(current);
        var start = $("#q_time_start").val();
        var end = $("#q_time_end").val();
        var startDate = new Date(start);
        var endDate = new Date(end);
        if (startDate && startDate.getTime() < oneyearBefore.getTime()) {
            alert("查询时间不能早于一年前！");
            return;
        }
        if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
            alert("请填写正确的起始时间！");
            return;
        }
    }
    //添加到搜索历史
    document.querySelector("#text").value = $("#text").val().replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " ");
    var key = document.getElementById("text").value;
    console.log(key,"key");
    if (key != "" || " ") {
        addHistoryWord(key, "searchgj");
    }
    // document.getElementById("searchgjForm").submit();
    popupInit.getSearchList();
}
//将个数位日期转为07
function p(s) {
    return s < 10 ? '0' + s : s;
}

//获取一个月日期
function getcurrent() {
    //将一个月的日期填入搜索框
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth() + 1;
    var currentDate = new Date().getDate();
    var current = currentYear + "-" + currentMonth + "-" + p(currentDate);
    return current;
}

//保存搜索条件
function saveCondition() {
    //    setTip1();
    var da = new Date();
    $.post('/cblcn/Home/logincheck', 't:' + da.getTime(), function (date) {
        if (date == null || date == "" || date.login_id == "") {
            // xsdl();
            setRegFlag(true);

        } else {
            $("#savec_btn").attr("disabled", 'true');
            jQuery.ajax({
                async: false,
                type: "post",
                data: {
                    "s_type": $("#s_type").val()
                },
                url: "/search/searchgj/searchConNum",
                success: function (msg) {
                    if (date.cust_right_group == "0") {
                        if (msg >= 3) {
                            alert("免费会员最多保存3个搜索条件");
                            $("#savec_btn").removeAttr("disabled");
                        } else {
                            realSave();
                        }
                    }
                    if (date.cust_right_group == "1" || date.cust_right_group == "2" || date.cust_right_group == "3" || date.cust_right_group == "21") {
                        if (msg >= 10) {
                            alert("最多保存10个搜索条件");
                            $("#savec_btn").removeAttr("disabled");
                        } else {
                            realSave();
                        }
                    }
                }
            });
        }
    });
}

function realSave() {
    var s_type = $("#s_type").val();
    var logid = $("#logid").val();
    var table_type = $("#table_type").val();
    if (table_type == "") {
        table_type = "0";
    }
    var text = $("#text").val();
    var search_type = $("#search_type").val();
    var areaid = $("#areaid").val();
    if (areaid == "") {
        areaid = "0";
    }
    var categoryid = $("#categoryid").val();
    if (categoryid == "") {
        categoryid = "0";
    }
    var b_date = $('#searchgjForm input[name="b_date"]:checked ').val();
    if (b_date == "") {
        b_date = "week";
    }
    if (b_date == "custom") {
        b_date = b_date + "," + $("#q_time_start").val() + "," + $("#q_time_end").val();
    }

    if (s_type == "0") {
        //        if(table_type + text + areaid + categoryid ==""){
        //            //alert("请至少选择两个条件！");
        //            $("#savec_btn").removeAttr("disabled");
        //        }else{
        var conditionText = getConditionText();
        //先判断是否已经保存过
        jQuery.ajax({
            type: "post",
            data: {
                "s_type": $("#s_type").val(),
                "conditionText": conditionText
            },
            url: "/search/searchgj/hasCondition",
            success: function (msg) {
                if (msg == "true") {
                    alert("你已经保存过该条件");
                    flag = true;
                    $("#savec_btn").removeAttr("disabled");
                } else {

                    jQuery.ajax({
                        type: "post",
                        data: {
                            "table_type": table_type,
                            "keywords": text,
                            "search_type": search_type,
                            "areaid": areaid,
                            "categoryid": categoryid,
                            "b_date": b_date,
                            "conditionText": conditionText,
                            "s_type": 0,
                            "logid": logid
                        },
                        url: "/search/searchgj/saveCondition",
                        success: function (msj) {
                            if (msj != "error") {
                                $("#savec_btn").removeAttr("disabled");
                                setTimeout(loadCondition(), 1500);
                            }
                        }
                    });
                }
            }
        });
    }
}

function getConditionText() {
    var s_type = $("#s_type").val();
    var conditionText = "";
    if (s_type == "0") {
        if ($("#text").val() != "") {
            conditionText = conditionText + $("#text").val() + "+ ";
        }
        if ($("#table_x").attr("title") != "") {
            conditionText = conditionText + $("#table_x").attr("title") + "+ ";
        } else {
            conditionText = conditionText + "全部栏目+ ";
        }
        if ($("#search_x").text() != "") {
            conditionText = conditionText + $("#search_x").text().replace(/-/g, "") + "+ ";
        }
        if ($("#area_x").attr("title") != "") {
            conditionText = conditionText + $("#area_x").attr("title") + "+ ";
        } else {
            conditionText = conditionText + "全部地区+ ";
        }
        if ($("#category_x").attr("title") != "") {
            conditionText = conditionText + $("#category_x").attr("title") + "+ ";
        } else {
            conditionText = conditionText + "全部行业+ ";
        }
        conditionText = conditionText.replace("++", "+");
        var v = $('#searchgjForm input[name="b_date"]:checked ').val();
        var b_date = $('#searchgjForm input[name="b_date"]:checked ').parent().text();
        if (b_date == "") {
            b_date = "近一周";
        }
        if (v == "custom") {
            b_date = $("#q_time_start").val() + "--" + $("#q_time_end").val();
        }
        conditionText = conditionText + b_date;
        return conditionText;
    }
}


//登陆成功跳转后收藏公告
function jumpAndCollect(infoId) {
    if (infoId != 0) {
        jQuery.ajax({
            async: false,
            type: "post",
            data: {
                "info_ids": infoId
            },
            url: "/cblcn/busiroom/collectInfo",
            dataType: "text",
            success: function (msg) {
                if (msg != 'true') {
                    // alert("您已收藏过该信息!");
                }
            }
        });
    }
}

//加载已经保存的条件
function loadCondition() {
    jQuery.ajax({
        async: false,
        type: "post",
        data: {
            "s_type": $("#s_type").val(),
            "t": new Date().getTime()
        },
        url: "/search/searchgj/searchCondition",
        dataType: "json",
        success: function (msg) {
            if (msg == "empty") {
                $("#searchC").empty();
                $("#searchC").hide();
            } else {
                $("#searchC").empty();
                var html = "";
                for (var x in msg) {
                    var short = msg[x].shortText;
                    if (short) html += "<span class='param-selected' onmouseover='setImg(this);' onmouseout='setImg2(this);'><a  href='javascript:goSearch(" + msg[x].conditionSearch + ");' title='" + msg[x].conditionText + "'>" + short + " </a><span class='close-icon'><img title='删除' onclick='closeT(" + msg[x].idstr + ",this);' src='https://cdn.chinabidding.cn/public/search/searchadvzbxx/test/images/x_03.jpg' style='cursor:pointer;'/></span></span>";

                }
                $("#searchC").append(html);
            }
        }
    });
}

function goSearch(condition_search) {
    var lans = condition_search.split("#");
    if (lans[0] == "0") {
        $("#text_x").show();
        $("#text").val("");
    } else {
        $("#text_x").hide();
        $("#text").val(lans[0]);
    }
    if (lans[1] == "0") {
        $("#table_type").val("");
    } else {
        $("#table_type").val(lans[1]);
    }
    if (lans[2] == "0") {
        $("#search_type").val("");
    } else {
        $("#search_type").val(lans[2]);
    }

    if (lans[3] == "0") {
        $("#areaid").val("");
    } else {
        $("#areaid").val(lans[3]);
    }

    if (lans[4] == "0") {
        $("#categoryid").val("");
    } else {
        $("#categoryid").val(lans[4]);
    }
    var b_date = lans[5];
    var date = b_date.split(",");
    $('input[type=radio][name=b_date][value=' + date[0] + ']').prop("checked", true);
    if (date[0] == "custom") {
        var time_start = date[1];
        var time_end = date[2];
        $("#q_time_start").val(time_start);
        $("#q_time_end").val(time_end);
    }
    document.querySelector("#text").value = $("#text").val().replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " ");
    document.getElementById("searchgjForm").submit();
}

function closeT(id, obj) {
    if (window.confirm("删除后条件将无法找回，您可以重新设置保存")) {
        jQuery.ajax({
            type: "post",
            data: {
                "id": id
            },
            url: "/search/searchgj/delCon",
            success: function (msg) {
                if (msg == "true") {
                    $(obj).parent().parent().remove();
                    setTimeout(loadCondition(), 2000);
                    //loadCondition();
                }
            }
        });
    }
}

function sczt() {
    var objs = $(".x_job");
    var info_ids = [];
    if (objs.length > 0) {
        for (var i = 0; i < objs.length; i++) {
            var id = $(objs[i]).val();
            info_ids.push(id);
        }
        jQuery.ajax({
            async: false,
            type: "post",
            data: {
                "info_ids": info_ids
            },
            url: "/cblcn/busiroom/hasSC3",
            success: function (msg) {
                if (msg) {
                    var strs = msg.split("#");
                    for (var x in strs) {
                        $("#sc" + strs[x]).parent().find("td[id='sc_yes']").show();
                        $("#sc" + strs[x]).parent().find("td[id='sc_no']").hide();
                    }
                }
            }
        });
    }
}


//收藏信息
function scInfo(info_id, obj) {
    //判断是否登录
    jQuery.ajax({
        async: false,
        type: "post",
        url: "/cblcn/Home/logincheck",
        success: function (msg) {
            if (msg == null || msg == "" || msg.login_id == "") {
                // var jumpUrl = $("#jumpUrl").val();
                // xsdl(jumpUrl,info_id);
                sessionStorage.setItem('infoId', info_id);
                setRegFlag(true);
            } else {
                $(obj).attr("disabled", "true");
                jQuery.ajax({
                    async: false,
                    type: "post",
                    data: {
                        "info_ids": info_id
                    },
                    url: "/cblcn/busiroom/collectInfo",
                    dataType: "text",
                    success: function (msg) {
                        if (msg == 'true') {
                            $(obj).parent().hide();
                            $(obj).parent().next().show();
                        } else {
                            alert("您已收藏过该信息!");
                            $(obj).parent().hide();
                            $(obj).parent().next().show();
                        }
                        $(obj).removeAttr("disabled");
                    }
                });
            }
        }
    });
}

//取消收藏
function qxSCInfo(info_id, obj) {
    $(obj).attr("disabled", "true");
    jQuery.ajax({
        type: "post",
        data: {
            "info_ids": info_id
        },
        url: "/cblcn/busiroom/qxSCInfo",
        dataType: "text",
        success: function (msg) {
            $(obj).parent().hide();
            $(obj).parent().prev().show();
            $(obj).removeAttr("disabled");
        }
    });
}

function setImg(obj) {
    $(obj).find("img").attr("src", "../search/searchadvzbxx/test/images/x1_07.jpg");
}
function setImg2(obj) {
    $(obj).find("img").attr("src", "../search/searchadvzbxx/test/images/x_03.jpg");
}

//提示
function setTip1() {
    //根据用户是否第一次来到这个页面来判断是否显示引导
    //判断依据：用户来过了会留下cookie，根据cookie判断
    var key1 = "GJ65SDEFU1203TCHK1";
    var cookieVal1 = $.cookie(key1);
    if (!cookieVal1) {
        //document.cookie = key + "=" + escape($("#loginId").val()) + "; expires=-1" +";path=/";
        $.cookie(key1, "sunshine", { expires: 5 * 365, path: '/', secure: false });
        $("#ts1").hide();
    }
}

function setTip2() {
    var key2 = "GJ65SDEFU1203TCHK2";
    var cookieVal2 = $.cookie(key2);
    if (!cookieVal2) {
        //document.cookie = key + "=" + escape($("#loginId").val()) + "; expires=-1" +";path=/";
        $.cookie(key2, "luckyman", { expires: 5 * 365, path: '/', secure: false });
        $("#ts2").hide();
    }
}

function checkCache() {
    //根据用户是否第一次来到这个页面来判断是否显示引导
    //判断依据：用户来过了会留下cookie，根据cookie判断
    var key1 = "GJ65SDEFU1203TCHK1";
    var cookieVal1 = $.cookie(key1);
    if (!cookieVal1) {
        $("#ts1").show();
    }
    var key2 = "GJ65SDEFU1203TCHK2";
    var cookieVal2 = $.cookie(key2);
    if (!cookieVal2) {
        $("#ts2").show();
    }
}
$(document).ready(function () {
    $('input[type=radio][name=b_date]').change(function () {
        if (this.value == 'custom') {
            $("#q_time_span").show();
        } else {
            $("#q_time_span").hide();
        }
    });

    //获取搜索词 添加到历史搜索中
    var url = location.href;
    if (url.indexOf("keywords") !== -1) {
        var value = document.getElementById("text").value;
        console.log(value,"222222222222222222");
        if (value != "" || " ") {
            addHistoryWord(value.replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " "), "searchgj");
        }

    }
});

function showHint() {
    var cookie = getCookie("alwaysClosePromptHint");
    var cookie2 = getCookie("closeHint");
    if (!cookie && !cookie2) {
        var height = "280px";
        text = "" +
            "<p>您搜索的关键词包含“数字、字母或字符”，搜索结果可能有偏差！</p>" +
            "<p>如果信息没有搜索到，请换成“文字”关键词再次搜索。</p>" +
            "<p>如需帮助，请拨打：400-006-6655</p>" +
            "";
        var Width = $("body").width();
        var left = (Width - 455) / 2;
        var top = (250 * left) / 725.5;
        hint_div = "<div id='pop-new'  class=\"pop-box\">" + "<div class='khtc' style='height: " + height + ";left:" + left + "px;top:" + top + "px;z-index: 9999' id='release_hint'>" + "<h3 class='kh_biao'><img src='https://cdn.chinabidding.cn/public/cblcn/index3/images/kh_tb_03.jpg'/>温馨提示</h3>" + "<p> &nbsp;  &nbsp;  &nbsp;  &nbsp;" + text + "</p>" + "<p class='kh_dj'><a href='javascript:;' onclick='closeHint()'>关闭</a><a href='javascript:;' onclick='alwaysCloseHint()'>今日不再提示</a></p>" + "</div>" + "</div>";
        $("body").append(hint_div)
        popupDiv('pop-new')

        $('body').css('overflow', 'hidden');
    }
}

function closeHint() {
    hideDiv('pop-new');
    $('body').css('overflow', 'auto');
}
function alwaysCloseHint() {
    hideDiv('pop-new');
    $('body').css('overflow', 'auto');
    addCookie1("alwaysClosePromptHint", "true", {
        path: "/",
        expires: 1
    })
}

function addCookie1(name, value, options) {
    if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
            value = "";
            options.expires = -1
        }
        var expires = "";
        if (options.expires && (typeof options.expires == "number" || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == "number") {
                date = new Date();
                if (options.unit) {
                    if (options.unit == "s") {
                        date.setTime(date.getTime() + (options.expires * 1000))
                    } else {
                        if (options.unit == "h") {
                            date.setTime(date.getTime() + (options.expires * 60 * 60 * 1000))
                        } else {
                            if (options.unit == "d") {
                                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
                            }
                        }
                    }
                } else {
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
                }
            } else {
                date = options.expires
            }
            expires = "; expires=" + date.toUTCString()
        }
        var path = options.path ? "; path=" + (options.path) : "";
        var domain = options.domain ? "; domain=" + (options.domain) : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [name, "=", encodeURIComponent(value), expires, path, domain, secure].join("")
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + "=")) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return cookieValue
    }
}

function popupDiv(div_id) {
    var div_obj = $("#" + div_id);
    var posLeft = ($(window).width() - div_obj.width()) / 2;
    var posTop = ($(window).height() - div_obj.height()) / 2;

    //添加并显示遮罩层
    $("<div id='mask1'></div>").addClass("mask1")
        .appendTo("body")
        .fadeIn(200);

    div_obj.css({ "top": posTop, "left": posLeft }).fadeIn();
}

function hideDiv(div_id) {
    $("#mask1").remove();
    $("#" + div_id).fadeOut();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
    } else {
        return null
    }
}

// 搜索历史
function showHistoryWord1(type) {  //展示搜索历史
    var arr = localStorage.getItem("bidSearchHistory");
    console.log(arr);
    if (arr) {
        arr = JSON.parse(arr);
        if (arr[type] && arr[type].length) {
            var list = arr[type];
            for (var i = 0, html = "", url = "", click = ""; i < list.length; i++) {
                // url = "./treetop_search.html?keywords="+encodeURI(list[i]);
                url = "javascript:;";
                html += '<li><a href=' + url + ' class="sl">' + list[i] + '</a><i onclick=singleDeleteHW(' + i + ',' + '"' + type + '"' + ')>×</i></li>'

                // url = "javascript:;";
                // click = "recordLink('"+list[i].replaceAll(" ","%2")+"')";
                // html += '<li><a href="'+url+'" onclick='+click+' class="sl">'+list[i]+'</a></li>'
            }
            $("#g_zheng .historywrap").html('<ul>' + html + '</ul><div class="clearh"><a href=javascript:clearHistoryWord(' + '"' + type + '"' + ');>清除历史记录</a></div>').show();
        }
    }
    // 监听点击事件
    $(".historywrap li a").on("click", function () {
        var key = $(this).text();
        addHistoryWord(key, "searchgj");
        window.open("./treetop_search.html?keywords=" + encodeURI(key), "_self", "");
    })
}
function singleDeleteHW(index, stype) {   //单条删除
    var arr = localStorage.getItem("bidSearchHistory");
    if (arr) {
        arr = JSON.parse(arr);
        if (arr[stype] && arr[stype].length) {
            arr[stype].splice(index, 1);
            localStorage.setItem("bidSearchHistory", JSON.stringify(arr));
            setTimeout(function () {
                $('#text_x').hide();
                $('#text').show().focus();
            }, 200)
        }
    }
}
function clearHistoryWord(type) {  //清空搜索历史
    var arr = localStorage.getItem("bidSearchHistory");
    arr = JSON.parse(arr);
    arr[type] = [];
    localStorage.setItem("bidSearchHistory", JSON.stringify(arr))
}
function addHistoryWord(word, type) {  //添加搜索；历史
    var arr = localStorage.getItem("bidSearchHistory");
    var res = {};
    if (arr) {
        arr = JSON.parse(arr);
        if (arr[type] && arr[type].length) {
            var num = arr[type].indexOf(word);  //查重
            if (num == -1) {  //不存在
                if (arr[type].length >= 10) {  //存了10个
                    arr[type].pop();
                    arr[type].unshift(word);
                    localStorage.setItem("bidSearchHistory", JSON.stringify(arr))
                } else {
                    arr[type].unshift(word);
                    localStorage.setItem("bidSearchHistory", JSON.stringify(arr))
                }
            } else {  //存在，置顶
                arr[type].splice(num, 1);
                arr[type].unshift(word);
                localStorage.setItem("bidSearchHistory", JSON.stringify(arr))
            }
        } else {
            arr[type] = [];
            arr[type].push(word);
            localStorage.setItem("bidSearchHistory", JSON.stringify(arr))
        }
    } else {
        res[type] = [];
        res[type].push(word);
        localStorage.setItem("bidSearchHistory", JSON.stringify(res))
    }
}
function recordLink(key) {
    $('#text').attr('value', key.replaceAll("%2", " "));
    submitForm();
}
$("#g_zheng form #text").focus(function () {
    console.log(222222222222);
    if ($(this).val() == "") {
        showHistoryWord1("searchgj");
    }
    $("#g_zheng form #text").on("input keyup", function (event) {
        // var bl = $(".historywrap").css("display")!="block";
        if ($(this).val() == "") {
            showHistoryWord1("searchgj");
        } else {
            $("#g_zheng .historywrap").hide();
        }
    });
})
$("#g_zheng form #text").blur(function () {
    console.log(333333);
    setTimeout(function () {
        $("#g_zheng .historywrap").hide();
    }, 200)
})
