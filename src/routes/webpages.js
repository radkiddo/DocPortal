/* DocPortal - Doksend - 2013 - http://doksend.com */

var fs = require('fs'),
	http = require('http'),
	client = require('./client.js');

readFile = function(fn) {
	try
	{
		return fs.readFile(__dirname + fn, 'utf8', function(err, text){
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.encrypt = function(req, res) {
	try
	{
		var txt = req.param('txt');	
		var result = client.rsaEncrypt([17], [148299941,57683965,5687041], txt);
	
		console.log('ServerModule[webpages.kChUTqbUjO2DtKgXLG4LIjzzLd]: ' + result);
		res.send(result);
	}
	catch (e) {
		console.log(e);
	}
};

exports.decrypt = function(req, res) {
	try
	{
		var txt = req.param('txt');
		var result = client.rsaDecrypt([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], txt);
	
		console.log('ServerModule[webpages.k4e79e72Fe9ZWgcCaexsd7azLd]: ' + result);
		res.send(result);
	}
	catch (e) {
		console.log(e);
	}
};

exports.home = function(req, res) {
    res.sendfile(__dirname + '/views/home.html');
};

exports.gjson = function(req, res, hostp, pathp) {
	var options = {
  		host: hostp,
  		path: pathp
	};
	
	http.get(options, function(result){
    	var data = '';

    	result.on('data', function (chunk){
        	data += chunk;
    	});

    	result.on('end',function(){
        	var obj = JSON.stringify(JSON.parse(data));
        	res.send(200, obj);
    	});
	});
};

exports.articles = function(req, res) {
	exports.gjson(req, res, 'www.doksend.com', '/kbportal/data2.json');
};

exports.alist = function(req, res) {
	exports.gjson(req, res, 'www.doksend.com', '/kbportal/approved.json');
};

exports.categories = function(req, res) {
	exports.gjson(req, res, 'www.doksend.com', '/kbportal/categories.json');
};

exports.dologin = function(req, res) {
	client.dologin(req, res);
};

exports.activateAccount = function(req, res) {
	client.activateAccount(req, res);
};

exports.sendActivationEmail = function(req, res) {
	client.sendActivationEmail(req, res);
};

exports.dosignup = function(req, res) {
	client.dosignup(req, res);
};

exports.dorecover = function(req, res) {
	client.dorecover(req, res);
};

exports.loadusersettings = function(req, res) {
	client.loadusersettings(req, res);
};

exports.dousersettings = function(req, res) {
	client.dousersettings(req, res);
};
