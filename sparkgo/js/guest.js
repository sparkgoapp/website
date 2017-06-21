$(document).ready(()=>{

	/*$('.search').click(function() {
		window.localStorage.fromwhere = "2tmain";
		document.location.href = "search-result.html";
	});*/

	if(window.localStorage.getItem("done")){
		$('.missionjewel').html('已加入任務');
	}

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
	$(".purple, .missionjewel").click(()=>{
		if(window.localStorage.getItem("done")) return;
		$.ajax({
			url: "https://luffy.ee.ncku.edu.tw/~fad11204/test/js/mission.njs",
			method: 'POST',
			data: {type: 1},
			success: (data)=>{
				console.log(data);
      			//var per = (data.per>10)?10;
				//per = (per*10*0.9) + "%";
				//$('.orangeline').animate({width: per});
    			//$('.percent').html("集氣進度 "+per*10+"%");
    			//setTimeout(()=>{$.ajax(this)},600);
			}
		});
		$('.missionjewel').html('已加入任務');
		window.localStorage.setItem("done","1");
	});
});
