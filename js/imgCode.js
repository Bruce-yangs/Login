function ImgCode(opt){
	  this.opt=opt;
	  this.ele=document.querySelector(this.opt.ele);
	  this.showEle=document.querySelector(this.opt.showEle);
	  this.arr=this.opt.str.split("");
	  this.len=this.opt.len;
	  this.init();
}

ImgCode.prototype={
	 init:function(){
         this.bindEvent();
         fn(this);
	 },
	 bindEvent:function(){
	 	var that=this;
	 	this.ele.addEventListener("click",function(){
	 		/*var _length=that.arr.length,
	 		   arr1=[];
           for(var i=0;i<that.len;i++){
               arr1.push(that.arr[Math.floor(Math.random()*_length)]);
           }
           var str=arr1.join("");
           that.showEle.innerHTML=str;*/
           fn(that)

	 	},false)
	 }
}

function fn(obj){
       var _length=obj.arr.length,
	 		   arr1=[];
           for(var i=0;i<obj.len;i++){
               arr1.push(obj.arr[Math.floor(Math.random()*_length)]);
           }
           var str=arr1.join("");
           obj.showEle.innerHTML=str; 
}
/*调用验证码*/

/*var imgC=new ImgCode({
	 str:"0123456789qwertyuiopasdfghjklzxcvvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
	 ele:".y-change",
	 showEle:".y-show",
	 len:4
})*/