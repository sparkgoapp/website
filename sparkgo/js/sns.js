$(document).ready(()=>{
	var Lstate = window.localStorage.getItem("link");
	var FBed = false, YTed = false;
	if(Lstate[1]=='1'){
		FBed = true;
		$('#FB').hide();
	}
	if(Lstate[0]=='1'){
		YTed = true;
		$("#YT").hide();
	}
	if(FBed&&YTed){
		window.location = "landing.html";
	}
	$("#FB").click(()=>{
		window.location = "https://www.facebook.com/v2.9/dialog/oauth?client_id=185923091929013&redirect_uri=https://luffy.ee.ncku.edu.tw/~fad11204/sparkgo&scope=publish_actions&state=FB";
	});
	$("#YT").click(()=>{
		window.location = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/youtube.force-ssl&state=YT&redirect_uri=https://luffy.ee.ncku.edu.tw/~fad11204/sparkgo&access_type=offline&response_type=code&client_id=604180307453-k2ao98ujkl9ohk1ueupelph44vi5g3r0.apps.googleusercontent.com&include_granted_scopes=true&authuser=1&prompt=consent";
	});
});
