var code;
var qstr;
$(document).ready(()=>{
	comment = (FY)=>{
		var U = (FY)?"https://luffy.ee.ncku.edu.tw/~fad11204/test/js/fb.njs":"https://luffy.ee.ncku.edu.tw/~fad11204/test/js/yt.njs";
		$.ajax({
			url: U,
			method: 'GET',
			data: { code: code, SID: window.localStorage.getItem("SID") },
			success: function(data){
				console.log(data);
				var tmp = window.localStorage.getItem("link");
				if(FY){
					tmp = tmp[0] + "1";
				}else{
					tmp = "1" + tmp[1];
				}
				console.log(tmp);
				window.localStorage.setItem("link",tmp);
				window.location = "linksns.html";
			}
		});
	};
	if(window.location.href!="https://luffy.ee.ncku.edu.tw/~fad11204/sparkgo"&&window.location.href!="https://luffy.ee.ncku.edu.tw/~fad11204/sparkgo/"){	
		qstr = window.location.href.split("?")[1];
		qstr = parseQuery(qstr);
		if(qstr.state == "YT"){
			code = qstr.code;
			comment(0);
		}else if(qstr.state == "FB#_"){
			code = qstr.code;
			comment(1);
		}
	}else{
		window.location = "login.html";
	}
});

function parseQuery(qstr) {
    var query = {};
    var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
    for (var i = 0; i < a.length; i++) {
        var b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
    }
    return query;
}
