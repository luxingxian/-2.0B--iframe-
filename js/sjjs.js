//主要筛选
$(document).ready(function() {
	$(".classification ul li").click(function() {
		$(".classification ul li").removeClass("active");
		$(this).addClass("active");
	});
});
//操作
$(document).ready(function() {
	$(".gainnew").click(function() {
		$(this).hide();
		$(this).parent().append('<a href="javascript:;" class="gaining">获取中...</a>');
	});
});
//时间筛选
$(document).ready(function() {
	$(".screening ul li a").click(function() {
		$(".screening ul li a").removeClass("active");
		$(this).addClass("active");
	});
});