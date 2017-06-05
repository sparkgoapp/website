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
var posts = [];

$(document).ready(()=>{
	go = ()=>{
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/api.njs',
			method: 'POST',
			data: {type:0, sub:["000","001","002"]},
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

	go();
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
	$.each(posts,function(index, value){
		var e = $('<li><div><div class="circle"></div><p class="name"></p><img class="thunder" src="img/icn_btn_order.png"/><p class="time"></p><p class="date"></p></div><div class="pic"><div class="middle"><img class="mainpic"/><img class="heart" src="img/icn_btn_like.png"/><img class="active-heart" src="img/icn_btn_like_active.png"/><img class="platform"/><p class="number"></p></div><img class="message" src="img/icn_btn_message.png"/><p class="text"></p></div></li>');
		e.attr("id","po"+String(index));
		render[value.type](e,value.info,data[value.info.index].pro);
		$('.title ul').append(e);
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
