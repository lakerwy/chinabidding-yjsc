(function () {

    function Slider(option) {
        this.wrap = option.wrap; //调用slider的元素
        this.imgList = option.imgList; //图片列表
        this.imgLR = option.imgLR; //左右切换按钮
        this.imgNum = this.imgList.length; //图片的长度
        this.width = option.width || $(this.wrap).width(); //图片的宽
        this.height = option.height || $(this.wrap).height(); //图片的高
        this.isAuto = option.isAuto || true; //是否自动轮播
        this.moveTime = option.moveTime; //轮播的时间
        this.direction = option.direction || 'right'; //轮播的方向
        this.btnWidth = option.btnWidth; //按钮的宽
        this.btnHeight = option.btnHeight; //按钮的高
        this.spanWidth = option.spanWidth; //span的宽
        this.spanHeight = option.spanHeight; //span的高
        this.spanColor = option.spanColor; //span按钮的背景颜色
        this.activeSpanColor = option.activeSpanColor; //选中span的颜色
        this.btnBackgroundColor = option.btnBackgroundColor; //按钮的背景颜色
        this.spanRadius = option.spanRadius; //按钮的圆角程度
        this.spanMargin = option.spanMargin; //span之间的距离
        this.flag = false;
        this.nowIndex = option.nowIndex;
        this.createDom();
        this.initStyle();
        this.bindEvent();
        if(this.isAuto){
            this.autoMove()
        }
	}
	
	Slider.prototype.createSlider = function(item) {
		if(item.video_flag){
			// return '<video src="'+ item.img +'" controls="controls">您的浏览器不支持 video 标签。</video>'
			return '<img id="video_cover" src=" ' + item.img + ' ">'
		}else {	
			return '<img src=" ' + item.img + ' ">'
		}
	}

    Slider.prototype.createDom = function() {
        var oUl = $('<ul class="imgList"></ul>');
        var Spot = $('<div class="spot"></div>')
        // this.imgList.forEach(function(item) {
        //     var oLi = ('<li><a href=" ' + item.a +' "><img src=" ' + item.img + ' "></a></li>');
        //     oUl.append(oLi);
        //     var span = ('<span></span>');
        //     Spot.append(span);
        // });
		for(var i=0;i<this.imgList.length;i++){  //设置a标签属性
        // if(window.location.href.indexOf("login")!=-1 || window.location.href.indexOf("zbcg")!=-1 || window.location.href.indexOf("project")!=-1){
        //   if(this.imgList[i].a == "javascript:void(0);"){
        //     var oLi = ('<li><a rel="nofollow" href=" ' + this.imgList[i].a +' "><img src=" ' + this.imgList[i].img + ' "></a></li>');
        //   }else{
        //     var oLi = ('<li><a rel="nofollow" href=" ' + this.imgList[i].a +' " target="_blank"><img src=" ' + this.imgList[i].img + ' "></a></li>');
        //   }
        // }else{
        //   // var oLi = ('<li><a rel="nofollow" href=" ' + this.imgList[i].a +' " target="_blank"><img src=" ' + this.imgList[i].img + ' "></a></li>');
        // }
        if(this.imgList[i].a == "javascript:void(0);"){
            if (this.imgList[i].class == ""){
                var oLi = ('<li><a rel="nofollow" href=" ' + this.imgList[i].a +' "><img src=" ' + this.imgList[i].img + ' "></a></li>');
            } else {
                var oLi = ('<li class="' + this.imgList[i].class + '"><a rel="nofollow" href=" ' + this.imgList[i].a +' "><img src=" ' + this.imgList[i].img + ' "></a></li>');
            }

        }else{
          var oLi = ('<li><a rel="nofollow" href=" ' + this.imgList[i].a +' " target="_blank"><img src=" ' + this.imgList[i].img + ' "></a></li>');
        }
        if(this.imgList[i].video_flag){
          oLi = ('<li><a href=" ' + this.imgList[i].a +' ">' + this.createSlider(this.imgList[i]) + '</a></li>');
        }

          oUl.append(oLi);
          var span = ('<span></span>');
          Spot.append(span);
        }
        var leftBtn = $('<div class="left-btn"><img src=" ' + this.imgLR[0].img + ' "></div>');
        var rightBtn = $('<div class="right-btn"><img src=" ' + this.imgLR[1].img + ' "></div>');
        this.wrap.append(oUl).append(leftBtn).append(rightBtn).append(Spot);
    }

    Slider.prototype.initStyle = function() {
        $(this.wrap).css({
            overflow: 'hidden',
            position: 'relative'
        })
        $('.imgList', this.wrap).css({
            width: this.width,
            height: this.height,
            position: 'relative'
        });
        $('.imgList li', this.wrap).css({
            width: this.width,
            height: this.height,
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'none'
        }).eq(this.nowIndex).css({
            display: 'block'
        })
        $('.imgList li a, .imgList li a img', this.wrap).css({
            display: 'inline-block',
            width: this.width,
            height: this.height,
            objectFit: "cover"
        });
        $('.left-btn, .right-btn', this.wrap).css({
            width: this.btnWidth,
            height: this.btnHeight,
            backgroundColor: this.btnBackgroundColor,
            color: '#fff',
            textAlign: 'center',
            lineHeight: this.btnHeight + 'px',
            position: 'absolute',
            top: '50%',
            marginTop: - this.btnHeight / 2,
            cursor: 'pointer'
        });
        $('.right-btn', this.wrap).css({
            right: 0
        });
        $('.spot', this.wrap).css({
            height: this.spanHeight + (this.spanMargin * 2),
            position: 'absolute',
            left: '50%',
            marginLeft: - this.imgNum * (this.spanWidth + (this.spanMargin) * 2) / 2,
            bottom: 10
        })
        $('.spot span', this.wrap).css({
            display: 'inline-block',
            width: this.spanWidth,
            height: this.spanHeight,
            margin: this.spanMargin,
            backgroundColor: this.spanColor,
            borderRadius: this.spanRadius,
            cursor: 'pointer'
        }).eq(this.nowIndex).css({
            backgroundColor: this.activeSpanColor
        })
    }

    Slider.prototype.bindEvent = function() {
        var self = this;
        $('.left-btn', this.wrap).click(function() {
            self.move('prev');
        });
        $('.right-btn', this.wrap).click(function() {
            self.move('next');
        });
        $('.spot span').mouseover(function(e) {
            self.move($(this).index())
        });
        $(this.wrap).mouseenter(function () {
            clearInterval(self.time);
        }).mouseleave(function() {
            self.autoMove()
        })
    }

    Slider.prototype.move = function(dir) {
        if(this.flag) {
            return false;
        }
        this.flag = true;
        switch(dir) {
            case 'prev':
                if(this.nowIndex === 0) {
                    this.nowIndex = this.imgNum -1;
                }else{
                    this.nowIndex --;
                }
                break;
            case 'next':
                if(this.nowIndex === this.imgNum - 1) {
                    this.nowIndex = 0;
                }else{
                    this.nowIndex ++;
                }
                break;
            default: 
                this.nowIndex = dir;
                break;
        }
        var self = this;
        $('.imgList li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function() {
            self.flag = false;
        });
        $('.spot  span', this.wrap).css({
            backgroundColor: this.spanColor
        }).eq(this.nowIndex % this.imgNum).css({
            backgroundColor: this.activeSpanColor
		})
		// 背景图变化
		if(window.location.href.indexOf("project.html")!=-1 || window.location.href.indexOf("zbcg.html")!=-1){
			$('#banner').css("background",this.imgList[this.nowIndex].bgc)
		}
    }

    Slider.prototype.autoMove = function() {
        var self = this;
        this.time = setInterval(function() {
            if(this.direction == 'left') {
                $('.left-btn', this.wrap).trigger('click');
            }else{
                $('.right-btn', this.wrap).trigger('click');
            }
        }, self.moveTime)
    }

    $.fn.extend({
        slider: function(option) {
            option.wrap = this;
            new Slider(option);
        }
    })
} ())

// if(window.location.href.indexOf("project.html")!=-1){setTimeout(function(){$('#banner').css("background",bannerList[self.curPage%2].bgc)},1000)}
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d)
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b
    },
    easeOutQuad: function(x, t, b, c, d) {
        return - c * (t /= d) * (t - 2) + b
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return - c / 2 * (--t * (t - 2) - 1) + b
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b
    },
    easeOutQuart: function(x, t, b, c, d) {
        return - c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return - c / 2 * ((t -= 2) * t * t * t - 2) + b
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
    },
    easeInSine: function(x, t, b, c, d) {
        return - c * Math.cos(t / d * (Math.PI / 2)) + c + b
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b
    },
    easeInOutSine: function(x, t, b, c, d) {
        return - c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
    },
    easeInExpo: function(x, t, b, c, d) {
        return t == 0 ? b: c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    easeOutExpo: function(x, t, b, c, d) {
        return t == d ? b + c: c * ( - Math.pow(2, -10 * t / d) + 1) + b
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * ( - Math.pow(2, -10 * --t) + 2) + b
    },
    easeInCirc: function(x, t, b, c, d) {
        return - c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return - c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return - (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p)) + b
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * 2 * Math.PI / p) + c + b
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * 0.3 * 1.5;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return - 0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) * 0.5 + c + b
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) return c * 7.5625 * t * t + b;
        else if (t < 2 / 2.75) return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        else if (t < 2.5 / 2.75) return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        else return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
}); (function($) {
    var Tab = function(config) {
        this.config = $.extend({},
        Tab.config, config);
        this.init()
    };
    Tab.config = {
        effect: "base",
        direction: "x",
        autoPlay: false,
        playTo: 0,
        type: "mouseover",
        curClass: "current",
        link: false,
        stay: 2E3,
        delay: 200,
        lazy: false,
        merge: false,
        degradation: "base",
        animateTime: 300,
        easing: "swing",
        radius: 20,
        oninit: function() {},
        onchange: function() {}
    };
    Tab.prototype = {
        init: function() {
            var self = this,
            c = self.config;
            c.target = $(c.target);
            if (c.target.length <= 1) return;
            self.target = $(c.target);
            self.length = c.target.length;
            self.effect = Tab.effect[c.effect];
            if (self.effect.onInitStart) {
                var result = self.effect.onInitStart.call(self);
                if (result) return result
            }
            self.wrap = c.target.eq(0).parent();
            if (/(:?ul|ol|dl)/i.test(self.wrap[0].tagName)) {
                self.content = self.wrap;
                self.wrap = self.wrap.parent()
            } else {
                c.target.wrapAll('<div class="tabContent">');
                self.content = c.target.eq(0).parent()
            }
            if (c.control !== false) {
                c.control = c.control || self.wrap.find(".control");
                c.control = $(c.control);
                if (c.control.length < 1) {
                    var ul = $('<ul class="control">')[0],
                    tocStr = "";
                    for (var i = 0; i < self.length; i++) tocStr += '<li><a href="#">' + (i + 1) + "</a></li>";
                    ul.innerHTML = tocStr;
                    ul = self.wrap[0].appendChild(ul);
                    c.control = $(ul).children()
                }
                $.each(c.control,
                function(i, elem) {
                    if ($(elem).hasClass("next")) self.nextBtn = elem;
                    else if ($(elem).hasClass("prev")) self.prevBtn = elem
                });
                self.control = c.control
            }
            if (c.nextBtn) self.nextBtn = $(c.nextBtn);
            if (c.prevBtn) self.prevBtn = $(c.prevBtn);
            c.oninit.call(self);
            if (self.effect) self.effect.oninit.call(self);
            self.playTo(c.playTo);
            if (c.autoPlay) self.play();
            self.attach()
        },
        attach: function() {
            var self = this,
            c = self.config;
            if (c.autoPlay) {
                var stopElems = [self.wrap],
                ctrlBar = self.control && self.control[0].parentNode;
                if (ctrlBar) stopElems.push(ctrlBar);
                $.each(stopElems,
                function(i, elem) {
                    $(elem).bind("mouseover",
                    function(e) {
                        self.stop()
                    });
                    $(elem).bind("mouseout",
                    function(e) {
                        self.play()
                    })
                })
            }
            var needDelay = c.type == "mouseover";
            if (c.control) $.each(self.control,
            function(i, elem) {
                $(elem).bind(c.type,
                function() {
                    var delay = needDelay ? c.delay: 0;
                    if (self.delayTimer) window.clearTimeout(self.delayTimer);
                    self.delayTimer = window.setTimeout(function() {
                        self.playTo(i)
                    },
                    delay)
                });
                if (needDelay) {
                    $(elem).bind("mouseout",
                    function() {
                        if (self.delayTimer) window.clearTimeout(self.delayTimer)
                    });
                    $(elem).bind("click",
                    function() {
                        self.playTo(i)
                    })
                }
                if (!self.config.link) $(elem).bind("click",
                function(e) {
                    e.preventDefault()
                })
            });
            if (self.nextBtn) $(self.nextBtn).bind("click",
            function(e) {
                self.next();
                e.preventDefault()
            });
            if (self.prevBtn) $(self.prevBtn).bind("click",
            function(e) {
                self.prev();
                e.preventDefault()
            })
        },
        playTo: function(page) {
            var self = this,
            c = self.config,
            hasCur = self.curPage !== window.undefined,
            prevPage;
            if(page == 1) {
              self.curPage = 0;
            }else if(page == 2) {
              self.curPage = 1;
            }else if(page == 3) {
              self.curPage = 2;
            }else if(page == 4) {
              self.curPage = 3;
            }else if(page == 5) {
              self.curPage = 4;
            }
            if (self.running) return;
            self.running = true;
            window.setTimeout(function() {
                self.running = false
            },
            200);
            if (hasCur && self.curPage === page) return;
            self.prevPage = self.curPage;
            if ((c.effect == "slide" || c.effect == "slide3d") && c.merge) {
                prevPage = outBound(self.curPage);
                self.curPage = page;
                page = outBound(page)
            } else {
                prevPage = self.curPage;
                page = self.curPage = outBound(page)
            }
            if (self.control && page !== prevPage) {
                var curCtrl = self.control[page],
                prevCtrl = self.control[prevPage];
                if (curCtrl) $(curCtrl).addClass(self.config.curClass);
                if (window.location.href.indexOf("project.html") != -1) {
                    setTimeout(function() {
                        $('#banner').css("background", bannerList[self.curPage % 2].bgc)
                    },
                    1000)
                };
                if (prevCtrl) $(prevCtrl).removeClass(self.config.curClass)
            };
            if (c.lazy) {
                var curTarget = self.target[self.curPage];
                if (curTarget && !curTarget.parsed) self._lazyload(curTarget)
            }
            self.config.onchange.call(self, page);
            if (self.effect) self.effect.onchange.call(self);
            function outBound(i) {
                if (i >= self.length) i %= self.length;
                if (i < 0) {
                    var m = i % self.length;
                    i = m === 0 ? 0 : m + self.length
                }
                return i
            }
        },
        next: function() {
            this.playTo(this.curPage + 1)
        },
        prev: function() {
            this.playTo(this.curPage - 1)
        },
        play: function() {
            var self = this,
            c = self.config;
            if (self.timer) self.stop();
            self.timer = window.setInterval(function() {
                var to = self.curPage + 1;
                self.playTo(to)
            },
            c.stay)
        },
        stop: function() {
            window.clearInterval(this.timer)
        },
        _lazyload: function(obj) {
            var textarea = jQuery(obj).find("textarea");
            if (textarea.length === 2) {
                var bg_img = textarea[0].value;
                jQuery(obj).find("#child0").get(0).innerHTML = bg_img;
                var img = textarea[1].value;
                jQuery(obj).find("#child1").get(0).innerHTML = img;
                obj.parsed = true
            }
        }
    };
    Tab.effect = {};
    $.extend(Tab.effect, {
        base: {
            oninit: function() {
                var self = this,
                c = self.config;
                $.each(self.target,
                function(i, elem) {
                    if (self.target[c.playTo][0] != elem) $(elem).hide()
                })
            },
            onchange: function() {
                var self = this,
                prevElem = self.prevPage === window.undefined ? null: self.target[self.prevPage],
                curElem = self.target[self.curPage];
                if (prevElem) $(prevElem).hide();
                $(curElem).show()
            }
        },
        fade: {
            oninit: function() {
                var self = this,
                c = self.config;
                self.content.css("position", "relative");
                $.each(self.target,
                function(i, elem) {
                    elem = $(elem);
                    elem.show();
                    elem.data("index", i);
                    elem.css({
                        opacity: 0,
                        position: "absolute",
                        zIndex: i
                    })
                })
            },
            onchange: function() {
                var self = this,
                prevElem = self.prevPage === window.undefined ? null: $(self.target[self.prevPage]),
                curElem = $(self.target[self.curPage]);
                if (prevElem) prevElem.css("zIndex", prevElem.data("index"));
                curElem.css({
                    "zIndex": self.length,
                    "opacity": 0
                });
                curElem.fadeTo(self.config.animateTime, 1, "swing",
                function() {
                    self.target.not(curElem[0]).css("opacity", 0)
                });
                if (prevElem) prevElem.fadeTo(self.config.animateTime, 0);
                self.target.not(curElem[0]).stop()
            }
        },
        slide: {
            oninit: function() {
                var self = this,
                c = self.config;
                var tabItem = $(self.target[c.playTo]);
                self.wrap.css({
                    "overflow": "hidden",
                    "zoom": "1"
                });
                self.target.show();
                if (c.direction == "x") {
                    self.prop = "marginLeft";
                    self.boxProp = "width";
                    self.step = c.width || tabItem.outerWidth(true)
                } else {
                    self.prop = "marginTop";
                    self.boxProp = "height";
                    self.step = c.height || tabItem.outerHeight(true)
                }
                self.showNum = Math.ceil(parseFloat(self.wrap.css(self.boxProp)) / self.step);
                if (c.merge);
                if (c.direction == "x") {
                    self.content.css("width", (c.totalWidth || self.step * self.target.length) + "px");
                    self.target.css("float", "left")
                }
            },
            onchange: function() {
                var self = this,
                c = self.config,
                from = self.prevPage === window.undefined ? 0 : self.prevPage,
                to = self.curPage,
                pos;
                if (to + self.showNum > self.length) to = self.length - self.showNum;
                pos = to * self.step;
                var o = {};
                o[self.prop] = -pos + "px";
                self.content.stop();
                self.content.animate(o, self.config.animateTime)
            }
        },
        blur: {
            onInitStart: function() {
                if (!document.createElement("canvas").getContext) {
                    var config = $.extend({},
                    this.config, {
                        effect: this.config.degradation
                    });
                    return new Tab(config)
                }
            },
            oninit: function() {
                var self = this,
                c = self.config;
                self.content.css("position", "relative");
                $.each(self.target,
                function(i, elem) {
                    elem = $(elem);
                    elem.data("index", i);
                    elem.show();
                    elem.css({
                        opacity: 1,
                        position: "absolute",
                        zIndex: i
                    });
                    var img = elem.find("img").eq(0),
                    blurImg;
                    img.css("opacity", 0);
                    elem.data("img", img);
                    var tempImg = new Image;
                    $(tempImg).bind("load",
                    function() {
                        var blurImg;
                        if ( !! document.createElement("canvas").getContext) {
                            blurImg = $("<canvas>");
                            blurImg.css({
                                position: "absolute",
                                left: this.offsetLeft + "px",
                                top: this.offsetTop + "px",
                                opacity: 0
                            });
                            blurImg.attr({
                                width: this.width,
                                height: this.height
                            });
                            var randomNum = Math.floor(Math.random() * 3);
                            $.blur({
                                img: this,
                                canvas: blurImg[0],
                                process: function(r, g, b, x, y) {
                                    var channel = [r, g, b];
                                    if (x % 2 && y % 2) {
                                        channel[randomNum] += 100;
                                        channel[randomNum] = channel[randomNum] > 255 ? 255 : channel[randomNum]
                                    }
                                    return {
                                        r: channel[0],
                                        g: channel[1],
                                        b: channel[2]
                                    }
                                },
                                radius: self.config.radius
                            })
                        } else {
                            blurImg = $('<img src="' + this.src + '"/>');
                            blurImg.css({
                                position: "absolute",
                                left: this.offsetLeft + "px",
                                top: this.offsetTop + "px",
                                opacity: 0,
                                filter: 'Blur(Add="1",Direction="90",Strength="20")'
                            })
                        }
                        img.after(blurImg);
                        elem.data("blurImg", blurImg)
                    });
                    var tempImgURL = $.browser.msie ? img[0].src + "?" + Math.random() : img[0].src;
                    tempImg.src = img[0].src + "?" + Math.random();
                    var time = self.config.animateTime;
                    elem.data("in",
                    function() {
                        var img = elem.data("img"),
                        blurImg = elem.data("blurImg");
                        if (blurImg) {
                            blurImg.stop().fadeTo(time, 1).fadeTo(time, 0);
                            img.stop().delay(time).fadeTo(1, 1)
                        } else img.css("opacity", 1)
                    });
                    elem.data("out",
                    function() {
                        var img = elem.data("img"),
                        blurImg = elem.data("blurImg");
                        if (blurImg) {
                            blurImg.stop().fadeTo(time, 1).fadeTo(time, 0);
                            img.stop().fadeTo(1, 1).delay(time).fadeTo(1, 0)
                        }
                        img.stop().fadeTo(time, 0)
                    })
                })
            },
            onchange: function() {
                var self = this,
                prevElem = self.prevPage === window.undefined ? null: $(self.target[self.prevPage]),
                curElem = $(self.target[self.curPage]);
                if (prevElem) {
                    prevElem.data("out")();
                    window.setTimeout(function() {
                        curElem.data("in")()
                    },
                    self.config.animateTime)
                } else curElem.data("in")()
            }
        },
        slide3d: {
            oninit: function() {
                var self = this,
                c = self.config;
                var arrTarget = [];
                for (var i = 0; i < self.target.length; i++) arrTarget[i] = self.target.eq(i);
                self.target = arrTarget;
                var tabItem = self.target[c.playTo];
                self.wrap.css({
                    "overflow": "hidden",
                    "zoom": "1"
                });
                $.each(self.target,
                function(i, $obj) {
                    $obj.show()
                });
                self.prop = "left";
                self.boxProp = "width";
                self.step = c.width || tabItem.outerWidth(true);
                self.showNum = Math.ceil(parseFloat(self.wrap.css(self.boxProp)) / self.step);
                if (c.merge) {
                    var copies = [];
                    $.each(self.target,
                    function(i, $obj) {
                        var $copy = $obj.clone(true).appendTo(self.content);
                        copies.push($copy)
                    });
                    self.target = self.target.concat(copies);
                    self.plus = 0
                }
                if (c.direction == "x") {
                    self.content.css({
                        "position": "relative",
                        "left": 0,
                        "marginLeft": 0,
                        "width": (c.totalWidth || self.step * self.target.length) + "px"
                    });
                    $.each(self.target,
                    function(i, $obj) {
                        $obj.css({
                            "float": "left"
                        });
                        var child = $obj.find(".child");
                        $obj.data("child", child)
                    })
                }
            },
            onchange: function() {
                if (this.prevPage === window.undefined) return;
                var self = this,
                c = self.config,
                from = self.prevPage === window.undefined ? 0 : self.prevPage,
                to = self.curPage,
                pos;
                to = from + (to - from) % self.target.length;
                if (Math.abs(to - from) > self.target.length / 2) if (to < from) to += self.target.length;
                else to -= self.target.length;
                self.curPage = to;
                var pointerOffset = 0;
                merge: if (c.merge) {
                    var across = to - from,
                    num = Math.abs(across);
                    if (across === 0) break merge;
                    if (across < 0) {
                        if (to >= self.plus) break merge;
                        for (var i = 0; i < num; i++) {
                            var elem = self.target.pop();
                            self.content.prepend(elem);
                            self.target.unshift(elem);
                            pointerOffset--
                        }
                    } else if (across > 0) {
                        if (to <= self.target.length + self.plus - self.showNum) break merge;
                        for (var i = 0; i < num; i++) {
                            var elem = self.target.shift();
                            self.content.append(elem);
                            self.target.push(elem);
                            pointerOffset++
                        }
                    }
                    self.plus += across;
                    self.content.css("marginLeft", parseInt(self.content.css("marginLeft")) + across * self.step + "px")
                }
                if (c.merge) pos = to * self.step;
                else {
                    if (to + self.showNum > self.length) to = self.length - self.showNum;
                    pos = to * self.step
                }
                var plus;
                if (to > from) plus = 1;
                else plus = -1;
                var offset = -1;
                if (to > from) offset = 1;
                var prevChild = getObj(from).data("child");
                prevChild.each(function(i, obj) {
                    var z = parseInt($(obj).attr("data-z"));
                    z = z >= 5 ? 5 : z;
                    if (z > 1) {
                        var myOffset = -offset * self.step * ($(obj).attr("data-z") - 1);
                        window.setTimeout(function() {
                            $(obj).stop().animate({
                                "marginLeft": myOffset
                            },
                            self.config.animateTime, "easeInOutExpo",
                            function() {
                                $(obj).css("marginLeft", "0px")
                            })
                        },
                        (5 - z) * 50)
                    }
                });
                window.setTimeout(function() {
                    var o = {};
                    o[self.prop] = -pos + "px";
                    self.content.stop();
                    self.content.animate(o, self.config.animateTime, "easeInOutExpo")
                },
                250);
                window.setTimeout(function() {
                    var child = getObj(to).data("child");
                    child.each(function(i, obj) {
                        var z = parseInt($(obj).attr("data-z"));
                        z = z >= 5 ? 5 : z;
                        if (z > 1) {
                            var myOffset = offset * self.step * $(obj).attr("data-z");
                            window.setTimeout(function() {
                                $(obj).css("marginLeft", myOffset + "px");
                                $(obj).stop().animate({
                                    "marginLeft": 0
                                },
                                self.config.animateTime, "easeInOutExpo")
                            },
                            (z - 1) * 50)
                        }
                    })
                },
                250);
                function getObj(n) {
                    var offset = self.plus % self.target.length;
                    var index = (n - offset) % self.target.length;
                    return self.target[index]
                }
            }
        }
    });
    jQuery.Tab = Tab
})(jQuery);
/*  |xGv00|d50893f9be89e698d9f4ce8022e7ec6a */


(function($){

	$.fn.kxbdSuperMarquee = function(options){
		var opts = $.extend({},$.fn.kxbdSuperMarquee.defaults, options);
		
		return this.each(function(){
			var $marquee = $(this);//滚动元素容器
			var _scrollObj = $marquee.get(0);//滚动元素容器DOM
			var scrollW = $marquee.width();//滚动元素容器的宽度
			var scrollH = $marquee.height();//滚动元素容器的高度
			var $element = $marquee.children(); //滚动元素
			var $kids = $element.children();//滚动子元素
			var scrollSize=0;//滚动元素尺寸
			var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下
			var scrollId, rollId, isMove, marqueeId;
			var t,b,c,d,e; //滚动动画的参数,t:当前时间，b:开始的位置，c:改变的位置，d:持续的时间，e:结束的位置
			var _size, _len; //子元素的尺寸与个数
			var $nav,$navBtns;
			var arrPos = []; 
			var numView = 0; //当前所看子元素
			var numRoll=0; //轮换的次数
			var numMoved = 0;//已经移动的距离

			//防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
			$element.css(_type?'width':'height',10000);
			//获取滚动元素的尺寸
			var navHtml = '<ul>';
			if (opts.isEqual) {
				_size = $kids[_type?'outerWidth':'outerHeight']();
				_len = $kids.length;
				scrollSize = _size * _len;
				for(var i=0;i<_len;i++){
					arrPos.push(i*_size);
					navHtml += '<li>'+ (i+1) +'</li>';
				}
			}else{
				$kids.each(function(i){
					arrPos.push(scrollSize);
					scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
					navHtml += '<li>'+ (i+1) +'</li>';
				});
			}
			navHtml += '</ul>';
			
			//滚动元素总尺寸小于容器尺寸，不滚动
			if (scrollSize<(_type?scrollW:scrollH)) return; 
			//克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
			$element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
			
			//轮换导航
			if (opts.navId) {
				$nav = $(opts.navId).append(navHtml).hover( stop, start );
				$navBtns = $('li', $nav);
				$navBtns.each(function(i){
					$(this).bind(opts.eventNav,function(){
						if(isMove) return;
						if(numView==i) return;
						rollFunc(arrPos[i]);
						$navBtns.eq(numView).removeClass('navOn');
						numView = i;
						$(this).addClass('navOn');
					});
				});
				$navBtns.eq(numView).addClass('navOn');
			}
			
			//设定初始位置
			if (opts.direction == 'right' || opts.direction == 'down') {
				_scrollObj[_type?'scrollLeft':'scrollTop'] = scrollSize;
			}else{
				_scrollObj[_type?'scrollLeft':'scrollTop'] = 0;
			}
			
			if(opts.isMarquee){
				//滚动开始
				//marqueeId = setInterval(scrollFunc, opts.scrollDelay);
				marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
				//鼠标划过停止滚动
				$marquee.hover(
					function(){
						clearInterval(marqueeId);
					},
					function(){
						//marqueeId = setInterval(scrollFunc, opts.scrollDelay);
						clearInterval(marqueeId);
						marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
					}
				);
				
				//控制加速运动
				if(opts.controlBtn){
					$.each(opts.controlBtn, function(i,val){
						$(val).bind(opts.eventA,function(){
							opts.direction = i;
							opts.oldAmount = opts.scrollAmount;
							opts.scrollAmount = opts.newAmount;
						}).bind(opts.eventB,function(){
							opts.scrollAmount = opts.oldAmount;
						});
					});
				}
			}else{
				if(opts.isAuto){
					//轮换开始
					start();
					
					//鼠标划过停止轮换
					$marquee.hover( stop, start );
				}
			
				//控制前后走
				if(opts.btnGo){
					$.each(opts.btnGo, function(i,val){
						$(val).bind(opts.eventGo,function(){
							if(isMove == true) return;
							opts.direction = i;
							rollFunc();
							if (opts.isAuto) {
								stop();
								start();
							}
						});
					});
				}
			}
			
			function scrollFunc(){
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
				
				if(opts.isMarquee){
					if (opts.loop > 0) {
						numMoved+=opts.scrollAmount;
						if(numMoved>scrollSize*opts.loop){
							_scrollObj[_dir] = 0;
							return clearInterval(marqueeId);
						} 
					}
					var newPos = _scrollObj[_dir]+(opts.direction == 'left' || opts.direction == 'up'?1:-1)*opts.scrollAmount;
				}else{
					if(opts.duration){
						if(t++<d){
							isMove = true;
							var newPos = Math.ceil(easeOutQuad(t,b,c,d));
							if(t==d){
								newPos = e;
							}
						}else{
							newPos = e;
							clearInterval(scrollId);
							isMove = false;
							return;
						}
					}else{
						var newPos = e;
						clearInterval(scrollId);
					}
				}
				
				if(opts.direction == 'left' || opts.direction == 'up'){
					if(newPos>=scrollSize){
						newPos-=scrollSize;
					}
				}else{
					if(newPos<=0){
						newPos+=scrollSize;
					}
				}
				_scrollObj[_dir] = newPos;
				
				if(opts.isMarquee){
					marqueeId = setTimeout(scrollFunc, opts.scrollDelay);
				}else if(t<d){
					if(scrollId) clearTimeout(scrollId);
					scrollId = setTimeout(scrollFunc, opts.scrollDelay);
				}else{
					isMove = false;
				}
				
			};
			
			function rollFunc(pPos){
				isMove = true;
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
				var _neg = opts.direction == 'left' || opts.direction == 'up'?1:-1;

				numRoll = numRoll +_neg;
				//得到当前所看元素序号并改变导航CSS
				if(pPos == undefined&&opts.navId){
					$navBtns.eq(numView).removeClass('navOn');
					numView +=_neg;
					if(numView>=_len){
						numView = 0;
					}else if(numView<0){
						numView = _len-1;
					}
					$navBtns.eq(numView).addClass('navOn');
					numRoll = numView;
				}

				var _temp = numRoll<0?scrollSize:0;
				t=0;
				b=_scrollObj[_dir];
				//c=(pPos != undefined)?pPos:_neg*opts.distance;
				e=(pPos != undefined)?pPos:_temp+(opts.distance*numRoll)%scrollSize;
				if(_neg==1){
					if(e>b){
						c = e-b;
					}else{
						c = e+scrollSize -b;
					}
				}else{
					if(e>b){
						c =e-scrollSize-b;
					}else{
						c = e-b;
					}
				}
				d=opts.duration;
				
				//scrollId = setInterval(scrollFunc, opts.scrollDelay);
				if(scrollId) clearTimeout(scrollId);
				scrollId = setTimeout(scrollFunc, opts.scrollDelay);
			}
			
			function start(){
				rollId = setInterval(function(){
					rollFunc();
				}, opts.time*1000);
			}
			function stop(){
				clearInterval(rollId);
			}
			
			function easeOutQuad(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			}
			
			function easeOutQuint(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			}

		});
	};
	$.fn.kxbdSuperMarquee.defaults = {
		isMarquee:false,//是否为Marquee
		isEqual:true,//所有滚动的元素长宽是否相等,true,false
		loop: 0,//循环滚动次数，0时无限
		newAmount:3,//加速滚动的步长
		eventA:'mousedown',//鼠标事件，加速
		eventB:'mouseup',//鼠标事件，原速
		isAuto:true,//是否自动轮换
		time:5,//停顿时间，单位为秒
		duration:50,//缓动效果，单次移动时间，越小速度越快，为0时无缓动效果
		eventGo:'click', //鼠标事件，向前向后走
		direction: 'left',//滚动方向，'left','right','up','down'
		scrollAmount:1,//步长
		scrollDelay:10,//时长
		eventNav:'click'//导航事件
	};
	
	$.fn.kxbdSuperMarquee.setDefaults = function(settings) {
		$.extend( $.fn.kxbdSuperMarquee.defaults, settings );
	};
	
})(jQuery);