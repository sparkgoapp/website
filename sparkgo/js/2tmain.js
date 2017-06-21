$(document).ready(()=>{

	$('.search').click(function() {
		window.localStorage.fromwhere = "2tmain";
		document.location.href = "search-result.html";
	});
	setInterval(function(){
	$.ajax({
		url: "https://luffy.ee.ncku.edu.tw/~fad11204/test/js/mission.njs",
		method: 'POST',
		data: {type: 0},
		success: (data)=>{
      		var per = data.per;
			if(per>10){
				per = 10;
			}
			var per_ = (per*10*0.9) + "%";
			$('.orangeline').animate({width: per_});
			$('.badge').animate({left: 3 + per*10*0.9 + "vw"});
    		$('.percent').html("集氣進度 "+per*10+"%");
		}
	});
	},1000);
});
