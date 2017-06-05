function tool() {
    $('.heart').click(function(){
                      $(this).css("display","none");
                      $(this).parent().find(".active-heart").css("display","block");
                      });
    $('.active-heart').click(function(){
                             $('.heart').css("display","block");
                             $('.active-heart').css("display","none");
                             });
    $("li").click(function(e){
                  var newurl = "1m-00-singlePost.html";
                  var obj = parseInt($(this).attr("id").substring(2));
                  console.log(e.target);
                  window.localStorage.setItem("page",JSON.stringify(posts[obj]));
                  document.location.href = newurl;
                  })
}
