// function getMyClaim() {
//   if (claimFlag) {
//     setMyClaim();
//   } else {
//     setPreheatYure();
//   }
// }

//预热 8.18~8.24展示 8.25~9.08

var claimType = 0;
var endDateWork = "2023/08/24 22:59:59";
var nowDateWork = new Date();
if (nowDateWork.getTime() <= new Date(endDateWork).getTime()){
  claimType = 0;
} else {
  claimType = 1;
}

function getMyClaim(){
  var isTextTemp = localStorage.getItem('isText'); // 获取当前的登录状态
  if (isTextTemp == 0){
    window.open("/public/2020/html/register.html?source=1");
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
  httpxml.open("get", "/yuan/acitvity/getRecord", true);
  httpxml.onreadystatechange = function () {
    if (httpxml.readyState == 4 && httpxml.status == 200) {
      var s;
      if (typeof (JSON) == 'undefined') {
        s = eval("(" + httpxml.responseText + ")");
      } else {
        s = JSON.parse(httpxml.responseText);
      }
      // 处理逻辑
      //预热 8.18~8.24展示
      if (claimType == 0){
        if (!s.act0){
          setPreheatYure();
        } else if (s.act0){
          setMyClaim(s);
        }
      } else {
        if (!s.act1){
          setPreheatYure();
        } else if (s.act1){
          setMyClaim(s);
        }
      }
      //正式 8.25~9.08
    }
  }
  httpxml.send();
}


function setPreheatYure() {
  var tcImg = '';
  if (claimType == 0){
    tcImg = "/public/2020/img/homeClaim/tc_cp_yr.png";
  } else {
    tcImg = "/public/2020/img/homeClaim/tc_cp_zs.png";
  }
  var text1 = '<div class="preheat preheatYure">' +
      '<div class="membership_box">' +
      '<img class="yure" src="'+tcImg+'" alt="">' +
      '<p class="closebtn"><img src="https://cdn.chinabidding.cn/public/2020/img/syhd_tc_icongb2.png" alt=""></p>' +
      '<div class="linquBtn"></div>' +
      '</div></div>';
  $("body").append(text1)
  $('.preheatYure .closebtn').click(function(){
    $('.preheatYure').remove();
    $.cookie("pop_status", 0);
  })
  $('.preheatYure .linquBtn').click(function(){
    getCommit();
  })
  return true;
}
//领取物品按钮
function getCommit() {
  var httpxml;
  if (window.XMLHttpRequest) {
    //大多数浏览器
    httpxml = new XMLHttpRequest();
  } else {
    //古董级浏览器
    httpxml = new ActiveXObject("Microsoft.XMLHTTP");
  }
  httpxml.open("get", "/yuan/acitvity/commit?type="+claimType, true);
  httpxml.onreadystatechange = function () {
    if (httpxml.readyState == 4 && httpxml.status == 200) {
      var s;
      if (typeof (JSON) == 'undefined') {
        s = eval("(" + httpxml.responseText + ")");
      } else {
        s = httpxml.responseText;
      }
      // 处理逻辑
      $('.preheatYure').remove();
      setReceiveSuccess();
    }
  }
  httpxml.send();
}

function setReceiveSuccess() {
  var text2 = '<div class="preheat receiveSuccess">' +
                  '<div class="membership_box">' +
                      '<img class="yure" src="/public/2020/img/homeClaim/tc_cp_lqcg.png" alt="">' +
                      '<p class="closebtn"><img src="https://cdn.chinabidding.cn/public/2020/img/syhd_tc_icongb2.png" alt=""></p>' +
                      '<div class="linquBtn"></div>' +
                      '</div></div>';
  $("body").append(text2);
  $('.receiveSuccess .closebtn').click(function(){
    $('.receiveSuccess').remove();
    $.cookie("pop_status", 0);
  })

  $('.receiveSuccess .linquBtn').click(function(){
    $('.receiveSuccess').remove();
    $.cookie("pop_status", 0);
  })
}

function setMyClaim(data) {
  var itemList = [
    {id:1, goodName: '践程智能迷你按摩椅', goodDate: '2023/09/08 12:00:00'},
    {id:2, goodName: 'Salaxene多媒体投影机', goodDate: '2023/09/08 12:00:00'},
    {id:3, goodName: '新加坡爱家乐美妆冰箱', goodDate: '2023/09/08 12:00:00'},
    {id:4, goodName: '3D纳米抑菌乳胶床垫三件套', goodDate: '2023/09/08 12:00:00'},
    {id:5, goodName: '西屋Westinghouse空气净化器', goodDate: '2023/09/08 12:00:00'},
    {id:6, goodName: '松下负离子吹风机', goodDate: '2023/09/08 12:00:00'},
    {id:7, goodName: '罗莱家纺悦动人生全棉四件套', goodDate: '2023/09/08 12:00:00'},
    {id:8, goodName: '欧姆龙（OMRON）电子血压计', goodDate: '2023/09/08 12:00:00'},
    {id:8, goodName: '蓝宝破壁机', goodDate: '2023/09/08 12:00:00'},
    {id:8, goodName: '毕亚兹Biaze 高压无线洗车机', goodDate: '2023/09/08 12:00:00'},
    {id:8, goodName: '康宁滴漏式咖啡茶饮机', goodDate: '2023/09/08 12:00:00'},
    {id:8, goodName: 'Apiyoo便携式蓝牙音箱', goodDate: '2023/09/08 12:00:00'},
  ];
  var virtualGood = "";
  itemList.forEach(function (item) {
    virtualGood += "<li><span class=\"goodName\">"+item.goodName+"</span><span class=\"goodDate\">2023/09/08 23:59:59</span></li>";
  })
  var text = '';
  text += "<div class=\"myClaim\">";
  text += "        <div class=\"membership_box\">";
  text += "            <p class=\"closebtn\"><img src=\"https://cdn.chinabidding.cn/public/2020/img/syhd_tc_icongb2.png\" alt=\"\"></p>";
  text += "            <div class=\"claim_bg\">";
  text += "                <ul class=\"claim_menu\">";
  text += "                    <li class=\"active\"><span>领取说明</span></li>";
  if (data.act0){
    text += "                    <li><span>虚拟商品</span></li>";
  }
  if (data.act1){
    text += "                    <li><span>实物商品</span></li>";
  }
  text += "                </ul>";
  text += "                <div class=\"claim_tab\">";
  text += "                    <div class=\"claim_explain\">";
  text += "                        <p>1、活动时间：2023.08.18~2023.09.08 </p>";
  text += "                        <p>2、活动福利仅本次活动期间付款客户可兑换，付款金额需满足相应条件。</p>";
  text += "                        <p>3、活动福利：活动期间，客户登录平台后可通过活动弹窗/首页广告位/悬浮 窗等位置点击领取活动福利，每个客户仅可领取一次福利。</p>";
  text += "                        <p>4、福利兑换：领取的福利可前往首页“我的领取”查看，客户办理业务后即 可找专属客服兑换对应福利。</p> ";
  text += "                        <p>5、如果活动期间客户未将收货地址告知专属客服，则视为自动放弃福利，活 动结束后相关福利不予补发。</p> ";
  text += "                        <p>6、如因客户提供的信息不真实、不完整、失效或不合法导致福利无法发放或 发放错误等一切后果，由客户自行承担，相关福利不予补发。</p>";
  text += "                        <p>7、赠送的礼品不可以以同等价值进行产品价格折现，活动最终解释权归北京 国信创新科技股份有限公司所有。</p>";
  text += "                    </div>";
  if (data.act0){
    text += "                    <div class=\"virtual_goods\" id=\"virtual_goods\">";
    text += "                        <ul>";
    text += "                            <li class=\"goods_head\">";
    text += "                                <span class=\"goodName\">商品名称</span>";
    text += "                                <span class=\"goodDate\">兑奖有效期</span>";
    text += "                            </li>";
    text += "                        </ul>";
    text += "                        <ul class=\"goods_list\">";
    text += "                            <li>";
    text += "                                <span class=\"goodName\">优酷/腾讯/爱奇艺视频会员卡(三选一)</span>";
    text += "                                <span class=\"goodDate\">2023/09/08 23:59:59</span>";
    text += "                            </li>";
    text += "                        </ul>";
    text += "                    </div>";
  }
  if (data.act1){
    text += "                    <div class=\"virtual_goods\" id=\"physical_goods\">";
    text += "                        <ul>";
    text += "                            <li class=\"goods_head\">";
    text += "                                <span class=\"goodName\">商品名称<span style=\"color:red\">（根据办理业务选其一）</span></span>";
    text += "                                <span class=\"goodDate\">兑奖有效期</span>";
    text += "                            </li>";
    text += "                        </ul>";
    text += "                        <ul class=\"goods_list\">";
    text += virtualGood;
    text += "                        </ul>";
    text += "                    </div>";
  }
  text += "                </div>";
  text += "            </div>";
  text += "        </div>";
  text += "    </div>";
  $("body").append(text);

  $(".claim_menu li").mouseover(function(){
    //通过 .index()方法获取元素下标，从0开始，赋值给某个变量
    var _index = $(this).index();
    //让内容框的第 _index 个显示出来，其他的被隐藏
    $(".claim_tab>div").eq(_index).show().siblings().hide();
    //改变选中时候的选项框的样式，移除其他几个选项的样式
    $(this).addClass("active").siblings().removeClass("active");
  });
  $('.myClaim .closebtn').click(function(){
    $('.myClaim').remove();
  })
}

function floating() {
  var html = '<div class="floating" onclick="handelShow()"></div>';
  $("body").append(html);
}
function handelShow(){
  if (window.XMLHttpRequest) {
    //大多数浏览器
    httpxml = new XMLHttpRequest();
  } else {
    //古董级浏览器
    httpxml = new ActiveXObject("Microsoft.XMLHTTP");
  }
  httpxml.open("get", "/yuan/acitvity/getRecord", true);
  httpxml.onreadystatechange = function () {
    if (httpxml.readyState == 4 && httpxml.status == 200) {
      var s;
      if (typeof (JSON) == 'undefined') {
        s = eval("(" + httpxml.responseText + ")");
      } else {
        s = JSON.parse(httpxml.responseText);
      }
      // 处理逻辑
      //预热 8.18~8.24展示
      if (claimType == 0) {
        if (!s.act0) {
          setPreheatYure();
        } else if (s.act0) {
          setMyClaim(s);
        }
      } else {
        if (!s.act1) {
          setPreheatYure();
        } else if (s.act1) {
          setMyClaim(s);
        }
      }
      //正式 8.25~9.08
    }
  }
  httpxml.send();
}