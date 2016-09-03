define(['jquery','valid','api','common','dialog'], function($,V,api,common,dialog) {
    if(window.location.href.indexOf('index.html') == -1) return;

	//console.log(V.idCard)
	var carNum = $(".carNum"),
		ma = $(".ma"),
		validBtn = $(".code");

		     
	//当点击获取验证码的时候
	var carNumV = $.trim(carNum.val()),
		maV = $.trim(ma.val()),
		validCode=null; 
	validBtn.on("click",function(){
		//如果
		if(V.idCard($.trim(carNum.val()))){
			common.countDown(validBtn);//倒计时
			api.getAccounInfo({
				wechat_id:common.getUrlParams('wechat_id'),
				idcard:$.trim(carNum.val())
			},function(data){
				validCode=data.code;
			})
			return;
		}else{
			$.dialog({
				    msg:'请输入正确的入网号码！',
				    btn:[
				    	{text:'确定',className:'ok'}
				     ],
				     btn1Event:function(){
				     	$('.carNum').focus();
				     }
				})
		}
	})


	carNum.on("input propertychange", function() {
		check();
	})

	ma.on("input propertychange", function() {
		check();
	})
	//判断是否 id 和验证码为空
	function check() {
		if ($.trim(carNum.val()) && $.trim(ma.val())) {
			//如果为空并且不满足条件按钮就是灰色 否则  高亮 
			if(V.idCard($.trim(carNum.val())) && /\d{6}/.test($.trim(ma.val()))){
				$('#index-sbtn').removeClass("gray").addClass("blue");
			}else {
				$('#index-sbtn').removeClass("blue").addClass("gray");
			} 
		}
	}

	//如果验证符合条件 就进入其他页面
	$('#index-sbtn').on("click","input",function(){
		if(carNumV == validCode){
			window.location.href="changeNum.html";
		}else{
			return;
		}	
	})
	//当点击验证符合条件 就进入其他页面
	$(".blue").on("click","a",function(){
		 $(this).attr("href","binding.html");
	})
})