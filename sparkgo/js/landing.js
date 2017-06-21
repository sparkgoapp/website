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
	if(path.substring(path.indexOf("sparkgo/")+8)=="landing.html"){
    	$('.mainpic, .text').click(function(e){
                  var newurl = "1m-00-singlePost.html";
                  var obj = parseInt($(this).parents("li").attr("id").substring(2));
                  var list=$(".heart,.active-heart");
                  
                  if(!list.is(e.target) && list.has(e.target).length === 0){
                    var pos = JSON.stringify(posts[obj]);
					var pro = JSON.stringify(a[posts[obj].info.index].pro);
					window.localStorage.setItem("scroll",$(this).parents("li").attr("id"));
                    window.localStorage.setItem("page",pos);
					window.localStorage.setItem("postpro",pro);
                    document.location.href = newurl;
                  }
    	})
	}
    $('.circle, .name, .head').click(function(e){
                               var newurl = "profilePage.html";
							   /*var SID_o = (path.substring(path.indexOf("sparkgo/")+8)=="landing.html")?a[posts[parseInt($(this).parents("li").attr("id").substring(2))].info.index].pro.SID:
							   JSON.parse(window.localStorage.getItem("postpro")).SID;
							   window.localStorage.setItem("SID_",SID_o);*/
							   var pro_o = (path.substring(path.indexOf("sparkgo/")+8)=="landing.html")?a[posts[parseInt($(this).parents("li").attr("id").substring(2))].info.index].pro:
							   JSON.parse(window.localStorage.getItem("postpro"));
							   window.localStorage.setItem("profile_",JSON.stringify(pro_o));
                               document.location.href = newurl;
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
    $('.search').keypress(function (event) {
                          if (event.which == 13) {
                                window.localStorage.keyword = $('#keyword').val();
                                window.localStorage.fromwhere = "landing";
                                document.location.href = "search-result.html";
                          }
                          });
    

}
