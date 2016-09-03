$(function() {
	init();

	function init() {
		//切换函数
		tab();
		//检测提交函数
		check();

	}

//切换函数
function tab() {
        //切换封装函数
        function sumtab(parentele,style){
		     $(parentele).on("click", "li", function() {
					$(this).addClass(style)
						   .siblings().removeClass();
		     })
        }

        //当点击css-tab-nav时，切换不同的内容区
        sumtab(".css-tab-nav",'css-bg');

        //当点击css-add-price时，对应金额变亮
        sumtab('#css-add-price','css-on');
	};

//检测提交函数
function check() {
        //当css-add-tel获取焦点时，按钮变亮
        $('#css-add-tel').on('focus',function(){
        	 $(".css-add-btn").removeClass('gray').addClass('blue');

        })
        //当css-add-tel失去焦点时，按钮变暗
        $('#css-add-tel').on('blur',function(){
		     
		     //判断输入内容格式是否正确，正确则提交，否则提醒
		     var str=$('#css-add-tel').val();
		     var reg=/^1[3|5|7|8]\d{9}$/;//手机号码正则
		     if(reg.test(str)){
		        	alert("格式正确，可提交");
		        	$(".css-add-btn").removeClass('gray').addClass('blue');
		     }else{
		        	alert("格式有误，请重新输入");
		        	$(".css-add-btn").removeClass('blue').addClass('gray').addClass('css-btn');
                    str=='';
		     }

        })
     
      
		

	};
})