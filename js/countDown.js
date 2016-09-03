function Code(opt){
	  this.opt=opt;
      this.element=document.querySelector(this.opt.ele);
      this._time=this.opt._time;
      this.text="获取验证码";
      this.timer=null;
      this._className=this.opt._className;
      this.init();
}
Code.prototype={
	 init:function(){
	 	this.element.value=this.text;
	 	this.beginT();
	 },
	  beginT:function(){
	  	var that=this
	  	  this.element.addEventListener("click",function(){
	  	  	   that.element.value=that._time+"s后重发";
               that.element.className+=that._className;
               timer=setInterval(function(){
               	  that._time--;
               	  that.element.disabled=true;
               	  that.element.value=that._time+"s后重发";
               	  if(that._time<=0){
               	  that.element.value="重新获取验证码"; 
               	  clearInterval(timer);
                    that._time=that.opt._time;
               	  that.element.disabled=false;
               	  that.element.className=that.element.className.replace(that._className,"");
               	  }
               },1000)
	  	  },false)
	  }
}

//调用

 /*var code=new Code({
             ele:".code",
             _time:10,
             _className:" on"
         })*/