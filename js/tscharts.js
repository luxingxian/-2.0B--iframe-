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
 * 评价统计柱状图
 * **/
window.onresize = function() {
	mytChart.resize();
	mybChart.resize();
};
var mytChart = echarts.init(document.getElementById('gucharts'));
var option = {
	title: {
		text: '客户通知',
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
		left: 55,
		top: 80
	},
	grid: {
		top: '25%',
		left: '5%',
		right: '5%',
		bottom: '8%',
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
		data: ['登录验证', '订单确认', '订单取消', '餐桌预订成功', '餐桌预订失败', '酒店预订成功', '酒店预订失败']
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
	color: ['#d6d5d4', '#e56577'],
	series: [{
		name: '上期',
		type: 'bar',
		barWidth: '20',
		data: ['60', '100', '100', '100', '100', '100', '100'],
		barGap: 1
	}, {
		name: '本期',
		type: 'bar',
		barWidth: '20',
		data: ['80', '110', '120', '160', '100', '80', '130'],
		barGap: 1
	}]
};
mytChart.setOption(option);
/**
 * 评价统计折线图
 * **/
var mybChart = echarts.init(document.getElementById('starcharts'));
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
	$(".gcspan").click(function() {
		if($(this).html() == "对比") {
			$(this).html("取消").css({ "background": "#2e85f5", "border": "1px solid #2e85f5", "color": "#ffffff" });
		} else {
			$(this).html("对比").css({ "background": "#f1f5fb", "border": "1px solid #e6eaf1", "color": "#6c7889" });
		}
	});
	$(".srcspan").click(function() {
		if($(this).html() == "对比") {
			$(this).html("取消").css({ "background": "#2e85f5", "border": "1px solid #2e85f5", "color": "#ffffff" });
		} else {
			$(this).html("对比").css({ "background": "#f1f5fb", "border": "1px solid #e6eaf1", "color": "#6c7889" });
		}
	});
});