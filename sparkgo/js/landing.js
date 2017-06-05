var item = { type : 0, SID : string };

$.ajax({
        type:'POST',
        accepts:'json',
        url:'njs/sub.njs',
        data:{"type":item.type,"SID":item.SID},
        success: function(sub){
                               $.ajax({
                                      type:'POST',
                                      accepts:'json',
                                      url:'njs/api.njs',
                                      data : {"type": item.type,"sub" : sub },
                                      success: function(data){
                                                        $.each(data, function(index,item){
                                                                        var DOM = $("<li><div><div class="circle"></div><p class="name"></p><img class="thunder"/><p class="time"></p><p class="date"></p></div><div class="pic"><div class="middle"><img class="mainpic"/><img class="heart"/><img class="platform"/><p class="number"></p></div><img class="message"/><p class="text"></p></div></li>");
                                                                        var ok=render[item.type](DOM, item.info);
                                                               });
                                      },
                                      error: function(){
                                                        console.log("feed fails");
                                      }
                                      
                               }); 
        },
        error: function(){
                          console.log("sub fails");
        }
});

$('.heart').mouseover(function(){
                            $('div.middle img:eq(0)').css("display","none");
                            $('div.middle img:eq(1)').css("display","block");
                            });


$('.heart').mouseout(function(){
                           $('div.middle img:eq(0)').css("display","block");
                           $('div.middle img:eq(1)').css("display","none");
                           });
