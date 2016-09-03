define(['jquery'],function($){
	
	$.dialog=function(option){
		return new dialog(option);
	}

	function dialog(option){
		var defaults={
			title:'',
			close:'',
			msg:'',
			btn:[
			        {text:'确定',className:'ok'},
			        {text:'取消',className:'no'},
			    ],
			btn1Event:null,
			btn2Event:null
		},
		defaults=$.extend({},defaults,option);
		addDialog(defaults);
		addEvent(defaults);
	}

	function addDialog(defaults){
			var html=$('<div class="mask mask-active"></div>'//遮罩层
					+'<div class="dialog-box animated bounceInUp">'//弹出盒子
						+'<p class="dialog-title">'+defaults.title+'</p>'//标题
						+'<h1 class="dialog-msg">'+defaults.msg+'</h1>'//内容
						+'<div class="dialog-btn-wrap"></div>'//按钮
					+'</div>');
			$('body').prepend(html);
			addBtn(defaults);
		
	}
	//遍历按钮
	function addBtn(defaults){
		if(defaults.btn.length==0) return false;
		for(var i=0,len=defaults.btn.length;i<len;i++){
			var close=$('<span class="dialog-btn '+defaults.btn[i].className+'">'+defaults.btn[i].text+'</span>')
			$('.dialog-btn-wrap').append(close);
		}
	}
	
	function addEvent(defaults){
		var dft=defaults;
		$('.dialog-btn').on('click',function(){
			btnsEvent();
		})
		$('.ok').on('click',function(){
			dft.btn1Event && dft.btn1Event();
			return;
		})
		$('.no').on('click',function(){
			dft.btn2Event && dft.btn2Event();
		})
	}
	function btnsEvent(){
		$('.mask').remove();
		$('.dialog-box').remove();
	}

})

	//调用
/*	$.dialog({
	    msg:'信息！',
	    btn:[
	    	{text:'确定',className:'ok'},
	     	{text:'取消',className:'no'}
	     ]
	})*/
