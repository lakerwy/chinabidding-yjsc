function renderRecommendN(data,mqcg) {
  if (data.rec_l && data.rec_l.list && data.rec_l.list.length) {
    var list1 = data.rec_l.list;
    var html1 = "";
    // var end1 = list1.length > 5 ? 5 : list1.length;
    for (var i = 0; i < list1.length; i++) {
      list1[i].title = list1[i].title.replace(/【[^【]+】/, '');
      // https://www.chinabidding.cn/public/2020/html
      html1 += '<li class="item swiper-slide"><a title="' + list1[i].title + '"  href=javascript:ajaxlink(' + '"' + list1[i].url + '","' + list1[i].id + '"' + ')><div class="left">' + list1[i].area + '</div><div class="content">' + list1[i].title + '</div><div class="right"><img src="https://cdn.chinabidding.cn/public/2020/img/special/eye.png" alt=""><span>' + list1[i].rank + '</span></span></div></a>'
    }
    $("#recommend_n .free ul").append(html1);
    $("#recommend_n .free .fSwiper").kxbdMarquee({
      direction: "up",
      loop: 0, //无限滚动
      scrollAmount: 1, //步长
      scrollDelay: 48, //时长
      isEqual: true
    });
  }
  if (data.rec_m.list && data.rec_m.list.length) {
    var list2 = deduplicationData(mqcg, data.rec_m.list);
    var html2 = "";
    for (var i = 0; i < list2.length; i++) {
      if (list2[i].title) {
        html2 += '<li class="item"><a title="' + list2[i].title + '" target="_blank" href="https://www.chinabidding.cn/public/2020/html/special/index.html?id=' + (list2[i].id ? list2[i].id : "") + '"><span class="left"></span>' + list2[i].title + '</a></li>'
        
      } else {
        html2 += '<li class="item"><a title="' + list2[i].FCompanyName + '" target="_blank" href="https://www.chinabidding.cn/public/bidagency/index.html#/famousEnterprisePro/enterpriseDetails?fid='+list2[i].FID+'"><span class="left"></span>' + list2[i].FCompanyName + '</a></li>'
        
      }
      // https://www.chinabidding.cn/public/2020/html test
      // html2 += '<li class="item"><a title="' + list2[i].title + '" target="_blank" href="https://www.chinabidding.cn/public/2020/html/special/index.html?id=' + (list2[i].id ? list2[i].id : "") + '"><span class="left"></span>' + list2[i].title + '</a></li>'
    }
    $("#recommend_n .special ul").append(html2);
    if(list2.length>5){
      $("#recommend_n .special .fSwiper").kxbdMarquee({
        direction: "up",
        loop: 0, //无限滚动
        scrollAmount: 1, //步长
        scrollDelay: 48, //时长
        isEqual: true
      });
    }
  }
  if (data.rec_n && data.rec_n.list && data.rec_n.list.length) {
    var list3 = data.rec_n.list;
    list3 = [
      {
        title: '鞍钢招标有限公司'
      },
      {
        title: '中国电能成套设备有限公司'
      },
      {
        title: '上海东松医疗科技股份有限公司'
      },
      {
        title: '振石控股集团有限公司'
      },
      {
        title: '中国建设银行'
      }
    ]
    var html3 = "";
    var end3 = list3.length > 5 ? 5 : list3.length;
    for (var i = 0; i < end3; i++) {
      html3 += '<li class="item"><a style="cursor:auto;" title="' + list3[i].title + '" href="javascript:void(0);"><span class="left">' + (i + 1) + '</span>' + list3[i].title + '</a></li>'
    }
    $("#recommend_n .companyList").append(html3);
  }
}

function deduplicationData(data1,data2) {
  var newData1 = [];
  var newArr = [];
  if (!data1) return data2;
  for (var i = 0; i < data1.length; i++){
    for (var j = 0; j < data2.length; j++){
      if (data1[i].FCompanyName == data2[j].title) {
        data2.splice(j,1)
      }
    }
  };
  newArr = data1.concat(data2);
  console.log(newArr,'neeArr');
  return newArr
}

function b_s_title(bData) {
  var html = "";
  for (var i = 0; i < bData.length; i++) {
    // html += "<a href='javascript:void(0);' onclick=bstLink('" + bData[i].txt_a + "')>" + bData[i].txt1 + "</a>";
    html += "<a href=" + bData[i].txt_a + " target='_blank' rel>" + bData[i].txt1 + "</a>";
    if (i != bData.length - 1) {
      html += '<span>/</span>'
    }
  }
  return html;
}

function bstLink(url) {
  if (!((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8)) {
    isText = localStorage.getItem('isText'); // ##wu每次跳转前先获取当前的登录状态
  }
  if (true) { //210124isText==1  直接打开搜索页
    window.open(encodeURI(url))
  } else {
    sessionStorage.setItem('url', encodeURI(url))
    window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
  }
}

function b_s_hotkey(hData, kData) {
  var html = "",
    html1 = "";
  for (var i = 0; i < kData.length; i++) {
    html += '<a href=' + kData[i].txt_a + ' target="_blank">' + kData[i].txt1 + '</a>';
    // html += "<a href='javascript:void(0);' onclick=bstLink('" + kData[i].txt_a + "')>" + kData[i].txt1 + '</a>';
  }
  for (var j = 0; j < hData.length; j++) {
    html1 += '<a href=' + hData[j].txt_a + ' target="_blank">' + hData[j].txt1 + '</a>';
    // html1 += "<a href='javascript:void(0);' onclick=bstLink('" + hData[j].txt_a + "')>" + hData[j].txt1 + '</a>';
    if (j != hData.length - 1) {
      html1 += '<span>/</span>'
    }
  }
  if (html == "") {
    return '<div class="hotbox cl"><h4>' + html1 + '</h4></div>'
  } else {
    return '<div class="hotbox cl"><h4>' + html1 + '</h4><div class="hotkey">' + html + '</div></div>'
  }
}

function b_s_hotlist(lData) {
  var html = "";
  for (var i = 0; i < lData.length; i++) {
    html += '<a href=' + lData[i].txt_a + ' target="_blank">' + lData[i].txt1 + '</a>';
    // html += "<a href='javascript:void(0);' onclick=bstLink('" + lData[i].txt_a + "')>" + lData[i].txt1 + '</a>';
  }
  return '<p>' + html + '</p>';
}

function b_s_hotad(adData) {
  var html = "";
  for (var i = 0; i < adData.length; i++) {
    html += '<a href=' + adData[i].txt_a + '> <img src=' + adData[i].txt1 + '></a>';
  }
  return '<div class="hot_ad">' + html + '</div>';
}

function b_s_sortr(banList) {
  if (!((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8)) {
    $(".sort_r .col21").html("");
    for (var i = 0; i < banList.length; i++) {
      bannerList.push({
        "img": banList[i].txt_a,
        "a": banList[i].txt1,
        "video_flag": banList[i].video_flag,
        "class": banList[i].class
      })

      // if (i == 0) {
      //   bannerList[0].a = "javascript:void(0);"
      // } else if (i == 1) {
      //   bannerList[0].a = "javascript:void(0);"
      // } else if (i == 2) {
      //   bannerList[1].a = "https://www.chinabidding.cn/cblcn/biddingdoc/personalData"
      // } else if (i == 3) {
      //   bannerList[2].a = "https://credit.chinabidding.cn/"
      // }
      // else if(i == 2){
      //     bannerList[2].a = "https://www.chinabidding.cn/public/cblcn/Fangkong/index2.html#/nav1"
      // }
    }
    $('.col21').slider({
      imgList: bannerList, //图片的列表
      imgLR: [{
        img: 'https://cdn.chinabidding.cn/public/2020/img/sy_cont_icon5.png?t=20210205a'
      },
      {
        img: 'https://cdn.chinabidding.cn/public/2020/img/sy_cont_icon5(1).png?t=20210205a'
      }
      ], //左右切换按钮
      width: 620, //图片的宽
      height: 400, //图片的高
      isAuto: true, //是否自动轮播
      moveTime: 5000, //运动时间
      direction: 'right', //轮播的方向
      btnWidth: 40, //按钮的宽
      btnHeight: 60, //按钮的高
      spanWidth: 10, //span按钮的宽
      spanHeight: 10, //span按钮的高
      spanColor: 'rgba(255,255,255,.3)', //span按钮的颜色
      activeSpanColor: 'rgba(255,255,255,1)', //选中的span颜色
      btnBackgroundColor: 'rgba(0, 0, 0, 0.3)', //两侧按钮的颜色
      spanRadius: '50%', //span按钮的圆角程度
      spanMargin: 3, //span之间的距离
      nowIndex: bannerParams //第几个banner
    })
  } else { //ie8以下banner单独处理

    $("#js_banner").show();

    new $.Tab({
      target: $('#js_banner_img li'),
      effect: 'slide3d',
      animateTime: 1000,
      stay: 3500,
      autoPlay: true,
      merge: true,
      playTo: ieBannerParams,
      prevBtn: $('#js_banner_pre'),
      nextBtn: $('#js_banner_next')
    });
  }
  handlePlay()
  return false
}

function r_rec_l(recData) {
  var html = "",
    html1 = "";
  for (var i = recData.title.length - 1; i >= 0; i--) {
    html += "<span class='rec_ml" + i + "'><a href=" + recData.title[i].txt_a + " target='_blank'>" + recData.title[
      i].txt1 + "</a></span>"
  }
  $("#recommend .rec_l h4").append(html);
  // for(var j=0;j<recData.list.length && j < 9;j++){
  //     if(recData.list[j].title.length < 28){
  //         html1 += "<li><a href="+recData.list[j].url+" title="+recData.list[j].title+" target='_blank'>"+recData.list[j].title.substring(0,27)+"</a><span>"+recData.list[j].date+"</span></li>"
  //     }else{
  //         html1 += "<li><a href="+recData.list[j].url+" title="+recData.list[j].title+" target='_blank'>"+recData.list[j].title.substring(0,27)+"..."+"</a><span>"+recData.list[j].date+"</span></li>"
  //     }
  // }
  for (var j = 0; j < recData.list.length && j < 9; j++) {
    if (recData.list[j].title.length < 31) {
      html1 += "<li><a href=javascript:ajaxlink(" + "'" + recData.list[j].url + "','" + recData.list[j].id + "'" + ") title=" + recData.list[j].title + ">" +
        recData.list[j].title.substring(0, 30) + "</a><i></i></li>"
    } else {
      html1 += "<li><a href=javascript:ajaxlink(" + "'" + recData.list[j].url + "','" + recData.list[j].id + "'" + ") title=" + recData.list[j].title + ">" +
        recData.list[j].title.substring(0, 30) + "..." + "</a><i></i></li>"
    }
  }
  $("#recommend .rec_l .list").html(html1);
  return false
}

function r_rec_r(recData) {
  var html = "",
    html1 = "";
  for (var i = 0, title1 = "", title2 = ""; i < recData.list.length && i < 4; i++) {
    title1 = recData.list[i].title.length < 12 ? recData.list[i].title : recData.list[i].title.substring(0, 11) +
      "...";
    if (i == 1) { //第一个加链接
      title2 = recData.list[i].rank.length < 12 ? recData.list[i].rank : recData.list[i].rank.substring(0, 11) +
        "...";
      html += "<li><img src='https://cdn.chinabidding.cn/public/2020/img/sy_cont_bg_top" + (i + 1) +
        ".png' class='coml_l'><div class='coml_r'><a href='javascript:void(0);' onclick='openCompany()' title=" +
        recData.list[i].title + ">" + title1 + "</a><p title=" + recData.list[i].rank +
        " onclick='openCompany()' style='cursor:pointer'>" + title2 + "</p></div></li>"
    } else if (i == 0) {
      html += "<li><img src='https://cdn.chinabidding.cn/public/2020/img/sy_cont_bg_top" + (i + 1) +
        ".png' class='coml_l'><div class='coml_r'><a href='https://www.chinabidding.cn/cblcn/ynpx/index' target='_blank' title=" + recData.list[i].title +
        ">" + title1 + "</a><p>&nbsp;</p></div></li>"
    } else {
      html += "<li><img src='https://cdn.chinabidding.cn/public/2020/img/sy_cont_bg_top" + (i + 1) +
        ".png' class='coml_l'><div class='coml_r'><a href='javascript:void(0);' title=" + recData.list[i].title +
        ">" + title1 + "</a><p>&nbsp;</p></div></li>"
    }
  }
  $("#recommend .rec_r .com_l").html(html);
  for (var j = 4; j < recData.list.length; j++) {
    if (recData.list[j].title.length < 12) {
      html1 += "<li><p title=" + recData.list[j].title + "><i>" + (j + 1) + "</i>" + recData.list[j].title +
        "</p></li>"
    } else {
      html1 += "<li><p title=" + recData.list[j].title + "><i>" + (j + 1) + "</i>" + recData.list[j].title
        .substring(0, 11) + "...</p></li>"
    }

  }
  $("#recommend .rec_r .com_r").html(html1);
  return false
}

function openCompany() {
  window.open("https://www.chinabidding.cn/cblcn/fygj/index")
}

function r_rel_left(relData) {
  var html = "",
    htmlt1 = "",
    htmlc1 = "",
    htmlt2 = "";
  for (var i = 0; i < relData.length && i < 7; i++) {
    if(relData[i].title){
      htmlt1 = relData[i].title.length < 20 ? relData[i].title : relData[i].title.substring(0, 19) + "...";
      htmlt2 = relData[i].title.length < 26 ? relData[i].title : relData[i].title.substring(0, 25) + "...";
    }
    if(relData[i].content){
      htmlc1 = relData[i].content.length < 48 ? relData[i].content : relData[i].content.substring(0, 47) + "...";
    }
    if (i == 0) {
      html += "<li class='cl'><a rel='nofollow' href=javascript:yjscLink(" + 2 +",'" + relData[i].url + "'" + ") title=" + relData[i]
        .title +
        "><img src='https://cdn.chinabidding.cn/public/2020/img/sy_cont_image12.png' class='list_l'><div class='list_r'><p class='l_p1'>" +
        htmlt1 + "</p><p class='l_p2'>" + htmlc1 + "</p><p class='l_p3'>" + relData[i].date + "</p></div></a></li>"
    } else {
      html += "<li><a href=javascript:yjscLink("+ 2 + ",'" + relData[i].url + "'" + ") title=" + relData[i].title + ">" + htmlt2 +
        "</a><span>" + relData[i].date + "</span></li>"
    }
  }
  $("#release .list").eq(0).html(html);
}

function r_rel_right(relData) {
  var html = "",
    htmlt1 = "",
    htmlc1 = "",
    htmlt2 = "";
  for (var i = 0; i < relData.length && i < 7; i++) {
    if(relData[i].title){
      htmlt1 = relData[i].title.length < 20 ? relData[i].title : relData[i].title.substring(0, 19) + "...";
      htmlt2 = relData[i].title.length < 26 ? relData[i].title : relData[i].title.substring(0, 25) + "...";
    }
    if(relData[i].content){
      htmlc1 = relData[i].content.length < 48 ? relData[i].content : relData[i].content.substring(0, 47) + "...";
    }
    if (i == 0) {
      html += "<li class='cl'><a rel='nofollow' href=javascript:ajaxlink(" + "'" + relData[i].url + "','" + relData[i].id + "'" + ") title=" + relData[i]
        .title +
        "><img src='https://cdn.chinabidding.cn/public/2020/img/sy_cont_image13.png' class='list_l'><div class='list_r'><p class='l_p1'>" +
        htmlt1 + "</p><p class='l_p2'>" + htmlc1 + "</p><p class='l_p3'>" + relData[i].date + "</p></div></a></li>"
    } else {
      html += "<li><a href=javascript:ajaxlink(" + "'" + relData[i].url + "','" + relData[i].id + "'" + ") title=" + relData[i].title + ">" + htmlt2 +
        "</a><span>" + relData[i].date + "</span></li>"
    }
  }
  $("#release .list").eq(1).html(html);
}

function c_news_l(newsData) {
  var html = "",
    html1 = "",
    img = "";
  for (var i = 0; i < newsData.length && i < 2; i++) {
    img = i == 0 ? "https://cdn.chinabidding.cn/public/2020/img/sy_cont_image10.png" :
      "https://cdn.chinabidding.cn/public/2020/img/sy_cont_image11.png"
    html += "<a href=javascript:ajaxlink(" + "'" + newsData[i].url + "','" + newsData[i].id + "'" + ") title=" + newsData[i].title + "><img src=" + img +
      "></a>"
  }
  $("#news .news_l").html(html);
  for (var j = 2; j < newsData.length; j++) {
    if (newsData[j].title.length < 32) {
      html1 += "<li><a href=javascript:ajaxlink(" + "'" + newsData[j].url + "','" + newsData[j].id + "'" + ") title=" + newsData[j].title + ">" + newsData[j]
        .title + "</a><span>" + newsData[j].date + "</span></li>"
    } else {
      html1 += "<li><a href=javascript:ajaxlink(" + "'" + newsData[j].url + "','" + newsData[j].id + "'" + ") title=" + newsData[j].title + ">" + newsData[j]
        .title.substring(0, 31) + "..." + "</a><span>" + newsData[j].date + "</span></li>"
    }
  }
  $("#news .news_r").html(html1);
}

function c_like_l(likeData, flag) {
  var list, imgUrl;
  if (flag == "xmxx"){
    list = ".list2";
    imgUrl = "https://cdn.chinabidding.cn/public/2020/img/sy_cont_image12.png";
  } else {
    list = ".list";
    imgUrl = "https://cdn.chinabidding.cn/public/2020/img/sy_cont_image9.png";
  }
  var html = "",
    htmlt1 = "",
    htmlc1 = "",
    htmlt2 = "";
  for (var i = 0; i < likeData.length && i < 7; i++) {
    if(likeData[i].title){
      htmlt1 = likeData[i].title.length < 20 ? likeData[i].title : likeData[i].title.substring(0, 19) + "...";
      htmlt2 = likeData[i].title.length < 25 ? likeData[i].title : likeData[i].title.substring(0, 24) + "...";
    }
    if(likeData[i].content){
      htmlc1 = likeData[i].content.length < 48 ? likeData[i].content : likeData[i].content.substring(0, 47) + "...";
    }
    if (i == 0) {
      html += "<li class='cl'><a href=javascript:ajaxlink(" + "'" + likeData[i].url + "','" + likeData[i].id + "'" + ") title=" + likeData[i].title +
        "><img src="+ imgUrl +" class='list_l'><div class='list_r'><p class='l_p1'>" +
        htmlt1 + "</p><p class='l_p2'>" + htmlc1 + "</p><p class='l_p3'>" + likeData[i].date + "</p></div></a></li>"
    } else {
      html += "<li><a href=javascript:ajaxlink(" + "'" + likeData[i].url + "','" + likeData[i].id + "'" + ") title=" + likeData[i].title +
        ">" + htmlt2 +
        "</a><span>" + likeData[i].date + "</span></li>"
    }
  }
  // $("#like .list").eq(0).html(html);
  $("#like "+ list).eq(0).html(html);
}

function randomlist(data, max) {
  var arr = [],
    arr1 = [];
  for (var i = 0; i < max; i++) {
    var n = parseInt(Math.random() * data.length + 0); //随机生成整形数
    if (arr.length == 0) {
      arr.push(n); //从末尾插入数组
    } else {
      if (arr.indexOf(n) < 0) {
        arr.push(n);
      } else {
        i--;
      }

    }
  }

  for (j = 0; j < arr.length; j++) {
    arr1.push(data[arr[j]])
  }

  return arr1
}

function edithots(data) {
  for (var i = 0, html = ""; i < data.length; i++) {
    html += "<a href='javascript:void(0);' onclick=linkhots(" + "'" + data[i].title + "'" + ")>" + data[i].title +
      "</a>"
  }
  $("#header .hots").html(html);
}

function linkhots(txt) {
  addHistoryWord(txt, "index");
  $("#search .form p").hide();
  $("#search .form input").val(txt);
  window.open("https://www.chinabidding.cn/search/searchgj/zbcg?keywords=" + encodeURI(txt.replace(/\#/g, " ").replace(/\&/g, " ").replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " ")) + "&b_date=week")
}

// 获取当前小时（每隔1个小时，获取当前时间）
function hourReport() {
  var time = new Date();
  var hours = time.getHours();
  var mins = time.getMinutes();
  var secs = time.getSeconds();
  var next = ((60 - mins) * 60 - secs) * 1000;
  timeChage(hours);
  setTimeout(hourReport, next);
  if (mins == 0) {
    timeChage(hours);
  }
}

function timeChage(currentTime) {
  if (1 <= currentTime && currentTime <= 3) {
    $(".user_txt h4").html("您好")
  } else if (4 <= currentTime && currentTime <= 9) {
    $(".user_txt h4").html("早上好")
  } else if (10 <= currentTime && currentTime <= 11) {
    $(".user_txt h4").html("上午好")
  } else if (12 <= currentTime && currentTime <= 13) {
    $(".user_txt h4").html("中午好")
  } else if (14 <= currentTime && currentTime <= 18) {
    $(".user_txt h4").html("下午好")
  } else if ((19 <= currentTime && currentTime <= 24) || currentTime == 0) {
    $(".user_txt h4").html("晚上好")
  }
  return false
}


// 发布信息
function sendMsg() {
  // 发布信息逻辑 2022/10/20以前的内容————————————————————————————————————
  // isText = localStorage.getItem('isText'); // ##wu每次跳转前先获取当前的登录状态
  // if (isText == 1) {
  //     window.open("https://www.chinabidding.cn/info/fbxx/fbgg")
  // } else {
  //     sessionStorage.setItem('url', "https://www.chinabidding.cn/info/fbxx/fbgg")
  //     window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
  // }


  // 2022/10/20修改的内容————————————————————————————————————————————————————
  var httpxml
  if (window.XMLHttpRequest) {
    //大多数浏览器
    httpxml = new XMLHttpRequest()
  } else {
    //古董级浏览器
    httpxml = new ActiveXObject('Microsoft.XMLHTTP')
  }
  httpxml.open(
    'get',
    '/cblcn/Home/newLoginCheck?t='+ new Date().getTime(),
    true
  )
  httpxml.onreadystatechange = function () {
    if (httpxml.readyState == 4 && httpxml.status == 200) {
      var res
      if (typeof JSON == 'undefined') {
        res = eval('(' + httpxml.responseText + ')')
      } else {
        res = JSON.parse(httpxml.responseText)
      }
      // res.text_view = 1
      // res.is_yuan = 1
      // res.his_fbxx = 1
      // res.agent_view = 0
      // console.log(res.text_view, 'ssssssssss')

      if (res.text_view) {  //是否登录
        if(res.agent_view){ //是否入驻
          yjscLink(6)
        }else{
          if(!res.his_fbxx){
            var str ='<div class="agencyReg_frame">' +
              '<h3 class="title">' +
              '<img src="https://cdn.chinabidding.cn/public/2020/img/public/tx.png" alt="">'+
              '<span>提示</span>' +
              '<span class="iconfont agencyReg_moduleClose" onclick="closeAgencyRegModule(1)">&#xe617;</span>' +
              '</h3>' +
              '<div class="content">' +
              '<p class="text2">' +
              '发布公告信息需先入驻，入驻审核通过后您可以<br>免费使用招标工作台、发布信息、管理信息等;' +
              '</p>' +
              '</div>' +
              '<div class="btnGroup">' +
              '<div class="btn active">' +
              '<a href="javascript:void(0);" onclick="closeAgencyRegModule(2)">' +
              '立即入驻' +
              '</a>' +
              '</div>' +
              '</div>' +
              '</div>';
            var module = $('<div></div>')
            module.attr('id', 'agencyReg_module')
            module.html(str)
            $('body').append(module)
          }else{
            window.open('/info/fbxx/fbgg')
          }
        }
      } else {
        sessionStorage.setItem('url', location.href)
        window.open(
          '/public/2020/html/login.html?source=1'
        )
      }
    }
  }
  httpxml.send()
}

//入驻弹框关闭
function closeAgencyRegModule(flag) {
  $('#agencyReg_module').remove()
  flag==2 && yjscLink(7)
}

function outLogin() { //登出
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
    var httpxml;
    if (window.XMLHttpRequest) {
      //大多数浏览器
      httpxml = new XMLHttpRequest();
    } else {
      //古董级浏览器
      httpxml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpxml.open("get", "/yuan/logout/logout/tologout", true);
    httpxml.onreadystatechange = function () {
      if (httpxml.readyState == 4 && httpxml.status == 200) {
        var s;
        if (typeof (JSON) == 'undefined') {
          s = eval("(" + httpxml.responseText + ")");
        } else {
          s = JSON.parse(httpxml.responseText);
        }
        if (s.code == 200) {
          localStorage.setItem('isText', 0);
          history.go(0);
        }
      }
    }
    httpxml.send();
  } else {
    $.ajax({
      type: "get",
      url: "/yuan/logout/logout/tologout",
      async: false,
      dataType: "json",
      success: function (data) {
        if (data.code == 200) {
          localStorage.setItem('isText', 0);
          history.go(0);
        }
      }
    })
  }
}

// 快速注册逻辑
$(".log_col1 .log_p").click(function () {
  $(".log_col1 .log_p").hide();
  $(".log_col1 input").focus();
})
$(".log_col2 .log_p").click(function () {
  $(".log_col2 .log_p").hide();
  $(".log_col2 input").focus();
})
$(".log_col3 .log_p").click(function () {
  $(".log_col3 .log_p").hide();
  $(".log_col3 input").focus();
})
$(".log_col5 .log_p").click(function () {
  $(".log_col5 .log_p").hide();
  $(".log_col5 input").focus();
})
$(".log_col6 .log_p").click(function () {
  $(".log_col6 .log_p").hide();
  $(".log_col6 input").focus();
})
$(".log_col1 input").focus(function () {
  $(".log_col1 .log_p").hide();
})
$(".log_col2 input").focus(function () {
  $(".log_col2 .log_p").hide();
})
$(".log_col3 input").focus(function () {
  $(".log_col3 .log_p").hide();
})
$(".log_col5 input").focus(function () {
  $(".log_col5 .log_p").hide();
})
$(".log_col6 input").focus(function () {
  $(".log_col6 .log_p").hide();
})

function closeLog() {
  var date = new Date().toLocaleDateString()
  localStorage.setItem("regFlag", date);
  $(".fast_box").hide();
  $(".elevator.e_right").removeClass("quick_reg");
}



$("#loginname").blur(function () {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
    if ($("#loginname").val() == "") {
      $(".log_col1 .log_p").show();
    }
  }
  regPhone();
})
$("#yzm").blur(function () {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
    if ($("#yzm").val() == "") {
      $(".log_col2 .log_p").show();
    }
  }
  regCodeImg();
})
$("#yzmcode").blur(function () {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
    if ($("#yzmcode").val() == "") {
      $(".log_col3 .log_p").show();
    }
  }
  regPhoneCode();
})
$("#lxname").blur(function () {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
    if ($("#lxname").val() == "") {
      $(".log_col5 .log_p").show();
    }
  }
  regLxname();
})
$("#companyName").blur(function () {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
    if ($("#companyName").val() == "") {
      $(".log_col6 .log_p").show();
    }
  }
  regCompanyName();
})



$("#getCode").click(function () {
  var flag1 = regPhone();
  var flag2 = regCodeImg();
  if (flag1 && flag2) {
    // 发送验证码
    var logTxt = $("#loginname").val();
    var imgTxt = $("#yzm").val();
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
      var httpxml;
      if (window.XMLHttpRequest) {
        //大多数浏览器
        httpxml = new XMLHttpRequest();
      } else {
        //古董级浏览器
        httpxml = new ActiveXObject("Microsoft.XMLHTTP");
      }
      httpxml.open("post", "/yuan/register/registernew/sendmessageyzm", true);
      httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      httpxml.onreadystatechange = function () {
        if (httpxml.readyState == 4 && httpxml.status == 200) {
          // 清除样式
          $(".log_col1 .msg_error").hide();
          $(".log_col1").removeClass("error_color");
          $(".log_col1 .msg_error p").html("");
          $(".log_col2 .msg_error").hide();
          $(".log_col2").removeClass("error_color");
          $(".log_col2 .msg_error p").html("");
          $(".log_col3 .msg_error").hide();
          $(".log_col3").removeClass("error_color");
          $(".log_col3 .msg_error p").html("");
          var s;
          if (typeof (JSON) == 'undefined') {
            s = eval("(" + httpxml.responseText + ")");
          } else {
            s = JSON.parse(httpxml.responseText);
          }
          if (s.isSuccess) {
            // 开始倒计时
            clearInterval(timer);
            $("#getCode").addClass("notclick");
            // 60s倒计时
            var timer = null;
            var index = 60;
            $("#getCode").html(index + "S后可重发");
            timer = setInterval(function () {
              index--;
              $("#getCode").html(index + "S后可重发");
              if (index == 0) {
                $("#getCode").removeClass("notclick");
                $("#getCode").html("重新获取验证码");
                clearInterval(timer);
              }
            }, 1000)
          } else {
            if (s.code == 543) {
              $(".log_col1 .msg_error").show();
              $(".log_col1").addClass("error_color")
              $(".log_col1 .msg_error p").html(s.msg);
            } else if (s.code == 556) {
              $(".log_col3 .msg_error").show();
              $(".log_col3").addClass("error_color")
              $(".log_col3 .msg_error p").html("短信发送失败");
            } else {
              $(".log_col2 .msg_error").show();
              $(".log_col2").addClass("error_color")
              $(".log_col2 .msg_error p").html(s.msg);
            }
            changeYzm();
          }
        }
      }
      httpxml.send("phone=" + convert1(logTxt) + "&yzm=" + convert1(imgTxt));
    } else {
      $.ajax({
        type: "post",
        url: "/yuan/register/registernew/sendmessageyzm",
        data: {
          phone: convert1(logTxt),
          yzm: convert1(imgTxt)
        },
        dataType: "json",
        success: function (data) {
          // 清除样式
          $(".log_col1 .msg_error").hide();
          $(".log_col1").removeClass("error_color");
          $(".log_col1 .msg_error p").html("");
          $(".log_col2 .msg_error").hide();
          $(".log_col2").removeClass("error_color");
          $(".log_col2 .msg_error p").html("");
          $(".log_col3 .msg_error").hide();
          $(".log_col3").removeClass("error_color");
          $(".log_col3 .msg_error p").html("");
          if (data.isSuccess) {
            // 开始倒计时
            clearInterval(timer);
            $("#getCode").addClass("notclick");
            // 60s倒计时
            var timer = null;
            var index = 60;
            $("#getCode").html(index + "S后可重发");
            timer = setInterval(function () {
              index--;
              $("#getCode").html(index + "S后可重发");
              if (index == 0) {
                $("#getCode").removeClass("notclick");
                $("#getCode").html("重新获取验证码");
                clearInterval(timer);
              }
            }, 1000)
          } else {
            if (data.code == 543) {
              $(".log_col1 .msg_error").show();
              $(".log_col1").addClass("error_color")
              $(".log_col1 .msg_error p").html(data.msg);
            } else if (data.code == 556) {
              $(".log_col3 .msg_error").show();
              $(".log_col3").addClass("error_color")
              $(".log_col3 .msg_error p").html("短信发送失败");
            } else {
              $(".log_col2 .msg_error").show();
              $(".log_col2").addClass("error_color")
              $(".log_col2 .msg_error p").html(data.msg);
            }
            changeYzm();
          }
        }
      })
    }
  }
})

$(".log_col4 .login-btn").click(function () {
  // var ggw_id = getGgwId();
  var ggw_id = setGgwId();
  var utm_term = setUtm();
  var utm_source = getUtmSource();
  var utm_campaign =getUtmType("utm_campaign");
  var utm_content =getUtmType("utm_content");
  var utm_keyid = getUtmType("utm_keyid");
  var qhclickid = getUtmType("qhclickid");
  var site_durl = getUrlInfo(0);
  var site_title = getUrlInfo(1);
  var keywords = "default";
  var visit_source = "default";
  var bd_vid = getUtmType("bd_vid");
  var logidUrl = "";
  // logidUrl = sessionStorage.getItem('url')  + "?bd_vid =" + bd_vid;
  if (localStorage.getItem("logidUrl")){
    logidUrl = localStorage.getItem("logidUrl");
  }

  var flag1 = regPhone();
  var flag2 = regCodeImg();
  var flag3 = regPhoneCode();
  var flag4 = regLxname();
  var flag5 = regCompanyName();
  if (flag1 && flag2 && flag3 && flag4 && flag5) {
    // 更新登录后的版块
    var logTxt = $("#loginname").val();
    var imgTxt = $("#yzm").val();
    var yzmTxt = $("#yzmcode").val();
    var lxname = $("#lxname").val();
    var companyName = $("#companyName").val();
    var time = new Date();
    var nowTime = String(time.getFullYear()) + String(time.getMonth() + 1) + String(time.getDate()) + String(
      time.getHours()) + String(time.getMinutes()) + String(time.getSeconds());
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
      var httpxml;
      if (window.XMLHttpRequest) {
        //大多数浏览器
        httpxml = new XMLHttpRequest();
      } else {
        //古董级浏览器
        httpxml = new ActiveXObject("Microsoft.XMLHTTP");
      }
      httpxml.open("post", "/yuan/register/registernew/register", true);
      httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      httpxml.onreadystatechange = function () {
        if (httpxml.readyState == 4 && httpxml.status == 200) {
          var s;
          if (typeof (JSON) == 'undefined') {
            s = eval("(" + httpxml.responseText + ")");
          } else {
            s = JSON.parse(httpxml.responseText);
          }
          $(".log_col1 .msg_error").hide();
          $(".log_col1").removeClass("error_color");
          $(".log_col2 .msg_error").hide();
          $(".log_col2").removeClass("error_color");
          if (s.code == 200) { //登录成功，注册过
            regSuccess();
          } else if (s.code == 201) { //注册成功
            // alert("号码还未注册，登录后将注册为新用户！");
            regSuccess();
          } else if (s.code == 510) {
            $(".log_col1 .msg_error").show();
            $(".log_col1").addClass("error_color")
            $(".log_col1 .msg_error p").html("请输入正确的手机号或验证码");
          } else if (s.code == 501) {
            $(".log_col3 .msg_error").show();
            $(".log_col3").addClass("error_color")
            // $(".log_col1 .msg_error p").html(s.msg);
            $(".log_col3 .msg_error p").html("未获取验证码");
          } else if (data.code == 506) {
            $(".log_col6 .msg_error").show();
            $(".log_col16").addClass("error_color")
            // $(".log_col1 .msg_error p").html(data.msg);
            $(".log_col6 .msg_error p").html("公司名不合法");
          } else if (s.code == 512) {
            $(".log_col3 .msg_error").show();
            $(".log_col3").addClass("error_color")
            $(".log_col3 .msg_error p").html("验证码输入错误次数过多，请稍后再试");
          } else if (s.code == 513) {
            $(".log_col3 .msg_error").show();
            $(".log_col3").addClass("error_color")
            $(".log_col3 .msg_error p").html("手机验证码错误");
          } else if (s.code == 514) {
            $(".log_col1 .msg_error").show();
            $(".log_col1").addClass("error_color")
            $(".log_col1 .msg_error p").html("登录过于频繁，请稍后重试");
          } else if (s.code == 551 || s.code == 552 || s.code == 553 || s.code == 554 || s.code == 555 || s
            .code == 556) {
            $(".log_col1 .msg_error").show();
            $(".log_col1").addClass("error_color")
            $(".log_col1 .msg_error p").html("短信发送失败，请稍后重试");
          }
        }
      }
      httpxml.send("phone=" + convert1(logTxt) + "&phonecode=" + convert1(yzmTxt) + "&t=" + nowTime +
        "&custName=" + convert1(lxname) + "&companyName=" + convert1(companyName) + "&utm_term=" + convert1(utm_term) +
        "&site_title=" + convert1(site_title) + "&site_durl=" + convert1(site_durl) + "&utm_source=" + convert1(utm_source) +
        "&ggw_id=" + convert1(ggw_id) + "&companySource=21&keywords=" + convert1(keywords) + "&visit_source=" + convert1(
          visit_source) +"&utm_campaign="+convert1(utm_campaign)+"&utm_content="+convert1(utm_content)+"&utm_keyid="+convert1(utm_keyid)+"&qhclickid="+convert1(qhclickid)+"&logidUrl="+convert1(logidUrl));
    } else {
      $.ajax({
        type: "post",
        url: "/yuan/register/registernew/register",
        data: {
          phone: convert1(logTxt),
          phonecode: convert1(yzmTxt),
          t: nowTime,
          custName: convert1(lxname),
          companyName: convert1(companyName),
          ggw_id: convert1(ggw_id),
          site_durl: convert1(site_durl),
          site_title: convert1(site_title),
          utm_term: convert1(utm_term),
          utm_source: convert1(utm_source),
          utm_campaign: convert1(utm_campaign),
          utm_content: convert1(utm_content),
          utm_keyid: convert1(utm_keyid),
          qhclickid: convert1(qhclickid),
          companySource: 21,
          keywords: convert1(keywords),
          visit_source: convert1(visit_source),
          logidUrl: convert1(logidUrl),
        },
        success: function (data) {
          $(".log_col1 .msg_error").hide();
          $(".log_col1").removeClass("error_color");
          $(".log_col2 .msg_error").hide();
          $(".log_col2").removeClass("error_color");
          if (data.code == 200) { //登录成功，注册过
            regSuccess();
          } else if (data.code == 201) { //注册成功
            // alert("号码还未注册，登录后将注册为新用户！");
            regSuccess();
          } else if (data.code == 510) {
            $(".log_col1 .msg_error").show();
            $(".log_col1").addClass("error_color")
            $(".log_col1 .msg_error p").html("请输入正确的手机号或验证码");
          } else if (data.code == 501) {
            $(".log_col3 .msg_error").show();
            $(".log_col13").addClass("error_color")
            // $(".log_col1 .msg_error p").html(data.msg);
            $(".log_col3 .msg_error p").html("未获取验证码");
          } else if (data.code == 506) {
            $(".log_col6 .msg_error").show();
            $(".log_col16").addClass("error_color")
            // $(".log_col1 .msg_error p").html(data.msg);
            $(".log_col6 .msg_error p").html("公司名不合法");
          } else if (data.code == 512) {
            $(".log_col3 .msg_error").show();
            $(".log_col3").addClass("error_color")
            $(".log_col3 .msg_error p").html("验证码输入错误次数过多，请稍后再试");
          } else if (data.code == 513) {
            $(".log_col3 .msg_error").show();
            $(".log_col3").addClass("error_color")
            $(".log_col3 .msg_error p").html("手机验证码错误");
          } else if (data.code == 514) {
            $(".log_col1 .msg_error").show();
            $(".log_col1").addClass("error_color")
            $(".log_col1 .msg_error p").html("登录过于频繁，请稍后重试");
          } else if (data.code == 551 || data.code == 552 || data.code == 553 || data.code == 554 || data
            .code == 555 || data.code == 556) {
            $(".log_col1 .msg_error").show();
            $(".log_col1").addClass("error_color")
            $(".log_col1 .msg_error p").html("短信发送失败，请稍后重试");
          }
        }
      })
    }
  }
})

// 获取上一个页面url和title
function getUrlInfo (type){
  if(type === 0){
    var site_durl = sessionStorage.getItem("site_durl")?sessionStorage.getItem("site_durl"):"default";
    return site_durl;
  }else if(type === 1){
    var site_title = sessionStorage.getItem("site_title")?sessionStorage.getItem("site_title"):"default";
    return site_title;
  }else {
    return "default";
  }

}

function regPhone() {
  var logTxt = $("#loginname").val();
  var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[123589])\d{8}$/;
  if (logTxt == "") {
    $(".log_col1 .msg_error").show();
    $(".log_col1").addClass("error_color")
    $(".log_col1 .msg_error p").html("请输入手机号");
    return false
  } else {
    if (reg.test(logTxt)) {
      $(".log_col1 .msg_error").hide();
      $(".log_col1").removeClass("error_color");
      $(".log_col1 .msg_error p").html("");
      return true
    } else {
      $(".log_col1 .msg_error").show();
      $(".log_col1").addClass("error_color")
      $(".log_col1 .msg_error p").html("请输入正确手机号");
      return false
    }
  }
}

function regCodeImg() {
  var imgTxt = $("#yzm").val();
  if (imgTxt == "") {
    $(".log_col2 .msg_error").show();
    $(".log_col2").addClass("error_color")
    $(".log_col2 .msg_error p").html("请输入图片验证码");
    return false
  } else {
    $(".log_col2 .msg_error").hide();
    $(".log_col2").removeClass("error_color");
    $(".log_col2 .msg_error p").html("");
    return true
  }
}

function regPhoneCode() {
  var yzmTxt = $("#yzmcode").val();
  if (yzmTxt == "") {
    $(".log_col3 .msg_error").show();
    $(".log_col3").addClass("error_color")
    $(".log_col3 .msg_error p").html("请输入手机验证码");
    return false
  } else {
    $(".log_col3 .msg_error").hide();
    $(".log_col3").removeClass("error_color");
    $(".log_col3 .msg_error p").html("");
    return true
  }
}


function regLxname() {
  var lxnameTxt = $("#lxname").val();
  var Reg = /^[A-Za-z\u4E00-\u9FFF]+$/;
  if (lxnameTxt == "") {
    $(".log_col5 .msg_error").show();
    $(".log_col5").addClass("error_color")
    $(".log_col5 .msg_error p").html("请输入联系人姓名");
    return false
  } else {
    if (lxnameTxt.length >= 2) {
      if (lxnameTxt.length <= 25) {
        if (Reg.test(lxnameTxt)) {
          $(".log_col5 .msg_error").hide();
          $(".log_col5").removeClass("error_color");
          return true
        } else {
          $(".log_col5 .msg_error").show();
          $(".log_col5").addClass("error_color")
          $(".log_col5 .msg_error p").html("联系人姓名不能包含符号、空格与数字");
          return false
        }
      } else {
        $(".log_col5 .msg_error").show();
        $(".log_col5").addClass("error_color")
        $(".log_col5 .msg_error p").html("联系人姓名输入过长（2-25位）");
        return false
      }
    } else {
      $(".log_col5 .msg_error").show();
      $(".log_col5").addClass("error_color")
      $(".log_col5 .msg_error p").html("联系人姓名输入过短（2-25位）");
      return false
    }
  }
}

function regCompanyName() {
  var companyTxt = $("#companyName").val();
  var Reg = /^[A-Za-z\u4E00-\u9FFF（）()]+$/;
  if (companyTxt == "") {
    $(".log_col6 .msg_error").show();
    $(".log_col6").addClass("error_color")
    $(".log_col6 .msg_error p").html("请输入公司名称");
    return false
  } else {
    if (companyTxt.length >= 4) {
      if (companyTxt.length <= 50) {
        if (Reg.test(companyTxt)) {
          $(".log_col6 .msg_error").hide();
          $(".log_col6").removeClass("error_color");
          return true
        } else {
          $(".log_col6 .msg_error").show();
          $(".log_col6").addClass("error_color")
          $(".log_col6 .msg_error p").html("公司名称不能包含符号与空格");
          return false
        }
      } else {
        $(".log_col6 .msg_error").show();
        $(".log_col6").addClass("error_color")
        $(".log_col6 .msg_error p").html("公司名称输入过长（4-50位）");
        return false
      }
    } else {
      $(".log_col6 .msg_error").show();
      $(".log_col6").addClass("error_color")
      $(".log_col6 .msg_error p").html("公司名称输入过短（4-50位）");
      return false
    }
  }
}

// 验证密码
function regPwd() {
  var logTxt = $(".pass_box #loginpassword").val();
  if (logTxt == "") {
    $(".pass_box .log_col2 .msg_error").show();
    $(".pass_box .log_col2").addClass("error_color")
    $(".pass_box .log_col2 .msg_error p").html("请输入登录密码");
    return false
  } else {
    $(".pass_box .log_col2 .msg_error").hide();
    $(".pass_box .log_col2 .msg_error p").html("")
    $(".pass_box .log_col2").removeClass("error_color");

    return true
  }
}
// 密码登录验证phone
function regPWDPhone() {
  var logTxt = $(".pass_box #loginname").val();
  var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[123589])\d{8}$/;
  if (logTxt == "") {
    $(".log_col1 .msg_error").show();
    $(".log_col1").addClass("error_color")
    $(".log_col1 .msg_error p").html("请输入手机号");
    return false
  } else {
    if (reg.test(logTxt)) {
      $(".log_col1 .msg_error").hide();
      $(".log_col1").removeClass("error_color");
      $(".log_col1 .msg_error p").html("");
      return true
    } else {
      $(".log_col1 .msg_error").show();
      $(".log_col1").addClass("error_color")
      $(".log_col1 .msg_error p").html("请输入正确手机号");
      return false
    }
  }
}

function regCodeImgPwd() {
  var imgTxt = $(".pass_box #yzm").val();
  if (imgTxt == "") {
    $(".pass_box .log_col3 .msg_error").show();
    $(".pass_box .log_col3").addClass("error_color")
    $(".pass_box .log_col3 .msg_error p").html("请输入图片验证码");
    return false
  } else {
    $(".pass_box .log_col3 .msg_error").hide();
    $(".pass_box .log_col3").removeClass("error_color");
    $(".pass_box .log_col3 .msg_error p").html("");
    return true
  }
}


// 短信验证
function regPhoneDX() {
  var logTxt = $(".dx_box #loginname").val();
  var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[123589])\d{8}$/;
  if (logTxt == "") {
    $(".log_col1 .msg_error").show();
    $(".log_col1").addClass("error_color")
    $(".log_col1 .msg_error p").html("请输入手机号");
    return false
  } else {
    if (reg.test(logTxt)) {
      $(".log_col1 .msg_error").hide();
      $(".log_col1").removeClass("error_color");
      $(".log_col1 .msg_error p").html("");
      return true
    } else {
      $(".log_col1 .msg_error").show();
      $(".log_col1").addClass("error_color")
      $(".log_col1 .msg_error p").html("请输入正确手机号");
      return false
    }
  }
}

function regImgDX() {
  var imgTxt = $(".dx_box #yzm").val();
  if (imgTxt == "") {

    $(".dx_box .log_col2 .msg_error").show();
    $(".dx_box .log_col2").addClass("error_color")
    $(".dx_box .log_col2 .msg_error p").html("请输入图片验证码");
    return false
  } else {
    // 图形验证码
    $(".dx_box .log_col2 .msg_error").hide();
    $(".dx_box .log_col2").removeClass("error_color");
    $(".dx_box .log_col2 .msg_error p").html("");
    return true
  }
}

function regCodeDX() {
  var yzmTxt = $(".dx_box #yzmcode").val();
  if (yzmTxt == "") {
    $(".dx_box .log_col3 .msg_error").show();
    $(".dx_box .log_col3").addClass("error_color")
    $(".dx_box .log_col3 .msg_error p").html("请输入手机验证码");
    return false
  } else {
    $(".dx_box .log_col3 .msg_error").hide();
    $(".dx_box .log_col3").removeClass("error_color");
    $(".dx_box .log_col3 .msg_error p").html("");
    return true
  }
}




function regSuccess() {
  if (localStorage.getItem('aaacreditparams')) {  //210726 aaacredit添加
    var aaacreditparams = JSON.parse(localStorage.getItem('aaacreditparams'));
    var currentdate = new Date().toLocaleDateString();
    if (aaacreditparams.aaacreditdate == currentdate) {
      aaacreditparams.isfirst = '0'
    } else {
      aaacreditparams.aaacreditdate = currentdate;
      aaacreditparams.isfirst = '1'
    }
    localStorage.setItem("aaacreditparams", JSON.stringify(aaacreditparams));
  } else {
    localStorage.setItem("aaacreditparams", JSON.stringify({
      aaacreditdate: new Date().toLocaleDateString(),
      isfirst: '1'
    }));
  }

  gio('track', 'zhucechenggong');
  //  注册成功不弹窗
  localStorage.setItem('isText', 1);
  $(".regshadow").show();
  // 5s倒计时
  var timer = null;
  var index = 5;
  timer = setInterval(function () {
    index--;
    $(".regshadow .regtxt .p2 i").html(index);
    if (index == 0) {
      clearInterval(timer);
      localStorage.setItem("registerFlag", "1")
      window.location.href = 'https://www.chinabidding.cn';
    }
  }, 1000)
}

function refreshPage() {
  localStorage.setItem("registerFlag", "1")
  window.location.href = 'https://www.chinabidding.cn';
}

var timer1 = null;
// 微信登录
function getTicket() {
  $(".wx_box .reload_wx").hide();
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
    var httpxml;
    if (window.XMLHttpRequest) {
      //大多数浏览器
      httpxml = new XMLHttpRequest();
    } else {
      //古董级浏览器
      httpxml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpxml.open("get", "/yuan/login/wxlogin/getticket", true);
    httpxml.onreadystatechange = function () {
      if (httpxml.readyState == 4 && httpxml.status == 200) {
        var s;
        if (typeof (JSON) == 'undefined') {
          s = eval("(" + httpxml.responseText + ")");
        } else {
          s = JSON.parse(httpxml.responseText);
        }
        if (s.url) {
          wxId = s.id;
          ticketId = s.ticket;
          $(".shadow .wx_box img").attr("src", s.url);
          $(".shadow").show();
          isWXlogin();
        } else {
          alert("微信扫码失败")
        }
      } else if (httpxml.readyState == 4 && httpxml.status != 200) { //非200表示异常
        alert("微信扫码异常")
      }
    }
    httpxml.send();
  } else {
    $.ajax({
      type: "get",
      url: "/yuan/login/wxlogin/getticket",
      async: false,
      dataType: "json",
      success: function (data) {
        if (data.url) {
          wxId = data.id;
          ticketId = data.ticket;
          $(".shadow .wx_box img").attr("src", data.url);
          $(".shadow").show();
          isWXlogin();
        } else {
          alert("微信扫码失败")
        }
      },
      error: function (xhr) { //非200表示异常
        if (xhr.status != 200) {
          alert("微信扫码异常")
        }
      }
    })
  }
}
// 微信轮回请求 判断是否有扫码
function isWXlogin() {
  // 开始重复请求
  var num = 30;
  timer1 = setInterval(function () {
    num--;
    if (wxFlag) {
      if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
        var httpxml;
        if (window.XMLHttpRequest) {
          //大多数浏览器
          httpxml = new XMLHttpRequest();
        } else {
          //古董级浏览器
          httpxml = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpxml.open("post", "/yuan/login/wxlogin/callback", true);
        httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpxml.onreadystatechange = function () {
          if (httpxml.readyState == 4 && httpxml.status == 200) {
            var s;
            if (typeof (JSON) == 'undefined') {
              s = eval("(" + httpxml.responseText + ")");
            } else {
              s = JSON.parse(httpxml.responseText);
            }
            if (s.code == 200 || s.code == 201) { //200登录成功  201注册成功
              wxFlag = false;
              clearInterval(timer1);
              history.go(0);
            } else if (s.code == 562) { //二维码已失效
              clearInterval(timer1);
              $(".wx_box .reload_wx").show();
            } else {
              clearInterval(timer1);
              alert(s.msg)
            }
          }
        }
        httpxml.send("id=" + convert1(String(wxId)) + "&ticket=" + convert1(ticketId) + "&utm_term=" + convert1(utm_term) + "&utm_source=" + convert1(utm_source) + "&ggw_id=" + convert1(
          ggw_id)+"&utm_campaign="+convert1(utm_campaign)+"&utm_content="+convert1(utm_content)+"&utm_keyid="+convert1(utm_keyid));
      } else {
        $.ajax({
          type: "post",
          url: "/yuan/login/wxlogin/callback",
          data: {
            id: convert1(String(wxId)),
            ticket: convert1(ticketId),
            ggw_id: convert1(ggw_id),
            utm_term: convert1(utm_term),
            utm_source: convert1(utm_source),
            utm_campaign: convert1(utm_campaign),
            utm_content: convert1(utm_content),
            utm_keyid: convert1(utm_keyid),
          },
          dataType: "json",
          success: function (data) {
            clearInterval(timer1);
            if (data.code == 200 || data.code == 201) { //200登录成功  201注册成功
              wxFlag = false;
              history.go(0);
            } else if (data.code == 562) { //二维码已失效
              $(".wx_box .reload_wx").show();
            } else {
              alert(data.msg)
            }
          }
        })
      }
    }
    if (num == 0) {
      // 关闭定时器，手动刷新二维码
      clearInterval(timer1);
      $(".wx_box .reload_wx").show();
    }
  }, 2000)
}
// 关闭弹窗，关闭定时
function closeShadow() {
  clearInterval(timer1);
  $(".shadow").hide();
}
// 刷新二维码
function refreshWX() {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
    var httpxml;
    if (window.XMLHttpRequest) {
      //大多数浏览器
      httpxml = new XMLHttpRequest();
    } else {
      //古董级浏览器
      httpxml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpxml.open("get", "/yuan/login/wxlogin/getticket", true);
    httpxml.onreadystatechange = function () {
      if (httpxml.readyState == 4 && httpxml.status == 200) {
        var s;
        if (typeof (JSON) == 'undefined') {
          s = eval("(" + httpxml.responseText + ")");
        } else {
          s = JSON.parse(httpxml.responseText);
        }
        if (s.url) {
          $(".wx_box .reload_wx").hide();
          wxId = s.id;
          ticketId = s.ticket;
          $(".shadow .wx_box img").attr("src", s.url);
          isWXlogin();
        } else {
          alert("微信扫码失败")
        }
      }
    }
    httpxml.send();
  } else {
    $.ajax({
      type: "get",
      url: "/yuan/login/wxlogin/getticket",
      async: false,
      dataType: "json",
      success: function (data) {
        if (data.url) {
          $(".wx_box .reload_wx").hide();
          wxId = data.id;
          ticketId = data.ticket;
          $(".shadow .wx_box img").attr("src", data.url);
          isWXlogin();
        } else {
          alert("微信扫码失败")
        }
      }
    })
  }
}

// 新手入门弹框显示
function handShow(index) {
  $(".handBox").show();
  $(".handBox .handwd").hide();
  switch (index) {
    case 0:
      $(".handBox .handwd").eq(0).show();
      break;
    case 1:
      $(".handBox .handwd").eq(1).show();
      break;
    case 2:
      $(".handBox .handwd").eq(2).show();
      break;
    default:
      $(".handBox .handwd").eq(3).show();
  }
}
$(".handBox .hand_close").click(function () {
  $(".handBox").hide();
})

// 隐私协议  201217
$(".fastlog .contract i").click(function () {
  $(".agreeshadow").show()
})

function closeAgree() {
  $(".agreeshadow").hide()
}

// 请登录
function loginTo(index) {
  isText = localStorage.getItem('isText');
  if (isText == 1) {
    history.go(0)
  } else {
    sessionStorage.setItem('url', "https://www.chinabidding.cn");
    if (index == 1) {
      window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
    } else if (index == 2) {
      window.open("https://www.chinabidding.cn/public/2020/html/register.html?source=1")
    }
  }
}

function loginTo1() { //导航的中标
  isText = localStorage.getItem('isText');
  if (isText == 1) {

  } else {
    sessionStorage.setItem('url', "https://www.chinabidding.cn");
    window.location.href = "https://www.chinabidding.cn/public/2020/html/login.html?source=1"
  }
}

// placeholder的ie兼容,目前对text有效
if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
  $("#search .form p").show();
  $("#search .form1 p1").show();
  $("#search .form1 p2").show();
  $(".log_col1 .log_p").show();
  $(".log_col2 .log_p").show();
  $(".log_col3 .log_p").show();
  $(".log_col5 .log_p").show();
  $(".log_col6 .log_p").show();
  $("#search .form1 .p1").css("width", "156px");
  $("#search .form1 .p2").css("width", "206px");
} else {
  $("#search .form p").show();
  $("#search .form1 p1").hide();
  $("#search .form1 p2").hide();
  $(".log_col5 .log_p").hide();
}
if (!!window.ActiveXObject || "ActiveXObject" in window) { //手动清除ie所有input内容
  setTimeout(function () {
    $(".login-form input").val("");
    $("#search input").val("");
  }, 100)
}
if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 7) {
  $("#search .form").css("z-index", 99);
  $("#search .form input").css({
    "margin-left": "-10px",
    "padding-left": "20px"
  });
  $("#search .form1 .p1").css("left", "2px");
  $("#search .form1 .p2").css("left", "195px");
}

// ##wu 页面渲染前，先判断session中是否存在从其他页面携带过来的关键词
function renderSearchKey() {
  var searchKey = sessionStorage.getItem("searchKey");
  var projectSearchKey = sessionStorage.getItem('projectSearchKey')
  if (searchKey) {
    $('#inpTxt').val(searchKey)
  }
  if (projectSearchKey) {
    changeKey(1)
    $('#inpTxt').val(projectSearchKey)
  }
}
if (!((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8)) {
  renderSearchKey()
}

// 首页方法
function changeKey(key) {
  $("#hotwords li").removeClass("active");
  $("#hotwords li").eq(key).addClass("active");
  var reckeyword = randomlist(hotsword, 1);
  if (key == '0') {
    $("#search .form1").hide();
    $("#search .form").show();
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
      if ($('#inpTxt').val() == "") {
        $("#search .form p").show();
        $("#search .form p").html('请输入公告关键词，多关键词用空格隔开，如“北京 防控物资”')
      } else {
        $("#search .form p").hide();
      }
    } else {
      $("#inpTxt").attr("placeholder", "请输入公告关键词，多关键词用空格隔开，如“北京 防控物资”");
    }

    if ($('#inpTxt').val() == "") {
      $("#search .form p").show();
      $("#search .form p").html(reckeyword[0].title);
      $("#inpTxt").attr("placeholder", reckeyword[0].title);
    } else {
      $("#search .form p").hide();
    }

  } else if (key == '1') {
    $("#search .form1").hide();
    $("#search .form").show();
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
      if ($('#inpTxt').val() == "") {
        $("#search .form p").show();
        $("#search .form p").html('请输入项目关键词，多关键词用空格隔开，如“火电 大唐”')
      } else {
        $("#search .form p").hide();
      }
    } else {
      $("#inpTxt").attr("placeholder", "请输入项目关键词，多关键词用空格隔开，如“火电 大唐”");
    }

    if ($('#inpTxt').val() == "") {
      $("#search .form p").show();
      $("#search .form p").html(reckeyword[0].title)
      $("#inpTxt").attr("placeholder", reckeyword[0].title);
    } else {
      $("#search .form p").hide();
    }

    $("#search .button1").css("height", "38px");
  } else if (key == '2') {
    $("#search .form1").hide();
    $("#search .form").show();
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
      if ($('#inpTxt').val() == "") {
        $("#search .form p").show();
        $("#search .form p").html('请输入企业名、人名或地址电话等，如“北京 国信”');
      } else {
        $("#search .form p").hide();
      }
    } else {
      $("#search .form p").hide();
      $("#inpTxt").attr("placeholder", "请输入企业名、人名或地址电话等，如“北京 国信”");
    }
    $("#search .button1").css("height", "38px");
  } else if (key == '3') {
    if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 9) {
      if ($('#s_company').val() == "") {
        $("#search .form1 .p1").show();
      } else {
        $("#search .form1 .p1").hide();
      }
      if ($('#s_number').val() == "") {
        $("#search .form1 .p2").show();
      } else {
        $("#search .form1 .p2").hide();
      }
    }
    $("#search .form").hide();
    $("#search .form1").show();
    $("#search .button1").css("height", "42px");
  }
}

function clickButton() {
  var txt = $("#inpTxt").val();
  if (!((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8)) {
    isText = localStorage.getItem('isText'); // ##wu每次跳转前先获取当前的登录状态
  }
  for (var i = 0; i < $("#hotwords li").length; i++) {
    if ($("#hotwords li").eq(i).attr("class") == "active") {
      if (i == 0) {
        // 查招标采购
        if (true) { //21124  isText==1不用判断即可登录
          if (!txt) {
            txt = $("#search .form p").text();
          }
          addHistoryWord(txt, "index");
          window.open("https://www.chinabidding.cn/search/searchgj/zbcg?keywords=" + encodeURI(txt.replace(/\#/g, " ").replace(/\&/g, " ").replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " ")))
        } else {
          sessionStorage.setItem('url', "https://www.chinabidding.cn/search/searchgj/zbcg?keywords=" + encodeURI(txt.replace(/\#/g, " ").replace(/\&/g, " ").replace(/\\/g, " ").replace(/\{/g, " ").replace(/\$/g, " ")))
          window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
        }
      } else if (i == 1) {
        // 查项目
        if (true) {
          if (!txt) {
            txt = $("#search .form p").text();
          }
          addHistoryWord(txt, "index");
          window.open("https://www.chinabidding.cn/search/searchadvxmxx/search3?keywords=" + encodeURI(txt.replace(/\#/g, " ").replace(/\&/g, " ")))
        } else {
          sessionStorage.setItem('url', "https://www.chinabidding.cn/search/searchadvxmxx/search3?keywords=" + encodeURI(txt.replace(/\#/g, " ").replace(/\&/g, " ")))
          window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
        }
      } else if (i == 2) {
        // 查企业
        if (true) {
          window.open("https://www.sbiao360.com/")
        } else {
          sessionStorage.setItem('url', "https://www.sbiao360.com/")
          window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
        }
      }
    }
  }
}

function clickButton1() {
  var company = $("#s_company").val();
  var number = $("#s_number").val();
  isText = localStorage.getItem('isText'); // ##wu每次跳转前先获取当前的登录状态
  if (true) { //21124  isText==1不用判断即可登录
    if (company == "" && number == "") {
      $(".form1 .form1_error").hide();
      yjscLink(4)
    } else if (company != "" && number == "") {
      $(".form1 .form1_error").show();
      $(".form1 .form1_error").html("请输入该公司证书编号或可咨询：400-968-9685")
    } else if (company == "" && number != "") {
      $(".form1 .form1_error").show();
      $(".form1 .form1_error").html("请输入证书上的公司名或可咨询：400-968-9685")
    } else {
      $(".form1 .form1_error").hide();
      yjscLink(4)
    }
  } else {
    if (company == "" && number == "") {
      $(".form1 .form1_error").hide();
      // sessionStorage.setItem('url', "javascript:yjscLink(4)")
      // window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1")
      window.open('https://gxzx.chinabidding.cn')
    } else if (company != "" && number == "") {
      $(".form1 .form1_error").show();
      $(".form1 .form1_error").html("请输入该公司证书编号或可咨询：400-968-9685")
    } else if (company == "" && number != "") {
      $(".form1 .form1_error").show();
      $(".form1 .form1_error").html("请输入证书上的公司名或可咨询：400-968-9685")
    } else {
      $(".form1 .form1_error").hide();
      // sessionStorage.setItem('url', "javascript:yjscLink(4)");
      // window.open("https://www.chinabidding.cn/public/2020/html/login.html?source=1");
      window.open('https://gxzx.chinabidding.cn')
    }
  }
}

// 获取图片验证码
function changeYzm() {
  var randomNum = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
  var time = new Date();
  var nowTime = String(time.getFullYear()) + String(time.getMonth() + 1) + String(time.getDate()) + String(time
      .getHours()) + String(time.getMinutes()) + String(time.getSeconds());
  $("#yzmImage").attr("src", "/cblcn/member.Login/captcha?randomID=" + randomNum + "&t=" + nowTime)

}

// 获取所有数据(判断是否是ie 8,7)
function getAllData(city) {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
    var httpxml;
    if (window.XMLHttpRequest) {
      //大多数浏览器
      httpxml = new XMLHttpRequest();
    } else {
      //古董级浏览器
      httpxml = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpxml.open("post", "/yuan/host/maindata", true);
    httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    httpxml.onreadystatechange = function () {
      if (httpxml.readyState == 4 && httpxml.status == 200) {
        var s;
        if (typeof (JSON) == 'undefined') {
          s = eval("(" + httpxml.responseText + ")");
        } else {
          s = JSON.parse(httpxml.responseText);
        }
        editData(s)
      } else if (httpxml.readyState == 4 && httpxml.status != 200) {
        // window.location.href = "https://www.chinabidding.cn/old_index"
      }
    }
    httpxml.send("area=" + city);
  } else {
    $.ajax({
      type: "post",
      url: "/yuan/host/maindata",
      data: {
        area: city
      },
      dataType: "json",
      success: function (data) {
        editData(data)
      },
      error: function (xhr) { //非200表示异常
        if (xhr.status != 200) {
          // window.location.href = "https://www.chinabidding.cn/old_index"
        }
      }
    })
  }
}

// 解析所有数据
function editData(data) {
  var html = "",
      html1 = "";
  if (!((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8)) {
    if (data.c_user){
      localStorage.setItem("isText", data.c_user.text_view==1?1:0); // ##wu将当前登录状态存储在本地
    }

  } else {
    $(".col23 .user_inner img").css("border", "none");
  }
  if (data.c_user){
    isText = data.c_user.text_view==1?1:0;
  }
  // 底部浮窗是否出现
  if (isText == 1 && data.c_user) {
    if (data.c_user.memberid){
      memberid = data.c_user.memberid;
    }
    if (data.c_user.id){
      userId = data.c_user.id;
      setLoginFlag(data.c_user.id);
    }
    //顶部登录
    $(".unlog").hide();
    $(".islog").show();
    $("#bot_info").hide();
    $(".islog span").eq(0).html("您好，尊敬的会员")

    $(".sort_r .col22").hide(); //右侧登录
    // $(".sort_r .col23").show();
    $(".sort_r .col23 .user_txt p").html("尊敬的会员");

    $(".dropdown-layer5 .drop_unlogin").hide(); //中标业绩
    $(".dropdown-layer5 .drop_login").show();

    $(".dropdown-layer4 .unlogin").hide(); //中标认证
    $(".dropdown-layer4 .islogin").show();
    var xf = false;
    if (data.c_user.type && (data.c_user.type == "b" || data.c_user.type == "c" || data.c_user.type == "d" || data.c_user.type == "e")) { //付费
      if (data.c_user.type == "e"){
        $(".sort_r .col23_free").show();
        $(".sort_r .col23_pay").remove();
      } else {
        $(".sort_r .col23_pay").show();
        $(".sort_r .col23_free").remove();
      }
      $(".sort_r .col23 .date1").html("会员服务截止日期:");
      $(".sort_r .col23 .date2").html(data.c_user.endtime);
      xf = expiredTip(data.c_user.endtime, data.c_user.is_show)
      // if (!xf) {
      //     setEndYearPop(data.c_user.type, data.c_user.id);
      // }
      $(".elevator_credit").unbind("click")
      $(".elevator_credit").on("click", function () {
        $(".elevator_tip").show()
      })
    } else { //免费
      $(".sort_r .col23_free").show();
      $(".sort_r .col23_pay").remove();
      var nowDate = new Date().getTime();
      if (data.c_user.endtime != null) {
        var endDate = new Date(data.c_user.endtime.replace(/-/g, '/')).getTime();
      }
      if (endDate >= nowDate) {
        $(".sort_r .col23 .date1").html("上次登录的日期:");
        $(".sort_r .col23 .date2").html(data.c_user.lastdate);
      } else {
        $(".sort_r .col23 .date1").html("您的收费权限已到期，请联系下方").css("color", "#df2229");
        $(".sort_r .col23 .date2").html("专属客服！").css("color", "#df2229");
      }
      $(".elevator_credit").on("click", creditChatClick);
    }
    // 有续费提醒的时候不弹出在线咨询
    if (!xf){
      // setMarketing(data)
      setDzzbDialog(data);
      setChargeing(data)
    }
    if (data.c_user.userMeta == "" || data.c_user.userMeta == null) { //电话
      $(".elevator_tip .p3 span").html("400-006-6655")
      $(".sort_r .col23 .kefu_phone").html("400-006-6655");
      $(".dropdown-layer5 .drop_login p").eq(1).html("400-006-6655");
      $(".dropdown-layer4 .islogin p").eq(1).html("400-006-6655");
    } else {
      $(".elevator_tip .p3 span").html(data.c_user.userMeta)
      $(".sort_r .col23 .kefu_phone").html(data.c_user.userMeta);
      $(".dropdown-layer5 .drop_login p").eq(1).html(data.c_user.userMeta);
      $(".dropdown-layer4 .islogin p").eq(1).html(data.c_user.userMeta);
      $('.logshadowz .p2 span').html(data.c_user.userMeta)
    }
    if (!(data.c_user.userName == "" || data.c_user.userName == null || data.c_user.userName == "销售专员" || data.c_user.userName == "专属客服")) { //名字
      $(".sort_r .col23 .kefu_name span").html(data.c_user.userName.length > 4 ? data.c_user.userName.substring(0, 3) + "..." : data.c_user.userName);
      $(".elevator_tip .p2 span").html(data.c_user.userName)
    }
    if(data.c_user.type){
      setKefuzixun(data.c_user.type)
    }
    //isAAACreditShow(data.c_user.userName);
    // setCoolPop(data.c_user.userName, data.c_user.userMeta, data.c_user.type, data.c_user.id);
  } else {
    setRegFlag()
    $(".elevator_credit").on("click", creditChatClick)
    $(".islog").hide();
    $(".unlog").show();
    $("#bot_info").show();
    $(".islog span").eq(0).html("");

    $(".sort_r .col23").hide();
    $(".sort_r .col22").show();

    $(".dropdown-layer5 .drop_login").hide();
    $(".dropdown-layer5 .drop_unlogin").show();

    $(".dropdown-layer4 .islogin").hide();
    $(".dropdown-layer4 .unlogin").show();
  }

  // 招标信息全部分类 rx0121
  $("#banner .sort_l li").hover(function () {
    var that = this;
    if (flag) {
      $(this).find(".dropdown-layer3").show();
      $(this).find(".hotboxs").css("width", "620px");
      $(this).find(".hot_ad").css("left", "650px").show();
      $("#banner .dropdown-layer3").css("box-shadow", "0 0 8px rgba(0,0,0,.2)");
    } else {
      $(this).find(".dropdown-layer3").show();
      $(this).find(".hotboxs").animate({
        width: "620px"
      }, 400);
      setTimeout(function () {
        $(that).find(".hot_ad").show().animate({
          left: "650px"
        }, 250);
        $("#banner .dropdown-layer3").css("box-shadow", "0 0 8px rgba(0,0,0,.2)");
      }, 300)
    }
    flag = true;
  }, function () {
    $(this).find(".dropdown-layer3").hide();
    $(this).find(".hotboxs").css("width", 0);
    $(this).find(".hot_ad").css("left", "430px").hide();
    $("#banner .dropdown-layer3").css("box-shadow", "none")
  })

  var sort_list = [
    // {
    //     "id": "1264903316345857",
    //     "txt1": "javascript:void(0);",
    //     "txt_a": "https://cdn.chinabidding.cn/public/2020/img/banner220913.png",
    //     "txt_color": null,
    //     "video_flag": false,
    //     "class": "chargeActive"
    // },
  ]
  if(data.c_sources && data.c_sources.length){
    var imgSources = data.c_sources;
    for (var i = 0; i < imgSources.length; i++) {
      if (imgSources[i].link == null || imgSources[i].link == ""){
        imgSources[i].link = "javascript:void(0);";
      }
      sort_list.push({
        id: imgSources[i].id || '',
        txt1: imgSources[i].link || '',
        txt_a: imgSources[i].urlPath || '',
        video_flag: imgSources[i].isVideo || false,
        class: imgSources[i].remark || '',
      })
    }
    b_s_sortr(sort_list);
  }
  if (data.c_project) {
    renderRecommendN(data.c_project,data.c_mqcg);
  }
  // 中国采购与招标网独家发布
  if (data.c_tjxx && data.c_tjxx.length) {
    data.c_tjxx = data.c_tjxx.length > 7 ? data.c_tjxx.slice(0, 7) : data.c_tjxx;
    r_rel_left(data.c_tjxx);
  }
  if (data.c_release && data.c_release.length) {
    data.c_release = data.c_release.length > 7 ? data.c_release.slice(0, 7) : data.c_release;
    r_rel_right(data.c_release);
  }
  // 国信信息
  if (data.c_news && data.c_news.length) {
    data.c_news = data.c_news.length > 11 ? data.c_news.slice(0, 11) : data.c_news;
    c_news_l(data.c_news);
  }
  // 招标采购信息
  if (data.c_zbcgxx && data.c_zbcgxx.length) {
    data.c_zbcgxx = data.c_zbcgxx.length > 7 ? data.c_zbcgxx.slice(0, 7) : data.c_zbcgxx;
    c_like_l(data.c_zbcgxx);
  }
  // 项目信息
  if (data.c_xmxx && data.c_xmxx.length) {
    data.c_xmxx = data.c_xmxx.length > 7 ? data.c_xmxx.slice(0, 7) : data.c_xmxx;
    c_like_l(data.c_xmxx, "xmxx");
  }

  // 随机给搜索词
  hotsword = [{
    "title": "烟气在线监测"
  }, {
    "title": "调查"
  }, {
    "title": "水电"
  }, {
    "title": "矿山"
  }, {
    "title": "注射泵"
  }, {
    "title": "交通"
  }, {
    "title": "供水管网"
  }, {
    "title": "神华"
  }, {
    "title": "武汉"
  }, {
    "title": "物流"
  }, {
    "title": "造价"
  }, {
    "title": "供水"
  }, {
    "title": "浙江石化"
  }, {
    "title": "中介"
  }, {
    "title": "国信招标"
  }, {
    "title": "建筑"
  }, {
    "title": "肉类加工"
  }, {
    "title": "中国中车"
  }, {
    "title": "仪表"
  }, {
    "title": "上海"
  }, {
    "title": "排水"
  }, {
    "title": "5G"
  }, {
    "title": "规划"
  }, {
    "title": "石灰"
  }, {
    "title": "中广核"
  }, {
    "title": "机场"
  }, {
    "title": "水泵"
  }, {
    "title": "伸缩缝"
  }, {
    "title": "土地复垦"
  }, {
    "title": "输液泵"
  }, {
    "title": "土地整理"
  }, {
    "title": "通讯"
  }, {
    "title": "系统集成"
  }, {
    "title": "种子"
  }, {
    "title": "网络"
  }, {
    "title": "制服"
  }, {
    "title": "商业服务"
  }, {
    "title": "桥梁改造"
  }, {
    "title": "电子"
  }, {
    "title": "机床"
  }, {
    "title": "轴承"
  }, {
    "title": "机械"
  }, {
    "title": "硬件防火墙"
  }, {
    "title": "镀锌钢绞线"
  }, {
    "title": "水泥"
  }, {
    "title": "管材"
  }, {
    "title": "广州"
  }, {
    "title": "华电"
  }, {
    "title": "围堰"
  }, {
    "title": "沥青"
  }];
  edithots(randomlist(hotsword, 15));
  changeKey(0);
}

// 定位城市
function changeCity(city) {
  if ((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8) {
    for (var i = 0; i < cityList.length; i++) {
      if (cityList[i] === city) {
        $(".dropdown-layer li a").eq(i).addClass("dative")
        window.location.href = "https://www.chinabidding.cn?city=" + i
      }
    }
  } else {
    sessionStorage.setItem("city", city);
    history.go(0);
  }
}

// 210115添加
function changeNav(index) {
  if (index == 1) { //货物招标中标
    sessionStorage.setItem("navActive", "货物类")
  } else if (index == 2) { //工程招标中标
    sessionStorage.setItem("navActive", "工程类")
  } else if (index == 3) { //服务招标中标
    sessionStorage.setItem("navActive", "服务类")
  } else if (index == 4) { //政府采购
    sessionStorage.setItem("navActive", "政府采购")
  }
  window.open("https://www.chinabidding.cn/public/2020/html/zbcgsort.html")
}

// 自主续费弹窗逻辑2021.01.26添加
function expiredTip(endDate, showFlag) {
  var loginFlag = $.cookie("loginFLag") //是否为当天第一次登录
  var now = new Date(); //当前日期
  var nowDay = now.getDay(); //当前星期数
  var nowTime = now.getTime(); //获取当前时间戳
  var oneMonth = getExpiredTime(endDate, 1); //一个月过期时间戳
  var twoMonth = getExpiredTime(endDate, 2); //两个月过期时间戳
  var thrMonth = getExpiredTime(endDate, 3); //三个月过期时间戳
  var fourMonth = getExpiredTime(endDate, 4); //三个月过期时间戳
  var sixMonth = getExpiredTime(endDate, 6); //三个月过期时间戳
  // if (nowTime >= new Date('2023-04-15 00:00:00').getTime() || new Date(endDate).getTime()>= new Date('2023-06-01 00:00:00').getTime()){
  if (nowTime >= new Date('2023-06-30 00:00:00').getTime()){
    if (nowTime >= thrMonth || showFlag) {
      // 到期时间小于等于显示按钮
      $(".renew_btn").show()
    }
  }
  if (loginFlag == 1) {
    // 为当天第一次登录
    if (nowTime >= new Date('2023-06-30 00:00:00').getTime()){
      if (nowTime > thrMonth && nowTime < twoMonth) {
        // 2~3个月过期
        if (nowDay === 1) {
          // 弹窗
          $("#renew_pop").show()
          $("#renew_pop .inside").show()
          return true;
        }
      } else if (nowTime > twoMonth && nowTime < oneMonth) {
        // 1~2个月过期
        if (nowDay === 1 || nowDay === 5) {
          // 弹窗
          $("#renew_pop").show()
          $("#renew_pop .inside").show()
          return true;
        }
      }
      $.cookie("loginFLag", 0)
      return false;
    }
  }
}

function getExpiredTime(date, num) {
  var expiredDate = new Date(date);
  var lastMonth = expiredDate.getMonth();
  expiredDate.setMonth(lastMonth - num)
  return expiredDate.getTime()
}

function setLoginFlag(id) {
  var idList = $.cookie('idList') ? JSON.parse($.cookie('idList')) : [];
  // var flag = idList.some(function (item) {
  //   return item == id
  // })
  var flag = false;
  for (var i = 0; i < idList.length; i++) {
    if (idList[i] == id) {
      flag = true;
    }
  }
  if (!flag) {
    // 第一次登录
    var date = new Date();
    date.setDate(new Date().getDate() + 1)
    date = new Date(date.toLocaleDateString()) //设置date当天24点清空
    $.cookie("loginFLag", 1)
    idList.push(id);
    $.cookie("idList", JSON.stringify(idList), {
      expires: date
    })
  }
}

function setRegFlag() {
  var regFlag = localStorage.getItem('regFlag');
  var date = new Date().toLocaleDateString()
  console.log(regFlag,date,regFlag !== date);
  // var flag = false;
  if (regFlag !== date) {
    setTimeout(function () {
      $(".elevator.e_right").css("z-index", 111);
      $(".elevator.e_right").addClass("quick_reg");
      $(".fast_box").show()
      // changeTab(2) //默认免费注册
    }, 4000)
  }
}

function handlePlay() {
  // 视频播放  new added
  $("#video_cover").on("click", function () {
    getVideo()
  })
  $(".video_box").on("click", ".video_close", function () {
    player.dispose()
    // $(".video_box").hide()
    $(".video_box").html("")
    $(".video_box").html('<div id="J_prismPlayer" class="prism-player"></div><div class="video_close"></div>')
        .hide()
    $(".col21").show()
  })
}

function getVideo() {
  var vid = "428d1a2485e9440fa3cf5a623bd9183a" //新
  $(".col21").hide()
  $(".video_box").show()
  // h5模式下aliplay插件mp4格式文件下只能兼容到ie9及以上，则ie8及以下使用flash模式
  if (IEVersion() <= 9 && IEVersion() > 1) {
    window.open("https://v.qq.com/x/page/q32246ynbfc.html")
    return;
  }
  // $(".video_box").html('<div id="J_prismPlayer" class="prism-player"></div><div class="video_close"></div>')
  // $(".col21").hide()
  // $(".video_box").show().removeClass("video_under")
  $.ajax({
    type: "get",
    url: "/cblcn/train.Vod/playauth_free?vid=" + vid,
    // url: "playauth.json",
    dataType: "json",
    success: function (result) {
      if (result && result.isSuccess) {
        player = new Aliplayer({
          "id": "J_prismPlayer",
          "vid": vid,
          "playauth": result.data,
          "width": "620px",
          "height": "400px",
          "controlBarVisibility": "hover",
          autoplay: true
        }, function (player) {

        });
      }
    }
  })
}

function setBanOrder() {
  var banDate = new Date();
  banDate.setDate(new Date().getDate() + 7)
  if ($.cookie("banOrder")) { //之前存过
    bannerParams = Number($.cookie("banOrder")) + 1;
    if (bannerParams == $(".col21 li").length-1) {
      bannerParams = 0;
    }
    ieBannerParams = bannerParams;
    $.cookie("banOrder", bannerParams, {
      expires: banDate
    })
  } else { //没存过
    $.cookie("banOrder", 0, {
      expires: banDate
    })
  }
}
