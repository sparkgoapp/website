#!/usr/local/bin/node
var fs = require('fs');
var qs = require('querystring');
var param = qs.parse(fs.readFileSync('/dev/stdin','utf-8'));
//param = {type:0,sub:["000","001"]};

console.log('Content-type:application/json; charset=utf-8\n');
//console.log(JSON.stringify(param));

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient , assert = require('assert');
var url = 'mongodb://grouph:19200118tq@localhost/uidd2017_groupH';

MongoClient.connect(url, function(err, db) {
    if(err){
        console.log("Connection failed");
	}else{
    	var collection = db.collection('sparkgoose');
		var query = (param.type == 1)?{SID : param.SID}:{SID : {"$in":param["sub[]"]}};
		collection.find(query)
		.toArray(
			function(err,docs){
				if(err){
					console.log(JSON.stringify({error:true}));
				}
				else{
					docs.forEach((element, index, array)=>{
						delete element.SID;
						delete element["_id"];
					});
					console.log(JSON.stringify(docs));
				}
			}
		);
    }
    db.close();
});

