// 日期格式化
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k])
                .length));
        }
    }
    return format;
}


var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    }, _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    }, _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

// 元博课堂一键登录
function loginMsgSync() {
    var logMsg = {
        formData: {
            StudentName: '',
            StudentNetName: '',
            Mobile: '',
            CZID: '',
            IsMain: '',
            Subrelation: '',
            Origin: '',
            EMail: ''
        },
        getForm: function(url,type){
            var httpxml ;
            if(window.XMLHttpRequest){
                //大多数浏览器
                httpxml = new XMLHttpRequest();
            }else{
                //古董级浏览器
                httpxml = new ActiveXObject("Microsoft.XMLHTTP");
            }

            httpxml.open("get",url,true);

            httpxml.onreadystatechange =function () {
                if(httpxml.readyState==4 && httpxml.status==200){
                    var s;
                    if (typeof(JSON) == 'undefined'){
                        s = eval("("+httpxml.responseText+")");
                    }else{
                        s = JSON.parse(httpxml.responseText);
                    }

                    if(type=='1') {
                        if(s.text_view=='1'){
                            logMsg.formData.IsMain = s.is_yuan?false:true
                            logMsg.formData.CZID = s.is_yuan?s.yuanid:s.memberid;
                            var userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{}
                            logMsg.formData.StudentName = userInfo.cust_name
                            logMsg.formData.StudentNetName = userInfo.login_id
                            logMsg.formData.Mobile = userInfo.phone?userInfo.phone:''
                            logMsg.formData.Subrelation = logMsg.formData.IsMain?0:userInfo.record_id
                            logMsg.formData.Origin = userInfo.company_name?userInfo.company_name:''
                            logMsg.formData.EMail = userInfo.cust_email?userInfo.cust_email:''
                            logMsg.getForm('','3')

                            // 加密
                            var arr = Object.keys(logMsg.formData), html = '';
                            for(var i=0;i<arr.length;i++){
                                html += arr[i]+'='+logMsg.formData[arr[i]]+'&'
                            }
                            html = html.substring(0,html.length-1)
                            //可能存在encodeURIComponent转码的大小写问题
                            html = logMsg.encryptByDES(encodeURIComponent(html),'81AE6CF8')
                            window.location.href = 'https://study.chinabidding.cn/Interface/LoginHandler.ashx?'+html

                        }else{
                            var a = document.createElement('a');
                            a.setAttribute('href','https://study.chinabidding.cn');
                            a.setAttribute('target','_blank');
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                        }
                    }
                }else if(httpxml.readyState==4 && httpxml.status!=200){  //非200表示异常
                    console.log('获取信息失败')
                }
            }
            httpxml.send();
        },
        encryptByDES: function(message, key) {
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                    iv: keyHex,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            );
            return encrypted.ciphertext.toString();
        }
    }
    
    logMsg.getForm('/cblcn/Home/newLoginCheck?t='+new Date().getTime(),'1')
}


function setEndYearPop(type, userId) {
    userId = String(userId)
    if (type != "a") {
        setEndYearFlag(userId)

        $("#autumn_box .cool_close").on("click", function () {
            var date = getCooldate();
            var springList = localStorage.getItem('springList') ? JSON.parse(localStorage.getItem('springList')) : [];
            var flag = true;
            for (var i = 0; i < springList.length; i++) {
                if (springList[i].userId == userId) {
                    flag = false;
                    springList[i].date = date;
                }
            }
            if (flag) {
                springList.push({ userId: userId, date: date });
                localStorage.setItem("springList", JSON.stringify(springList));
            } else {
                localStorage.setItem("springList", JSON.stringify(springList));
            }

            $("#autumn_box").hide();
            return false;
        })
    }
}

function setEndYearFlag(userId) {
    var coolFlag = '';
    var springList = localStorage.getItem('springList') ? JSON.parse(localStorage.getItem('springList')) : [];  //默认为[],点击关闭后存储id
    var flag = true;
    for (var i = 0; i < springList.length; i++) {
        if (springList[i].userId == userId) {
            flag = false;
            coolFlag = springList[i].date;
        }
    }

    var startWork = 20220107;
    var endWork = 20220114;
    var nowWork = getCooldate();
    if (nowWork >= startWork && nowWork <= endWork) {  //在该时间有效
        if (flag || (!flag && coolFlag != nowWork)) {
            $("body").append('<div id="autumn_box"><div class="autumn"></div><div class="cool_close"></div></div>')
            if (IEVersion() == 9) {
                $("#autumn_box").css("filter", "none");
            }
            if (IEVersion() == 8) {
                $("#autumn_box").css("z-index", 100000000000);
            }
        }
    }
}

// 新春促销
var sale_list = [
    "任炫宇",
    "靳宏志",
    "王印",
    "彭迪",
    "肖茗升",
    "刘起铭",
    "董浩",
    "王龙",
    "胡楠溦",
    "丁金玉",
    "孙丛",
    "郭小梅",
    "李占阳",
    "于文韬"
];

function setSpringPop(userName, userMeta, type, userId) {
    userId = String(userId)

    if (userMeta == "" || userMeta == null) { //电话
        userMeta = "400-006-6655";
    }

    if (userName == "" || userName == null || userName == "销售专员" || userName == "专属客服") { //名字
        userName = ""
    }
    var registerFlag = sessionStorage.getItem("registerFlag") == "1" ? true : false;
    if ((type == "a" && sale_list.indexOf(userName) !== -1) || registerFlag) {
        setSpringFlag(registerFlag, userId)
        $(".spring_box .phone").text(userMeta)
        $(".spring_box .name").text(userName)
        $(".spring").on("click", function () {
            window.open("https://www.chinabidding.cn/public/2020/html/spring.html")
        })

        $(".spring_close").on("click", function () {
            var date = new Date().toLocaleDateString();
            var springList = localStorage.getItem('springList') ? JSON.parse(localStorage.getItem('springList')) : [];
            var flag = true;
            for (var i = 0; i < springList.length; i++) {
                if (springList[i] == userId) {
                    flag = false;
                }
            }
            if (flag) {
                springList.push(userId);
                localStorage.setItem("springList", JSON.stringify(springList));
            }
            localStorage.setItem("springFlag", date);
            // if (window.event) {
            //     event.cancelBubble = true
            // } else {
            //     event.stopPropagation()
            // }
            $(".spring_box").hide();
            return false;
        })
    }
}


function setSpringFlag(registerFlag, userId) {
    var springFlag = localStorage.getItem('springFlag');
    var springList = localStorage.getItem('springList') ? JSON.parse(localStorage.getItem('springList')) : [];
    var date = new Date().toLocaleDateString();
    var flag = true;
    for (var i = 0; i < springList.length; i++) {
        if (springList[i] == userId) {
            flag = false;
        }
    }
    if (registerFlag) {
        $("body").append('<div class="spring_box"><a class="spring" href="javascript:void(0);"><p><span class="name"></span><span class="phone"></span></p><div class="spring_close"></div></a></div>')
        if (IEVersion() == 9) {
            $(".spring_box ").css("filter", "none");
        }
        if (IEVersion() == 8) {
            $(".spring_box").css("z-index", 100000000000)
        }
        localStorage.setItem("registerFlag", "0")
    } else if (springFlag !== date || flag) {
        $("body").append('<div class="spring_box"><a class="spring" href="javascript:void(0);"><p><span class="name"></span><span class="phone"></span></p><div class="spring_close"></div></a></div>')
        if (IEVersion() == 9) {
            $(".spring_box ").css("filter", "none");
        }
        if (IEVersion() == 8) {
            $(".spring_box").css("z-index", 100000000000)
        }

    }
}

//20210830 rx 秋季促销
// 20220811更新客服名单
var cool_salelist = [
    '崔亮',
    '任炫宇',
    '王印',
    '彭迪',
    '陆紫剑',
    '孙雅迪',
    '胡楠溦',
    '丁金玉',
    '孙丛',
    '郭小梅',
    '雷雅琦',
    '郭晓虎',
    '马孝良',
    '刘晓强',
    '吕爱心',
    '许航',
    '高慧敏',
    '贾旭',
    '王梦宇',
    '王甜1',
    '陈丽娟'
]
function setCoolPop(userName, userMeta, type, userId) {
    userId = String(userId)

    if (userMeta == "" || userMeta == null || userMeta == "400-006-6655") { //电话
        userMeta = "400-006-6655";
    }

    if (userName == "" || userName == null || userName == "销售专员" || userName == "专属客服") { //名字
        userName = ""
    }
    // var registerFlag = sessionStorage.getItem("registerFlag") == "1" ? true : false;
    var registerFlag = false;
    if ((type == "a" && (userMeta === "400-006-6655" || cool_salelist.indexOf(userName) !== -1)) || registerFlag) {
        setCoolFlag(registerFlag, userId)

        $("#autumn_box .phone").text(userMeta)
        $("#autumn_box .name").text(userName)
        $("#autumn_box .autumn").on("click", function () {
            window.open("https://www.chinabidding.cn/public/2020/html/activity/cool.html?code=1")
        })

        $("#autumn_box .cool_close").on("click", function () {
            var date = getCooldate();
            var springList = localStorage.getItem('springList') ? JSON.parse(localStorage.getItem('springList')) : [];
            var flag = true;
            for (var i = 0; i < springList.length; i++) {
                if (springList[i].userId == userId) {
                    flag = false;
                    springList[i].date = date;
                }
            }
            if (flag) {
                springList.push({ userId: userId, date: date });
                localStorage.setItem("springList", JSON.stringify(springList));
            } else {
                localStorage.setItem("springList", JSON.stringify(springList));
            }

            $("#autumn_box").remove();
            gio('track', 'activityclose');
            return false;
        })
    }
}


//营销活动弹窗
function setMarketing(data) {
    var userMeta;
    var userName;
    var type;
    if (data.c_user) {
        var userMeta = data.c_user.userMeta
        var userName = data.c_user.userName
        var type = data.c_user.type
        var userWxCode = data.c_user.userWxCode;
        var userDeptName = data.c_user.userDeptName;
    } else if (data.user) {
        var userMeta = data.user.userMeta
        var userName = data.user.userName
        var type = data.user.type
    } else {
        var userMeta = data.userMeta
        var userName = data.userName
        var type = data.type
        var userWxCode = data.userWxCode
    }


    var registerFlag = sessionStorage.getItem("registerFlag") == "1" ? true : false;

    if (userMeta == "" || userMeta == null || userMeta == "400-006-6655") { //电话
        userMeta = "400-006-6655";
    }

    if (userName == "" || userName == null || userName == "销售专员" || userName == "专属客服") { //名字
        userName = ""
    }

    var nowWork = getCooldate();
    // if ((type == "a" && (userMeta === "400-006-6655" || cool_salelist.indexOf(userName) !== -1)) || registerFlag) {
    if (type == "a") {
        // console.log("已经登录了,是免费客户和。。。",userMeta,userName);
        var startWork = 20230129;
        var endWork = 20230326;


        if (nowWork >= startWork && nowWork <= endWork) {  //在该时间有效
            if (localStorage.getItem("marketingFlag") != nowWork) {
                // $("body").append(' <div class="containter"><div class="containter_bgc"><div class="containter_box"><p class="meta"><img src="/public/2020/img/newYear/zskf.png" alt=""><span class="name">张三</span><span class="phone">13346878843</span></p><p class="closebtn"><img src="https://cdn.chinabidding.cn/public/2020/img/syhd_tc_icongb2.png" alt=""></p></div></div></div>')
                $("body").append(' <div class="containter"><div class="containter_bgc"><div class="containter_box"><p class="meta"></p><p class="customerWxImg"></p><p class="closebtn"><img src="https://cdn.chinabidding.cn/public/2020/img/newYear/icon_gb.png" alt=""></p></div></div></div>')
                if (userWxCode){
                    $(".customerWxImg").css("background", "url("+userWxCode+") no-repeat");
                    $(".customerWxImg").css("background-size", "100% 100%");
                    $(".meta").text(userMeta);
                    if (nowWork >= 20230306){
                        $(".containter_box").css("background", "url(/public/2020/img/newYear/tc230227_1.png) no-repeat center")
                    }
                } else {
                    if (nowWork >= 20230306){
                        $(".containter_box").css("background", "url(/public/2020/img/newYear/tc_free1.png) no-repeat center")
                    } else {
                        $(".containter_box").css("background", "url(/public/2020/img/newYear/tc_free.png) no-repeat center")
                    }
                }

                $('.containter').show()
                // $(".meta .name").text(userName)
                // if (IEVersion() == 9) {
                //     $("#advert_box").css("filter", "none");
                // }
                // if (IEVersion() == 8) {
                //     $("#advert_box").css("z-index", 1000000000);
                // }
                sessionStorage.setItem("registerFlag", "0");
            }
        }

        $(".containter .closebtn").click(function () {
            var date = getCooldate();
            localStorage.setItem("marketingFlag", date);
            $(".containter").remove()
        })
    } else {
        // 会员客户弹出
        var startWork = 20230103;
        var endWork = 20230121;
        var startWork2 = 20230128;
        var endWork2 = 20230210;

        var startDate = data.c_user.starttime.split('-');
        var startYear = startDate[0];
        var startMonth = startDate[1];
        var startNowDate = startDate[2];

        var endDate = data.c_user.endtime.split('-');
        var endYear = endDate[0];
        var endMonth = endDate[1];
        var endNowDate = endDate[2];

        var userWxCode = data.c_user.userWxCode;

        var popStatus = $.cookie("pop_status") //是否为第一次登录
        var popToday = data.c_user.pop_date; //是否今日弹出

        if ((nowWork >= startWork && nowWork <= endWork) || (nowWork >= startWork2 && nowWork <= endWork2)) {  //在该时间有效
            if (popToday != nowWork && popStatus == 1) {
                var text = '<div class="membership" style="display: block;">' +
                    '<div class="membership_bgc">' +
                    '<div class="membership_box">' +
                    '<div class="startDate">' + startYear + '<span>年</span>' + startMonth + '<span>月</span>' + startNowDate + '<span>日</span></div>' +
                    '<div class="jiantou">→</div>' +
                    '<div class="endDate">' + endYear + '<span>年</span>' + endMonth + '<span>月</span>' + endNowDate + '<span>日</span></div>' +
                    '<p class="meta"><span>专属客服：</span><span class="name">' + userName + '</span><span class="phone">' + userMeta + '</span></p>' +
                    '<div class="wechatBox">' +
                    '<img class="wxImg" src="' + userWxCode + '" alt="">' +
                    '<p class="wxSao">扫一扫添加企业微信</p>' +
                    '<img style="margin-top:11px;" src="https://cdn.chinabidding.cn/public/2020/img/newYear/img_tbtx.png" alt="">' +
                    '<p class="reminder">年关将至，谨防不法份子散发虚假广告，冒充我网工作人员，给您的工作带来损失！</p></div>' +
                    '<p class="closebtn"><img src="https://cdn.chinabidding.cn/public/2020/img/newYear/icon_gb.png" alt=""></p>' +
                    '<div class="closeToday">今日不再弹出</div>' +
                    '</div></div></div>';
                $("body").append(text);
            }
        }
        $(".membership .closebtn").click(function () {
            // var date = getCooldate();
            // localStorage.setItem("marketingFlag", date);
            $.cookie("pop_status", 0);
            $(".membership").remove();
        })

        $(".membership .closeToday").click(function () {
            var date = getCooldate();
            // localStorage.setItem("marketingFlag", date);
            setPopupToday(date);
            $(".membership").remove();
        })
    }
    // } else {
    //     if (data.c_popup && data.c_popup.length > 0){
    //         setChargeDialog(nowWork, data.c_popup[0].urlPath)
    //     }
    // }
}
//今日不在弹出调用接口
function setPopupToday(date) {
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
        var httpxml;
        if (window.XMLHttpRequest) {
            //大多数浏览器
            httpxml = new XMLHttpRequest();
        } else {
            //古董级浏览器
            httpxml = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpxml.open("get", "yuan/host/setPopupStatus?flag="+date, true);
        httpxml.onreadystatechange = function () {
            if (httpxml.readyState == 4 && httpxml.status == 200) {
                var s;
                if (typeof (JSON) == 'undefined') {
                    s = eval("(" + httpxml.responseText + ")");
                } else {
                    s = JSON.parse(httpxml.responseText);
                }
                if (s.code == 200) {
                    //
                }
            }
        }
        httpxml.send();
    } else {
        $.ajax({
            type: "get",
            url: "yuan/host/setPopupStatus?flag="+date,
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    //
                }
            }
        })
    }
}

function setChargeing(data) {
    var type = data.c_user.type
    if (type != "a") {
        var nowWork = getCooldate();
        var popStatus = $.cookie("pop_status") //是否为第一次登录
        var popToday = data.c_user.pop_date; //是否今日弹出
        var chargeText;
        if (data.c_user.is_yuan){
            chargeText = '建议您进入<span class="red">商务室</span>更换其他订阅发送渠道（<span class="red">微信或APP</span>）获取招投标信息，也可联系您的<span class="red">专属客服协助</span>您处理。';
        } else {
            chargeText = '建议您更换其他订阅发送渠道（<span class="red">微信或APP</span>）获取招投标信息，也可联系您的<span class="red">专属客服协助</span>您处理。';
        }
        if (popToday != nowWork && popStatus == 1) {
            var txt = '<div class="chargeTanc" style="display: block;">'+
                '<div class="containter_bgc">' +
                '<div class="containter_box1">' +
                '<p class="tanc_close"><img src="/public/2020/img/homeCharge/icon_gb.png" alt=""></p>' +
                '<div class="tancHeader"></div>' +
                '<div class="tancContent">' +
                '<h2>通知</h2>' +
                '<p class="chargeP2">' +
                '<span class="tzHeader">尊敬的各位客户</span><br>' +
                '非常抱歉由于短信运营商系统故障，导致<span class="red">短信订阅暂停发送</span>。为保证您仍然可以实时获取招投标信息，' + chargeText +
                '</p>'+
                '<div class="tanc_close_today">今日不在弹出</div>' +
                '</div></div></div></div>'
            $("body").append(txt);
        }

        $(".chargeTanc .tanc_close").click(function () {
            // var date = getCooldate();
            // localStorage.setItem("marketingFlag", date);
            $.cookie("pop_status", 0);
            $(".chargeTanc").remove();
        })

        $(".chargeTanc .tanc_close_today").click(function () {
            var date = getCooldate();
            setPopupToday(date);
            $(".chargeTanc").remove();
        })
    }
}

function setDzzbDialog() {
    var nowWork = getCooldate();
    if (localStorage.getItem("dzzbFlag") != nowWork) {
        var txt = '<div class="dzzbDialog" style="display: block;">' +
            '<div class="containter_bgc">' +
            '<div class="containter_box">' +
            '<p class="tanc_close"><img src="https://www.chinabidding.cn/public/2020/img/zc_guanbi.png" alt=""></p>' +
            '<div class="tanc_linqu"></div>' +
            '</div></div></div>'
        $("body").append(txt);
    }
    $(".dzzbDialog .tanc_close").click(function () {
        var date = getCooldate();
        localStorage.setItem("dzzbFlag", date);
        $(".dzzbDialog").remove();
    })
    $(".dzzbDialog .tanc_linqu").click(function () {
        var date = getCooldate();
        localStorage.setItem("dzzbFlag", date);
        $(".dzzbDialog").remove();
        yjscLink(1,'/#/trial');
    })
}

//设置收费客户专属客服弹窗
function setChargeDialog(nowWork, imgUrl){
    if (localStorage.getItem("chargeFlag") != nowWork) {
        $("body").append(' <div class="containter"><div class="containter_bgc"><div class="containter_box"><p class="closebtn"><img src="https://cdn.chinabidding.cn/public/2020/img/syhd_tc_icongb2.png" alt=""></p></div></div></div>')
        $(".containter_box").css("background", "url("+imgUrl+") no-repeat center")
        $('.containter').show()
    }
    $(".containter .closebtn").click(function () {
        var date = getCooldate();
        localStorage.setItem("chargeFlag", date);
        $(".containter").remove()
    })
}

function setCoolFlag(registerFlag, userId) {
    var coolFlag = '';
    var springList = localStorage.getItem('springList') ? JSON.parse(localStorage.getItem('springList')) : [];  //默认为[],点击关闭后存储id
    var flag = true;
    for (var i = 0; i < springList.length; i++) {
        if (springList[i].userId == userId) {
            flag = false;
            coolFlag = springList[i].date;
        }
    }

    var startWork = 20211129;
    var endWork = 20211217;
    var nowWork = getCooldate();
    if (nowWork >= startWork && nowWork <= endWork) {  //在该时间有效
        if (flag || (!flag && coolFlag != nowWork)) {
            $("body").append('<div id="autumn_box"><div class="autumn"><p><span class="name"></span><span class="phone"></span></p></div><div class="cool_close"></div></div>')
            if (IEVersion() == 9) {
                $("#autumn_box").css("filter", "none");
            }
            if (IEVersion() == 8) {
                $("#autumn_box").css("z-index", 100000000000);
            }
            gio('track', 'activityopen');
        } else if (registerFlag) {
            $("body").append('<div id="autumn_box"><div class="autumn"><p><span class="name"></span><span class="phone"></span></p></div><div class="cool_close"></div></div>')
            if (IEVersion() == 9) {
                $("#autumn_box").css("filter", "none");
            }
            if (IEVersion() == 8) {
                $("#autumn_box").css("z-index", 100000000000);
            }
            sessionStorage.setItem("registerFlag", "0");
            gio('track', 'activityopen');
        }
    }
}


function getCooldate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1 + "";
    var nowDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (nowDate >= 0 && nowDate <= 9) {
        nowDate = "0" + nowDate;
    }
    var newDate = year + month + nowDate;
    return Number(newDate);
}


function IEVersion() { //判断ie版本
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
}

// ie兼容indexOf方法
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

//ie支持伪元素
(function ($) {

    var patterns = {
        text: /^['"]?(.+?)["']?$/,
        url: /^url\(["']?(.+?)['"]?\)$/
    };

    function clean(content) {
        if (content && content.length) {
            var text = content.match(patterns.text)[1],
                url = text.match(patterns.url);
            return url ? '<img src="' + url[1] + '" />' : text;
        }
    }

    function inject(prop, elem, content) {
        if (prop != 'after') prop = 'before';
        if (content = clean(elem.currentStyle[prop])) {
            $(elem)[prop == 'before' ? 'prepend' : 'append'](
                $(document.createElement('span')).addClass(prop).html(content)
            );
        }
    }

    $.pseudo = function (elem) {
        inject('before', elem);
        inject('after', elem);
        elem.runtimeStyle.behavior = null;
    };

    if (document.createStyleSheet) {
        var o = document.createStyleSheet(null, 0);
        o.addRule('.dummy', 'display: static;');
        o.cssText = 'html, head, head *, body, *.before, *.after, *.before *, *.after * { behavior: none; } * { behavior: expression($.pseudo(this)); }';
    }

})(jQuery);

// 客服弹框
function qimoChatClick() {
    var url = "https://tb.53kf.com/code/client/0ae6bb374440bbf180f02e04d57fb6962/3"; //游客
    var isText = localStorage.getItem('isText');
    if(isText == 1) {
        var userInfo = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{}
        if (userInfo.cust_right_group == 0) { //免费用户
            url = "https://tb.53kf.com/code/client/0ae6bb374440bbf180f02e04d57fb6962/1";
        } else { //收费用户
            url = "https://tb.53kf.com/code/client/0ae6bb374440bbf180f02e04d57fb6962/2";
        }
    }
    window.open(url, "", "modal=yes,width=800,height=600,resizable=no,scrollbars=no,left=100,top=100");
}

setInterval(function () {
    $("#kf_small").css({
        transition: "transform 1s ease",
        transform: "scale(1.2)"
    })
    setTimeout(function () {
        $("#kf_small").attr("src", "https://cdn.chinabidding.cn/public/2020/img/yuanbo/kf_big.png")
    }, 1000)
    setTimeout(function () {
        $("#kf_small").attr("src", "https://cdn.chinabidding.cn/public/2020/img/yuanbo/kf_small.png").css({
            transition: "transform 1s ease",
            transform: "scale(1)"
        })
    }, 2000);
}, 3000)

// ie7不支持字符串模板
function convert(txt) {
    var a = '4157476F567739356239716C747A764A39626A5241526E69',
        b = CryptoJS.enc.Hex.parse("32303230393138414553424153453634");
    a = CryptoJS.enc.Hex.parse(a);
    var txtC = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(txt), a, {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    var c = CryptoJS.enc.Utf8.stringify(txtC);
    return JSON.parse(c);
}

function convert1(txt) {
    var a = '434D643932666D644B454E304E646C616535334D6435666E';
    a = CryptoJS.enc.Hex.parse(a)
    b = CryptoJS.enc.Hex.parse("30393138313633304D4D474C435A5059")
    var enc = CryptoJS.AES.encrypt(txt, a, {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return enc.ciphertext.toString()
}

function convert2(txt) {
    var a = '4157476F567739356239716C747A764A39626A5241526E69';
    a = CryptoJS.enc.Hex.parse(a)
    b = CryptoJS.enc.Hex.parse("32303230393138414553424153453634")
    var enc = CryptoJS.AES.encrypt(txt, a, {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return enc.ciphertext.toString()
}

function convert3(txt) {
    var a = '4b4e31356d6638344c6e61326c3030347361646572364d72',
        b = CryptoJS.enc.Hex.parse("436d396432667338346c3364324e3673");
    a = CryptoJS.enc.Hex.parse(a);
    var txtC = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(txt), a, {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    var c = CryptoJS.enc.Utf8.stringify(txtC);
    return JSON.parse(c);
}

function convert4(txt) {
    var a = '53304d383964423931616448763435796539446b34363266',
        b = CryptoJS.enc.Hex.parse("4239756433416d646674333568793873");
    a = CryptoJS.enc.Hex.parse(a);
    var txtC = CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(txt), a, {
        iv: b,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    var c = CryptoJS.enc.Utf8.stringify(txtC);
    return JSON.parse(c);
}

// 项目收藏
function goCollect(cid, that, block) {
    console.log(block)
    var ev = window.event || arguments.callee.caller.arguments[0];
    var isText = localStorage.getItem('isText');

    if (window.location.href.indexOf("channelZbcg") != -1 ||
        window.location.href.indexOf("channelNzj") != -1 ||
        window.location.href.indexOf("plist") != -1 ||
        window.location.href.indexOf("project") != -1 ||
        window.location.href.indexOf("zbcg") != -1 ||
        window.location.href.indexOf("zbcglist") != -1 ||
        window.location.href.indexOf("zbcgsort") != -1) {
        if (ev && ev.stopPropagation) {
            //因此它支持W3C的stopPropagation()方法
            ev.stopPropagation();
        } else {
            //否则，我们需要使用IE的方式来取消事件冒泡
            ev.cancelBubble = true
        }
    }

    if (window.location.href.indexOf("zbcglist") != -1) {
        block = sessionStorage.getItem("hotTxts") ? JSON.parse(sessionStorage.getItem("hotTxts")) : '';
        block = 'blocks2_id' + block;
    }

    if (isText == 1 && collectflag) {
        collectflag = false;
        if ($(that).find("i").hasClass("active")) { //已收藏
            outCollect(cid, that)
        } else { //未收藏
            getCollect(cid, that, block)
        }

        setTimeout(function () {
            collectflag = true
        }, 300)
    } else {
        sessionStorage.setItem('url', window.location.href)
        window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
    }
}

function getCollect(info_ids, thas, key) {
    key = key ? key : '';
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
        var httpxml;
        if (window.XMLHttpRequest) {
            //大多数浏览器
            httpxml = new XMLHttpRequest();
        } else {
            //古董级浏览器
            httpxml = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpxml.open("post", "/yuan/info/collect/collectInfo", true);
        httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpxml.onreadystatechange = function () {
            if (httpxml.readyState == 4 && httpxml.status == 200) {
                var s;
                if (typeof (JSON) == 'undefined') {
                    s = eval("(" + httpxml.responseText + ")");
                } else {
                    s = JSON.parse(httpxml.responseText);
                }
                // 处理逻辑
                if (s.code == 40010) {
                    $(".logshadowz").show()
                } else if (s.code == 50002) {
                    console.log("数据id不对")
                } else if (s.code == 200) {
                    if (window.location.href.indexOf("zbcg") != -1 || window.location.href.indexOf("zbcgsort") != -1 || window.location.href.indexOf("zbcglist") != -1) {
                        $(thas).find("i").html("&#xe608;").css("color", "#d22629").addClass("active")
                        $(thas).find("em").html(Number($(thas).find("em").html()) + 1)
                    } else if (window.location.href.indexOf("project") != -1 || window.location.href.indexOf("plist") != -1) {
                        $(thas).find("i").html("&#xe608;").css("color", "#e0b450").addClass("active")
                        $(thas).find("em").html(Number($(thas).find("em").html()) + 1)
                    } else {
                        $(thas).find("i").html("&#xe608;").css("color", current_theme.theme.theme_color).addClass("active")
                        $(thas).find(".number").html(Number($(thas).find(".number").html()) + 1)
                    }
                }
            }
        }
        httpxml.send("info_ids=" + info_ids + "&key=" + key);
    } else {
        $.ajax({
            type: "post",
            url: "/yuan/info/collect/collectInfo",
            data: {
                info_ids: info_ids,
                key: key
            },
            dataType: "json",
            success: function (data) {
                // 处理逻辑
                if (data.code == 40010) {
                    $(".logshadowz").show()
                } else if (data.code == 50002) {
                    console.log("数据id不对")
                } else if (data.code == 200) {
                    if (window.location.href.indexOf("zbcg") != -1 || window.location.href.indexOf("zbcgsort") != -1 || window.location.href.indexOf("zbcglist") != -1) {
                        $(thas).find("i").html("&#xe608;").css("color", "#d22629").addClass("active")
                        $(thas).find("em").html(Number($(thas).find("em").html()) + 1)
                    } else if (window.location.href.indexOf("project") != -1 || window.location.href.indexOf("plist") != -1) {
                        $(thas).find("i").html("&#xe608;").css("color", "#e0b450").addClass("active")
                        $(thas).find("em").html(Number($(thas).find("em").html()) + 1)
                    } else {
                        $(thas).find("i").html("&#xe608;").css("color", current_theme.theme.theme_color).addClass("active")
                        $(thas).find(".number").html(Number($(thas).find(".number").html()) + 1)
                    }
                }
            }
        })
    }
    changeIsCollect(info_ids, 1)
}

function outCollect(info_ids, thas) {
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
        var httpxml;
        if (window.XMLHttpRequest) {
            //大多数浏览器
            httpxml = new XMLHttpRequest();
        } else {
            //古董级浏览器
            httpxml = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpxml.open("post", "/yuan/info/collect/uncollectInfo", true);
        httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpxml.onreadystatechange = function () {
            if (httpxml.readyState == 4 && httpxml.status == 200) {
                var s;
                if (typeof (JSON) == 'undefined') {
                    s = eval("(" + httpxml.responseText + ")");
                } else {
                    s = JSON.parse(httpxml.responseText);
                }
                // 处理逻辑
                if (s.code == 40010) {
                    $(".logshadowz").show()
                } else if (s.code == 40011) {
                    console.log("调的接口不对")
                } else if (s.code == 50002) {
                    console.log("数据id不对")
                } else if (s.code == 200) {
                    if (window.location.href.indexOf("zbcg") != -1 || window.location.href.indexOf("zbcgsort") != -1 || window.location.href.indexOf("zbcglist") != -1) {
                        $(thas).find("i").removeClass("active").html("&#xe607;").css("color", "#666")
                        $(thas).find("em").html(Number($(thas).find("em").html()) - 1)
                    } else if (window.location.href.indexOf("project") != -1 || window.location.href.indexOf("plist") != -1) {
                        $(thas).find("i").removeClass("active").html("&#xe607;").css("color", "#999")
                        $(thas).find("em").html(Number($(thas).find("em").html()) - 1)
                    } else {
                        $(thas).find("i").removeClass("active").html("&#xe607;").css("color", "#999")
                        $(thas).find(".number").html(Number($(thas).find(".number").html()) - 1)
                    }
                }
            }
        }
        httpxml.send("info_ids=" + info_ids);
    } else {
        $.ajax({
            type: "post",
            url: "/yuan/info/collect/uncollectInfo",
            data: {
                info_ids: info_ids
            },
            dataType: "json",
            success: function (data) {
                // 处理逻辑
                if (data.code == 40010) {
                    $(".logshadowz").show()
                } else if (data.code == 40011) {
                    console.log("调的接口不对")
                } else if (data.code == 50002) {
                    console.log("数据id不对")
                } else if (data.code == 200) {
                    if (window.location.href.indexOf("zbcg") != -1 || window.location.href.indexOf("zbcgsort") != -1 || window.location.href.indexOf("zbcglist") != -1) {
                        $(thas).find("i").removeClass("active").html("&#xe607;").css("color", "#666")
                        $(thas).find("em").html(Number($(thas).find("em").html()) - 1)
                    } else if (window.location.href.indexOf("project") != -1 || window.location.href.indexOf("plist") != -1) {
                        $(thas).find("i").removeClass("active").html("&#xe607;").css("color", "#999")
                        $(thas).find("em").html(Number($(thas).find("em").html()) - 1)
                    } else {
                        $(thas).find("i").removeClass("active").html("&#xe607;").css("color", "#999")
                        $(thas).find(".number").html(Number($(thas).find(".number").html()) - 1)
                    }
                }
            }
        })
    }
    changeIsCollect(info_ids, 0)
}

function changeIsCollect(id, index) { //0是取消收藏  1是收藏
    if (window.location.href.indexOf("channelList") != -1) {
        var list = current_data[sessionStorage.getItem("current_model")].list;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i].is_collect = index;
                // if(index==1){
                //     list[i].collect++;
                // }else{
                //     list[i].collect--;
                // }
            }
        }
    } else if (window.location.href.indexOf("plist") != -1) {
        var plist = homeData["c_" + linktype].re_data.data;
        for (var j = 0; j < plist.length; j++) {
            if (plist[j].id == id) {
                plist[j].is_collect = index;
                // if(index==1){
                //     plist[j].collect++;
                // }else{
                //     plist[j].collect--;
                // }
            }
        }
    }

    if (window.location.href.indexOf("channelZbcg") != -1 || window.location.href.indexOf("channelNzj") != -1) {
        if (nextPageDate) {
            for (var k = 0; k < nextPageDate.list.length; k++) {
                if (nextPageDate.list[k].id == id) {
                    nextPageDate.list[k].is_collect = index;
                    break;
                }
            }
        }
        if (currentPageData) {
            for (var t = 0; t < currentPageData.list.length; t++) {
                if (currentPageData.list[t].id == id) {
                    currentPageData.list[t].is_collect = index;
                    break;
                }
            }
        }
    }
}

// 商务室跳转
function swsLink() {
    var e_query = "";
    if (sessionStorage.getItem("isEmail")) {
        e_query = sessionStorage.getItem("isEmail");
    }
    $.ajax({
        type: "get",
        url: "/yuan/login/loginnew/tobussroom?source=1",
        dataType: "json",
        success: function (data) {
            // 处理逻辑
            console.log(typeof (data))
            if (data.msg && data.msg == 40001) {
                $(".logshadowz").show();
            } else if (data.msg && data.msg == 40002) {
                sessionStorage.setItem('url', encodeURI(window.location.href))
                window.open("../html/login.html?source=1&url=/yuan/login/loginnew/tobussroom")
            } else if (data.msg) {
                if (window.location.href.indexOf("login") != -1 || window.location.href.indexOf("register") != -1) {
                    window.location.href = e_query ? data.msg + e_query : data.msg;
                } else {
                    window.open(e_query ? data.msg + e_query : data.msg)
                }
            }
        }
    })
}

//采钻商城跳转
function czscLink() {
    $.ajax({
        type: "get",
        url: "/yuan/login/loginnew/tojifen",
        dataType: "json",
        success: function (data) {
            // 处理逻辑
            if (data.msg && data.msg == 40004) {
                $(".logshadowz2").show()
            } else if (data.msg && data.msg == 40002) {
                window.open("https://www.chinabidding.cn/public/2020/html/login.html")
            } else if (data.msg) {
                var sessionId = data.msg;
                window.open("https://jfsc.chinabidding.cn/front/index.html#/home?sessionId="+sessionId)
            }
        }
    })
    // if (isText == 1 && memberid){
    //     window.open("https://jfsc.chinabidding.cn/front/index.html#/home?memberid="+memberid)
    // } else {
    //     window.open("https://jfsc.chinabidding.cn/front/index.html#/home")
    // }
}

function closelogsz() {
    if (window.location.href.indexOf("login") != -1 || window.location.href.indexOf("register") != -1) {
        window.location.href = sessionStorage.getItem("url") ? sessionStorage.getItem("url") : "https://www.chinabidding.cn"
    } else {
        $(".logshadowz").hide();
    }
}

function openfpass() {
    $(".forgetshadow").show()
}

function closefpass() {
    $(".forgetshadow").hide()
}

// 协议动态加载
if (window.location.href.indexOf("chinabidding") != -1) {
    $(".agreeshadow .agreement iframe").attr("src", "https://www.chinabidding.cn/public/2020/html/common/treaty.html")
} else if (window.location.href.indexOf("bid360") != -1) {
    $(".agreeshadow .agreement iframe").attr("src", "https://www.bid360.com.cn/public/2020/html/common/treaty.html")
}

// 网站导航兼容ie7-8
if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
    $(".fr .dropdown-layer2 .col1").css("width", "244px")
    $(".fr .dropdown-layer2 .col2").css("width", "244px")
}
if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() == 9) {
    $(".fr .dropdown-layer2").css("left", "-798px");
} else if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
    $(".fr .dropdown-layer2").css("left", "-815px");
}

// 获取ggw_id,关键字，来源2020-09-21
function getRoute() {
    var route = {
        ggw_id: "",
        s_url: "",
        s_txt: "",
        s_source: 18
    };
    if (sessionStorage.getItem("route")) {
        var s_roure = JSON.parse(sessionStorage.getItem("route"));
        route.ggw_id = s_roure.ggw_id;
        route.s_url = s_roure.s_url;
        route.s_txt = s_roure.s_txt;
        if (s_roure.s_source) {
            route.s_source = s_roure.s_source
        }
    }
    var dq = document.referrer; //获取上一个页面信息
    var eg = [];
    eg.push(['baidu', 'wd']);
    eg.push(['google', 'q']);
    eg.push(['soso', 'w']);
    eg.push(['yodao', 'q']);
    eg.push(['bing', 'q']);
    eg.push(['yahoo', 'q']);
    eg.push(['sogou', 'query']);
    eg.push(['gougou', 'search']);
    eg.push(['360', 'q']);
    eg.push(['so', 'q']);
    for (var el in eg) {
        var s = eg[el];
        var DandQ = String(s).split(","); //字符分割              
        if (dq.split("?")[1] && dq.split("?")[0].indexOf(DandQ[0]) > 0) {
            dq.split("?")[1].split("&").forEach(function (item) {
                if (item.split("=")[0] == DandQ[1]) {
                    route.s_url = decodeURI(dq.split("?")[0]);
                    route.s_txt = decodeURIComponent(item.split("=")[1]);
                    console.log(route.s_txt)
                }
            })
        }
    }
    if (dq.indexOf("/html/index") != -1 || dq == "https://chinabidding.cn/") {
        route.ggw_id = "7002";
        route.s_source = 18;
        if (!(route.s_url && route.s_url != "直接访问")) {
            route.s_url = "直接访问"
        }
    } else if (dq.indexOf("/html/ybcloud") != -1) {
        route.ggw_id = "7003";
        route.s_source = 17;
        if (!(route.s_url && route.s_url != "直接访问")) {
            route.s_url = "直接访问"
        }
    } else if (dq.indexOf("/html/yuanbo") != -1) {
        route.ggw_id = "7001";
        route.s_source = 15;
        if (!(route.s_url && route.s_url != "直接访问")) {
            route.s_url = "直接访问"
        }
    } else if (dq.indexOf("/html/channel") != -1) {
        var value = "";
        if (dq.split("?")[1] && dq.split("?")[1].split("=")[0] == "channel_id") {
            value = decodeURI(dq.split("?")[1].split("=")[1]);
        } else {
            value = "1"
        }

        if (!(route.s_url && route.s_url != "直接访问")) {
            route.s_url = "直接访问"
        }
        switch (value) {
            case "10":
                route.ggw_id = "7011";
                break;
            case "9":
                route.ggw_id = "7013";
                break;
            case "8":
                route.ggw_id = "7012";
                break;
            case "7":
                route.ggw_id = "7010";
                break;
            case "6":
                route.ggw_id = "7007";
                break;
            case "5":
                route.ggw_id = "7009";
                break;
            case "4":
                route.ggw_id = "7005";
                break;
            case "3":
                route.ggw_id = "7004";
                break;
            case "2":
                route.ggw_id = "7006";
                break;
            default:
                route.ggw_id = "7008";
                break;
        }
    } else if (dq.indexOf("chinabidding.com.cn") != -1 || dq.indexOf("/cblcomcn/Jiekou/") != -1) {
        route.s_source = 12;
    } else {
        if ((!route.s_txt) && dq.indexOf("/html/login") == -1) {
            route.s_url = dq.split("?")[0]
        }
    }
    sessionStorage.setItem("route", JSON.stringify(route));
}

// 获取并存储ggw_id
function setGgwId() {
    var url = location.href;
    var ggw_id = "default";
    if (url.indexOf("ggw_id") !== -1) {
        // url中有ggw_id参数
        var queryList = location.search.substring(1).split("&");
        for (var i = 0; i < queryList.length; i++) {
            if (queryList[i].indexOf("ggw_id") !== -1) {
                ggw_id = queryList[i].split("=")[1]
                localStorage.setItem("ggw_id", ggw_id)
                return ggw_id
            }
        }
    } else if (localStorage.getItem("ggw_id")) {
        ggw_id = localStorage.getItem("ggw_id");
        return ggw_id;
    }
    return ggw_id;
    //else {
    //     var dq = decodeURI(document.referrer);
    //     if (dq.indexOf("/html/index") != -1 || dq == "https://chinabidding.cn/") {
    //         return ggw_id = "7002";
    //     } else if (dq.indexOf("/html/ybcloud") != -1) {
    //         return ggw_id = "7003";
    //     } else if (dq.indexOf("/html/yuanbo") != -1) {
    //         return ggw_id = "7001";
    //     } else if (dq.indexOf("/html/channel") != -1) {

    //         var value = "";
    //         if (dq.split("?")[1] && dq.split("?")[1].split("=")[0] == "channel_id") {
    //             value = dq.split("?")[1].split("=")[1];
    //         } else {
    //             value = "1"
    //         }
    //         switch (value) {
    //             case "10":
    //                 ggw_id = "7011";
    //                 break;
    //             case "9":
    //                 ggw_id = "7013";
    //                 break;
    //             case "8":
    //                 ggw_id = "7012";
    //                 break;
    //             case "7":
    //                 ggw_id = "7010";
    //                 break;
    //             case "6":
    //                 ggw_id = "7007";
    //                 break;
    //             case "5":
    //                 ggw_id = "7009";
    //                 break;
    //             case "4":
    //                 ggw_id = "7005";
    //                 break;
    //             case "3":
    //                 ggw_id = "7004";
    //                 break;
    //             case "2":
    //                 ggw_id = "7006";
    //                 break;
    //             default:
    //                 ggw_id = "7008";
    //                 break;
    //         }
    //         return ggw_id;
    //     }
    //     return ggw_id;
    // }
}

// 获取并存储utm_term
function setUtm() {
    var url = location.href;
    var utm_term = "default";
    if (url.indexOf("utm_term") !== -1) {
        // url中有utm_term参数
        var queryList = location.search.substring(1).split("&");
        for (var i = 0; i < queryList.length; i++) {
            if (queryList[i].indexOf("utm_term") !== -1) {
                utm_term = queryList[i].split("=")[1]
                localStorage.setItem("utm_term", utm_term)
                return utm_term
            }
        }
    } else if (localStorage.getItem("utm_term")) {
        utm_term = localStorage.getItem("utm_term");
        return utm_term;
    }
    return utm_term;
}

// 获取utm_source
function getUtmSource() {
    var url = location.href;
    var utm_source = "default";
    if (url.indexOf("utm_source") !== -1) {
        // utm_source
        var queryList = location.search.substring(1).split("&");
        for (var i = 0; i < queryList.length; i++) {
            if (queryList[i].indexOf("utm_source") !== -1) {
                utm_source = queryList[i].split("=")[1]
                localStorage.setItem("utm_source", utm_source)
                return utm_source
            }
        }
    } else if (localStorage.getItem("utm_source")) {
        utm_source = localStorage.getItem("utm_source");
        return utm_source;
    }
    return utm_source;
}

/**
 * 获取页面url utm值
 * @param {string} item可选的值为utm_source，utm_campaign，utm_content，utm_term
 * @returns {string}
 */
function getUtmType(item) {
    var url = location.href;
    var utm_temp = "default";
    if (url.indexOf(item)!== -1) {
        var queryList = location.search.substring(1).split("&");
        for (var i = 0; i < queryList.length; i++) {
            if (queryList[i].indexOf(item)!== -1) {
                utm_temp = queryList[i].split("=")[1]
                localStorage.setItem(item, utm_temp)
                return utm_temp
            }
        }
    } else if (localStorage.getItem(item)) {
        utm_temp = localStorage.getItem(item);
        return utm_temp;
    }
    return utm_temp;
}

// 获取注册公司信息来源
function getCompanySource(Cname) {
    // var cArr = window.location.href.split("?");
    // var dq = document.referrer.split("?");
    // if(cArr[1] && cArr[1].split("=")[0]=="source"){
    //     if(dq[1] && dq[1].split("=")[0]=="channel_id"){
    //         return Cname+"_频道新"+dq[1].split("=")[1]
    //     }else{
    //         if(cArr[1].split("=")[1] == "3"){
    //             return Cname+"_元博网大数据新"
    //         }else if(cArr[1].split("=")[1] == "2"){
    //             return Cname+"_元博网新"
    //         }else{
    //             return Cname+"_采购与招标网新"
    //         }
    //     }
    // }else{
    //     return Cname+"_采购与招标网新"
    // }
    return Cname
}

// 转化带标签的关键字
function htmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// 客服的生成
function fitKefu() {
    var html = "";
    if (window.location.href.indexOf("login") != -1 || window.location.href.indexOf("register") != -1) {
        html = '<ul class="elevator_list"><li><a href="javascript:qimoChatClick()">查询招标中标</a></li>'
            + '<li><a href="javascript:qimoChatClick()">会员服务咨询</a></li>'
            + '<li><a href="javascript:creditChatClick()">AAA信用评级</a></li>'
            + '<li><a href="javascript:creditBiddingDialog()">代写标书服务</a></li>'
            // + '<li><a href="javascript:qimoChatClick()">查看完整公告</a></li>'
            + '<a class="requ" href="javascript:qimoChatClick()"></a>'
            + '<div class="elevator_tip"><div class="before"></div><div class="contentkf"><div class="p1">联系专属客服</div>'
            + '<div class="p2">姓名：<span></span></div><div class="p3">电话：<span></span></div></div><div class="after"></div></div>'
    } else {
        html = '<ul class="elevator_list"><li><a href="javascript:qimoChatClick()">查询招标中标</a></li>'
            + '<li><a href="javascript:qimoChatClick()">会员服务咨询</a></li>'
            + '<li><a href="javascript:void(0)" class="elevator_credit">AAA信用评级</a></li>'
            + '<li><a href="javascript:creditBiddingDialog()" class="elevator_bid">代写标书服务</a></li></ul>'
            // + '<li><a href="javascript:qimoChatClick()">查看完整公告</a></li>'
            + '<a class="requ" href="javascript:qimoChatClick()"></a>'
            + '<div class="elevator_tip"><div class="before"></div><div class="contentkf"><div class="p1">联系专属客服</div>'
            + '<div class="p2">姓名：<span></span></div><div class="p3">电话：<span></span></div></div><div class="after"></div></div>'
    }
    $(".e_right").html(html);

    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() == 8) {
        $(".e_right .elevator_list").css("margin-left", "14px");
    }

    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() == 7) {
        $(".e_right .elevator_list").css("margin-left", "14px");
        $(".elevator.e_right").css("height", "255px");
        $(".elevator.e_right").css("padding-top", "145px");
        $(".e_right .elevator_list li a ").css({
            "padding": "5px 12px",
            "margin-bottom": 0
        });
    }

    $(".e_right .elevator_tip .after").on('click', function () {
        $(".elevator_tip").hide()
    })

    // 频道页面的适配
    if (window.location.href.indexOf("channel") != -1) {
        $(".e_right .elevator_tip").css("width", "186px");
        $(".e_right .elevator_tip").css("height", "72px");
    }
    if (window.location.href.indexOf("channel") != -1 && (!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() == 7) {
        $(".e_right .elevator_tip").css("left", "-220px");
        $(".e_right .elevator_tip .after").css("right", "53px");
        $(".e_right .elevator_tip .contentkf").css("margin-left", "26px");
        $(".e_right .elevator_tip .before").css("left", "46px");
    }
}

function setKefuzixun(type) {
    if (type == "b" || type == "c" || type == "d" || type == 1 || type == 2 || type == 3){
        $(".elevator_tip .p1").html('标书/征信业务请咨询')
        $(".elevator_tip .p2 span").html('王达')
        $(".elevator_tip .p3 span").html('13810410859')
        $(".e_right .elevator_tip").css({"width": "158px","left":"-230px","background-size":"100% 100%"});

        $(".elevator_bid").attr('href','javascript:void(0)')
        $(".elevator_bid").on("click", function () {
            $(".elevator_tip").show()
        })
    }
}

function creditChatClick() {
    var url = "https://tb.53kf.com/code/client/160d33b8d6369cbb3d8ac9b54e49b8bc7/3"; //更新信用在线咨询代码
    window.open(url, "",
        "height=625,width=750,top=195,left=585,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=yes, status=no"
    );
}

//标书在线咨询弹窗
function creditBiddingDialog() {
    //标书在线咨询代码修改 20220905
    // var url = "https://tb.53kf.com/code/client/ad1242c3030454db49a601a6dd1c437c4/3";
    var url = "https://tb.53kf.com/code/client/ad1242c3030454db49a601a6dd1c437c4/1";
    window.open(url, "",
        "height=625,width=750,top=195,left=585,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=yes, status=no"
    );
}

// 0622详情处理
function ajaxlink(url, ggid, block, target) {
    var params = {}; //分四类，1无关键词 2传keywords 3传blocks_id专题 4传blocks2_id
    params.gg_url = url;
    params.gg_id = ggid;
    params.gg_block = block;

    if (window.location.href.indexOf("channel.html") != -1 || window.location.href.indexOf("channelList.html") != -1 || window.location.href.indexOf("channelZbcg.html") != -1 || window.location.href.indexOf("info.html") != -1) {
        sessionStorage.setItem('infoparams', JSON.stringify(params))
        if (target == "_self") {
            window.location.href = "https://www.chinabidding.cn/public/2020/html/info.html"
        } else {
            window.open("https://www.chinabidding.cn/public/2020/html/info.html")
        }
    } else {
        window.open(url)
    }

}

function postOpenWindow(URL, PARAMS, target) {
    // form表单传参
    if (target == null) target = "_blank";
    var temp_form = document.createElement("form");
    temp_form.action = URL;
    temp_form.target = target;
    temp_form.method = "post";
    temp_form.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp_form.appendChild(opt);
    }
    document.body.appendChild(temp_form);
    temp_form.submit();
    document.body.removeChild(temp_form);

    // raw传参
    // $.ajax({
    //   type: "post",
    //   url: URL,
    //   data: JSON.stringify({
    //     gg_url: PARAMS.gg_url,
    //     gg_id: PARAMS.gg_id,
    //     gg_block: PARAMS.gg_block
    //   }),
    //   dataType: "html",
    //   timing: true,
    //   contentType: "text/plain",
    //   success: function (data) {
    //     document.write(data);
    //   },
    //   error: function (xhr) { //非200表示异常
    //     if (xhr.status != 200) {
    //       window.location.href = "https://www.chinabidding.cn/old_index"
    //     }
    //   }
    // })

    // fetch传参
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "text/plain");
    // myHeaders.append("Cookie", "browser_id=-601670860");

    // var raw = "{ \"gg_url\": \"/zbgg/nw28YR.html\", \"gg_id\": \"\",\"gg_block\": \"\"}";

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch("https://www.chinabidding.cn/yuan/info/detail/info", requestOptions)
    //   .then(response => response.text())
    //   .then(result => window.open(result))
    //   .catch(error => console.log('error', error));

    // xhr请求
    // var data = "{ \"gg_url\": \"/zbgg/nw28YR.html\", \"gg_id\": \"\",\"gg_block\": \"\"}";

    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function() {
    //   if(this.readyState === 4) {
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open("POST", "https://www.chinabidding.cn/yuan/info/detail/info");
    // xhr.setRequestHeader("X-AUTH-TOKEN", "token");
    // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // xhr.setRequestHeader("Cookie", "browser_id=-601670860");

    // xhr.send(data);
}

// ie7不支持json
if (typeof JSON !== "object") {
    JSON = {};
}

// 搜索历史
function showHistoryWord(type) {  //展示搜索历史
    var arr = localStorage.getItem("bidSearchHistory");
    if (arr) {
        arr = JSON.parse(arr);
        if (arr[type] && arr[type].length) {
            var list = arr[type];
            for (var i = 0, html = "", url = ""; i < list.length; i++) {
                if (type == "index") {
                    if ($("#hotwords li:eq(0)").hasClass("active")) {
                        url = "https://www.chinabidding.cn/search/searchgj/zbcg?keywords=" + encodeURI(list[i].replace(/\#/g, " ").replace(/\&/g, " ").replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " "));
                    } else if ($("#hotwords li").eq(1).hasClass("active")) {
                        url = "https://www.chinabidding.cn/search/searchgj/zbcg?table_type=4%2C&keywords=" + encodeURI(list[i].replace(/\#/g, " ").replace(/\&/g, " ").replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " "));
                    } else if ($("#hotwords li").eq(2).hasClass("active")) {
                        url = "https://www.chinabidding.cn/search/searchadvxmxx/search3?keywords=" + encodeURI(list[i].replace(/\#/g, " ").replace(/\&/g, " "));
                    }
                    html += '<li><a href=' + url + ' atype=' + type + ' target="_blank" class="sl">' + list[i] + '</a><i onclick=singleDeleteHW(' + i + ',' + '"' + type + '"' + ')>×</i></li>'
                } else if (type == "channel" || type == "channelList") {
                    html += '<li><a href="javascript:void(0);" atype=' + type + ' onclick=btnClick(' + '"' + list[i].replace(/[\s]+/g, ",") + '"' + ') class="sl">' + list[i] + '</a><i onclick=singleDeleteHW(' + i + ',' + '"' + type + '"' + ')>×</i></li>'
                }
            }
            $(".historywrap").html('<ul>' + html + '</ul><div class="clearh"><a href=javascript:clearHistoryWord(' + '"' + type + '"' + ');>清除历史记录</a></div>').show();

            if (type == "channel" || type == "channelList") {
                $(".top_logo .logo_search .historywrap li").hover(function () {
                    $(this).css("background", current_theme.theme.key_color)
                }, function () {
                    $(this).css("background", "#fff")
                })
            }

            // 监听点击事件
            $(".historywrap li a").on("click", function () {
                addHistoryWord($(this).text(), $(this).attr("atype"));
                if ($(this).attr("atype") == "index") {
                    $("#search .form p").hide();
                    $("#search .form input").val($(this).text());
                } else if ($(this).attr("atype") == "channel" || $(this).attr("atype") == "channelList") {
                    $(".logo_search .placeholderTxt").hide();
                    $(".search_bottom input").val($(this).text());
                }
            })
        }
    }
}
function clearHistoryWord(type) {  //清空搜索历史
    var arr = localStorage.getItem("bidSearchHistory");
    arr = JSON.parse(arr);
    arr[type] = [];
    localStorage.setItem("bidSearchHistory", JSON.stringify(arr))
}
function singleDeleteHW(index, stype) {   //单条删除
    var arr = localStorage.getItem("bidSearchHistory");
    if (arr) {
        arr = JSON.parse(arr);
        if (arr[stype] && arr[stype].length) {
            arr[stype].splice(index, 1);
            localStorage.setItem("bidSearchHistory", JSON.stringify(arr));
            setTimeout(function () {
                $('#inpTxt').focus();
            }, 200)
        }
    }
}
function addHistoryWord(word, type) {  //添加搜索；历史
    var arr = localStorage.getItem("bidSearchHistory");
    var res = {};
    word = word.replace(/\s+/g, " ");
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
var helpHistoryWordFlag = true;
function helpHistoryWord(word, type) {
    if (helpHistoryWordFlag) {
        helpHistoryWordFlag = false;
        setTimeout(function () {
            helpHistoryWordFlag = true;
        }, 300)
    } else {
        return
    }

    var httpxml;
    if (window.XMLHttpRequest) {
        //大多数浏览器
        httpxml = new XMLHttpRequest();
    } else {
        //古董级浏览器
        httpxml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpxml.open("get", "/yuan/search/search/suggest?query=" + encodeURI(word), true);
    httpxml.onreadystatechange = function () {
        if (httpxml.readyState == 4 && httpxml.status == 200) {
            var s;
            if (typeof (JSON) == 'undefined') {
                s = eval("(" + httpxml.responseText + ")");
            } else {
                s = JSON.parse(httpxml.responseText);
            }
            // 渲染数据
            if (s.suggestions && s.suggestions.length) {
                for (var i = 0, html = "", atype = ""; i < s.suggestions.length; i++) {
                    html += '<li><a href="javascript:void(0);" onclick=btnClick(' + '"' + s.suggestions[i].suggestion + '"' + ') class="sl">' + s.suggestions[i].suggestion + '</a></li>'
                }
                $(".historywrap").html('<ul>' + html + '</ul>').show();

                if (type == "channel" || type == "channelList") {
                    $(".top_logo .logo_search .historywrap li").hover(function () {
                        $(this).css("background", current_theme.theme.key_color)
                    }, function () {
                        $(this).css("background", "#fff")
                    })
                }
            } else {
                $(".historywrap").hide()
            }
        }
    }
    httpxml.send();
}

// 适配字体图标
// if(window.location.href.indexOf('bid360.com')!=-1){ //bid360的link引入
//   removeCss('font/iconfont');
//   loadCss('https://cdn.chinabidding.cn/public/2020/font/iconfont2.css?t=20210726a')
// }
function loadCss(href) {
    var addSign = true;
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            addSign = false;
        }
    }
    if (addSign) {
        var $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("type", "text/css");
        $link.setAttribute("href", href);
        document.getElementsByTagName("head").item(0).appendChild($link);
    }
}
function removeCss(href) {
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        var _href = links[i].href;
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            links[i].parentNode.removeChild(links[i]);
        }
    }
}

// 0729aaa活动弹出
function isAAACreditShow(userName) {
    if (localStorage.getItem("aaacreditparams") && userName == "信息客服") {  //210726 aaacredit添加
        var aaacreditparams = JSON.parse(localStorage.getItem("aaacreditparams"));
        if (aaacreditparams.isfirst == '1') {
            $('body').append('<div id="cool_box"><div class="cool" style="background:url(https://cdn.chinabidding.cn/public/2020/img/activity/aaacreditban.png) no-repeat 0 0"></div><div class="cool_close"></div></div>')

            $('#cool_box .cool').click(function () {
                window.open('https://www.chinabidding.cn/public/2020/html/activity/aaacredit.html')
            })
            $('#cool_box .cool_close').click(function () {
                $('#cool_box').remove()
            })

            aaacreditparams.isfirst = '0';
            localStorage.setItem('aaacreditparams', JSON.stringify(aaacreditparams));
        }
    }
}

// 获取token 拿到迁移后产品的跳转连接 1招标大厅 2探项 3标书 4征信 5关系圈
function yjscLink(type,url) {
    var yjsc = {
      handleUrl: function(type){  //url存在就是跳子页面
        var res = {}
        if(type == 1){
          res.domain = 'zbdt'
          res.redirecturl = 'https://zbdt.chinabidding.cn/yuan/login/LoginZBDT/loginZBDTAfter'
          res.mainurl = 'https://zbdt.chinabidding.cn'
          res.url = url?url:''
        }else if(type == 2){
          res.domain = 'plat'
          res.redirecturl = 'https://plat.chinabidding.cn/yuan/login/LoginTXW/loginTXWAfter'
          res.mainurl = 'https://plat.chinabidding.cn'
          res.url = url?url.split('plat.chinabidding.cn')[1]:''
        }else if(type == 3){
          res.domain = 'gxbs'
          res.redirecturl = 'https://gxbs.chinabidding.cn/yuan/login/LoginYBBS/loginYBBSAfter'
          res.mainurl = 'https://gxbs.chinabidding.cn'
          res.url = url?url.split('/yuanbo')[1]:''
        }else if(type == 4){
          res.domain = 'gxzx'
          res.redirecturl = 'https://gxzx.chinabidding.cn/yuan/login/LoginZX/loginZXAfter'
          res.mainurl = 'https://gxzx.chinabidding.cn'
          res.url = url?url.split('/credit')[1]:''
        }else if(type == 5){
          res.domain = 'gxq'
          res.redirecturl = 'https://gxq.chinabidding.cn/yuan/login/LoginGXQ/loginGXQAfter'
          res.mainurl = 'https://gxq.chinabidding.cn/'
          res.url = ""
        }else if (type == 6) {
          res.domain = 'zbdt'
          res.redirecturl = 'https://zbdt.chinabidding.cn/yuan/login/LoginZBDT/loginZBDTAfter'
          res.mainurl = 'https://zbdt.chinabidding.cn'
          res.url = "/#/postMessage"
        } else if (type == 7) {
          res.domain = 'zbdt'
          res.redirecturl = 'https://zbdt.chinabidding.cn/yuan/login/LoginZBDT/loginZBDTAfter'
          res.mainurl = 'https://zbdt.chinabidding.cn'
          res.url = "/#/agentSettled"
        }
        return res
      },
      getIsText: function(){
        var isText = localStorage.getItem('isText'); // ##wu每次跳转前先获取当前的登录状态
        return isText
      }
    }
    var isText = yjsc.getIsText();
    var r = yjsc.handleUrl(type);
    r.url = r.url?r.url:'';
    if (isText == 1){
      var httpxml;
      if (window.XMLHttpRequest) {
        //大多数浏览器
        httpxml = new XMLHttpRequest();
      } else {
        //古董级浏览器
        httpxml = new ActiveXObject("Microsoft.XMLHTTP");
      }
      httpxml.open("get", "/yuan/login/loginnew/yjscGetToken", true);
      httpxml.onreadystatechange = function () {
        if (httpxml.readyState == 4 && httpxml.status == 200) {
          var s;
          if (typeof (JSON) == 'undefined') {
            s = eval("(" + httpxml.responseText + ")");
          } else {
            s = httpxml.responseText
          }
          // 处理逻辑
          window.open('https://sso.chinabidding.cn/third/index.html#token='+s+'&domain='+r.domain+'&redirecturl='+r.redirecturl+'&url='+encodeURIComponent(r.url))
        }else if (httpxml.readyState == 4 && httpxml.status != 200) {
          window.open(r.mainurl+r.url)
        }
      }
      httpxml.send();
    } else {
      window.open(r.mainurl+r.url)
    }
}
// 跳转原采招网
function linkYuanbo(_url,type){
    var form = null
    form = document.createElement("form")
    form.action = "https://www.chinabidding.cn/yuan/login/login4yjsc/changeyjscurl"
    form.method = "post"
    form.target = type?"_blank":"_self"
    var url = null
    var token = null
    url = document.createElement("input")
    token = document.createElement("input")
    token.type = "hidden"
    token.name = "token"
    token.value = $.cookie('token')
    url.type = "hidden"
    url.name = "url"
    url.value = _url
    form.appendChild(url)
    form.appendChild(token)
    $(document.body).append(form)
    form.submit()
}

// 登录后跳转中转页面
function linkZhongzhuan(url) {
    var sid = $.cookie("CBL_SESSION") || "";
    if (sid) {
        sid = sid.slice(sid.indexOf("___ID=")+6);
    }
    if(sid) {
        window.location.href = "https://www.chinabidding.cn/public/2020/html/zhongzhuan.html?sid="+sid+"&url="+url;
    } else {
        window.location.href = url;
    }
}

(function() {
    function _ajaxsetup() {
        if (typeof ($._ajax) == "undefined") {
            $._ajax = $.ajax;
            $.ajax = function(a, b) {
                // 修改或者移除不需要的部分

                return $._ajax(a, b);
            };
        }

        // 其他的逻辑...

        // 添加或者修改其他的钩子函数

    }

    // 调用新的 _ajaxsetup 函数
    _ajaxsetup();

    // 将新的函数绑定到全局作用域上，覆盖旧的函数
    window._ajaxsetup = _ajaxsetup;
})();

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return (n < 10) ?
            "0" + n :
            n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf()) ?
                (
                    this.getUTCFullYear() +
                    "-" +
                    f(this.getUTCMonth() + 1) +
                    "-" +
                    f(this.getUTCDate()) +
                    "T" +
                    f(this.getUTCHours()) +
                    ":" +
                    f(this.getUTCMinutes()) +
                    ":" +
                    f(this.getUTCSeconds()) +
                    "Z"
                ) :
                null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) ?
            "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string" ?
                    c :
                    "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\"" :
            "\"" + string + "\"";
    }


    function str(key, holder) {

        // Produce a string from holder[key].

        var i; // The loop counter.
        var k; // The member key.
        var v; // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (
            value &&
            typeof value === "object" &&
            typeof value.toJSON === "function"
        ) {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case "string":
                return quote(value);

            case "number":

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return (isFinite(value)) ?
                    String(value) :
                    "null";

            case "boolean":
            case "null":

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce "null". The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

            // If the type is "object", we might be dealing with an object or an array or
            // null.

            case "object":

                // Due to a specification blunder in ECMAScript, typeof null is "object",
                // so watch out for that case.

                if (!value) {
                    return "null";
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === "[object Array]") {

                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0 ?
                        "[]" :
                        gap ?
                            (
                                "[\n" +
                                gap +
                                partial.join(",\n" + gap) +
                                "\n" +
                                mind +
                                "]"
                            ) :
                            "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                    (gap) ?
                                        ": " :
                                        ":"
                                ) + v);
                            }
                        }
                    }
                } else {

                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                    (gap) ?
                                        ": " :
                                        ":"
                                ) + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0 ?
                    "{}" :
                    gap ?
                        "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" :
                        "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = { // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

            // If the space parameter is a number, make an indent string containing that
            // many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

                // If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" && (
                typeof replacer !== "object" ||
                typeof replacer.length !== "number"
            )) {
                throw new Error("JSON.stringify");
            }

            // Make a fake root object containing our value under the key of "".
            // Return the result of stringifying the value.

            return str("", {
                "": value
            });
        };
    }


    // If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return (
                        "\\u" +
                        ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    );
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with "()" and "new"
            // because they can cause invocation, and "=" because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
            // replace all simple value tokens with "]" characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or "]" or
            // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function") ?
                    walk({
                        "": j
                    }, "") :
                    j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());
