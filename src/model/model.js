/* DocPortal - Doksend - 2013 - http://doksend.com */

var mongoose = require('mongoose'), 
	application = require('../app.js'),
	crypto = require('../routes/crypto.js'),
	emailserver = require('emailjs');
	
var server  = emailserver.server.connect({
   user: "", 
   password: "", 
   host: "smtp.gmail.com", 
   ssl: true
});

var db = null, schema = null, table = null;

var mongoose = require('mongoose');
var db = null, schema = null, table = null; 

exports.db_conn = null;

exports.callDb = function (pDb, pSchema, pTable, env) {
    try
    {
    	//db = mongoose.createConnection('localhost', pDb); // local node
    	db = mongoose.createConnection(application.env['mongodb-1.8'][0]['credentials']['hostname'], pDb); // AppFog
    
		schema = mongoose.Schema(pSchema, { strict: false });
		table = db.model(pTable, schema);
		
		exports.db_conn = mongoose;
	}
	catch (e) {
		console.log(e);
	}
};

// api 
exports.callFind = function (pField, res) {	
	try
	{
		table.find(pField, function (err, result) {
			
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callUpdate = function (pField, pUpdate, res) {
	try
	{
		table.update(pField, pUpdate, function (err, numberAffected, result) {
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callFindOneAndUpdate = function (pField, res) {	
	try
	{
		var collection = new table(pField);
	
		table.find(pField, function (err, result) {
  			if (err) { res.send(500, { error: err }); mongoose.disconnect(); }
			if (result.length == 0) {
				collection.save(function (err, raw) {
					if (err) { res.send(500, { error: err }); } 
					else { res.send(200, { result: raw }); }
					
					mongoose.disconnect();
				});
			} else { res.send(200, { result: 'already exists' }); mongoose.disconnect(); }
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.dbFindUpdate = function (pFind, pField, res) {	
	try
	{
		var collection = new table(pField);
	
		table.find(pFind, function (err, result) {
  			if (err) { res.send(500, { error: err }); mongoose.disconnect(); }
			if (result.length == 0) {
				collection.save(function (err, raw) {
					if (err) { res.send(500, { error: err }); } 
					else { res.send(200, { result: raw }); }
					
					mongoose.disconnect();
				});
			} else { res.send(200, { result: 'already exists' }); mongoose.disconnect(); }
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callFindOneAndRemove = function (pField, res) {
	try 
	{
		table.findOneAndRemove(pField, function (err, result) {
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.callRemove = function (pField, res) {
	try
	{
		table.remove(pField, function (err, result) {
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callFindOneAndRemoveSilent = function (pField, res) {
	try {
		table.findOneAndRemove(pField, function () {
			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// api
exports.callTableRemove = function (res) {
	try
	{
		table.remove(function (err, result) {
  			if (err) { res.send(500, { error: err }); } 
  			else { res.send(200, { result: result }); }
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

/* Start Login / Signup */
// Non Api - internal usage...

exports.sendPassword = function (pwd, req, res) {
	try
	{
		var toStr = req.param('to');
		
		var urlStr = '<a href="http://kbportal.aws.af.cm' + '/login/">Login now</a>'; // AppFog
		//var urlStr = '<a href="http://localhost:3000' + '/login/">Login now</a>';
		
		var txtStr = '<html>Hi, <br /><br />You have requested a password recovery.<br /><br />Your saved password is: ' +
			pwd + '<br /><br />You can use the link below to login to your account:<br /><br />' +
			urlStr + '<br /><br />Enjoy.<br /><br />Kind regards,<br />Eduardo Freitas</html>';
			
		server.send({
   			text: txtStr,
   			from: 'KB Portal <kbportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'kbportal@doksend.com',
   			subject: 'KB Portal Password Recovery',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			res.send(200, err || message);
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.sendActivationEmail = function(req, res) {
	try
	{
		var toStr = req.param('to');
	
		var urlStr = '<a href="http://kbportal.aws.af.cm' + '/activate/' + toStr + '">Activate now</a>'; // AppFog
		//var urlStr = '<a href="http://localhost:3000' + '/activate/' + toStr + '">Activate now</a>';
	
		var txtStr = '<html>Hi, <br /><br />Thank you for signing up for the KB Portal.<br /><br />In order to activate your account, please click on the link below:<br /><br />' +
			urlStr + '<br /><br />Enjoy using your new user account.<br /><br />Kind regards,<br />Eduardo Freitas</html>';
	
		server.send({
   			text: txtStr,
   			from: 'KB Portal <kbportal@doksend.com>', 
   			to: toStr,
   			cc: '',
   			bcc: 'kbportal@doksend.com',
   			subject: 'KB Portal Signup Activation',
   			attachment:
   			[
      			{data:txtStr, alternative:true},
  			]
		}, 
		function(err, message) { 
			res.send(200, err || message);
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.initPendingItem = function (pFind, pField, req, res) {
	try
	{
		var collection = new table(pField);
	
		table.find(pFind, function (err, result) {
  			if (err) { res.send(500, { error: err }); mongoose.disconnect(); }
			if (result.length == 0) {
				collection.save(function (err, raw) {
					if (err) { res.send(500, { error: err }); } 
					else { 
						exports.sendActivationEmail(req, res);
						res.send(200, { result: 'signup OK' }); 
					}
					
					mongoose.disconnect();
				});
			} else { res.send(200, { result: 'already exists' }); mongoose.disconnect(); }
		});
	}
	catch (e) {
		console.log(e);
	}	
};

exports.updateUserSettings = function (pFind, pUpdate, req, res) {
	try
	{
		var r = 'user settings not saved';
		
		table.find(pFind, function (err, result) 
		{
			if (err) {
				res.send(500, r);
				mongoose.disconnect();
			}
			else {
				if (result.length > 0) {
					var rslt = exports.parseJsonResult(result),
					
						pFld = '{"fn":' + '"' + rslt.fn + '", ' + 
							'"ln":' + '"' + rslt.ln + '", ' +
							'"un":' + '"' + rslt.un + '", ' + 
							'"pwd":' + '"' + rslt.pwd + '", ' + 
							'"pending": "false"}';
							
						pField = JSON.parse(pFld.toString());
					
					table.update(pField, pUpdate, function (err, numberAffected, result) {
  						if (err) { 
  							res.send(500, r); } 
  						else { 
  							r = 'user settings saved';
  							res.send(200, r);
  						}
  						
  						mongoose.disconnect();
					});
				}
				else {
					res.send(200, r);
					mongoose.disconnect();
				}
			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

// Find item (user name) for pending user activations
exports.findPendingItem = function (pFind, pField, pUpdate, req, res) {
	try
	{
		var r = 'ServerModule[client.activateAccount]: User: "' + req.param('to') + '" not activated.';
	
		table.find(pFind, function (err, result) 
		{
			if (err) {
				console.log(err);
				res.redirect('/#/activationfailed');
				mongoose.disconnect();
			}
			else
			{
				if (result.length > 0)
				{
					r = 'ServerModule[client.dologin]: Credentials for user: "' + req.param('to') + '" found OK.';
					console.log(r);
				
					// Do activation (remove from the pending tag (set it to false))
					table.update(pField, pUpdate, function (err, numberAffected, result) {
  						if (err) { res.redirect('/#/activationfailed'); } 
  						else { 
  							res.redirect('/#/activationsuccessful'); 
  						}
  						
  						mongoose.disconnect();
					});
				}
				else
				{
					console.log(r);
					res.redirect('/#/activationusernotfound');
					mongoose.disconnect();
				}	
			}
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.parseJsonResult = function (result) {
	var jsonStr = JSON.stringify(result[0]);
  	return eval('(' + jsonStr + ')');
};

exports.loadUserSettings = function (pFind, req, res) {
	try
	{
		var r = 'ServerModule[client.loadUserSettings]: settings not loaded for user: "' + req.param('un') + '".';
		
		table.find(pFind, function (err, result) 
		{
			if (err) { 
  				res.send(500, { result: err });		
  			}
  			else {
  				if (result != null && result.length > 0)
  				{
  					var parsedJSON = exports.parseJsonResult(result), fn = parsedJSON.fn, 
  						ln = parsedJSON.ln;
  					
  					res.send(200, fn + '|' + ln);
  				}
  				
  				res.send(200, { result: r });
  			}
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

exports.findRecover = function (pFind, req, res) {
	try
	{
		var r = 'ServerModule[client.dorecovery]: recovery not OK for user: "' + req.param('to') + '".';
		
		table.find(pFind, function (err, result) 
		{
			if (err) { 
  				res.send(500, { result: err });		
  			}
  			else {
  				if (result != null && result.length > 0)
  				{
  					r = 'ServerModule[client.dorecovery]: recovered OK for user: "' + req.param('to') + '".';
  					var parsedJSON = exports.parseJsonResult(result), pd = parsedJSON.pending, 
  						pwd = parsedJSON.pwd;
  					
  					if (pd == "true") {
  						exports.sendActivationEmail(req, res);
  					}
  					else {
  						exports.sendPassword(crypto.rsaDecode([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], pwd), req, res);
  					}
  				}
  				
  				res.send(200, { result: r });
  			}
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};

// Find item (user name / pwd) for user login
exports.findItem = function (pFind, pwd, req, res) {	
	try
	{
		var r = 'ServerModule[client.dologin]: Credentials for user: "' + req.param('un') + '" not found.';
	
		table.find(pFind, function (err, result) 
		{
  			if (err) { 
  				console.log(err);
  				res.send(500, { result: err });		
  			}
  			else
  			{ 
  				if (result != null && result.length > 0)
  				{
  					var parsedJSON = exports.parseJsonResult(result);
  					var pd = parsedJSON.pwd;
  				
  					var rp = crypto.rsaDecode([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], pd);
  					var p = crypto.rsaDecode([[119141457,185046352,2676254],[40632295,2191],[122927507,2595]], pwd);
  				
  					if ((result.length > 0) && (rp == p))
  						r = 'ServerModule[client.dologin]: Credentials for user: "' + req.param('un') + '" found OK.';
				}
				res.send(200, { result: r });	
  			}
  			
  			mongoose.disconnect();
		});
	}
	catch (e) {
		console.log(e);
	}
};
/* End Login / Signup */