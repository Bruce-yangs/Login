define(['jquery', 'common', 'valid', 'dialog'], function($, common, validate, dialog) {
  if (window.location.href.indexOf('info.html') == -1) return;
  //地址栏获取参数
  var iccid = common.getUrlParams('ICCID');
  var phone = common.getUrlParams('phone');
  var prestore = common.getUrlParams('prestore');
  var packages = common.getUrlParams('packages');
  var showCaller = common.getUrlParams('showCaller');
  var formatPhone = phone.replace(/^(\d{3})(\d{4})(\d+)$/g, function(a, b, c, d) {
    return b + " " + c + " " + d
  });
  // console.log(formatPhone)  预存30元/0元月租/170 9121 3473
  var topMsg = '预存' + prestore + ' / ' + '0元月租 /' + formatPhone;
  $('.topMsg').attr("value", decodeURI(topMsg));

  //验证文本框

  function valid(ele, reg) {
    if (common.getType(reg) == '[object RegExp]') {
      return reg.test(ele.val());
    } else if (common.getType(reg) == '[object Function]') {
      return reg(ele.val())
    }
  }

  function check() { //调用函数  判断是对象还是函数   匹配验证 
    var btn = $('#submit');
    if (
      valid($('.info-name'), /\S/) && valid($('.info-id'), validate.idCard) && valid($('.info-id-location'), /^[\u4E00-\u9FA5]+$/) && valid($('.info-phone'), /^1[3578]\d{9}$/) && $('.llrtake ').hasClass('ons') && $('#info-ck').prop('checked')
    ) {
      btn.removeClass('gray');
    } else {
      btn.addClass('gray');

    }
  }

  //当发生变化的时候 就调用函数
  $('.info-name').on('input propertychange', function() {
    check();
  });
  $('.info-id').on('input propertychange', function() {
    check();
  });
  $('.info-id-location').on('input propertychange', function() {
    check();
  });
  $('.info-phone').on('input propertychange', function() {
    check();
  });

  //图片上传
  $('.ps').on('click', function() {
    var pa = $('.imgUpload');
    pa.addClass('on');
    if (pa.children().length == 0) { //如果子集为0；  就添加页面内容  同时添加自定义事件
      pa.html($('#upload-tpl').html()).trigger('page-show');
    }

    $('.pic1').on('change', function() {
      uploadimg($(this))
    });
    $('.pic2').on('change', function() {
      uploadimg($(this))
    });
    $('.pic3').on('change', function() {
      uploadimg($(this))
    });
    history.pushState({}, 'upload', location.href + '&__PLU__upload'); //通过浏览器history返回
  });


  //图片上传

  function uploadimg(ele) {
    var reader = new FileReader();
    var file = ele[0].files[0]; //转换成JS原生才有这属性

    console.log(ele[0].files)

    if (file.size / (1024 * 1024) > 1) { //当图片大于1M   调用dialog 提示相关信息
      $.dialog({
        msg: '请上传小于1MB的图片',
        btn: [{
          text: '确定',
          className: 'ok'
        }]
      })
      //  Dialog.alert('请上传小于1MB的图片',function (){});
      return;
    }
    var cur = ele;
    reader.readAsDataURL(file);
    reader.onload = function() {

      //readAsDataURL方法用于读取指定Blob或File的内容。当读操作完成，readyState变为DONE,
     //loadend被触发，此时 result属性包含数据： URL以 base64编码的字符串表示文件的数据。

      cur.prev().attr('src', this.result); //base64  改变图片S
      cur.parents('.imgs-Id').attr('done', 1); //添加自定义属性
      //上传图片
      //$.when($.ajax('',this.result).done(function(){}));
      if (checkUploaded()) {
        $('.blues').removeClass('gray');
      }
    }
  }

  function checkUploaded() {
    var i = 0;
    $('.imgs-Id').each(function() { //如果I 的个数不等于3  就false

      if ($(this).attr('done')) {
        i++;
      }
    });
    console.log(i)

    return i >= 3 ? !0 : !1;

  }


  //图片上传区域的现实和隐藏
  $(window).on('popstate', function() {
    if (location.href.indexOf('__PLU__upload') == -1) {
      $('.imgUpload').removeClass('on');
    } else {
      $('.imgUpload').addClass('on');
    }
  });

  //上传图片区域绑定隐藏功能  调用自定义属性
  $('.imgUpload').on('page-show', function() {
    $('.blues').off().on('click', function() {
      if ($(this).hasClass('gray')) return;
      $('.imgUpload').removeClass('on');

      $('#upload').text('照片已上传').addClass('ons');
      check();
    })
  });

  $('#info-ck').on('click', function() {
    check();
  });


  $('#submit').on('click', function() {
    if ($(this).hasClass('gray')) return;
    window.location.href = 'order.html';
  })

})