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
    $('.circle .name').click(function(e){
                               var newurl = "profilePage.html";
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
    $('.search').keydown(function() {
                                window.localStorage.setItem("keyword;
                                                            
                                                            window.localStorage = {
                                                                "keyword":
                                                            }
                                document.location.href = "search.html";
                             });
    

}
