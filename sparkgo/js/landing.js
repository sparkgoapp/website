function tool() {
    $('.heart').click(function(){
                      $(this).css("display","none");
                      $(this).parent().find(".active-heart").css("display","block");
					  like(posts[parseInt($(this).attr("id").substring(2))], 1);
                      });
    $('.active-heart').click(function(){
                             $(this).css("display","none");
                             $(this).parent().find('.heart').css("display","block");
					  		 like(posts[parseInt($(this).attr("id").substring(2))], 0);
                             });
    $(".mainpic, .text").click(function(e){
                  var newurl = "1m-00-singlePost.html";
                  var obj = parseInt($(this).parents("li").attr("id").substring(2));
                  var list=$(".heart,.active-heart");
                  
                  if(!list.is(e.target) && list.has(e.target).length === 0){
                    var pos = JSON.stringify(posts[obj]);
                    window.localStorage.setItem("page",pos);
                    document.location.href = newurl;
                  }
    })
    $(".circle .name").click(function(e){
                               var newurl = "profilePage.html";
                               document.location.href = newurl;
                               })
    $(".share").click(function(e){
                                $('.sharing').css("display","block");
                             })
    

}
