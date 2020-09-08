
$(function(){
	//头部时间切换状态
	$(".a_date").click(function(){
		$(".a_date").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".footIcons .check").click(function(){
		$(this).toggleClass("checked");
		if($(".footIcons .check.checked").length>=2){
			$(".pl_show,.pl_hide").addClass("active");
		}else{
			$(".pl_show,.pl_hide").removeClass("active");
		}
	});
	//复选框选中状态及批量展示隐藏状态
	$(".pl_hide").click(function() {
		if($(this).hasClass("active")) {
			$(".l_pl_hide").fadeIn();
			$(".l_drop").fadeIn();
			tcShow();
		} else {
			return false;
		}
	});
	$(".pl_show").click(function() {
		if($(this).hasClass("active")) {
			$(".l_pl_show").fadeIn();
			$(".l_drop").fadeIn();
			tcShow();
		} else {
			return false;
		}
	});
	$(".showSet").click(function(){
		$(".popSetshow").fadeIn();
		$(".l_drop").fadeIn();
		tcShow();
	})
	$(".popSetshow .cancle").click(function(){
		$(this).parents(".popSetshow").fadeOut();
		$(".l_drop").fadeOut();
		tcHide();
	})
	$(".l_cancle").click(function(){
		$(this).parents(".l_popup").fadeOut();
		$(".l_drop").fadeOut();
		tcHide();
	});
	//弹窗点击取消
	$(".l_pl_hide .l_ok").click(function(){
		$(".footIcons .check.checked").parents(".cartBox").attr("class","cartBox cartHide");
		$(".footIcons .check.checked").parents(".cartBox").find(".status").html("隐藏");
		$(this).parents(".l_popup").fadeOut();
		$(".l_drop").fadeOut();
		tcHide();
		$(".footIcons .check").removeClass("checked");
	})
	$(".l_pl_show .l_ok").click(function(){
		$(".footIcons .check.checked").parents(".cartBox").attr("class","cartBox cartShow");
		$(".footIcons .check.checked").parents(".cartBox").find(".status").html("展示中");
		$(this).parents(".l_popup").fadeOut();
		$(".l_drop").fadeOut();
		tcHide();
		$(".footIcons .check").removeClass("checked");
	})
	//弹窗点击确定
	//批量展示、隐藏点击效果
	
	$(".popSetshow .curSet .article em").click(function(){
		$(".popSetshow .curSet .article em").removeClass("checked");
		$(this).addClass("checked");
		$(".popSetshow .text").html($(".popSetshow .curSet .article em.checked").attr("dataTitle"))
	})
	//展示设置方式选择
	
	var num=1;
	$(".answerInput textarea").keyup(function(){
		num=$(this).val().length;
		if(num>50){
			num=50;
		}
		$(this).siblings(".num").find("em").html(num);
	});
	//介绍输入字数显示
	
	$(".iconAnswer").click(function(){
		$(this).parents(".carts").find(".answerInput").slideToggle(0);
		var item=$(this).parents(".cartBox");
		if($(this).parents(".carts").find(".answerInput").is(':visible')){
			changeHeight(item,1);
			$(this).parents(".carts").find("textarea").css("border-color","#ccc");
			$(this).parents(".carts").find("textarea").val("");
		}else{
			changeHeight(item,-1)
		}
	})
	//回复框展示效果
	$(".hoverArea").hover(function(){
		$(this).find(".cartDrop").stop(true,true).delay(500).fadeIn();
	},function(){
		$(this).find(".cartDrop").stop(true,true).fadeOut();
	});
	//背景层悬浮显示
	$(".hide").click(function(){
		$(this).parents(".cartBox").attr("class","cartBox cartHide");
		$(this).parents(".cartBox").find(".status").html("隐藏");
		$(this).parents(".cartBox").find(".cartDrop").fadeOut();
	});
	$(".show").click(function(){
		$(this).parents(".cartBox").attr("class","cartBox cartShow");
		$(this).parents(".cartBox").find(".status").html("展示");
		$(this).parents(".cartBox").find(".cartDrop").fadeOut();
	});
	//显示、隐藏点击效果
	$(".answerInput .sure").click(function(){
		var inputtext=$(this).parents(".answerInput").find("textarea").val();
		if(inputtext.length>0){
			$(this).parents(".answerInput").hide();
			$(this).parents(".carts").find(".answerShow").fadeIn();
			$(this).parents(".carts").find(".answerShow").find(".answerText").html(inputtext);
			$(this).parents(".carts").find(".iconAnswer").fadeOut();
		}else{
			$(this).parents(".answerInput").find("textarea").css("border-color","#f33");
		}
	});
	$(".answerInput .cancle").click(function(){
		$(this).parents(".answerInput").slideUp(0);
		var item=$(this).parents(".cartBox");
		changeHeight(item,-1)
	});
	$(".answerShow .cancle").click(function(){
		$(this).parents(".carts").find(".iconAnswer").fadeIn();
		$(this).parents(".answerShow").fadeOut();
		var item=$(this).parents(".cartBox");
		changeHeight(item,-1)
	});
	
	function waterFall(){
		var col=4;
		var arrHeight=[];
		var cart=$(".cartBox");
		var cartWidth=cart.outerWidth();
		var contentWidth=$(".catrContent").outerWidth();
		cart.each(function(index,item){
			var cartsHeight=cart.eq(index).outerHeight();
			if(index<col){
				$(this).css({"top":0,"left":index*cartWidth/contentWidth*100+"%"});
				arrHeight.push(cartsHeight);
				$(this).attr("dataCol",index)
				$(this).attr("index",index)
			}else{
				var minHeight=Math.min.apply(null,arrHeight);
				
				var minIndex;
				for(var k in arrHeight){
					if(arrHeight[k]==minHeight){
						minIndex=k;
					}
				}
				$(this).css({"top":minHeight,"left":minIndex*cartWidth/contentWidth*100+"%"});
				arrHeight[minIndex]=parseInt($(this).outerHeight()+$(this).offset().top-190);//减去瀑布流开始位置距浏览器顶部距离370px
				$(this).attr("dataCol",minIndex)
				$(this).attr("index",index)
			}
		});
		var maxHeight=Math.max.apply(null,arrHeight);
		$(".catrContent").height(maxHeight)
	};
	waterFall();
	function changeHeight(item,type){
		var inputHeight=$(".answerInput").height();
		var hei=item.height();
		var ind=item.attr("index");
		var dataCol=item.attr("dataCol")
		$(".cartBox").each(function(index,value){
			if($(this).attr("dataCol")==dataCol&&index>ind){
				var top=$(this).css("top");
				var sss=top.substring(0,top.indexOf("p"))
					$(this).css("top",parseFloat(sss)+type*parseFloat(inputHeight));
					$(".cartBox").css("transition","top 0.3s")
			}
		})
	}
	//瀑布流效果
	$(window).resize(function(){
		waterFall();
	});
})