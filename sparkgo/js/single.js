window.fbAsyncInit = function() {
    FB.init({
    appId      : '185923091929013',
    xfbml      : true,
    version    : 'v2.9'
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

var posts = [];

$(document).ready(()=>{
	var post = JSON.parse(window.localStorage.getItem("page"));
	$.ajax({
		url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/comment.njs',
		method: 'POST',
		data: {id:((post.type==1)?post.info.videoId:post.info.pid), type: post.type},
		success: (data)=>{
			console.log(data);
			Comrender(data,post);
		},
		error: (err)=>{
			console.log(err);
		}
	});
	$(".back").click(()=>{
		window.history.back();
	});
	posts.push(post);
	$(document).on('FBready',Datarender(post));
	FB_load(document, 'script', 'facebook-jssdk');
	$(".writehead").attr("src",JSON.parse(window.localStorage.getItem("profile")).image);
});
var Datarender = (data)=>{
		var pro = JSON.parse(window.localStorage.getItem("postpro"));
		$('.head').css("background-image","url("+pro.image+")").css("background-size","cover");
		var e = $('<li><div class="post"><div><div class="circle"></div><p class="name"></p><p class="time"></p><p class="date"></p></div><div class="pic"><div class="middle"><img class="mainpic"/><img class="platform"/></div><p class="text"></p><div class="interact"><img class="heart" src="img/icn_btn_like.png"/><img class="active-heart" style="display:none;" src="img/icn_btn_like_active.png"/><p class="number"></p><img class="message" src="img/icn_btn_message.png"/><p class="number_m"></p><img class="share" src="img/icn_sm_btn_share.png"></img></div></div></div></li>');
		e.attr("id","po0");
		var loading = $('<li><div class="post"><img class="loading" src="img/main_empty.gif"/></div></li>');
		loading.insertAfter(".top");
		render[data.type+2](e,data.info,pro,loading);
};

var Comrender = (data,post)=>{
	$.each(data.comments, (index, value)=>{
		var e = $('<div class="reply"><div class="replyhead"></div><p class="replyname"></p><p class="replytime"></p><br><div class="replytext"></div></div><br>');
		e.attr("id","com"+index);
		if(index==data.comments.length-1){
			e.find(".replytext").addClass("replytextlast").removeClass("replytext");
		}
		render[post.type+4](e,value);
	});
};
