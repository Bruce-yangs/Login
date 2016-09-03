
	
define([],function(){
	function init(){
		addEvent();
	}
	function addEvent(){
		//当点击余额的时候
		$('.money').on('click','.prestore',function(){
			$('.prestoreM').show();
			$('.prestore').hide();

		})

		//选择金额
		$('.prestoreM').on('click','li',function(){
			var prestoreTxts = $(this).text();
			$('.prestore').text(prestoreTxts).show();
			$('.prestoreM').hide();
		})

		//当点击套餐的时候
		$('.money').on('click','.box-prestore',function(){
			//$(this).addClass('on').siblings('.box-prestore').removeClass('on');
			changes($(this));	
		})

		//当点击是否需要来电的时候
		$('.callShow').on('click','span',function(){
			changes($(this));
		})

		function changes(ele){
			$(ele).addClass('on').siblings().removeClass('on');
		}


		//当点击余额的时候
		$('.msg').on('click','.msg-tit',function(){
			$('.box-message').show();

		})

		$('.form').on('click',".box-message",function(){
			$('.box-message').hide();
		})

		/*var arrs=[17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378,17038905378],
			str='';
			$.each(arrs,function(k,v){
				str+='<li>'+v+'</li>';
			})
		$('.list-nums').append(str);*/
		
		$('.phone-nums').on("click","li",function(){
			changes($(this));
			var _nums =$(this).text();
			$('.Code').val(_nums);
			$('.phone-nums').removeClass('on');

		})

		$('.msg').on("click",".Code",function(){
			$('.phone-nums').addClass('on');
		})


		$('.blue').on("click",function(){
			location.href="3g_tab.html";
		})
	}
	return init;
})