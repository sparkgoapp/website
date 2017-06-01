var pad = (str, len)=>{
	if(str.length>=len){
		return str;
	}else{
		var tem = "0".repeat(len - str.length).concat(str);
		return tem;
	}
};

var render = [
	(DOM, info) => {
		DOM.find(".name").html(info.name);
		DOM.find(".circle").css("background-image","url('"+info.picture+"')").css("background-size","cover");
		var T = new Date(info.time);
		var date = pad(String(T.getMonth()+1),2)+"-"+pad(String(T.getDate()),2)+"-" + String(T.getFullYear());
		var H = T.getHours();
		var M = (H>=12)?"PM":"AM";
		H = H%12;
		H = H?H:12;
		var time = pad(String(H),2)+":"+pad(String(T.getMinutes()),2)+M;
		DOM.find(".date").html(date);
		DOM.find(".time").html(time);
		if(!info.type){
			DOM.find(".mainpic").attr("src",info.picture);
		}else if(info.type.indexOf("video")!=-1){
			DOM.find(".mainpic").remove();
			$('<div class="fb-video mainpic" data-href="'+info.url+'" data-width="auto" data-show-text="false" data-autoplay="false"><div class="fb-xfbml-parse-ignore"></div></div>')
			.insertBefore(DOM.find(".heart"));
		}else if(info.type == "photo"){
			DOM.find(".mainpic").attr("src",info.media);
		}
		DOM.find(".text").css("width","88vw").css("height","11vw").css("text-overflow","ellipsis").css("overflow","hidden").html(info.message);
	},
	(DOM, info) => {
		DOM.find(".name").html(info.name);
		DOM.find(".circle").css("background-image","url('"+info.picture+"')").css("background-size","cover");
		var T = new Date(info.time);
		var date = pad(String(T.getMonth()+1),2)+"-"+pad(String(T.getDate()),2)+"-" + String(T.getFullYear());
		var H = T.getHours();
		var M = (H>=12)?"PM":"AM";
		H = H%12;
		H = H?H:12;
		var time = pad(String(H),2)+":"+pad(String(T.getMinutes()),2)+M;
		DOM.find(".date").html(date);
		DOM.find(".time").html(time);
		DOM.find(".mainpic").remove();
		DOM.find(".heart").css("bottom","-33vw");
		DOM.find(".platform").css("bottom","-38vw");
		var i = $('<div class = "w100"><iframe class = "video" frameborder="0" allowfullscreen></iframe></div>');
		i.find(".video").attr("src","https://www.youtube.com/embed/"+info.videoId);
		i.insertBefore(DOM.find(".heart"));
		DOM.find(".text").css("width","88vw").css("height","11vw").css("text-overflow","ellipsis").css("overflow","hidden").html(info.title);
	}
];
