/**
 * 时间切换选项
 * **/
$(document).ready(function() {
	$(".recordtop ul li a").click(function() {
		$(".recordtop ul li").removeClass("active");
		$(this).parent().addClass("active");
	});
});
/**
 * 版块选项,列表选项
 * **/
$(document).ready(function() {
	$(".ostop ul li").click(function() {
		$(".ostop ul li").removeClass("active");
		$(this).addClass("active");
		if($(this).index() == 0) {
			$(".osmain_two,.osmain_three,.osmain_four").hide();
			$(".osmain_one").show();
		} else if($(this).index() == 1) {
			$(".osmain_one,.osmain_three,.osmain_four").hide();
			$(".osmain_two").show();
		} else if($(this).index() == 2) {
			$(".osmain_one,.osmain_two,.osmain_four").hide();
			$(".osmain_three").show();
		} else if($(this).index() == 3) {
			$(".osmain_one,.osmain_two,.osmain_three").hide();
			$(".osmain_four").show();
		}
	});
});
/**
 * 订单统计柱状图
 * **/
window.onresize = function() {
	mytChart.resize();
};
var mytChart = echarts.init(document.getElementById('orderchart'));
var option = {
	title: {

	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		show: false,
		data: ['上期', '本期'],
		right: 100,
		top: 21
	},
	grid: {
		top: '20%',
		left: '8.92%',
		right: '8.92%',
		bottom: '15%',
		containLabel: true
	},
	xAxis: {
		splitLine: {
			lineStyle: {
				color: '#fff',
			}
		},
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		data: ['发起', '已完成', '已关闭', '进行中']
	},
	yAxis: {
		splitLine: {
			lineStyle: {
				type: 'dashed'
			}
		},
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		}
	},
	color: ['#5bce6b', '#f9c851'],
	series: [{
		name: '上期',
		type: 'bar',
		barWidth: '20',
		data: ['70', '30', '40', '70'],
		barGap: 1
	}, {
		name: '本期',
		type: 'bar',
		barWidth: '20',
		data: ['90', '50', '60', '90'],
		barGap: 1
	}]
};
mytChart.setOption(option);