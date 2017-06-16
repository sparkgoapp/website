#!/usr/local/bin/node
	var mongodb = require('mongodb');
	var MongoClient = mongodb.MongoClient , assert = require('assert');
	var url = 'mongodb://grouph:19200118tq@localhost/uidd2017_groupH';

	MongoClient.connect(url, function(err, db) {
    	if(err){
        	console.log("Connection failed");
		}else{
    		var collection = db.collection('sparkret');
			collection.find({SID: "999"})
			.toArray(function(err, docs){
				if(err){
					console.log(JSON.stringify({error:"db error"}));
				}else{
					if(docs.length == 0){
						console.log("0");
					}else{
						console.log(docs[0]);
					}
				}
			});
	    }
    	db.close();
	});
