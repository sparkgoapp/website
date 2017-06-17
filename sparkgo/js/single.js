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

$(document).ready(()=>{
	var post = JSON.parse(window.localStorage.getItem("page"));
	$(document).on('FBready',Datarender(post));
	FB_load(document, 'script', 'facebook-jssdk');
});
var Datarender = (data)=>{
		var e = $('<li><div class="post"><div><div class="circle"></div><p class="name"></p><p class="time"></p><p class="date"></p></div><div class="pic"><div class="middle"><img class="mainpic"/><img class="platform"/></div><p class="text"></p><div class="interact"><img class="heart" src="img/icn_btn_like.png"/><img class="active-heart" style="display:none;" src="img/icn_btn_like_active.png"/><p class="number"></p><img class="message" src="img/icn_btn_message.png"/><p class="number_m"></p><img class="share" src="img/icn_sm_btn_share.png"></img></div></div></div></li>');
		var loading = $('<li><div class="post"><img class="loading" src="img/main_empty.gif"/></div></li>');
		render[data.type+2](e,data.info,JSON.parse(window.localStorage.getItem("postpro")),loading);
		loading.insertAfter(".top");
};
