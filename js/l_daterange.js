//================日历插件==========
function datarange(start,end){
	var dateRange1 = new pickerDateRange('date1', {
		isTodayValid : true,
		startDate : start,
		endDate : end,
		needCompare : false,
		defaultText : ' 至 ',
		autoSubmit : true,
		inputTrigger : 'input_trigger1',
		theme : 'ta',
		success : function(obj) {
			$(".ta_calendar").hide();
			$("#dCon2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
		}
	});
}
//日历加载传参（开始日期、结束日期）
datarange()

$(document).ready(function(){
	
	//时间选择初始显示内容
	$("#date1").html("开始时间——结束时间");
	//日历显示位置设定
	function date_position(){
		var topp=$(".l_header").offset().top-$(".l_date").scrollTop();
		topp=topp+56;
		var leftt=$(".l_date").offset().left;
		var l_date_width=$(".l_date").outerWidth();
		var date_width=$(".ta_calendar").outerWidth();
		date_width=date_width/2;
//		leftt=leftt+l_date_width/2;
//		$(".ta_calendar").css({"top":topp,"left":leftt,"margin-left":-date_width});  居中显示
		$(".ta_calendar").css({"top":topp,"left":leftt});//左对齐
	};
	date_position();
	
	$(".w_plate_class div ul").delegate("li", "click", function() {
		if($(this).hasClass("l_select_name")){
			return false;
		}
		date_position();
	});
	
	$(window).resize(function(){
		date_position();
	});
	$(".mainBox").scroll(function(){
		date_position();
	});
	//点击其他下拉框隐藏
	$(".date_title").click(function(){
		$(".l_header ul").slideUp(100);
	});
//================日历插件--ed--==========
});
