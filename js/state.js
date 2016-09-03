define(['jquery'],function($){
    if(window.location.href.indexOf('state.html') == -1) return;

    $('body').on('click',function(){
       
        location.href = 'my.html';
    })
})