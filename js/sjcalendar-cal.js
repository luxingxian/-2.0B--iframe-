//----日历展示
var nstr = null;
var ynow = null;
var mnow = null;

nstr = new Date(); //当前Date资讯
ynow = nstr.getFullYear(); //年份
mnow = nstr.getMonth(); //月份

function is_leap(year) {
	return(year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
} //是否为闰年

function make_table(m, n) {
	ynow = ynow + m;
	mnow = mnow + n;

	if(mnow > 11) {
		ynow++;
		if(mnow == 12) {
			mnow = 0;
		}
	}

	if(mnow < 0) {
		ynow--;
		mnow = 11;
	}

	var dnow = nstr.getDate(); //今日日期

	var n1str = new Date(ynow, mnow, 1); //当月第一天Date资讯

	var firstday = n1str.getDay(); //当月第一天星期几

	var m_days = new Array(31, 28 + is_leap(ynow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //各月份的总天数

	var tr_str = Math.ceil((m_days[mnow] + firstday) / 7); //表格所需要行数

	var m_mnow = (mnow + 1)
	m_mnow < 10 ? m_mnow = '0' + m_mnow : m_mnow = m_mnow;

	//打印表格第一行（有星期标志）
	var table_head = "<div class='title'><a href='javascript:make_table(0, -1);' class='previous-month'> &lsaquo; </a><div>" + ynow + "年" + m_mnow + "月</div><a href='javascript:make_table(0, 1);' class='next-month'> &rsaquo; </a></div>";
	var table_body = "<ul class='weekhead'><li>周日</li><li>周一</li><li>周二</li><li>周三</li><li>周四</li><li>周五</li><li>周六</li></ul><div><ul class='calendar'>";

	for(i = 0; i < tr_str; i++) {
		//表格的行
		for(k = 0; k < 7; k++) {
			//表格每行的单元格
			var idx = i * 7 + k; //单元格自然序列号
			var date_str = idx - firstday + 1; //计算日期

			// 取得传统节日数据
			var holiday = get_holiday_data(ynow, (mnow + 1), date_str);
			// 取得自定义节日数据
			var add_holiday = get_addHoliday_data(ynow, (mnow + 1), date_str);

			(date_str <= 0 || date_str > m_days[mnow]) ? date_str = "": date_str = idx - firstday + 1; //过滤无效日期（小于等于零的、大于月总天数的）

			if(date_str < 10 && date_str > 0) {
				date_str = '0' + date_str;
			}

			//打印日期：今天,周六日不同样式
			var td_data = "<a href='javascript:void(0);'><span class='date'>" + date_str + "</span>" + holiday + add_holiday + "</a>";

			if(date_str == "") {
				table_body += "<li class='null'></li>";
			} else if(date_str == dnow && mnow == new Date().getMonth() && ynow == new Date().getFullYear()) {
				table_body += "<li class='today'>" + td_data + "</li>";
			} else if(((date_str < dnow && mnow == new Date().getMonth() && ynow == new Date().getFullYear()) || (mnow < new Date().getMonth() && ynow == new Date().getFullYear()) || ynow < new Date().getFullYear()) && (k == 0 || k == 6)) {
				table_body += "<li class='overdue weekend'>" + td_data + "</li>";
			} else if(k == 0 || k == 6) {
				table_body += "<li class='weekend'>" + td_data + "</li>";
			} else if((date_str < dnow && mnow == new Date().getMonth() && ynow == new Date().getFullYear()) || (mnow < new Date().getMonth() && ynow == new Date().getFullYear()) || ynow < new Date().getFullYear()) {
				table_body += "<li class='overdue'>" + td_data + "</li>";
			} else {
				table_body += "<li>" + td_data + "</li>";
			}
		}
	}

	table_body += "<div class='clearfix'></div></ul></div>"; //表格结束
	document.getElementById("cal_div").innerHTML = table_head + table_body;

	// 法定假日、自定义节日、手动干预 日历日期字体为白色
	$(".calendar li a .holiday,.calendar li a .add_holiday,.calendar li a .intervene").each(function() {
		if($(this).hasClass("bg") == false) {
			$(this).siblings("span.date").css("color", "#fff");
		}
	});

	//选择单元格(单选或连续选择)
	$(".cal-manage .calendar li a").click(function(e) {
		e.stopPropagation();
		var x = $(".calendar li").find("a.selected").length;
		if(x < 2) {
			$(this).addClass("selected");
			var a = Number($(".calendar li a.selected").first().find("span.date").html());
			var b = Number($(".calendar li a.selected").last().find("span.date").html());
			var y = new Array();
			for(i = a; i <= b; i++) {
				y.push(i)
			}
			$(".calendar li a span.date").each(function() {
				for(j = 0; j < y.length; j++) {
					if($(this).html() == y[j]) {
						$(this).parent().addClass("selected");
					}
				}
			});
		} else if(x >= 2) {
			$(".calendar li a.selected").removeClass("selected");
			$(this).addClass("selected");
		}
	});
	// 点击日历中空白地方取消选择日期选择
	$(".c-day").click(function() {
		$(".calendar li a.selected").removeClass("selected");
	});
}
make_table(0, 0);

// 为传入传统节日数据留接口
function get_holiday_data(y, m, d) {

	data_array = holiday_data.split('|');
	var l = data_array.length;

	for(var i = 0; i < l; i++) {
		var tmp = data_array[i].split(':');

		var tmp_1 = tmp[0].split('-');

		if(y == tmp_1[0] && m == tmp_1[1] && d == tmp_1[2]) {
			var holiday = "<div class='holiday'>" + tmp[1] + "</div>"
			return holiday;
		}
	}
	return '';
}

// 为自定义节日数据留接口
function get_addHoliday_data(y, m, d) {

	data_array = add_holiday_data.split('|');
	var l = data_array.length;

	for(var i = 0; i < l; i++) {
		var tmp = data_array[i].split(':');

		var tmp_1 = tmp[0].split('-');

		if(y == tmp_1[0] && m == tmp_1[1] && d == tmp_1[2]) {
			var add_holiday = "";
			if(tmp[1] != null) {
				add_holiday = "<div class='add_holiday'>" + tmp[1] + "</div>";
			} else {
				add_holiday = "<div class='add_holiday bg'></div>";
			}
			return add_holiday;
		}
	}
	return '';
}