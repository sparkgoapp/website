$(document).ready(function(){
                  if(window.localStorage.fromwhere == "landing"){
                    $("#keyword").val() = window.localStorage.keyword;
                    $.ajax({
                           url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/login.njs',
                           method: 'POST',
                           data:{m_u:$("#keyword").val()},
                           success: function(data){
                           $.each(data,function(index, value){
                                  var e = '<div class="item"><img class="head"></img><span class="name">網紅帳號或是名字</span><span class="text">網紅名字或是壹些其他的敘述</span><img class="youtube" src="img/badge_youtube.png"/><img class="fb" src="img/badge_fb.png"/><hr class="bottomline"></div>';
                                  render(e,value,index);
                                  });
                           
                           },
                           error: function(){
                           $('#fail').html("Sorry, there is nothing matched");
                           }
                           
                           });
                  });

$('.search').keypress(function (event) {
                     if (event.which == 13) {
                     $.ajax({
                            url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/login.njs',
                            method: 'POST',
                            data:{m_u:$("#keyword").val()},
                            success: function(data){
                            $.each(data,function(index, value){
                                   var e = '<div class="item"><img class="head"></img><span class="name">網紅帳號或是名字</span><span class="text">網紅名字或是壹些其他的敘述</span><img class="youtube" src="img/badge_youtube.png"/><img class="fb" src="img/badge_fb.png"/><hr class="bottomline"></div>';
                                   render(e,value,index);
                                   });
                            
                            },
                            error: function(){
                            $('#fail').html("Sorry, there is nothing matched");
                            }
                            
                            });
                     });
                     }

});

var render = (DOM, info,i) => {
                DOM.find(".head").attr(info[i].image);
                DOM.find(".name").html(info[i].nickname);
}



