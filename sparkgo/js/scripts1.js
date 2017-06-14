$(document).ready(function(){
	$("button").click(function(){
  var sec=$('input[name=pw]').val();                                                                        
      sec=hex_sha512(sec);
		$.ajax({
    		url:'https://luffy,ee,ncku.edu.tw/~fad11204/test/js/log.njs',
		    method: 'POST',
	    	data:{m_u:$('input[name=m_u]').val(),pw:sec},
		    error: function(err){
	    		console.log(err);
    		},
		    success: (data)=>{
    	    	console.log(data/*=JSON.parse(data)*/);
				//console.log(sortres(data));
            window.localStorage.setItem("SID",data);
            window.localStorage.setItem("link","00");
            window.location = "linksns.html";
	    	}
	    });
	});
});

var sortres = (A) => {
	keyword = $('input[name=m_u]').val();
	A.sort((a,b)=>{
		console.log([a["mail"].search(keyword),b["mail"].search(keyword)]);
		if(a["mail"].search(keyword) == b["mail"].search(keyword)){
			return ( a["mail"].length > b["mail"].length );
		}
		return ( a["mail"].search(keyword) > b["mail"].search(keyword) );
	});
	return A;
};
