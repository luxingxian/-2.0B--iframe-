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
 * 入口统计柱状图
 * **/
window.onresize = function() {
	mylChart.resize();
	myrChart.resize();
};
var mylChart = echarts.init(document.getElementById('classify'));
var option = {
	title: {
		text: '分类统计',
		top: 42,
		left: 55
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'line'
		},
		formatter: function(params) {
			var tar = params[0];
			return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
		}
	},
	grid: {
		left: '6%',
		right: '6%',
		bottom: '5%',
		top: '20%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		splitLine: {
			show: false
		},
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
		data: ['客房', '会议', '娱乐', '餐饮']
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
	series: [{
		name: '当期',
		type: 'bar',
		barWidth: '16',
		label: {
			normal: {
				position: 'inside'
			}
		},
		data: [{
			value: 30,
			itemStyle: {
				normal: {
					color: '#f39c56',
					shadowBlur: 10,
				}
			}
		}, {
			value: 47,
			itemStyle: {
				normal: {
					color: '#f39c56',
					shadowBlur: 10,
				}
			}
		}, {
			value: 87,
			itemStyle: {
				normal: {
					color: '#f39c56',
					shadowBlur: 10,
				}
			}
		}, {
			value: 66,
			itemStyle: {
				normal: {
					color: '#f39c56',
					shadowBlur: 10,
				}
			}
		}]
	}]
};
mylChart.setOption(option);
/**
 * 入口统计饼状图
 * **/
var myrChart = echarts.init(document.getElementById('classification'));
option = {
	title: {
		text: '分类统计占比',
		top: 234,
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
		textStyle: {
			color: '#666',
			fontSize: 12
		},
		data: ['客房', '会议', '娱乐', '餐饮'],
	},
	color: ['#3b8686', '#a8dba8', '#79bd9a', '#0b486b'],
	series: [{
		type: 'pie',
		radius: ['35%', '45%'],
		center: ['50%', '50%'],
		label: {
			normal: {
				textStyle: {
					color: '#29292a',
					fontSize: 12
				}
			}
		},
		labelLine: {
			normal: {
				length: 20,
				length2: 30,
				lineStyle: {
					color: '#d5d5d5'
				}
			}
		},
		data: [{
			value: 30,
			name: '客房'
		}, {
			value: 47,
			name: '会议'
		}, {
			value: 87,
			name: '娱乐'
		}, {
			value: 66,
			name: '餐饮'
		}],
	}]
};
myrChart.setOption(option);