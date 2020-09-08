
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
	m_mnow < 10? m_mnow ='0'+m_mnow : m_mnow = m_mnow;


	//打印表格第一行（有星期标志）
	var table_head = "<div class='title'><a href='javascript:make_table(0,-1)' class='previous-month'> &lsaquo; </a><div>" + ynow + "年" + m_mnow + "月</div><a href='javascript:make_table(0,1)' class='next-month'> &rsaquo; </a></div>";
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
			// 取得手动干预日期数据
			var intervene = get_intervene_data(ynow, (mnow + 1), date_str);
			// 取得一口价日期数据
			var fixedPrice = get_fixedPrice_data(ynow, (mnow + 1), date_str);
			// 取得停售日期数据
			var stopSell = get_stopSell_data(ynow, (mnow + 1), date_str);

			(date_str <= 0 || date_str > m_days[mnow]) ? date_str = "": date_str = idx - firstday + 1; //过滤无效日期（小于等于零的、大于月总天数的）

			if(date_str < 10 && date_str > 0) {
				date_str = '0' + date_str;
			}

			//打印日期：今天,周六日不同样式
			var td_data = "<a href='javascript:void(0);'><span class='date'>" + date_str + "</span>" + fixedPrice + intervene + holiday + add_holiday + stopSell + "</a>";

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
	document.getElementById("cal_mnow_div").innerHTML = table_body;

	make_month();
	
	
	// 自定义节日默认为节日价，背景为蓝色
	$(".calendar li .add_holiday").each(function(){
		var x = $(this).parents(".calendar li");
		x.addClass("add_holiday_bg");
	});
	// 一口价背景色为绿色
	$(".calendar li .fixedPrice").each(function(){
		var x = $(this).parents(".calendar li");
		x.addClass("fixedPrice_bg");
	});
	// 停售样式
	$(".calendar .stopSell").each(function(){
		$(this).siblings("span.date").css("color","#aaa");
		// $(this).parents("li").removeClass("add_holiday_bg fixedPrice_bg");
		// $(this).siblings(".intervene,.add_holiday").remove();
		$(this).siblings(".holiday").css({"background":"#ebaaaa","border-color":"#e08282"});
	});
	// 房量为零时，显示售罄
	$(".calendar li a .price_number .number").each(function(){
		if(Number($(this).text()) == 0){
			$(this).parents(".room-manage .calendar li a").append("<div class='soldOut'></div>")
		}
	});
	// 售罄样式
	$(".calendar .soldOut").each(function(){
		$(this).siblings("span.date").css("color","#aaa");
		$(this).parents("li").removeClass("add_holiday_bg fixedPrice_bg");
		$(this).siblings(".intervene,.add_holiday").remove();
		$(this).siblings(".holiday").css({"background":"#ebaaaa","border-color":"#e08282"});
	});

	// 法定假日、自定义节日、手动干预 日历日期字体为白色
	$(".calendar li a .holiday,.calendar li a .add_holiday,.calendar li a .intervene").each(function(){
		if($(this).hasClass("bg") == false){
			$(this).siblings("span.date").css("color","#fff");
		}
	});

	//选择单元格(单选或连续选择)
	$("#cal_div .calendar li a").click(function(e){
		e.stopPropagation();
		if($(this).parent().hasClass("overdue")==false){
			var x = $("#cal_div .calendar li").find("a.selected").length;
			if(x < 2){
				$(this).addClass("selected");
				var a = Number($("#cal_div .calendar li a.selected").first().find("span.date").html());
				var b = Number($("#cal_div .calendar li a.selected").last().find("span.date").html());
				var y = new Array();
				for(i=a;i<=b;i++){
					y.push(i)
				}
				$("#cal_div .calendar li a span.date").each(function(){
					for(j=0;j<y.length;j++){
						if($(this).html() == y[j]){
							$(this).parent().addClass("selected");
						}
					}
				});
			}else if(x >= 2){
				$("#cal_div .calendar li a.selected").removeClass("selected");
				$(this).addClass("selected");
			}
		}
	});
	// 点击日历中空白地方取消选择日期选择
	$(".c-day").click(function(){
		$("#cal_div .calendar li a.selected").removeClass("selected");
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
			if(tmp[1]!=null){
				add_holiday = "<div class='add_holiday'>" + tmp[1] + "</div>";
			} else{
				add_holiday = "<div class='add_holiday bg'></div>";
			}
			return add_holiday;
		}
	}
	return '';
}

// 为手动干预价格日期数据留接口
function get_intervene_data(y, m, d) {

	data_array = intervene_data.split('|');
	var l = data_array.length;

	for(var i = 0; i < l; i++) {
		var tmp = data_array[i].split('-');

		if(y == tmp[0] && m == tmp[1] && d == tmp[2]) {
			var intervene = "<div class='intervene'><i></i></div>";
			return intervene;
		}
	}
	return '';
}

// 为一口价日期数据留接口
function get_fixedPrice_data(y, m, d) {

	data_array = fixedPrice_data.split('|');
	var l = data_array.length;

	for(var i = 0; i < l; i++) {
		var tmp = data_array[i].split('-');

		if(y == tmp[0] && m == tmp[1] && d == tmp[2]) {
			var fixedPrice = "<div class='fixedPrice'></div>";
			return fixedPrice;
		}
	}
	return '';
}

// 为停售日期留接口
function get_stopSell_data(y, m, d) {

	data_array = stopSell_data.split('|');
	var l = data_array.length;

	for(var i = 0; i < l; i++) {
		var tmp = data_array[i].split('-');

		if(y == tmp[0] && m == tmp[1] && d == tmp[2]) {
			var stopSell = "<div class='stopSell'></div>"
			return stopSell;
		}
	}
	return '';
}

//生成月选择器
function make_month(){
	var select_m = "<ul>";
	for(i = 0; i < 12; i++) {
		var month_span = "<span>" + (i + 1) + "月</span>";
		if((i < new Date().getMonth() && ynow == new Date().getFullYear()) || ynow < new Date().getFullYear()){
			select_m += "<li class='overdue'><a href='javascript:void(0);'>" + month_span + "</a></li>";
		} else if(i == mnow && ynow >= new Date().getFullYear()) {
			select_m += "<li class='active notSet'><a href='javascript:make_table(0," + (i - mnow) + ");'>" + month_span + "<span class='label'>未发布</span></a></li>";
		} else {
			select_m += "<li class='notSet'><a href='javascript:make_table(0," + (i - mnow) + ");'>" + month_span + "<span class='label'>未发布</span></a></li>";
		}
	}
	select_m += "</ul>"
	$(".monthBox").html(select_m);
	if($(".monthBox ul li.active").hasClass("haveSet")==false){
		$(".set-box .create-price").show();
	}
}


// 判断价格类型,添加价格
function  judge_price() {
	data_array = price.split('/');
	var price_type = "";

	$("#cal_mnow_div .calendar li").each(function(){

		if($(this).hasClass("add_holiday_bg") == true) {
			price_type = data_array[2]
		} else if($(this).hasClass("weekend") == true){
			price_type = data_array[1]
		} else {
			price_type = data_array[0]
		}
		// 价格生成--弹窗
		$(this).find("a").append("<div class='price_number'><span class='fl price'><i></i>" + price_type + "</span><span class='fr number'><i></i>" + number + "</span></div>");

	});
}


// 没有实际意义,展示作用=============================================================================================================================

// 判断价格类型,添加价格
function  judge_price2() {
	data_array = price.split('/');
	var price_type = "";

	$("#cal_div .calendar li").each(function(){

		if($(this).hasClass("add_holiday_bg") == true) {
			price_type = data_array[2]
		} else if($(this).hasClass("weekend") == true){
			price_type = data_array[1]
		} else {
			price_type = data_array[0]
		}
		// 价格生成--弹窗
		$(this).find("a").append("<div class='price_number'><span class='fl price'><i></i>" + price_type + "</span><span class='fr number'><i></i>" + number + "</span></div>");

	});
}

// 没有实际意义,展示作用=============================================================================================================================
















