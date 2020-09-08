/*
 * 点击任何地方隐藏消息处理中心与个人中心卡片
 * */
$(document).click(function() {
	$(".messagecenter,.centercard,.scancode").hide();
});
/*
 * 侧边栏点击状
 * *
$(document).ready(function() {
	$(".sidebar ul li").click(function() {
		$(".sidebar ul li").removeClass("active");
		$(this).addClass("active");
	});
});
* */
/*
 * 获取当前城市及温度
 * */
function findWeather() {
	var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
	$.getScript(cityUrl, function(script, textStatus, jqXHR) {
		var citytq = remote_ip_info.city;
		$(".wbcity").html(citytq);
		var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=";
		$.ajax({
			url: url,
			dataType: "script",
			scriptCharset: "gbk",
			success: function(data) {
				var _w = window.SWther.w[citytq][0];
				var tq = " " + _w.t1 + "° ";
				var qh = _w.s1;
				$('.wbtemp').html(tq);
				$('.wbsky').html(qh);
			}
		});
	});
}
findWeather();
/*
 * 天气显示及隐藏
 * */
$(document).ready(function() {
	$(".weathertext").mouseover(function() {
		$(".messagecenter,.centercard,.scancode").hide();
		$(".weatherbox").show();
	});
	$(".weathertext").mouseout(function() {
		$(".weatherbox").hide();
	});
});
/*
 * 获取日期
 * */
$(document).ready(function() {
	var myDate = new Date();
	var weekday = new Array(7)
	weekday[0] = "星期日"
	weekday[1] = "星期一"
	weekday[2] = "星期二"
	weekday[3] = "星期三"
	weekday[4] = "星期四"
	weekday[5] = "星期五"
	weekday[6] = "星期六"
	$(".solarcalendar").html(myDate.getMonth() + 1 + "/" + myDate.getDate());
	$(".wweek").html(weekday[myDate.getDay()]);
});
/*
 * 农历日期
 * */
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
	return(m >> n) & 1;
}

function e2c() {
	TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
	var total, m, n, k;
	var isEnd = false;
	var tmp = TheDate.getYear();
	if(tmp < 1900) {
		tmp += 1900;
	}
	total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

	if(TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
		total++;
	}
	for(m = 0;; m++) {
		k = (CalendarData[m] < 0xfff) ? 11 : 12;
		for(n = k; n >= 0; n--) {
			if(total <= 29 + GetBit(CalendarData[m], n)) {
				isEnd = true;
				break;
			}
			total = total - 29 - GetBit(CalendarData[m], n);
		}
		if(isEnd) break;
	}
	cYear = 1921 + m;
	cMonth = k - n + 1;
	cDay = total;
	if(k == 12) {
		if(cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth = 1 - cMonth;
		}
		if(cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth--;
		}
	}
}

function GetcDateString() {
	var tmp = "";
	/*tmp += tgString.charAt((cYear - 4) % 10);
	tmp += dzString.charAt((cYear - 4) % 12);*/
	tmp += "农历";
	/*tmp += "(";
	tmp += sx.charAt((cYear - 4) % 12);
	tmp += ")年 ";*/
	if(cMonth < 1) {
		tmp += "(闰)";
		tmp += monString.charAt(-cMonth - 1);
	} else {
		tmp += monString.charAt(cMonth - 1);
	}
	tmp += "月";
	tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
	if(cDay % 10 != 0 || cDay == 10) {
		tmp += numString.charAt((cDay - 1) % 10);
	}
	return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
	if(solarYear < 1921 || solarYear > 2020) {
		return "";
	} else {
		solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
		e2c(solarYear, solarMonth, solarDay);
		return GetcDateString();
	}
}
/*调用*/
var D = new Date();
var yy = D.getFullYear();
var mm = D.getMonth() + 1;
var dd = D.getDate();
var ww = D.getDay();
var ss = parseInt(D.getTime() / 1000);
if(yy < 100) yy = "19" + yy;

function GetCNDate() {
	return GetLunarDay(yy, mm, dd);
}
$(document).ready(function() {
	$(".Chinesecalendar").html(GetCNDate());
});
/*
 * 消息处理中心
 * */
$(document).ready(function() {
	$(".hinews").click(function() {
		$(".centercard,.scancode").hide();
		$(".messagecenter").toggle();
		return false;
	});
	var mcenterl = parseInt($(".mcenterl p a em").html());
	var mcenterr = parseInt($(".mcenterr p a em").html());
	$(".hinews em").html(mcenterl + mcenterr);
	if($(".hinews em").html() == 0) {
		$(".hinews em").hide();
	} else {
		$(".hinews em").show();
	}
	if($(".mcenterl p a em").html() == 0) {
		$(".mcenterl p a em").hide();
	} else {
		$(".mcenterl p a em").show();
	}
	if($(".mcenterr p a em").html() == 0) {
		$(".mcenterr p a em").hide();
	} else {
		$(".mcenterr p a em").show();
	}
});
/*
 * 个人中心卡片
 * */
$(document).ready(function() {
	$(".hipcenter").click(function() {
		$(".messagecenter,.scancode").hide();
		$(".centercard").toggle();
		return false;
	});
});
/*
 * 扫码弹窗
 * */
$(document).ready(function() {
	$(".hiFocuson").click(function() {
		$(".messagecenter,.centercard").hide();
		$(".scancode").toggle();
		return false;
	});
});
/*
 * 退出弹窗
 * */
$(document).ready(function() {
	$(".quitspan").click(function() {
		$(".quitbox").fadeIn();
	});
	$(".undo").click(function() {
		$(".quitbox").fadeOut();
	});
});

$(function() {
	//iframe高度设置
	function setIframeHeight() {
		var idIn = "iframe_menu";
		var idOut = "iframe_index";
		$("#" + idIn).load(function() {
			var mainheight = $("#" + idIn).contents().find("body").height() + 100;
			$("#" + idIn).height(mainheight);
			$('#' + idOut, top.document).height(mainheight + 100);
		})
	}
	setIframeHeight();
	//首页页面加载获取iframe高度
	function indexHtml() {
		var idOut = "iframe_index";
		$('#' + idOut).on("load", function() { //iframe加载完后 高度自适应。
			var iframe_index = document.getElementById(idOut).contentDocument || document.getElementById(idOut).contentWindow.document,
				mainWrapHeight = $(window).height(),
				frame_height = iframe_index.documentElement.scrollHeight;
			$('#' + idOut).height(frame_height < 610 ? mainWrapHeight : frame_height);
		});
	};
	indexHtml();
})
$(".l_left").change(function() {
	var hei = $(this).parents("body").height()
	$('#iframe_menu', window.parent.document).height(hei + 100);
	$('#iframe_index', top.document).height(hei + 200);
})
//个人中心
$(".cardby a").click(function() {
	$(".sidebar ul li").removeClass("active");
	$('#iframe_index', top.document).height(1250);
})
//帮助中心
//$(".hihelp").click(function() {
//	$(".sidebar ul li").removeClass("active");
//})
//站内通知
$(".mcenterr a").click(function() {
	$(".sidebar ul li").removeClass("active");
})
//问题咨询
$(".mcenterl a").click(function() {
	$(".sidebar ul li").removeClass("active");
})
//板块菜单栏选中样式
$(".l_container li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
})
//左侧导航栏选中样式
$(".sidebar ul li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
})
//弹窗遮罩显示
function tcShow(type) {
	$('#headBg', top.document).fadeIn();
	$('#sidebarBg', top.document).fadeIn();
	$('#menuBg', window.parent.document).fadeIn();
	if(type==1){
		$("#iframe_index",top.document).parents(".mainBox").scrollTop("0");
		return false
	}
	$("#iframe_index",top.document).css({"position":"fixed","top":"80px","bottom":0,"left":"12%","right":0,"width":"88%"})
}
//弹窗遮罩显示
function tcHide() {
	$('#headBg', top.document).fadeOut();
	$('#sidebarBg', top.document).fadeOut();
	$('#menuBg', window.parent.document).fadeOut();
	$("#iframe_index",top.document).css({"position":"relative","top":0,"bottom":0,"left":0,"right":0,"width":"100%"})
}

/* 处理背景色 */
function opacityNone(){
	$(parent.parent.document).find("#sidebarBg").css('opacity',''); 
	$(parent.parent.document).find("#headBg").css('opacity',''); 
	$(parent.document).find("#menuBg").css('opacity',''); 
}