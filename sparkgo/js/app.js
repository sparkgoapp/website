window.fbAsyncInit = function() {
    FB.init({
    appId      : '185923091929013',
    xfbml      : true,
    version    : 'v2.5'
    });
	$(document).trigger('FBready');
};

function FB_load(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
};

var exec;
var go;
var posts = [];

function input_fold(d){
	if(d){
		$(".topbar").css("top","-20vw").css("border-bottom","none");
		$(".search").css("top","-17vw");
		$(".title").css("margin-top","0vw");
	}else{
		$(".topbar").css("top","0vw").css("border-bottom","solid #f6a623 0.2vw");
		$(".search").css("top","3vw");
		$(".title").css("margin-top","20vw");
	}
}

$(document).ready(()=>{
	var S = window.localStorage.getItem("scroll");
	if(S){
		setTimeout(()=>{
			$(window).scrollTop($("#"+S).offset().top);
		},1500);
	}
	window.localStorage.removeItem("scroll");
	exec = (usr)=>{	
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/sub.njs',
			method: 'POST',
			data: {type: 0, SID: usr},
			success: function(data){
				//a=data;		
				console.log(data);
				go(data);
			},
			error: function(xmlhttprequest, textstatus, message){
				console.log(xmlhttprequest);
				console.log(textstatus);
				console.log(message);
			}
		});
	};
	go = (sub)=>{
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/api.njs',
			method: 'POST',
			data: {type:0, sub:sub},
			success: function(data){
				a=data;			
				console.log(data);
				$(document).on('FBready',Datarender(data));
				FB_load(document, 'script', 'facebook-jssdk');
			},
			error: function(xmlhttprequest, textstatus, message){
				console.log(xmlhttprequest);
				console.log(textstatus);
				console.log(message);
			}
		});
	};

	exec(window.localStorage.getItem("SID"));
	$.ajax({
		url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/pro.njs',
		method: 'POST',
		data: {SID: window.localStorage.getItem("SID")},
		success: function(data){
			window.localStorage.setItem("profile",JSON.stringify(data.profile));
		}
	});
	/*$.ajax({
		url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/fetch.njs',
		method: 'POST',
		data: {},
		success: function(data){
			console.log(data);
		}
	});*/
	//go();
	$("#keyword").val("");
	$(window).scroll(()=>{
		{previousTop:0};
		var currentTop = $(window).scrollTop();
		if(currentTop > this.previousTop){
			input_fold(1);
		}else{
			input_fold(0);
		}
		this.previousTop = currentTop;
	});
});
var Datarender = (data)=>{
	$.each(data,function(index, value){
		var i = index;
		$.each(value.FBpost,function(index, value){
			value.info.index = i;
		});
		$.each(value.YTpost,function(index, value){
			value.info.index = i;
		});
	});
	var posts = Sort(data);
	var len = posts.length;
	for(var i=0;i<len;i++){
		eachpost.push(0);
	}
	$.each(posts,function(index, value){
		var e = $('<li><div class="post"><div><div class="circle"></div><p class="name"></p><p class="time"></p><p class="date"></p></div><div class="pic"><div class="middle"><img class="mainpic"/><img class="platform"/></div><p class="text"></p><div class="interact"><img class="heart" src="img/icn_btn_like.png"/><img class="active-heart" style="display:none;" src="img/icn_btn_like_active.png"/><p class="number"></p><img class="message" src="img/icn_btn_message.png"/><p class="number_m"></p><img class="share" src="img/icn_sm_btn_share.png"></img></div></div></div></li>');
		e.attr("id","po"+String(index));
		var loading = $('<li><div class="post"><img class="loading" src="img/main_empty.gif"/></div></li>');
		render[value.type](e,value.info,data[value.info.index].pro,index,loading);
		$('.title ul').append(loading);
	});
};

var Sort = (data)=>{
    for(var i = 0, L = data.length; i<L ; i++){
    	posts = posts.concat(data[i].FBpost.concat(data[i].YTpost));
    }
   	posts.sort((a,b)=>{return (a.info.time > b.info.time)?(-1):(1)});
    console.log(posts);
	return posts;
};
