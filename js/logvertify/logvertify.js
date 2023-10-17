
var securityCheck = null;  //安全校验的实例

function logvertify(){
  return function(){
    var codeData = {};   //验证成功后，传回来的数据
    var CAPTCHA_OBJ;    //滑块验证对象
    var sliderflag = false;   //完成滑块验证的flag
    var url = 'https://cstaticdun.126.net/load.min.js' + '?t=' + getTimestamp(1 * 60 * 1000) // 时长1分钟，建议时长分钟级别
    var timer = null;
    var index = 60;
    var lastPhone = '';  //号码不一致就refresh验证码

    function safeGroup(){ //初始化参数
      var self = this;

      loadScript(url, function () {
        // 进行初始化验证码等后续逻辑
        initNECaptcha({
            captchaId: '21ddb75593e043d9a00419e7e5c772f9',
            element: '#safe-slider',
            mode: 'float',
            width: '320px',
            onReady: function (instance) {
                $(".yidun_tips .yidun_tips__text").html("向右拖动滑块填充拼图");                    
            },
            onVerify: function (err, data) {
                if (!err) {
                    // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
                    if(self.regPhone()){
                        $(".safe-sliderbox .safe-errortip").hide().html('');
                        sliderflag = true;
                        codeData = data;
                        index = 60;
                        lastPhone = $('#safe-phone').val();
                        self.countDown();
                    }else{
                        CAPTCHA_OBJ.refresh();
                        sliderflag = false;
                    }
                }else{ 
                    $(".yidun_tips .yidun_tips__text").html("向右拖动滑块").show();
                    sliderflag = false;
                    return;
                }
            }
        },function onload (instance){
            CAPTCHA_OBJ = instance;
        })
      })
    
      $('#safe-phone').focus(function(){
        $(".safe-phonebox .safe-errortip").hide().html('');
        $(this).css('border','1px solid #ECECEC')
      })
      $('#safe-phone').blur(function(){
        self.regPhone();
      })

      $('#safe-code').focus(function(){
        $(".safe-codebox .safe-errortip").hide().html('');
        $(this).css('border','1px solid #ECECEC')
      })
      $('#safe-code').blur(function(){
        self.regCode();
      })

      $('#safe-getcode').on('click',function(){ //获取验证码
        if(self.regPhone() && self.regSlider()){
          if(lastPhone == $('#safe-phone').val()){
            index = 60;
            self.countDown();
          }else{
            CAPTCHA_OBJ.refresh();
            $(".safe-sliderbox .safe-errortip").show().html('请完成滑动验证');
          }
        }
      })
      $('.safe-verificate .safe-verificate-btn').on('click',function(){ //安全验证 
        if(self.regPhone() && self.regSlider() && self.regCode()){
          var phoneTxt = $('#safe-phone').val();
          var codeTxt = $('#safe-code').val();
          var httpxml ;
          if(window.XMLHttpRequest){
              //大多数浏览器
              httpxml = new XMLHttpRequest();
          }else{
              //古董级浏览器
              httpxml = new ActiveXObject("Microsoft.XMLHTTP");
          }
          httpxml.open("post","/yuan/register/registernew/registersub",true);
          httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          httpxml.onreadystatechange =function () {
              if(httpxml.readyState==4 && httpxml.status==200){
                  var s;
                  if (typeof(JSON) == 'undefined'){
                      s = eval("("+httpxml.responseText+")");
                  }else{
                      s = JSON.parse(httpxml.responseText);
                  }
                  
                  if(s.code == 201){
                    if(s.msg == '注册成功-1'){ //已绑定另一个
                      self.changeShow('2');
                    }else if(s.msg == '注册成功-0' || s.msg == '注册成功-2'){ //享受服务
                      self.changeShow('1');
                    }else{
                      $('.order_message p').html(s.msg);
                      $('.order_message').fadeIn(1000).fadeOut(2000);
                    }
                  }else if(s.code == 512){  //512验证码输入错误次数过多
                    $(".safe-codebox .safe-errortip").show().html(s.msg);
                    CAPTCHA_OBJ.refresh();
                    sliderflag = false;
                  }else{
                    $(".safe-codebox .safe-errortip").show().html(s.msg);
                  }
              }
          }
          httpxml.send("phone="+convert1(phoneTxt)+"&phonecode="+convert1(codeTxt));
        }
      })
      $('.safe-verificate .safe-close').on('click',function(){
        self.changeShow('3');
      })

      $('.safe-success .safe-comlog,.safe-success-back .safe-comlog').on('click',function(){ //继续登录企业账号
        var httpxml ;
        if(window.XMLHttpRequest){
            //大多数浏览器
            httpxml = new XMLHttpRequest();
        }else{
            //古董级浏览器
            httpxml = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpxml.open("get","/yuan/logout/logout/logoutsub3",true);
        httpxml.onreadystatechange =function () {
            if(httpxml.readyState==4 && httpxml.status==200){
                var s;
                if (typeof(JSON) == 'undefined'){
                    s = eval("("+httpxml.responseText+")");
                }else{
                    s = JSON.parse(httpxml.responseText);
                }

                if(s.code == 200){
                  self.changeShow();
                }else{
                  $('.order_message p').html("继续登录企业账号失败");
                  $('.order_message').fadeIn(1000).fadeOut(2000);
                  // console.log('子账号退出失败')
                }
                
            }
        }
        httpxml.send();
      })

      $('.safe-fail .safe-rebtn').on('click',function(){
        self.changeShow('0');
      })
      $('.safe-fail .safe-backbtn').on('click',function(){ //退出登录
        var httpxml;
        if (window.XMLHttpRequest) {
            //大多数浏览器
            httpxml = new XMLHttpRequest();
        } else {
            //古董级浏览器
            httpxml = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpxml.open("get", "/yuan/logout/logout/logout3", true);
        httpxml.onreadystatechange = function () {
            if (httpxml.readyState == 4 && httpxml.status == 200) {
                var s;
                if (typeof (JSON) == 'undefined') {
                    s = eval("(" + httpxml.responseText + ")");
                } else {
                    s = JSON.parse(httpxml.responseText);
                }
                if(s.code == 200){
                  linkGio()
                }else if(s.code == 502){
                  $('.order_message p').html("主账号未登录");
                  $('.order_message').fadeIn(1000).fadeOut(2000);
                  setTimeout(function(){
                    history.go(0)
                  },2000)
                }else{
                  $('.order_message p').html("退出失败");
                  $('.order_message').fadeIn(1000).fadeOut(2000);
                }
            }
        }
        httpxml.send();
      })

      $('.safe-success .safe-selflog,.safe-success .safe-close,.safe-success-back .safe-close').on('click',function(){
        self.changeShow();
      })

      // ie单独适配
      if (((!!window.ActiveXObject || "ActiveXObject" in window) && IEVersion() <= 8)) {
        $('.safe-verificate .safe-ieplaceholder').show();
        $('.safe-phonebox .safe-ieplaceholder').on('click',function(){
          $(this).hide()
          $('#safe-phone').focus()
        })
        $('#safe-phone').on('blur',function(){
          if($(this).val()==''){
            $('.safe-phonebox .safe-ieplaceholder').show()
          }
        })

        $('.safe-codebox .safe-ieplaceholder').on('click',function(){
          $(this).hide()
          $('#safe-code').focus()
        })
        $('#safe-code').on('blur',function(){
          if($(this).val()==''){
            $('.safe-codebox .safe-ieplaceholder').show()
          }
        })
      }
    }
    function getTimestamp (msec) {
        msec = !msec && msec !== 0 ? msec : 1
        return parseInt((new Date()).valueOf() / msec, 10)
    }
    function loadScript (src, cb) {
        var head = document.head || document.getElementsByTagName('head')[0]
        var script = document.createElement('script')

        cb = cb || function () {}

        script.type = 'text/javascript'
        script.src = src

        if (!('onload' in script)) {
        script.onreadystatechange = function () {
            if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
            this.onreadystatechange = null
            cb(script)
        }
        }

        script.onload = function () {
            this.onload = null
            cb(script)
        }

        head.appendChild(script)
    }

    safeGroup.prototype.regPhone = function(){
      var logTxt = $('#safe-phone').val();
      var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[123589])\d{8}$/;
      if (logTxt === "") {
        $(".safe-phonebox .safe-errortip").show().html('请输入手机号');
        $('#safe-phone').css('border','1px solid #FFAC50')
        return false
      }else if(!reg.test(logTxt)){
        $(".safe-phonebox .safe-errortip").show().html('请输入正确手机号');
        $('#safe-phone').css('border','1px solid #FFAC50')
        return false
      }else{
        $(".safe-phonebox .safe-errortip").hide().html('')
        return true
      }
    }
    safeGroup.prototype.regSlider = function(){
      if (!sliderflag) {
        $(".safe-sliderbox .safe-errortip").show().html('请完成滑动验证');
        return false
      }else{
        $(".safe-sliderbox .safe-errortip").hide().html('');
        return true
      }
    }
    safeGroup.prototype.regCode = function(){
      var numTxt = $('#safe-code').val();
      if (numTxt === "") {
        $(".safe-codebox .safe-errortip").show().html('请输入验证码');
        $('#safe-code').css('border','1px solid #FFAC50')
        return false
      }else{
        $(".safe-codebox .safe-errortip").hide().html('');
        return true
      }
    }
    safeGroup.prototype.countDown = function(){
      $(".safe-codebox .safe-errortip").hide().html('');
      var logTxt = $('#safe-phone').val(); 
      var httpxml ;
      if(window.XMLHttpRequest){
          //大多数浏览器
          httpxml = new XMLHttpRequest();
      }else{
          //古董级浏览器
          httpxml = new ActiveXObject("Microsoft.XMLHTTP");
      }
      httpxml.open("post","/yuan/register/registernew/sendmessagewyy",true);
      httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      httpxml.onreadystatechange =function () {
          if(httpxml.readyState==4 && httpxml.status==200){
              var s;
              if (typeof(JSON) == 'undefined'){
                  s = eval("("+httpxml.responseText+")");
              }else{
                  s = JSON.parse(httpxml.responseText);
              }
              if(s.code == 202){
                  clearInterval(timer);
                  $("#safe-getcode").addClass("notclick");
                  // 60s倒计时
                  $("#safe-getcode").html(index+"S后可重发");
                  timer=setInterval(function(){
                      index--;
                      $("#safe-getcode").html(index+"S后可重发");
                      if(index==0){
                          $("#safe-getcode").removeClass("notclick");
                          $("#safe-getcode").html("重新获取验证码");
                          clearInterval(timer);
                      }
                  },1000)
                  $(".safe-sliderbox .safe-errortip").show().html('验证码已发送至手机，请查收');
                  setTimeout(function(){
                    $(".safe-sliderbox .safe-errortip").html("").hide();
                  },2000)
              }else if(s.code==525 || s.code==526){
                  $(".safe-sliderbox .safe-errortip").show().html(s.msg);
              }else if(s.code==541 || s.code==543 || s.code==546){//541请输入手机号  543手机号已注册  546输入正确手机号
                  $(".safe-phonebox .safe-errortip").show().html(s.msg);
              }else if(s.code==549 || s.code==551 || s.code==556 || s.code==545 || s.code==554){//549短信已发送，请稍后再试   551/556短信发送失败  545填写信息有误
                  $(".safe-codebox .safe-errortip").show().html(s.msg.replace(/\s+/g,''));
              }
          }
      }
      httpxml.send("type=7&phone="+convert1(logTxt)+"&geetest_challenge="+codeData.validate+"&geetest_validate="+codeData.validate+"&geetest_seccode="+codeData.validate);
    }
    safeGroup.prototype.changeShow = function(type){ //0校验中  1验证成功-正常  2验证成功-解绑  3退出提示
      $('.safe-container .safe-verificate').hide();
      $('.safe-container .safe-success').hide();
      $('.safe-container .safe-success-back').hide();
      $('.safe-container .safe-fail').hide();
      switch(type)
      {
        case '0':
          $('.safe-container .safe-verificate').show();
          break;
        case '1':
          $('.safe-container .safe-success').show();
          break;
        case '2':
          var httpxml;
          if (window.XMLHttpRequest) {
            //大多数浏览器
            httpxml = new XMLHttpRequest();
          } else {
            //古董级浏览器
            httpxml = new ActiveXObject("Microsoft.XMLHTTP");
          }
          httpxml.open("post", "/cblcn/Home/newLoginCheck", true);
          httpxml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          httpxml.onreadystatechange = function () {
            if (httpxml.readyState == 4 && httpxml.status == 200) {
              var s;
              if (typeof (JSON) == 'undefined') {
                s = eval("(" + httpxml.responseText + ")");
              } else {
                s = JSON.parse(httpxml.responseText);
              }
              if(s.userMeta && s.userMeta!='400-006-6655'){
                $('.safe-success-back .safe-success-red span').html(s.userName+' '+s.userMeta);
              }else{
                $('.safe-success-back .safe-success-red span').html('400-006-6655');
              }
              $('.safe-container .safe-success-back').show();
            }
          }
          httpxml.send("t="+new Date().getTime());
          break;
        case '3':
          $('.safe-container .safe-fail').show();
          break;
        default:
          $('.safe-container').hide();
          reglinktxt();
      }
    }

    if(!securityCheck){
      securityCheck = new safeGroup();
      $('.safe-container').show();
    }else{
      securityCheck.changeShow('0');
      $('.safe-container').show();
    }

  }()
}