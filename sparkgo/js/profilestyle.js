var posts = [];

$(document).ready(function(){
  var p = 0 ;
  var pro_ = JSON.parse(window.localStorage.getItem("profile_"));
  $('.head').css('background-image','url('+pro_.image+')');
  $('.head').css('background-size','cover');
  $('.topname').html(pro_.nickname);
  //$('.smallname').html(pro_.nickname);
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/api.njs',
			method: 'POST',
			data: {type:1, SID:pro_.SID},
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
		$.ajax({
			url: 'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/sub.njs',
			method: 'POST',
			data: {type:2, SID: window.localStorage.getItem('SID'), target: pro_.SID},
			success: function(data){
				console.log(data);
				if(data.find == 1){
					$('.followbutton').css({"border":"solid 1px #fe3824","color":"#fe3824"});
					$('.followbutton').html("已追蹤");
					var count = parseInt($('.fannumber').html()) + 1 ;
					$('.fannumber').html(count);
					p = 1;
				}
			},
			error: function(xmlhttprequest, textstatus, message){
				console.log(xmlhttprequest);
				console.log(textstatus);
				console.log(message);
			}
		});
  $('.followbutton').click(function(){
    var spark=pro_.SID;;
    var me=window.localStorage.getItem('SID');
    $.ajax({
      url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/sub.njs',
      method:'POST',
      data: {  type : 1, SID : me, target : spark },
	  success: (data)=>{
	  	console.log(data);
	  },
	  error: (err)=>{
	  	console.log(err);
	  }
    });

    if(p == 0){
      $(this).css({"border":"solid 1px #fe3824","color":"#fe3824"});
      $(this).html("已追蹤");
      var count = parseInt($('.fannumber').html()) + 1 ;
      $('.fannumber').html(count);
      p = 1;
    }
    else{
      $(this).css({"border":"solid 1px orange","color":"orange"});
      $(this).html("追蹤");
      var count = parseInt($('.fannumber').html()) - 1 ;
      $('.fannumber').html(count);
      p = 0;
    }
  });
  var c = 0;
  $('.missionjewel,.purple').click(function(){
    if(c == 0){
      var per = 100*($('.orangeline').width()/$('.grayline').width()+0.1)+"%";
      $('.orangeline').animate({width: per});
      $('.percent').html("集氣進度 70%");
      $('.purple').remove();
      $('.missionjewel').html("已加入任務");
      c = 1 ;
    }
    else{}
                   
  });

  $('.back').click(function(){
    window.history.back()
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
