$.ajax({
       url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/login.njs',
       method: 'POST',
       data:{m_u:keyword},
       success: function(data){
                        $.each(str.items, function(index,item){
                               $().html();
                       });

       },
       error: function(){
                         $().html("Sorry, there is nothing matched");
       }

       });
