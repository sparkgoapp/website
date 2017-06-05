$(document).ready(function(){
                  $("li").click(function(){
                                var newurl = "1m-00-singlePost.html";
                                var obj = parseInt($(this).id.substring(2));
                                window.localStorage.setItem(page,posts[obj]);
                                document.location.href = newurl;
                  })
                  
});

$(document).ready(function(){
                  $('.heart').click(function(){
                                    $('.heart').css("display","none");
                                    $('.active-heart').css("display","block");
                  });
                  $('.active-heart').click(function(){
                                    $('.heart').css("display","block");
                                    $('.active-heart').css("display","none");
                  });
});
