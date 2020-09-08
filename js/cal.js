// 模拟传入数据
var statutory_holiday_data = "2016-11-1|2016-11-7|2016-11-11|2016-11-24|2016-12-25|2017-1-1"; // 模拟传入法定假日数据
var traditional_festival_data = "2016-11-1:传统节|2016-11-8:传统节|2016-11-9:传统节|2016-11-10:传统节|2016-11-11:传统节|2016-11-20:传统节"; // 模拟传入传统节日数据

// 为传入法定假日数据留接口
function get_s_holiday_data(y, m, d) {

	data_array = statutory_holiday_data.split('|');
	var l = data_array.length;

	for(var i = 0; i < l; i++) {
		var tmp = data_array[i].split('-');

		if(y == tmp[0] && m == tmp[1] && d == tmp[2]) {
			var s_holiday = "<div class='s_holiday'></div>"
			return s_holiday;
		}
	}
	return '';
}

// 为传入传统节日数据留接口
function get_t_festival_data(y, m, d) {

	data_array = traditional_festival_data.split('|');
	var l = data_array.length;

	for(var i = 0; i < l; i++) {
		var tmp = data_array[i].split(':');

		var tmp_1 = tmp[0].split('-');

		if(y == tmp_1[0] && m == tmp_1[1] && d == tmp_1[2]) {
			var t_festival = "<div class='t_festival'>" + tmp[1] + "</div>"
			return t_festival;
		}
	}
	return '';
}

var myDate = new Date();
var dnow = myDate.getDate();
var mnow = myDate.getMonth();
var ynow = myDate.getFullYear();
var week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

function make_cal(m) {

	var cal_html = "";
	myDate.setDate(myDate.getDate() + m);
	var c_d = myDate.getDate();
	var c_m = myDate.getMonth();
	var c_y = myDate.getFullYear();

	// 取得法定假日数据
	var s_holiday = get_s_holiday_data(c_y, (c_m + 1), c_d);
	// 取得传统节日数据
	var t_festival = get_t_festival_data(c_y, (c_m + 1), c_d);

	var x_data = "<a href='javascript:void(0)'><span class='date'>" + (myDate.getMonth() + 1) + "." + myDate.getDate() + "</span><span class='week'>" + week[myDate.getDay()] + "</span></a>" + s_holiday + t_festival;

	if(c_y < ynow || (c_y == ynow && c_m < mnow) || (c_y == ynow && c_m == mnow && c_d < dnow)) {
		cal_html += "<ul><li class='overdue'>" + x_data + "</li>";
	} else if(c_y == ynow && c_m == mnow && c_d == dnow) {
		cal_html += "<ul><li class='today active'>" + x_data + "</li>";
	} else {
		cal_html += "<ul><li>" + x_data + "</li>";
	}

	for(i = 0; i < 13; i++) {

		myDate.setDate(myDate.getDate() + 1);
		var cc_d = myDate.getDate();
		var cc_m = myDate.getMonth();
		var cc_y = myDate.getFullYear();

		// 取得法定假日数据
		var s_holiday = get_s_holiday_data(cc_y, (cc_m + 1), cc_d);
		// 取得传统节日数据
		var t_festival = get_t_festival_data(cc_y, (cc_m + 1), cc_d);

		var y_data = "<a href='javascript:void(0)'><span class='date'>" + (myDate.getMonth() + 1) + "." + myDate.getDate() + "</span><span class='week'>" + week[myDate.getDay()] + "</span></a>" + s_holiday + t_festival;

		if(cc_y < ynow || (cc_y == ynow && cc_m < mnow) || (cc_y == ynow && cc_m == mnow && cc_d < dnow)) {
			cal_html += "<li class='overdue'>" + y_data + "</li>";
		} else if(cc_y == ynow && cc_m == mnow && cc_d == dnow) {
			cal_html += "<li class='today active'>" + y_data + "</li>";
		} else {
			cal_html += "<li>" + y_data + "</li>";
		}

	}
	cal_html += "</ul>";

	document.getElementById("cal_div").innerHTML = cal_html;

	// 过期日期变回
	$(".cal ul li.overdue").append("<div class='overdue_bg'></div>");

	$(".cal ul li").click(function() {
		$(".cal ul li").removeClass("active");
		$(this).addClass("active");
	});

}

make_cal(0);

function back_cal_today() {
	myDate = new Date();
	make_cal(0);
}