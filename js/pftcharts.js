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
 * 新老客户折线图
 * **/
window.onresize = function() {
	myChart.resize();
	seChart.resize();
};
var myChart = echarts.init(document.getElementById('old_new'));
var option = {
	title: {
		text: '新老客户',
		top: 30,
		left: 35
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		show: false,
		data: ['新客户', '老客户'],
		right: 35,
		top: 30
	},
	grid: {
		left: '4%',
		right: '4%',
		top: '20%',
		bottom: '5%',
		containLabel: true
	},
	toolbox: {},
	xAxis: {
		type: 'category',
		boundaryGap: false,
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
		data: [' ', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', ' ', ]
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
	color: ['#6abf5c', '#ff7b33'],
	series: [{
		name: '老客户',
		type: 'line',
		symbol: 'circle',
		symbolSize: '8',
		smooth: true,
		label: {
			normal: {
				position: 'top'
			}
		},
		lineStyle: {
			normal: {
				color: '#6abf5c'
			}
		},
		areaStyle: {
			normal: {
				color: '#f6fcf5',
				opacity: 1
			}
		},
		smooth: false,
		data: [, 135, 130, 152, 121, 135, 130, 152, 121, 134, 120, 135, 130, 152, 121, 134, 120, 135, 130, 150, 140, 121, 120, 170, 170, , ]
	}, {
		name: '新客户',
		type: 'line',
		symbol: 'circle',
		symbolSize: '8',
		smooth: true,
		label: {
			normal: {
				position: 'top'
			}
		},
		lineStyle: {
			normal: {
				color: '#ff7b33'
			}
		},
		areaStyle: {
			normal: {
				color: '#fef5f5',
				opacity: 1
			}
		},
		smooth: false,
		data: [, 80, 60, 182, 94, 180, 60, 102, 94, 71, 100, 90, 190, 92, 94, 80, 100, 80, 100, 94, 151, 90, 80, 110, 110, , ]
	}]
};
myChart.setOption(option);
/**
 * 新老客户环形图
 * **/
var seChart = echarts.init(document.getElementById('old_new_pct'));
option = {
	title: {
		text: '新老客户对比',
		top: 108,
		x: 'center',
		textStyle: {
			fontSize: 14,
			color: '#29292a',
			fontWeight: 'normal'
		}
	},
	tooltip: {
		trigger: 'item',
		formatter: "{b} : {c} ({d}%)"
	},
	legend: {
		show: false,
		orient: 'vertical',
		left: 'auto',
		top: 'middle',
		itemWidth: 14,
		itemHeight: 14,
		textStyle: {
			color: '#666',
			fontSize: 12
		},
		data: ['老顾客', '新顾客'],
	},
	color: ['#6abf5c', '#f18144'],
	series: [{
		type: 'pie',
		radius: ['60%', '75%'],
		center: ['50%', '50%'],
		data: [{
			value: 676,
			name: '老顾客'
		}, {
			value: 1259,
			name: '新顾客'
		}],
	}]
};
seChart.setOption(option);