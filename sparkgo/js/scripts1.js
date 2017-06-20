$(document).ready(function(){
	if(window.localStorage.getItem("SID")){
		window.location = "2tmain.html";
	}
	$("button").click(function(){
  var sec=$('input[name=pw]').val();                                                                        
      sec=hex_sha512(sec);
		$.ajax({
    		url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/log.njs',
		    method: 'POST',
	    	data:{m_u:$('input[name=m_u]').val(),pw:sec},
		    error: function(err){
	    		console.log(err);
    		},
		    success: (data)=>{
    	    	console.log(data);
				if(!data.SID) {
					$('#msg').html(data.error);
					return;
				};
            	window.localStorage.setItem("SID",data.SID);
	            window.localStorage.setItem("link","00");
				check_token(data.SID);
	    	}
	    });
	});
	$('input[name=pw]').keypress(()=>{
		if(event.keyCode==13){
			$("button").click();
		}
	});
});

function check_token(SID){
	$.ajax({
		url:'https://luffy.ee.ncku.edu.tw/~fad11204/test/js/check.njs',
		method:'POST',
		data:{SID:SID},
		error: function(err){
			console.log(err);
		},
		success: (data)=>{
			console.log(data);
			if(data.check){
				window.location = "2tmain.html";
			}else{
				window.localStorage.setItem("link",data.link);
				window.location = "linksns.html";
			}
		}
	});
}
