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

var subpic = (DOM, Med)=>{
	var showimg = [];
	if(Med.length>3){
		showimg = Med.slice(0,3);
		showimg.push("");
	}else{
		showimg = Med.slice(0,Med.length);
	}
	$.each(showimg,(index, value)=>{
		if(index != 3){
			var e = $("<div></div>");
			var g = $("<img/>");
			e.addClass("subpic").addClass("pic"+index+"");
			g.css("height",String(Math.floor(DOM.find(".mainpic").height()/3))+"px");
			g.attr("src",value.media);
			e.css("bottom",""+(2-index)*g.height()+"px");
			e.append(g);
			e.insertBefore(DOM.find(".platform"));
		}else{
			var e = $("<div></div>");
			e.addClass("subpic").addClass("picmore").css("height",String(Math.floor(DOM.find(".mainpic").height()/3))+"px");
			var p = $("<p></p>");
			p.css("line-height",""+e.height()+"px");
			p.html("+"+String(Med.length-3));
			e.append(p);
			e.insertAfter(DOM.find(".pic2"));
		}
	});
};

var eachpost = [];

var render = [
	(DOM, info, pro, i, L) => {
		DOM.find(".name").html(pro.nickname);
		DOM.find(".circle").css("background-image","url('"+pro.image+"')").css("background-size","cover");
		var T = new Date(info.time);
		T = Format_time(T);
		DOM.find(".date").html(T[0]);
		DOM.find(".time").html(T[1]);
		if(info.media || !info.type){
			DOM.find(".mainpic").load(()=>{
				L.replaceWith(DOM);
				eachpost[i]=1;
				if(eachpost.indexOf(0)==-1){
					tool();
				}
			});
		}else if(info.medias){
			DOM.find(".mainpic").load(()=>{
				L.replaceWith(DOM);
				eachpost[i]=1;
				if(eachpost.indexOf(0)==-1){
					tool();
				}
				subpic(DOM, info.medias.slice(1));
			});
		}
		if(!info.type){
			DOM.find(".mainpic").attr("src","img/img_opening.png");
		}else if(info.type.indexOf("video")!=-1){
			/*DOM.find(".mainpic").remove();
			$('<div class="fb-video mainpic" data-href="'+info.url+'" data-width="auto" data-show-text="false" data-autoplay="false"><div class="fb-xfbml-parse-ignore"></div></div>')
			.insertBefore(DOM.find(".heart"));*/
			DOM.find(".mainpic").attr("src",info.media);
			DOM.find(".middle").append('<img class="camera" src="img/icn_video.png">');
		}else if(info.type == "photo" || info.type == "profile_media" || ((info.type == "share")&&info.media)){
			DOM.find(".mainpic").attr("src",info.media);
		}else if(info.type == "album" || ((info.type == "share")&&info.medias)){
			DOM.find(".mainpic").attr("src",info.medias[0].media);
		}
		DOM.find(".platform").attr("src","img/badge_fb.png");
		DOM.find(".number").html(info.likes);
		DOM.find(".number_m").html(info.comment_count);
		DOM.find(".text").html(info.message);
	},
	(DOM, info, pro, i, L) => {
		DOM.find(".name").html(pro.nickname);
		DOM.find(".circle").css("background-image","url('"+pro.image+"')").css("background-size","cover");
		var T = new Date(info.time);
		T = Format_time(T);
		DOM.find(".date").html(T[0]);
		DOM.find(".time").html(T[1]);
		DOM.find(".mainpic").load(()=>{
			/*L.remove();
			$(".title ul").append(DOM);*/
			L.replaceWith(DOM);
			eachpost[i]=1;
			if(eachpost.indexOf(0)==-1){
				tool();
			}
		});
		DOM.find(".mainpic").attr("src",info.media);
		DOM.find(".middle").append('<img class="camera" src="img/icn_video.png">');
		//DOM.find(".heart").css("bottom","-33vw");
		//DOM.find(".platform").css("bottom","-38vw");
		/*var i = $('<div class = "w100"><iframe class = "video" frameborder="0" allowfullscreen></iframe></div>');
		i.find(".video").attr("src","https://www.youtube.com/embed/"+info.videoId);
		i.insertBefore(DOM.find(".heart"));*/
		DOM.find(".platform").attr("src","img/badge_youtube.png");
		DOM.find(".number").html(info.likes);//.css("bottom","-30vw");
		DOM.find(".number_m").html(info.comment_count);
		DOM.find(".text").html(info.title);
	}
];

var like = (post, type)=>{
	if(type){
		//like
	}else{
		//unlike
	}
};
