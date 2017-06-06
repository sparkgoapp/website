var pad = (str, len)=>{
	if(str.length>=len){
		return str;
	}else{
		var tem = "0".repeat(len - str.length).concat(str);
		return tem;
	}
};

var Format_time = (T)=>{
	var date = pad(String(T.getMonth()+1),2)+"-"+pad(String(T.getDate()),2)+"-" + String(T.getFullYear());
    var H = T.getHours();
    var M = (H>=12)?"PM":"AM";
    H = H%12;
    H = H?H:12;
    var time = pad(String(H),2)+":"+pad(String(T.getMinutes()),2)+M;
	return [date,time];
};

var eachpost = [];

var render = [
	(DOM, info, pro, i) => {
		DOM.find(".name").html(pro.nickname);
		DOM.find(".circle").css("background-image","url('"+pro.image+"')").css("background-size","cover");
		var T = new Date(info.time);
		T = Format_time(T);
		DOM.find(".date").html(T[0]);
		DOM.find(".time").html(T[1]);
		DOM.find(".mainpic").load(()=>{
			eachpost[i]=1;
			if(eachpost.indexOf(0)==-1){
				tool();
			}
		});
		if(!info.type || info.type == "share"){
			DOM.find(".mainpic").attr("src",pro.image);
		}else if(info.type.indexOf("video")!=-1 || info.type == "photo"){
			/*DOM.find(".mainpic").remove();
			$('<div class="fb-video mainpic" data-href="'+info.url+'" data-width="auto" data-show-text="false" data-autoplay="false"><div class="fb-xfbml-parse-ignore"></div></div>')
			.insertBefore(DOM.find(".heart"));*/
			DOM.find(".mainpic").attr("src",info.media);
		}/*else if(info.type == "photo"){
			DOM.find(".mainpic").attr("src",info.media);
		}*/
		DOM.find(".platform").attr("src","img/badge_fb.png");
		DOM.find(".number").html(info.likes);
		DOM.find(".text").css("width","83vw").css("height","4vw").css("text-overflow","ellipsis").css("overflow","hidden").css("white-space","nowrap").html(info.message);
	},
	(DOM, info, pro, i) => {
		DOM.find(".name").html(pro.nickname);
		DOM.find(".circle").css("background-image","url('"+pro.image+"')").css("background-size","cover");
		var T = new Date(info.time);
		T = Format_time(T);
		DOM.find(".date").html(T[0]);
		DOM.find(".time").html(T[1]);
		DOM.find(".mainpic").load(()=>{
			eachpost[i]=1;
			if(eachpost.indexOf(0)==-1){
				tool();
			}
		});
		DOM.find(".mainpic").attr("src",info.media);
		//DOM.find(".heart").css("bottom","-33vw");
		//DOM.find(".platform").css("bottom","-38vw");
		/*var i = $('<div class = "w100"><iframe class = "video" frameborder="0" allowfullscreen></iframe></div>');
		i.find(".video").attr("src","https://www.youtube.com/embed/"+info.videoId);
		i.insertBefore(DOM.find(".heart"));*/
		DOM.find(".platform").attr("src","img/badge_youtube.png");
		DOM.find(".number").html(info.likes);//.css("bottom","-30vw");
		DOM.find(".text").css("width","83vw").css("height","4vw").css("text-overflow","ellipsis").css("overflow","hidden").css("white-space","nowrap").html(info.title);
	}
];
