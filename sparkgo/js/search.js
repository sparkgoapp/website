$(document).ready(function(){
                  if(window.localStorage.fromwhere == "landing"){
                    $(".topbar .search input").val(window.localStorage.keyword);
                    $.ajax({
                           url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/login.njs',
                           method: 'POST',
                           data:{m_u:$(".topbar .search input").val()},
                           success: function(data){
						   console.log(data);
							if(data.length == 0){
                            	$('#fail').html("Sorry, there is nothing matched");
							}
                           $.each(data,function(index, value){
                                  var e = $('<div class="item"><img class="head"></img><span class="name">網紅帳號或是名字</span><span class="text">網紅名字或是壹些其他的敘述</span><img class="youtube" src="img/badge_youtube.png"/><img class="fb" src="img/badge_fb.png"/><hr class="bottomline"></div>');
                                  render(e,value);
                                  });
                           
                           },
                           error: function(){
                           $('#fail').html("Sorry, there is nothing matched");
                           }
                           
                           });
                  localStorage.removeItem("keyword");
                  localStorage.removeItem("fromwhere");
                  };

$('.search').keypress(function (event) {
                     if (event.which == 13) {
                     $.ajax({
                            url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/login.njs',
                            method: 'POST',
                            data:{m_u:$(".topbar .search input").val()},
                            success: function(data){
							console.log(data);
							if(data.length == 0){
                            	$('#fail').html("Sorry, there is nothing matched");
							}
                            $.each(data,function(index, value){
                                   var e = $('<div class="item"><img class="head"></img><span class="name">網紅帳號或是名字</span><span class="text">網紅名字或是壹些其他的敘述</span><img class="youtube" src="img/badge_youtube.png"/><img class="fb" src="img/badge_fb.png"/><hr class="bottomline"></div>');
                                   render(e,value);
                                   });
                            
                            },
                            error: function(){
                            $('#fail').html("Sorry, there is nothing matched");
                            }
                            
                            });
                     }
                     localStorage.removeItem("keyword");
                     localStorage.removeItem("fromwhere");

                    });
                  });
                  
$('.exit').click(function (event) {
                        $(".topbar .search input").val("搜尋Sparkgo");
                 }
var render = (DOM, info) => {
                DOM.find(".head").attr("src",info.image);
				DOM.find(".name").html(info.nickname);
                DOM.find(".text").html(info.nickname);
				DOM.insertAfter(".middle");
}



