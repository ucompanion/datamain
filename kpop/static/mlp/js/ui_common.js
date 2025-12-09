var startD;
var endD;
// 기본
$(document).ready(function () {

    //접근성 바로가기
    $('#skip a').on('focus', function () {
        $(this).stop().animate({
            "top": 0,
            "opacity": 1
        });
    });
    $('#skip a').on('click', function () {
        $(this).stop().animate({
            "top": "-30px",
            "opacity": 0
        });
    });
    $('#skip a').on('focusout', function () {
        $(this).stop().animate({
            "top": "-30px",
            "opacity": 0
        });
    });

    // 가로폭에 따른 body 정의

    if ($("html").width() <= 1023) {
		mobile();

    } else {
		pc();
    }


    $("svg").attr("tabIndex", "-1");
});
/*
$(window).resize(function () {
    if ($("html").width() <= 1023) {
		if(!$("html").hasClass("mobile")){
	        mobile();
		}
    } else {

	        pc();

    }
});
*/

// 버튼 클릭 포커싱 삭제
$("button").on("mouseup mousedown", function () {
    $(this).blur();
});

function pc() {
    $("html").removeClass("mobile").addClass("pc");
    $(".global-header:not(.make).etc").remove();
    $("header:not(.make) .boxing").removeClass("active");
    $(".wrap").css("overflow-y", "auto").removeClass('block');
    $("header:not(.make) .overlay").css("display", "none")
    var obj = $(".pc .nav_b nav");
    obj.find(" .on").removeClass("on");
    obj.find(" .open").removeClass("open");
    obj.find(" .child").removeClass("child");

    obj.a = obj.find(".main-menu>li>a");
    obj.dep2 = obj.find(" .sub-menu");
    obj.find(" .main-menu ul").removeAttr("style");
    for (var i = 0; i < obj.find(" .main-menu>li").size(); i++) {
        var ti = obj.find(" .main-menu>li:eq(" + i + ")>a").text();
        obj.find(" .main-menu>li:eq(" + i + ")").attr("data-title", ti);
    }

    function fn_on(ob) {
        var box = ob.siblings("ul");
        obj.dep2.parent().removeClass("on").find(obj.dep2).removeClass("on");
        box.parent().addClass("on").find(obj.dep2).addClass("on");
        if (!$("body").hasClass("menu")) $("body").addClass("menu");
    }
    obj.a.on("mouseover focusin", function () {
        fn_on($(this));
    });
    obj.a.parent().on("focusin", function () {
        fn_on($(this).find(">a"));
    });
    obj.on("mouseleave focusout", function () {
        $("body").removeClass("menu");
        $("#header:not(.make)").removeAttr("style");
        obj.dep2.parent().removeClass("on");
    });


    /* 2depth메뉴 갯수 구하기 */
    $(".sub-menu").each(function () {
        var item = $(this).children('li');
        if (item.length > 6) {
            item.closest("ul").addClass('w2')
        }
        if (item.length > 12) {
            item.closest("ul").addClass('w3')
        }
    });
}


// 모바일인 경우
function mobile() {
    $("html").removeClass("pc").addClass("mobile");
    $(".mobile .global-header:not(.make) a.etc").remove();
    $(".mobile body").removeClass("menu");
    var mobj = "";
    mobj = $(".mobile .nav_b");
    mobj.gnb = mobj.find("nav");
    mobj.gnb.find(".on").removeClass("on");
    $(".mobile .bt_my").attr("disabled", "disabled");
    mobj.find(".main-menu>li>a").on("mouseover focusin", function () {
        $("body").removeClass("menu");
        mobj.find(" .on").removeClass("on");
    });

    mobj.find(".main-menu>li").on("focusin", function () {
        $("body").removeClass("menu");
        mobj.find(" .on").removeClass("on");
    });

    mobj.gnb.on("mouseleave focusout", function () {
        $("body").removeClass("menu");
    });

    mobj.gnb.find(" .main-menu ul").hide();


    mobj.find(".main-menu>li:has(ul)").each(function () {
        $(this).addClass("child")
    })
    mobj.find(".main-menu>li:not(:has(ul))").each(function () {
        $(this).addClass("no-sub")
    })

    mobj.find("a.active").parent().addClass("open").find(".sub-menu").slideDown(200);

    mobj.find(".main-menu>li:has(ul)>a").each(function () {
        var _this = $(this);
        //_this.closest("li").addClass("child");
        _this.on('click', function (n) {
            n.preventDefault();

            if (_this.next("ul").is(":hidden")) {
				_this.parent().addClass("open").find(">ul").slideDown(200);
                _this.parent().siblings("li").find(".sub-menu").slideUp(200);
                _this.parent().siblings("li").find("a").parent().removeClass("open")


            } else {
                _this.parent().removeClass("open").find(">ul").slideUp(200);

            }
            return false;
        })
    });
    mobj.find(".main-menu>li:not(:has(ul))>a").each(function () {
        var __this = $(this);
        //_this.closest("li").addClass("child");
        __this.on('click', function () {
            mobj.find("a").parent().removeClass("open");
            mobj.find(".sub-menu").slideUp(200);
        })
    });


    //메뉴 열기
    $("header:not(.make) .bt_menu").on("click", (function () {
        $("header:not(.make) .boxing").addClass("active");
        $(".wrap").css("overflow-y", "hidden").addClass("block");
        $("header:not(.make) .overlay").css("display", "block")

    }));
    //메뉴 닫기
    $(" header:not(.make) .overlay").on("click", (function () {
        $("header:not(.make) .boxing").removeClass("active");
        $(".wrap").css("overflow-y", "auto").removeClass('block');
        $("header:not(.make) .overlay").css("display", "none")

    }));


}


var admin = window.admin || {};
admin = (function ($) {
    "use strict";
    var common = {
        //gnb
        gnb_AC: function () {

        },

        //mobile gnb
        mobile_gnb_AC: function () {

        },
        // 레이어
        layerOpen: function (element) {
            var target = $(element);
            var boxHeight = target.outerHeight();
            var windowHeight = $(window).outerHeight();
            var scroll = $(window).scrollTop();
            var tops = (windowHeight - boxHeight) / 2;


            //$("html").addClass("layeropens");
            //target.addClass("active").css("top", tops + scroll );
            target.addClass("active");
            $('html, body').addClass('layer_open');

        },

        layerClose: function (element) {
            //$("html").removeClass("layeropens");
            $('.layer_wrap').removeClass("active");
            $('html, body').removeClass('layer_open');

        },

        getCalenPick : function(){
			$("input.dates").each(function(){
				if( $(this).hasClass("dates_from") ){
					var startDay = $(this);
					var endDay = $(this).parent().find(".dates_to");

				}else if( $(this).hasClass("dates_to") ){
					var endDay = $(this);
					var startDay = $(this).parent().find(".dates_from");
				}
				var dateFormat = "yy-mm-dd",
					from = startDay.datepicker({
						changeMonth: true,
						changeYear: true,
						showMonthAfterYear:true,
						dateFormat: "yy-mm-dd"
					}).on("change", function(){
						endD.datepicker("option", "minDate", getDate(this));
					}),
					to = endDay.datepicker({
						changeMonth: true,
						changeYear: true,
						showMonthAfterYear:true,
						dateFormat: "yy-mm-dd"
					}).on("change", function() {
						startD.datepicker("option", "maxDate", getDate(this));
					}
				);
				if( $(this).hasClass("dates_from") ){
					startD = from;
					//startD.datepicker('setDate', new Date());
				}else if( $(this).hasClass("dates_to") ){
					endD = to;
					//endD.datepicker('setDate', new Date());
				}
				function getDate(element){
					var date;
					try {
						date = $.datepicker.parseDate( dateFormat, element.value );
					} catch( error ) {
						date = null;
					}
					return date;
				}

			});


//			$("dates1").each(function(){
//					$(".dates1").datepicker({
//							changeMonth: true,
//							changeYear: true,
//							showMonthAfterYear:true,
//							dateFormat: "yy-mm-dd"
//					});
//			});

		},


        fileUpload: function () {
            var uploadFile = $('.file_box .file_btn');
            uploadFile.on('change', function () {
                if (window.FileReader) {
                    var filename = $(this)[0].files[0].name;
                } else {
                    var filename = $(this).val().split('/').pop().split('\\').pop();
                }
                $(this).siblings('.file_name').val(filename);
            });
        },

        setLocation: function () {
            $('.location_bx li').each(function () {
                if ($(this).find('>ul').length < 1) {
                    $(this).addClass('none')
                }
            })
            var a = $('.location_bx a');
            a.on('click', function () {
                $(this).parent('div').parent('li').toggleClass('on');
            });
        },

        clockUp: function (element) {
            var $el = $(element);
            var $input = $el.parent().prev();
            var number = $input.val();
            number++;
            if ($el.parent().parent().hasClass("hour")) {
                if (number > 23) {
                    number = 23;
                }
            } else {
                if (number > 59) {
                    number = 59;
                }
            }

            if (number < 10) number = '0' + number;
            $el.parent().prev().val(number);
            console.log(number);
        },

        clockDown: function (element) {
            var $el = $(element);
            var $input = $el.parent().prev();
            var number = $input.val();
            number--;
            if ($el.parent().parent().hasClass("hour")) {
                if (number < 0) {
                    number = 0;
                }
            } else {
                if (number < 0) {
                    number = 0;
                }
            }
            if (number < 10) number = '0' + number;
            $el.parent().prev().val(number);
        },

        goalSelect: function (element) {
            var $el = $(element);
            if ($el.attr('id') == "single_goal") {
                $('.tierbased_goal_wp').hide();
                $('.single_goal_view').css('display', 'table-row');
                $el.parents('tr').removeClass('bbnone');
            } else {
                $('.tierbased_goal_wp').show();
                $('.single_goal_view').hide();
                $el.parents('tr').addClass('bbnone');
            }
        },


        init: function () {
            //common.layerOpen
            common.getCalenPick(),
            common.fileUpload();
            common.setLocation();
        }

    };


    //ready
    $(document).ready(function () {
        common.init();

        $('.main_sch_wp .btn_detail').on('click', function () {
            var detail = $(this).parents('.main_sch_wp').find('.extra');
            detail.slideToggle();
            $(this).toggleClass("close");
        })

        $('[data-view="layeropen"]').each(function () {
            var lobt = $(this);
            var toplayer = lobt.next(".layeropen");
            lobt.on("click", function (_e) {
                toplayer.toggle();
                _e.stopPropagation();
            });
            toplayer.click(function (_e) {
                _e.stopPropagation();
            });
            $(document).click(function () {
                toplayer.hide();
            });

        });


        //scroll
        $('.wrap').on('scroll', function () {
            var $win_scroll = $(this).scrollTop();
            $('.wrap > header:not(.make)').addClass('fixed');
            $(".scroll_top").show();
            if ($win_scroll <= 100) {
                $('.wrap > header:not(.make)').removeClass('fixed');
                $('.show_talk').removeClass('active');
                $(".scroll_top").hide();
                return false;
            }
        });

        $(".scroll_talk").on('click mouseover', function () {
            $('.scroll_talk').toggleClass('active');
            $('.show_talk').toggleClass('active');
        })

        $('.show_talk').on('click', function () {
            //$('.show_talk').toggleClass('active');
        })

        //맨위로가기
        $(".scroll_top button").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 500);
            return false;
        });


        // 탭 메뉴 - 일반형
        $("[data-ui=TabMenu]").each(function () {

            var $ui = $(this);
            var $menu = $ui.find("[data-element=menu]");
            var $content = $ui.find("[data-element=content]");

            $menu.on("click", function (_e) {
                _e.preventDefault();
                var index = $menu.index(this);
                $menu.removeClass("on").removeAttr("title").eq(index).addClass("on").attr("title", "선택됨");
                $content.removeClass("on").eq(index).addClass("on");

            });

        });


        $('.b_gnb').on('click', function () {
            var hd = $(this).parents('#wrapper');
            hd.toggleClass('atv_m');
        });

        /* 토글레이어 */
        $(".bt_toggle").each(function () {
            var $this = $(this);
            var $box = $this.closest("div");
            var $t_layer = $this.next(".layer_bx");

        });


    }); //ready end


    return {

        layerOpen: common.layerOpen,
        layerClose: common.layerClose,
        goalSelect: common.goalSelect,
        clockUp: common.clockUp,
        clockDown: common.clockDown,

    }

})(jQuery);

$(window).resize(function () {
    if ($("html").width() <= 1023) {

		$("html").removeClass("pc").addClass("mobile");
    } else {
		$("html").removeClass("mobile").addClass("pc");
    }
});

var mlpfn = {
    open_course : function(url, _self='false'){
        if(_self == 'true' || _self == 'True'){
            window.open(url);
        }else{
            location.href = url;
        }
    },
    set_course_level : function(ul){
        $.each($(ul), function(idx, item){
            let el = $(item.children[0]);
            if(el.text().includes('난이도')){
                str = $(item.children[0]).text();
                str = str.replace('0', '입문');
                str = str.replace('1', '초급');
                str = str.replace('2', '중급');
                str = str.replace('3', '고급');
                str = str.replace('4', '심화');
                el.text(str);
            }
        });
    },
    tz : new Date().getTimezoneOffset(),
    utc2kst(date_str){
        return new Date(new Date(date_str).getTime() - (mlpfn.tz*60000));
    },
    format_date : function(d=new Date(), df='yyyy-MM-dd HH:mm:ss') {
        // TODO support df(date format)
        return mlpfn.getYmd(d) +' '+ mlpfn.getTime(d);
    },
    getYmd : function (d) { //날짜 정보
        var y = d.getFullYear();
        var m = d.getMonth()+1;
        var dd = d.getDate();
        m  = ('0' + m ).slice(-2);
        dd = ('0' + dd).slice(-2);
        return y + '-' + m + '-' + dd;
    },
    getTime : function (d) { // 시간정보
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        h = ('0' + h).slice(-2);
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        return h + ':' + m + ':' + s;
    }
}

// 2026 메인리뉴얼
function setListMore(btn){
    var clsName = 'is-expanded';
    var $more = $(btn).parent();
    var $list = $more.prev();

    $more.toggleClass(clsName);
    $list.toggleClass(clsName);

}