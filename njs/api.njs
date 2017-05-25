#!/usr/local/bin/node

var fs = require('fs');
var qs = require('querystring');
var param = qs.parse(fs.readFileSync('/dev/stdin', 'utf-8'));
var secret = require('../../secret/FB.json')['secret'];
var unirest = require('unirest');

var appid = '185923091929013';
var post = [];

  function Return(a,i,id,end){
    if(a.data[0].type.search("video")!=-1){
    	//$('<br>').insertBefore("#video"+i+"");
    	//$('#video'+i).attr('src',vi[i]);
    	//document.getElementById("video"+i).contentWindow.document.getElementsByTagName('video')[0].style.width="100%";
    	//document.getElementById("video"+i).onload = function(){console.log(document.getElementById("video"+i).contentDocument)};
    	//console.log(d);
		post[i].info.video = a.data[0].url;
    }
    else if(a.data[0].type=="photo"){
    	//$('<br>').insertBefore("#img"+i+"");
    	//$('#img'+i+"").attr("src","http://graph.facebook.com/"+im[i]+"/picture");
		//a.data[0].media.image.src   attachments
		post[i].info.image = a.data[0].url;
    }
	if(i == end){
		console.log(JSON.stringify(post));
	}
    /*if(!vi[i]){
    	$("#video"+i+"").remove();
	}*/
  }

  function FBImg(id,i,access,end) {
	unirest.get("https://graph.facebook.com/"+id+"/attachments")
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({'access_token':access})
	.end((response)=>{
		var res = response.body;
		if(res.data.length){
			post[i].info.type = res.data[0].type;
			post[i].info.media = res.data[0].media.image.src;
			post[i].info.url = res.data[0].url;
		}
		if(i == end){
			console.log(JSON.stringify(post));	
		}
	});
  }
 
    var cid='185923091929013';
	console.log('Content-type: application/json; charset=utf-8\n');
	unirest.get('https://graph.facebook.com/oauth/access_token')
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({'client_id':cid, 'client_secret':secret, 'grant_type':'client_credentials'})
	.end((response)=>{
		getId(response.body.access_token);
	});

  function getId(access){
	unirest.get('https://graph.facebook.com/'+'https://www.facebook.com/ShenJieShiSaint')
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({'access_token':access})
	.end((response)=>{
		getPost(response.body.id,access);
	});
  }

  function getPost(id,access){
	unirest.get('https://graph.facebook.com/'+id+'/feed')
	.headers({'Accept':'application/json', 'Content-type':'application/json'})
	.query({'access_token':access, 'date_format':'U'})
	.end((response)=>{
		if (response && !response.body.error){
          	var len=response.body.data.length;
          	//console.log(JSON.stringify(response));
          	for(var i=0;i<len;i++){
			  	var tempost = {type:0,info:{}};
			  	post.push(tempost);
            	if(response.body.data[i].message){
              		var mes=response.body.data[i].message;
              		//document.getElementById('status').innerHTML+="<br>"+mes.replace(/\x0a/g,"<br>");
			  		post[i].info.message = "<br>"+mes.replace(/\x0a/g,"<br>");
        	    }
    	        //$('#status').append("<img id='img"+i+"'/>");
	            //$('#status').append("<iframe id='video"+i+"'/></iframe>");
            	var pid=response.body.data[i].id;
				post[i].info.pid = pid;
            	FBImg(pid,i,access,len-1);
          	}
        }
	});
  }
