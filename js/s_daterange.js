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
		var topp = $(".recordtop").offset().top - $(".l_date").scrollTop();
		topp = topp + 117;
		var leftt = $(".l_date").offset().left;
		var l_date_width = $(".l_date").outerWidth();
		var date_width = $(".ta_calendar").outerWidth();
		date_width = date_width / 2;
//		leftt = leftt + l_date_width / 2;
//		$(".ta_calendar").css({ "top": topp, "left": leftt, "margin-left": -date_width });
		$(".ta_calendar").css({"top":topp,"left":leftt});
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