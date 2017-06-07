function tool() {
    $('.heart').click(function(){
                      $(this).css("display","none");
                      $(this).parent().find(".active-heart").css("display","block");
                      });
    $('.active-heart').click(function(){
                             $('.heart').css("display","block");
                             $('.active-heart').css("display","none");
                             });
    $(".mainpic, .text, .message").click(function(e){
                  var newurl = "1m-00-singlePost.html";
                  var obj = parseInt($(this).parents("li").attr("id").substring(2));
                  var list=$(".heart,.active-heart");
                  
                  if(!list.is(e.target) && list.has(e.target).length === 0){
                    var pos = JSON.stringify(posts[obj]);
                    window.localStorage.setItem("page",pos);
                    document.location.href = newurl;
                  }
    })
}
