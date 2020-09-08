$(document).ready(function(){
	//chechbox选择效果/上架置灰高亮切换
	$("td.l_check label").click(function(){
		$(this).toggleClass("checked");
		if($(".l_check label").hasClass("checked")){
			$(".l_online").addClass("active");
		}else{
			$(".l_online").removeClass("active");
		}
	});
	//新增商品置灰高亮切换
	$(".w_plate_class div ul li").not(".l_select_name").click(function() {
		$(".l_add").addClass("active");
	});		
	//批量展示、批量隐藏效果(复选框选中两个以上高亮)
	$("td.l_check label").click(function(){
		if($(".l_check label").hasClass("checked")&&$(".l_check label.checked").length>=2){
			$(".pl_show,.pl_hide").addClass("active");
		}else{
			$(".pl_show,.pl_hide").removeClass("active");
		}
	});
	//复选框点击效果及白名单高亮置灰/选择一个时高亮，0或2个以上置灰
	$("td.l_check label").click(function(){
		if($(".l_check label").hasClass("checked")&&$(".l_check label.checked").length==1){
			$(".white_list").addClass("active");
		}else{
			$(".white_list").removeClass("active");
		}
	});
	//头部第二种样式全部、今天、明天点击样式切换
	$(".l_sub_header a.a_date").click(function(){
		$(".l_sub_header a.a_date").removeClass("active");
		$(this).addClass("active")
	});
	
	//弹窗效果
	//来访用户、白名单下载弹窗
	$(".l_down").click(function(){
		$(".l_popup_download").fadeIn();
		$(".l_drop").fadeIn();
		tcShow()
	});
	//来访用户、白名单删除弹窗
	$(".l_opt_del img").click(function(){
		$(".l_popup_del").fadeIn();
		$(".l_drop").fadeIn();
		tcShow()
	});
	//会议/娱乐商品管理删除订单
	$(".l_del_order").click(function(){
		$(".l_popup_del").fadeIn();
		$(".l_drop").fadeIn();
		tcShow()
	});
	//会议/娱乐商品管理上架
	$(".l_online").click(function(){
		if($(this).hasClass("active")){
			$(".l_popup_online").fadeIn();
			$(".l_drop").fadeIn();
			tcShow()
		}else{
			return;
		}
	});
	//会议/娱乐商品管理下架
	$(".l_offline_order").click(function(){
		$(".l_popup_offline").fadeIn();		
		$(".l_drop").fadeIn();
		tcShow()
	});
	//弹窗关闭
	$(".l_cancle").click(function(){
		$(this).parents(".l_popup").fadeOut();
		$(".l_drop").fadeOut();
		tcHide()
	});		
	//操作项点击效果
	$(".l_opt_tips p").click(function(){
		$(this).parents(".l_opt_tips").fadeOut();
	});	
	//所有弹窗垂直居中显示
//	function popup(){
//		$(".l_popup").each(function(){
//			var pop_hei=$(this).outerHeight();
//			$(this).css("margin-top",-pop_hei/2);
//		});
//	};
//	popup();
//	$(window).resize(function(){
//		popup();
//	});
});
//省市级三级联动





















