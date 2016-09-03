define(['jquery', 'common', 'binding', 'dialog', 'api'], function($, common, binding, dialog, api) {
    if (window.location.href.indexOf('binding.html') == -1) return;
    //https://ticwear-account.mobvoi.com/captcha/img?origin=ticwatch-service&random_code=1393
    var url = 'https://ticwear-account.mobvoi.com/captcha/img?origin=ticwatch-service',
        arr = [];
    //console.log(common.uniqueArray(arr));

    //验证图片的随机数
    function randNum(max, min) {
        var tmp = Math.floor(Math.random() * (max - min)) + min;
        //排重
        while (arr.indexOf(tmp) > -1 && arr.length < (max - min)) {
            tmp = Math.floor(Math.random() * (max - min)) + min;
        }
        if (arr.length <= (max - min)) {
            arr.push(tmp);
            return tmp;
        } else {
            return false;
        }
    }
    
    $('#randomImg').on('click', function() {
        var tmp = randNum(9999, 1000) || 'error'; //调用随机数
        url = url + '&random_code=' + tmp;
        $(this).attr('src', url).attr('data-random-code', tmp);
    })

    //验证号码 phoneN  imgCode  Mcode

    //思路: 点击 检测 是否匹配
    var flag = true;
    var _code = '';
    $('.codes').on('click', function() {

        var phone = $('.phoneN').val(),
            imgCode = $('.imgCode').val();
        var reg_phone = /^1[3578]\d{9}$/g, //手机验证 匹配 reg-phone= /^1[3578]\d{9}$/g,
            reg_imgcode = /[a-zA-Z0-9]{4}/g; //图片验证 匹配 reg-imgcode= /[a-zA-Z0-9]{4}/g,
        if (!reg_phone.test(phone)) {
            $.dialog({
                msg: '请输入正确格式的手机号码！',
                btn: [{
                    text: '确定',
                    className: 'ok'
                }],
                btn1Event: function() {
                    $('.phoneN').focus();
                    flag = false;

                }
            })
            return;
        }
        if (!reg_imgcode.test(imgCode)) {
            $.dialog({
                msg: '请输入验证码！',
                btn: [{
                    text: '确定',
                    className: 'ok'
                }],
                btn1Event: function() {
                    $('.imgCode').focus();
                    flag = false;
                }
            })
            return;
        }
        flag = true;

        if (!flag) return;
        common.countDown($(this));
        api.getVerifyCode({
            id: 1
        }, function(data) {
            console.log(data);
            if (data[1] == 'success') {
                _code = data[0].code;
            }

        })
    });
    //当获取图片验证码的时候
    $('.imgCode').on('input propertychange', function() {
        var self = $(this);
        var val = self.val();//拿到文本框的值
        if (val.length > 4) {//如果字符长度大于4，就只去前4位
            val = val.substr(0, 4);
            self.val(val);//把值重新赋给input
        }
    }).on('blur', function() {//当失去焦点后  进行判断
        var self = $(this);
        if ($(this).val().length == 4) {
            $.ajax({
                url: '../data/imgcodeverify.json?code' + $(this).val(),
                success: function(data) {
                    if (!data.res) {
                        $.dialog({
                            msg: '验证码输入有误',
                            btn: [{
                                text: '确定',
                                className: 'ok'
                            }],
                            btn1Event: function() {
                                $('#randomImg').click();//图片验证重新刷新
                                self.focus();//优化 自动获取文本框
                                flag = false;
                            }
                        })
                    } else {
                        flag = true;//成功
                    }

                }
            })
        }

    });

    $('.Mcode').on('input propertychange', function() {
        var val = $(this).val();
        if (val.length == 6) {
            $('#index-sbtn').removeClass('gray').addClass('blue');
        }
    });
    $('#index-sbtn').on('click', function() {

        if ($(this).hasClass('gray')) return;
        if ($('.Mcode').val() != _code) {

            $.dialog({
                msg: '验证码输入有误',
                btn: [{
                    text: '确定',
                    className: 'ok'
                }],
                btn1Event: function() {
                    $('.imgCode').focus();

                }
            })

            return;
        }
        window.location.href = 'choose.html';
    })

})