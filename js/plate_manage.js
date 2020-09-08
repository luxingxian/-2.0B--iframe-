$(document).ready(function() {
				$(".sysul li .position").hover(function(){
					$(this).find(".sysimgbg").stop(true,true).delay(500).fadeIn();
				},function(){
					$(this).find(".sysimgbg").stop(true,true).fadeOut();
				})
				$(".system_li").each(function(){
					if($(this).find(".sysul li").length==0){
						$(this).addClass("noModalBg");
					}
					if($(this).find(".sysul li").length<=3){
						$(this).find(".syspage").hide();
					}
				})
				$(".deleteBtn").click(function(){
					var modalName=$(this).parents("li").find(".modalName").html();
					$(".deleModal").find(".orangeFont").html(modalName);
					$(".deleModal").fadeIn();
					$(".popDrop").fadeIn();
					tcShow();
					var _this=$(this);
					$(".deleModal .sure").click(function(){
						$(".deleModal").fadeOut();
						$(".popDrop").fadeOut();
						tcHide();
						_this.parents("li").remove();
						$(".system_li").each(function(){
							if($(this).find(".sysul li").length==0){
								$(this).addClass("noModalBg");
							}
							if($(this).find(".sysul li").length<=3){
								$(this).find(".syspage").hide();
							}
						})
					})
				})
				
				
				$(".icons ul li").click(function(){
					$(".icons ul li").removeClass("active");
					$(this).addClass("active");
				})
				
				$(".addExet").click(function(){
					$(".addExetPop").fadeIn();
					$(".popDrop").fadeIn();
					tcShow(1);
				})
				$(".deleIcon").click(function(){
					var exetName=$(this).parents(".system_li").find(".exrtName").html();
					$(".deleExet").find(".orangeFont").html(exetName);
					$(".deleExet").fadeIn();
					$(".popDrop").fadeIn();
					tcShow();
					var _this=$(this);
					$(".deleExet .sure").click(function(){
						$(".deleExet").fadeOut();
						$(".popDrop").fadeOut();
						tcHide();
						_this.parents(".system_li").remove();
					})
				})
				$(".eduIcon").click(function(){
					$(".eduExetPop").fadeIn();
					$(".popDrop").fadeIn();
					tcShow(1);
				})
				$(".popup .cancleIcon").click(function(){
					$(this).parents(".popup").fadeOut();
					$(".popDrop").fadeOut();
					tcHide();
				})
				$(".popup .popConten .cancle").click(function(){
					$(this).parents(".popup").fadeOut();
					$(".popDrop").fadeOut();
					tcHide();
				})
				
				$(".addArea").click(function(){
					$(".icons").fadeIn();
				})
				$(".icons .btns .cancle").click(function(){
					$(".icons").fadeOut();
				})
				
				$(".tipPop .cancleIcon").click(function(){
					$(this).parents(".tipPop").fadeOut();
					$(".popDrop").fadeOut();
					tcHide();
				})
				$(".tipPop .cancle").click(function(){
					$(this).parents(".tipPop").fadeOut();
					$(".popDrop").fadeOut();
					tcHide();
				})
			});