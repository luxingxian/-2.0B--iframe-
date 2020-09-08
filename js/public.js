//模拟Select下拉
$(document).ready(function() {
	$(".w_plate_class div").delegate("p", "click", function() {
		$(this).next().slideToggle();
		$(".ta_calendar").hide();
		$(this).parent().siblings().find("ul").slideUp();
		return false;
	});
	$(".w_plate_class div ul li").not(".l_select_name").css("cursor", "pointer");
	$(".w_plate_class div ul").delegate("li", "click", function() {
		$('.node_box').hide();
		if($(this).hasClass("l_select_name")){
			return false;
		}
		$(this).parents("ul").siblings("p").find("i").html($(this).html());
		$(this).parents("ul").slideUp();
		$(".ta_calendar").hide();
		$(".l_hide").removeClass("l_hide");
		
		if($('.s_gou').children('p').children('i').text() == '可购买') {
			$('.s_xian').fadeIn();
		} else {
			$('.s_xian').fadeOut();
		}
	});
	$(".w_plate_class div ul").delegate("li", "mousemove", function() {
		if($(this).hasClass("l_select_name")){
			return false;
		}
		$(this).css({
			"background": "#2e85f5",
			"color": "#fff"
		});
	});
	$(".w_plate_class div ul").delegate("li", "mouseleave", function() {
		if($(this).hasClass("l_select_name")){
			return false;
		}
		$(this).css({
			"background": "#fff",
			"color": "#a0a0a0"
		})
	});

	$(document).click(function() {
		$(".w_plate_class div ul").slideUp();
	});

	//	全部/今天/昨天/7天点击选中效果
	$(".l_header a").not(".l_ref").click(function() {
		$(".l_header a").removeClass("active");
		$(this).addClass("active");
	});
	//分页页码加减效果

//	function pagenum() {
//		var num = 1;
//		$(".l_arrow_right").click(function() {
//			num++;
//			if(num > $(".l_totalnum").html()) {
//				num = $(".l_totalnum").html();
//			}
//			$(".l_curentnum").html(num);
//		});
//		$(".l_arrow_left").click(function() {
//			num--;
//			if(num < 1) {
//				num = 1;
//			}
//			$(".l_curentnum").html(num);
//		});
//	};
//	pagenum();
	//分页页码加减效果--ed--	

	//操作浮窗操作事件
	var timer = null;
	$(".l_opt").delegate("img", "mouseover", function() {
		var _this = $(this);
		clearTimeout(timer);
		$(".l_opt_tips").fadeOut();
		$('.l_opt>img').attr("src", "images/l_icon_more.png");
		timer = setTimeout(function() {
			_this.next(".l_opt_tips").fadeIn();
			_this.attr("src", "images/l_icon_more_h.png");
		}, 200);

	});
	$(".l_opt").delegate("img", "mouseout", function() {
		var _this = $(this);
		clearTimeout(timer);
		timer = setTimeout(function() {
			_this.next(".l_opt_tips").fadeOut();
			_this.attr("src", "images/l_icon_more.png");
		}, 1000);
	});
	$("body").delegate(".l_opt_tips", "mouseover", function() {
			clearTimeout(timer);
	});
	$("body").delegate(".l_opt_tips", "mouseout", function() {
		var this1 = $(this);
		clearTimeout(timer);
		timer = setTimeout(function() {
			this1.fadeOut();
			this1.prev().attr("src", "images/l_icon_more.png");
		}, 100);
	});
	$(".l_opt .l_opt_tips p").click(function(){
		$(this).parents(".l_opt_tips").fadeOut(400);
	})
	/*ie8加边框*/
	$(function(){
		if(window.navigator.userAgent.indexOf('MSIE 8.0') != -1){					
			$('.f_border').addClass('f_show');
		} else {					
			$('.f_border').removeClass('f_show');
		}
	});
	
	//日历未选择日期时悬浮状态出现“×”
	$(".l_date").hover(function(){
		if($(this).find(".date_title").html()=="开始时间——结束时间"){
			$(".clearDate").hide();
			return false;
		}else{
			$(this).addClass("hover");
			$(".clearDate").show();
		}
	},function(){
		$(this).removeClass("hover");
		$(".clearDate").hide();
	});
	$(".clearDate").click(function(){
		$(this).siblings(".date_title").html("开始时间——结束时间");
		$(this).parents(".l_date").removeClass("hover");
		$(".clearDate").hide();
		$(".dateRangeDateTable td").removeClass("ta_dateRangeSelected")
	})
});