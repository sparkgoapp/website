$(document).ready(function() {
  $("button").click(()=> {
    var sec=$('input[name=pw]').val();
    sec=hex_sha512(sec);
    $.ajax({
      url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/post1.njs',
      method: 'POST',
      data:{mail:$('input[name=mail]').val(),nick:$('input[name=nick]').val(),user:$('input[name=user]').val(),pw:sec},
      error: function(err){
        console.log(err);
        $("button").html("error");
      },

      success: (data)=>{
        console.log(data);
        $("button").html(data);
        setTimeout(() => location.href='login.html', 1000)
      }
      
    });

    $("button").html("loading");
    
  });

});
