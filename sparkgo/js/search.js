$(document).ready(function(){
                  if(window.localStorage.fromwhere == "landing"){
                    $("#keyword").val() = window.localStorage.keyword;
                  }
                  });

$('.search').keydown(function() {
                     $.ajax({
                            url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/login.njs',
                            method: 'POST',
                            data:{m_u:$("#keyword").val()},
                            success: function(data){
                            $.each(str.items, function(index,item){
                                   $().html();
                                   });
                            
                            },
                            error: function(){
                            $().html("Sorry, there is nothing matched");
                            }
                            
                            });
                     });
