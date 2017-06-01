#!/usr/local/bin/node
var secret = require('../../secret/FB.json')['secret'];
var unirest = require('unirest');

var appid = '185923091929013';
var post = [];
var sub = [];
var result = {};
var YTpost = [];
var eachpost = [];
var ready = false;

var cid='185923091929013';
console.log('Content-type: application/json; charset=utf-8\n');
unirest.get('https://graph.facebook.com/oauth/access_token')
.headers({'Accept':'application/json', 'Content-type':'application/json'})
.query({'client_id':cid, 'client_secret':secret, 'grant_type':'client_credentials'})
.end((response)=>{
	if (response && !response.body.error){
		//console.log(JSON.stringify(response.body));
		getId(response.body.access_token);
		IDOK("https://www.youtube.com/channel/UCIdhd_1spj49unBWx1fjS2A");	
    }else{
		console.log(JSON.stringify({error:true}));
	}
});

function getId(access){
	unirest.get('https://graph.facebook.com/'+'https://www.facebook.com/ShenJieShiSaint')
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({'access_token':access})
	.end((response)=>{
		if (response && !response.body.error){
			//console.log(JSON.stringify(response.body));
			sub.push({nickname: response.body.name, SID: "003", image:("https://graph.facebook.com/"+response.body.id+"/picture")});
			result.sub = sub;
			getPost(response.body.id,access);
        }else{
			console.log(JSON.stringify({error:true}));
		}
	});
  }

function getPost(id,access){
	unirest.get('https://graph.facebook.com/'+id+'/feed')
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({'access_token':access})
	.end((response)=>{
		if (response && !response.body.error){
			//console.log(JSON.stringify(response.body));
          	var len=response.body.data.length;
			for(var i=0;i<len;i++){
				eachpost.push(0);
			}
          	for(var i=0;i<len;i++){
			  	var tempost = {type:0,info:{}};
			  	post.push(tempost);
				post[i].info.name = sub[0].nickname;
				post[i].info.picture = sub[0].image;
            	if(response.body.data[i].message){
              		var mes=response.body.data[i].message;
					post[i].info.time = response.body.data[i].created_time;
              		//document.getElementById('status').innerHTML+="<br>"+mes.replace(/\x0a/g,"<br>");
			  		post[i].info.message = mes.replace(/\x0a/g,"<br>");
        	    }
    	        //$('#status').append("<img id='img"+i+"'/>");
	            //$('#status').append("<iframe id='video"+i+"'/></iframe>");
            	var pid=response.body.data[i].id;
				post[i].info.pid = pid;
            	FBImg(pid,i,access,len-1);
          	}
        }else{
			console.log(JSON.stringify({error:true}));
		}
	});
}

function FBImg(id,i,access,end) {
	unirest.get("https://graph.facebook.com/"+id+"/attachments")
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({'access_token':access})
	.end((response)=>{
		if (response && !response.body.error){
			var res = response.body;
			//console.log(JSON.stringify(res));
			if(res.data.length){
				if(!res.data[0].subattachments){
					post[i].info.type = res.data[0].type;
					post[i].info.media = res.data[0].media.image.src;
					post[i].info.url = res.data[0].url;
				}
			}
			/*if(i == end){
				result.post = post;
				//result.each = eachpost;
				console.log(JSON.stringify(result));
				ready = true;
			}*/
			eachpost[i]=1;
			if(eachpost.indexOf(0)==-1){
				result.post = post;
				console.log(JSON.stringify(result));
			}
        }else{
			console.log(JSON.stringify({error:true}));
		}
	});
}

function IDOK (url) {
	var ID;
    if(url.search("/user/")!=-1){
		STRIND = url.search("/user/");
        ID = url.substring(STRIND+6);
        /*$.getJSON("https://www.googleapis.com/youtube/v3/channels",
            {"key":"AIzaSyCBpPMw-BLYTcDg3nfPxnCKrtDxTI18Hxc",
            "forUsername":ID,
            "part":"id"},
            function(data){
                //console.log(data);
                ID = data["items"][0]["id"];
                console.log(ID);
				search(ID);
            }
		);*/	
    }else if(url.search("/channel/")==-1){
        //alert("The url isn't right");
        return;
    }else{
		ID = url.substring(url.search("/channel/")+9);
		search(ID);
	}
}

function search(ID) {
	unirest.get("https://www.googleapis.com/youtube/v3/search")
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({"key":"AIzaSyCBpPMw-BLYTcDg3nfPxnCKrtDxTI18Hxc","channelId":ID,"part":"snippet","order":"date","maxResults":"20"})
	.end((response)=>{
		//console.log(JSON.stringify(response.body));
		var len = response.body.items.length;
		for(var i=0;i<len;i++){
			var item = response.body.items[i];
			var tempost = {type:1, info:{videoId: item.id.videoId, title: item.snippet.title, time: item.snippet.publishedAt}};
			YTpost.push(tempost);
			if(i == len-1){
				result.YT = YTpost;
			}
		}
	});
}
