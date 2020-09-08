$(document).ready(function() {
	//================日历插件==========
	var dateRange1 = new pickerDateRange('date1', {
		isTodayValid: true,
		startDate: "",
		endDate: "",
		needCompare: false,
		defaultText: ' 至 ',
		autoSubmit: true,
		inputTrigger: 'input_trigger1',
		theme: 'ta',
		success: function(obj) {
			$("#dCon2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
		}
	});

	//时间选择初始显示内容
	$("#date1").html("开始时间——结束时间");
	//日历显示位置设定
	function date_position() {
		var topp = $(".screening").offset().top - $(".l_date").scrollTop();
		topp = topp + 60;
		var leftt = $(".l_date").offset().left;
		var l_date_width = $(".l_date").outerWidth();
		var date_width = $(".ta_calendar").outerWidth();
		date_width = date_width / 2;
		leftt = leftt + l_date_width / 2;
		$(".ta_calendar").css({ "top": topp, "left": leftt, "margin-left": -date_width });
	};
	date_position();
	$(".mainBox").scroll(function() {
		date_position();
	});

	$(window).resize(function() {
		date_position();
	});
	//================日历插件--ed--==========
});
/**下拉**/
$(document).ready(function() {
	$(".w_plate_one p").click(function() {
		$(this).next().slideToggle();
		$(this).parent().siblings().find("ul").slideUp();
		return false;
	});
	$(".w_plate_one ul li").not(".l_select_name").css("cursor", "pointer");
	$(".w_plate_one ul li").not(".l_select_name").click(function() {
		$(this).parents("ul").siblings("p").find("i").html($(this).html());
		$(this).parents("ul").slideUp();
		$(".l_hide").removeClass("l_hide");

		if($('.s_gou').children('p').children('i').text() == '可购买') {
			$('.s_xian').fadeIn();
		} else {
			$('.s_xian').fadeOut();
		}
	});
	$(".w_plate_one ul li").not(".l_select_name").hover(function() {
		$(this).css({
			"background": "#2e85f5",
			"color": "#fff"
		});
	}, function() {
		$(this).css({
			"background": "#fff",
			"color": "#a0a0a0"
		})
	});

	$(document).click(function() {
		$(".w_plate_one ul").slideUp();
	});
});