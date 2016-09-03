define(['jquery', 'template', 'api'], function($, temp, api) {
    if (window.location.href.indexOf('choose.html') == -1) return;


    if(localStorage.getItem('selected-phone')&&localStorage.getItem('selected-phone')!='undefined'){
        var tel = JSON.parse(localStorage.getItem('selected-phone'));
        $('.Code').attr("val",tel);
    }


    $(".msg-tit").on('click', function() {
        $(".box-message").addClass('on');
    })
    $(".box-message").on('click', function() {
        $(this).removeClass('on');
    })

    //当文本框的值发生改变时候
    $('.carNum').on('input propertychange', function() {
        var tmp = $(this).val();

        //匹配 格式 1234 5678 9012 0123 每四个有空格
        tmp = tmp.replace(/(\d{5})+$/g, function(a, b) {
            return b.substr(0, 4) + " " + b.substr(4)
        });
        //截取24个
        if (tmp.length >= 24) {
            tmp = tmp.substring(0, 24);
        }
        $(this).val(tmp);
        //检测
        check(tmp)
    });

    function check(tmp) {
        var reg = /^(\d{4}\s){4}(\d{4})$/, //匹配 格式 1234 5678 9012 0123 每四个有空格
            ele = $('.blue-box');
            
                 
        if ($('.Code').val()!="" && reg.test(tmp)) { //如果满足条件
            console.log(111)
                 
            ele.removeClass('gray-box');
        } else {
            ele.addClass('gray-box');
        }
    }


    //调用api 里的getNumber
    api.getNumber({}, function(data) {
        // console.log(data)
        var str = '<ul>';
        if (data) {
            data.result.forEach(function(v, i) { //两种方法     第二种正则
                str += '<li class="list-nums">' + v.svcNumber /*.substr(0,3)+" "+v.svcNumber.substr(4,4)+" "+v.svcNumber.substr(7,4)*/ + '</li>';
            })
            str += '</ul>';
        }
        $('.phone-nums').html(str);
    })

    var _href = location.href; //获取地址栏
    $('.Code').on('click', function() {
        //将当前URL和history.state加入到history中，并用新的state和URL替换当前。不会造成页面刷新。第三个参数是url

        history.pushState({}, 'choose phone number', _href + '?__PLU__cpn');
        $('.phone-nums').addClass('on');

    })

    //当点击回退按钮，触发事件window.onpopstate 当发生改变进行 
    $(window).on('popstate', function() {
        $('.phone-nums').removeClass('on');
        //history.replaceState用新的state和URL替换当前。不会造成页面刷新。
        history.replaceState({}, 'choose phone number', _href);
    });

    //当点击号码后  号码页消失
    $('.phone-nums').on('click', function() {
        setTimeout(function() {
            $('.phone-nums').removeClass('on')
        }, 500)

    }).on('click', 'li', function() {

        $(this).addClass('on').siblings('li').removeClass('on');

        var _textN = $(this).text();

        //进行匹配
        _textN = _textN.replace(/^(\d{3})(\d{4})(\d+)$/g, function(a, b, c, d) {
            return b + " " + c + " " + d
        });

        history.replaceState({}, 'choose phone number', _href);

        $('.Code').attr('value', '已选' + _textN + '').css('color', '#5E83E1');
        //检测
        check($('.carNum').val());
    })
        //1、当点击 充值话费 隐藏当前  显示 充值价格 2、 选中后 充值价格消失  显示当前选中价格 
     $('.prestore').on('click', function() {
        $(this).hide();
        $('.prestoreM').removeClass('on')
        .off().on('click','li',function(){
             var TRMB=$(this).text();
             $('.prestore').text(TRMB).show(); 
             $('.prestoreM').addClass('on');
       });
    })

     ckd($('.box-prestore '));
     ckd($('span'));


     function ckd(id){
        $(id).on('click',function(){
            $(this).addClass('on').siblings().removeClass('on');
        })
     }

     function collectInformation(){
        var str='';
        var ICCID = $('.carNum').val();
        var reg=/[\u4E00-\u9FA5\s]/g;
        var phone =phone = $('.Code').val().replace(reg,'');
        console.log(phone)
             
        var prestore = $('.prestore').text();
        var packages = $('.money .on').attr('data');
        var showCaller = $('.callShow .on').index();
                console.log(showCaller)

        ICCID = ICCID.replace(/\s/g,'');
        phone = phone.replace(/\s/g,'');
        str+='?ICCID='+ICCID;
        str+='&phone='+phone;
        str+='&prestore='+prestore;
        str+='&packages='+packages;
        str+='&showCaller='+showCaller;
        return decodeURI(str);
     } 
         
    $('.next-btn').on('click',function(){
        if($(this).hasClass('gray-box')) return;
        localStorage.setItem('selected-phone',JSON.stringify($('.Code').val()));

        location.href='info.html'+collectInformation();
    })
})