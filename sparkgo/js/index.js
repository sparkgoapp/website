$(document).ready(()=>{
	var code;
	comment = ()=>{
		$.ajax({
			url: "https://luffy.ee.ncku.edu.tw/~fad11204/test/js/yt.njs",
			method: 'GET',
			data: { code: code },
			success: function(data){
				console.log(data);
				//window.location = "landing.html";
			}
		});
	};
	if(window.location.href!="https://luffy.ee.ncku.edu.tw/~fad11204/sparkgo"&&window.location.href!="https://luffy.ee.ncku.edu.tw/~fad11204/sparkgo/"){
		code = window.location.href.split("?")[1].split("&")[1].substring(5);
		comment();
	}else{
		window.location = "landing.html";
	}
});

