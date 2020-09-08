
/**
 * 评价统计柱状图
 * **/
window.onresize = function() {
	mytChart.resize();
};
var mytChart = echarts.init(document.getElementById('plate'));
var option = {
	title: {
		text: '板块统计',
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
		data: ['超级豪华房', '会议娱乐', '健身瑜伽馆', '餐饮零食', '周边用品', '旅游门票', '地图线路', '下午茶', '周边旅游', '其他']
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
	color: ['#d6d5d4', '#f09152'],
	series: [{
		name: '上期',
		type: 'bar',
		barWidth: '20',
		data: ['60', '100', '100', '100', '100', '100', '100', '100', '100', '100'],
		barGap: 1
	}, {
		name: '本期',
		type: 'bar',
		barWidth: '20',
		data: ['80', '110', '120', '160', '100', '80', '130', '100', '80', '130'],
		barGap: 1
	}]
};
mytChart.setOption(option);