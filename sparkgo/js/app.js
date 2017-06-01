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

var go;

$(document).ready(()=>{
	go = ()=>{
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/api.njs',
			method: 'POST',
			dataType: 'json',
			trycount: 0,
			trylimit: 9,
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
				if(textstatus == "parsererror"){
					if(this.trycount < this.trylimit){
						this.trycount++;
						$.ajax(this);
					}
				}
			}
		});
	};
	go();
});
var Datarender = (data)=>{
	data.post = data.post.concat(data.YT);
	$.each(data.post,function(index, value){
		var e = $('<li><div><div class="circle"></div><p class="name"></p><img class="thunder" src="img/icn_btn_order.png"/><p class="time"></p><p class="date"></p></div><div class="pic"><div class="middle"><img class="mainpic"/><img class="heart" src="img/icn_btn_like.png"/><img class="platform" src="img/badge_ig.png"/><p class="number"></p></div><img class="message" src="img/icn_btn_message.png"/><p class="text"></p></div></li>');
		value.info.name = data.sub[0].nickname;
		value.info.picture = data.sub[0].image;
		render[value.type](e,value.info);
		//e.insertAfter('.title ul');
		$('.title ul').append(e);
	});
}
