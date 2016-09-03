$(function(){
	$(".user-id input").on("focus",function(){
		  $(".question").hide();
		  $(".footer").hide();
	})	
	  $(".ma").on("keyup",function(){
	  	 var text=$(".user-id input").val(),
             code=$(".ma").val();
	  	   if(text!=""&&code!=""){
	  	   	 $("#index-sbtn").addClass("blue m");
	  	   }
	  })

    $("#index-sbtn").on("click",function(){
    	 var text=$(".user-id input").val(),
             code=$(".ma").val();
        if(text==""&&code==""){
            $.dialog({
	          msg:'填写信息不完整！',
	          btn:[
	    	     {text:'确定',className:'ok'},
	     	     {text:'取消',className:'no'}
	           ]
	       })
          $("#index-sbtn").removeClass("blue");
          $(".user-id input").val("");
          $(".ma").val("");
       	  return false;

    	   
       }else if(text!="6688"){
       	   $.dialog({
	          msg:'填写信息错误！',
	          btn:[
	    	     {text:'确定',className:'ok'},
	     	     {text:'取消',className:'no'}
	           ]
	       })
	        $("#index-sbtn").removeClass("blue");
          $(".user-id input").val("");
          $(".ma").val("");
           $("#index-sbtn").removeClass("blue");
       	  return false;
       	

       }else{
       	   window.location.href="binding.html";
       }
            
       
    })

})