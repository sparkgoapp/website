var posts = [];

$(document).ready(function(){
    var profile=JSON.parse(window.localStorage.profile);
    console.log(profile);
    $('.head').css('background-image','url('+profile.image+')');
    $('.head').css('background-size','cover');
    $('.topname').html(profile.nickname);
    //$('.smallname').html(profile.nickname);
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/api.njs',
			method: 'POST',
			data: {type:1, SID:profile.SID},
			success: function(data){
				a=data;			
				console.log(data);
				Datarender(data);
			},
			error: function(xmlhttprequest, textstatus, message){
				console.log(xmlhttprequest);
				console.log(textstatus);
				console.log(message);
			}
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

function tool() {
    $('.heart').click(function(){
                      $(this).css("display","none");
                      $(this).parent().find(".active-heart").css("display","block");
					  like($(this).parents("li"), posts[parseInt($(this).parents("li").attr("id").substring(2))], 1);
                      });
    $('.active-heart').click(function(){
                             $(this).css("display","none");
                             $(this).parent().find('.heart').css("display","block");
					  		 like($(this).parents("li"), posts[parseInt($(this).parents("li").attr("id").substring(2))], 0);
                             });
	var path = window.location.pathname;
    	$('.mainpic, .text').click(function(e){
                  var newurl = "1m-00-singlePost.html";
                  var obj = parseInt($(this).parents("li").attr("id").substring(2));
                  var list=$(".heart,.active-heart");
                  
                  if(!list.is(e.target) && list.has(e.target).length === 0){
                    var pos = JSON.stringify(posts[obj]);
					var pro = JSON.stringify(a[posts[obj].info.index].pro);
                    window.localStorage.setItem("page",pos);
					window.localStorage.setItem("postpro",pro);
                    document.location.href = newurl;
                  }
    	})
    $('.share').click(function(e){
                                //$('.sharebox').fadeIn("fast");
                                $('.sharing').animate({
									bottom: '60vw',
									opacity: '1'
								});
                                $('.cancel').animate({
									bottom: '44.9vw',
									opacity: '1'
								});
                             })
    $('.cancel').click(function(e){
                                //$('.sharebox').fadeOut("fast");
                                $('.sharing').animate({
									bottom: '-50vw',
									opacity: '0'
								});
                                $('.cancel').animate({
									bottom: '-65.1vw',
									opacity: '0'
								});
                             })
}
