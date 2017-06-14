$(document).ready(function(){
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
            	window.localStorage.setItem("SID",data);
	            window.localStorage.setItem("link","00");
    	        window.location = "linksns.html";
	    	}
	    });
	});
});

