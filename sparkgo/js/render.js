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
		if(info.medias){
			DOM.find(".mainpic").load(()=>{
				L.replaceWith(DOM);
				eachpost[i]=1;
				if(eachpost.indexOf(0)==-1){
					if(window.location.pathname=="~fad11204/sparkgo/landing.html"){
						var S = window.localStorage.getItem("scroll");
						if(S){
							$(window).scrollTop($("#"+S).offset().top);
						}
						window.localStorage.removeItem("scroll");
					}
					tool();
				}
				subpic(DOM, info.medias.slice(1));
			});
		}else{
			DOM.find(".mainpic").load(()=>{
				L.replaceWith(DOM);
				eachpost[i]=1;
				if(eachpost.indexOf(0)==-1){
					tool();
				}
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
		}else if(info.type == "album" || ((info.type == "share")&&info.medias)){
			DOM.find(".mainpic").attr("src",info.medias[0].media);
		}else if(info.media){
			DOM.find(".mainpic").attr("src",info.media);
		}else{
			DOM.find(".mainpic").attr("src","img/img_opening.png");
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
					if(window.location.pathname=="~fad11204/sparkgo/landing.html"){
						var S = window.localStorage.getItem("scroll");
						if(S){
							$(window).scrollTop($("#"+S).offset().top);
						}
						window.localStorage.removeItem("scroll");
					}
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
	},
	(DOM, info, pro, L) => {
		DOM.find(".name").html(pro.nickname);
		DOM.find(".circle").css("background-image","url('"+pro.image+"')").css("background-size","cover");
		var T = new Date(info.time);
		T = Format_time(T);
		DOM.find(".date").html(T[0]);
		DOM.find(".time").html(T[1]);
		if(( !info.type ) || (( info.media )&&( info.type.indexOf("video")==-1 ))){
			DOM.find(".mainpic").load(()=>{
				L.replaceWith(DOM);
				tool();
			});
		}else if(info.medias){
			DOM.find(".mainpic").load(()=>{
				L.replaceWith(DOM);
				subpic(DOM, info.medias.slice(1));
			});
		}else{
			L.remove();
		}
		if(!info.type){
			DOM.find(".mainpic").attr("src","img/img_opening.png");
		}else if(info.type=="video_share_youtube"){
			DOM.find(".mainpic").remove();
			DOM.find(".platform").css("bottom","-14.5vw");
			var videoId = info.url.substring(info.url.indexOf("?u=")+3,info.url.indexOf("&h="));
			videoId = (videoId.indexOf("watch")!=-1)?videoId.substring(videoId.indexOf("%3Fv%3D")+7):videoId.substring(videoId.indexOf("youtu.be%2F")+11);
			var i = $('<div class = "w100"><iframe class = "video" frameborder="0" allowfullscreen></iframe></div>');
			i.find(".video").attr("src","https://www.youtube.com/embed/"+videoId+"?autoplay=1&rel=0");
			i.insertBefore(DOM.find(".platform"));
		}else if(info.type.indexOf("video")!=-1){
			DOM.find(".mainpic").remove();
			$('<div class="fb-video mainpic" data-href="'+info.url+'" data-width="auto" data-show-text="false" data-autoplay="true"><div class="fb-xfbml-parse-ignore"></div></div>')
			.insertBefore(DOM.find(".platform"));
		}else if(info.media){
			DOM.find(".mainpic").attr("src",info.media);
		}else{
			DOM.find(".mainpic").attr("src","img/img_opening.png");
		}
		DOM.find(".platform").attr("src","img/badge_fb.png");
		DOM.find(".number").html(info.likes);
		DOM.find(".number_m").html(info.comment_count);
		DOM.find(".text").html(info.message);
		if((info.type)&&(info.type.indexOf("video")!=-1)){
			DOM.insertAfter(".top");
			tool();
		}
	},
	(DOM, info, pro, L) => {
		DOM.find(".name").html(pro.nickname);
		DOM.find(".circle").css("background-image","url('"+pro.image+"')").css("background-size","cover");
		var T = new Date(info.time);
		T = Format_time(T);
		DOM.find(".date").html(T[0]);
		DOM.find(".time").html(T[1]);
		L.remove();
		DOM.find(".mainpic").remove();
		DOM.find(".platform").css("bottom","-14.5vw");
		var i = $('<div class = "w100"><iframe class = "video" frameborder="0" allowfullscreen></iframe></div>');
		i.find(".video").attr("src","https://www.youtube.com/embed/"+info.videoId+"?autoplay=1&rel=0");
		i.insertBefore(DOM.find(".platform"));
		DOM.find(".platform").attr("src","img/badge_youtube.png");
		DOM.find(".number").html(info.likes);//.css("bottom","-30vw");
		DOM.find(".number_m").html(info.comment_count);
		DOM.find(".text").html(info.title);
		DOM.insertAfter(".top");
		tool();
	},
	(DOM, com) => {
		$.getJSON("https://graph.facebook.com/"+com.from.id+"/picture",
		{redirect: 0},
		(data)=>{
			DOM.find(".replyhead").css("background-image","url("+data.data.url+")").css("background-size","cover");
		});
		DOM.find(".replyname").html(com.from.name);
		DOM.find(".replytext").html(com.message);
		DOM.find(".replytextlast").html(com.message);
		var T = new Date(com.created_time);
		T = Format_time(T);
		DOM.find(".replytime").html(T[0]+" "+T[1]);
		DOM.insertAfter("#po0");
	},
	(DOM, com) => {
		var Com = com.snippet.topLevelComment.snippet;
		DOM.find(".replyhead").css("background-image","url("+Com.authorProfileImageUrl+")").css("background-size","cover");
		DOM.find(".replyname").html(Com.authorDisplayName);
		DOM.find(".replytext").html(Com.textOriginal);
		DOM.find(".replytextlast").html(Com.textOriginal);
		var T = new Date(Com.updatedAt);
		T = Format_time(T);
		DOM.find(".replytime").html(T[0]+" "+T[1]);
		DOM.insertAfter("#po0");
	}
];

var like = (DOM, post, type)=>{
	if(type){
		DOM.find(".number").html(parseInt(post.info.likes) + 1);
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/like.njs',
			method: 'POST',
			data: {
				target: ((post.type)?post.info.videoId:post.info.pid),
				FY: post.type,
				SID: window.localStorage.getItem("SID"),
				type: type,
			},
			success: (data)=>{
				console.log(data);
			}
		});
		//like
	}else{
		DOM.find(".number").html(parseInt(post.info.likes));
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/like.njs',
			method: 'POST',
			data: {
				target: ((post.type)?post.info.videoId:post.info.pid),
				FY: post.type,
				SID: window.localStorage.getItem("SID"),
				type: type,
			},
			success: (data)=>{
				console.log(data);
			}
		});
		//unlike
	}
};
