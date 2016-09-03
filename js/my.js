define(['jquery','template-native'],function($,template){
    if(window.location.href.indexOf('my.html') == -1) return;

    var wrap = $('.tab-main-wrap section');
    var WH =$(window).height();
                 //alert(WH)

/*    var queryTpl = '<ul class="count">'+
    '<%for (var i=0; i<lists.length; i++){%>'+
    '<li><h4><%= lists[i].name %></h4><p><%= lists[i].info %></p></li>'+
    '<%}%>'+
    '</ul>';*/
    $('.tab-title').on('click','span',function(){
        $(this).addClass('on').siblings().removeClass('on');
        var id = $(this).attr('data');
        rend(id);
    });
    $('.current').on('click',function(){
            
    })
    rend('query');//先渲染首页
    function rend(id){
        var url = '';
        if(id=='query'){//进行判断
            url = '../data/usedInfo.json';
        }else if(id =='pay'){
            var info = {
                userPhone: 13261556179
            };
            var html = template(id,info);
            wrap.html(html);
            return;
        }   

        $.when($.ajax(url))//相当于拿到数据

            .done(function(data){//当请求数据成功
                var tmp = {//定义一个变量 tmp  拥有数据
                    queryData:data
                };
                /*var render = template.compile(queryTpl);
                 var html = render({
                 lists: data
                 });*/
                var html = template(id,tmp);
                wrap.html(html);//渲染页面 html的性能要高于append
            })
            .fail(function(e){
                console.log(e)
            });
    }


    $('.tab-main').on('click','.fee-amount',function(){
        $(this).addClass('on').siblings().removeClass('on');
    })

    $('.tab-main-wrap').on('click', '.btn', function() {
        window.location.href = 'index.html';
    })
});