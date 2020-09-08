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
 * 头部服务与订单评价切换
 * **/
$(document).ready(function() {
	$(".tabrc a").click(function() {
		$(".tabrc a").removeClass("active");
		$(this).addClass("active");
	});
});
/**
 * 评价统计折线图
 * **/
window.onresize = function() {
	mybChart.resize();
};
var mybChart = echarts.init(document.getElementById('starec'));
option = {
	title: {
		text: '星评统计',
		top: 42,
		left: 55,
		textStyle: {
			color: '#29292a',
			fontSize: 14,
			fontWeight: 'normal'
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		show: false,
		data: ['上期', '本期'],
		top: 80,
		left: 55
	},
	grid: {
		left: '5%',
		right: '5%',
		bottom: '5%',
		top: '25%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: [' ', '1星', '2星', '3星', '4星', '5星', ' '],
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
	},
	yAxis: {
		type: 'value',
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
	color: ['#8f9a91', '#26c147'],
	series: [{
			name: '上期',
			type: 'line',
			symbol: 'circle',
			symbolSize: '8',
			data: [, 150, 350, 150, 350, 150, , ]
		},
		{
			name: '本期',
			type: 'line',
			symbol: 'circle',
			symbolSize: '8',
			data: [, 350, 150, 350, 150, 350, , ]
		}
	]
};
mybChart.setOption(option);
/**
 * 对比点击效果
 * **/
$(document).ready(function() {
	$(".forumcharts span").click(function() {
		if($(this).html() == "对比") {
			$(this).html("取消").css({
				"background": "#2e85f5",
				"border": "1px solid #2e85f5",
				"color": "#ffffff"
			});
		} else {
			$(this).html("对比").css({
				"background": "#f1f5fb",
				"border": "1px solid #e6eaf1",
				"color": "#6c7889"
			});
		}
	});
	$(".starcharts span").click(function() {
		if($(this).html() == "对比") {
			$(this).html("取消").css({
				"background": "#2e85f5",
				"border": "1px solid #2e85f5",
				"color": "#ffffff"
			});
		} else {
			$(this).html("对比").css({
				"background": "#f1f5fb",
				"border": "1px solid #e6eaf1",
				"color": "#6c7889"
			});
		}
	});
});