$(document).ready(function(){
  var p = 0;
  $('.followbutton').click(function(){
    var spark=window.localStorage.getItem('SID_');
    var me=window.localStorage.getItem('SID');
    $.ajax({
      url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/njs/sub.njs',
      method:'POST',
      data: {  type : 1, SID : me, target : spark }
    });

    if(p == 0){
      $(this).css({"border":"solid 1px #fe3824","color":"#fe3824"});
      $(this).html("已追蹤");
      var count = parseInt($('.follownumber').html()) + 1 ;
      $('.follownumber').html(count);
      p = 1;
    }
    else{
      $(this).css({"border":"solid 1px orange","color":"orange"});
      $(this).html("追蹤");
      var count = parseInt($('.follownumber').html()) - 1 ;
      $('.follownumber').html(count);
      p = 0;
    }
  });
  var c = 0;
  $('.missionjewel,.purple').click(function(){
    if(c == 0){
      var per = 100*($('.orangeline').width()/$('.grayline').width()+0.1)+"%";
      $('.orangeline').animate({width: per});
      $('.percent').html("集氣進度 70%");
      $('.purple').remove();
      $('.missionjewel').html("已加入任務");
      c = 1 ;
    }
    else{}
                   
  });

  $('.back').click(function(){
    window.history.back()
  });
});



