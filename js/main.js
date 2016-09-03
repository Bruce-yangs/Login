require.config({
    baseUrl:'../js',
    paths:{
        'artTemplate':'template-native',
        'jquery':'jquery'
    }
});

require(['jquery','js','binding','index','choose','info','order','my','state'],function(html,data,jq,js,binding,state){

})


/*require(['fastclick'],function(fc){
    fc.attach(document.body);
})*/