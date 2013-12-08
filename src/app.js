/* DocPortal - Doksend - 2013 - http://doksend.com */

var express = require("express");
var app = express();
var server = require('http').createServer(app);
//var io = require('socket.io').listen(server);

var page = require('./routes/webpages.js'), api = require('./routes/api.js');

//var env = "";
var env = JSON.parse(process.env.VCAP_SERVICES); // AppFog env variable

exports.env = env;

app.configure (function() {
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
});

/*io.sockets.on('connection', function (socket) {
  	socket.emit('news', { hello: '695fb3f3c6a532e82a79e38f34f235bd' });
  	
  	console.log('ServerModule[app.io.sockets.on->news]');
});*/

// pages...
app.get('/', page.home);

app.get('/login', function(req, res){
  res.redirect('/#/login');
});

app.get('/k4e2550htyjrtyj4345435/articles', page.articles);
app.get('/k4e2550htyjrtyj4345435/alist', page.alist);
app.get('/k4e2550htyjrtyj4345435/categories', page.categories);

app.post('/login/do', page.dologin);
app.post('/signup/do', page.dosignup);
app.post('/recover/do', page.dorecover);
app.post('/usersettings/load', page.loadusersettings);
app.post('/usersettings/do', page.dousersettings);
app.post('/kChUTqbUjO2DtKgXLG4LIjzzLd', page.encrypt);
app.post('/k4e79e72Fe9ZWgcCaexsd7azLd', page.decrypt);

// generic api...
// retrieve all records in a table
app.get('/k4e2550htyjrtyj4345435/radkiddo/eafa/kp/efl/timgsys/api/:db/:table', api.getAll);
// retrieve the record in a table by field name and field value
app.get('/k4e2552DtKgXLG4LIjyj4345435/radkiddo/eafa/kp/efl/timgsys/api/query/:db/:table/:fn1/:fv1', api.getFieldByNameValue);
// update a record in a table
app.put('/k4e22552DtKgXLG445435/radkiddo/eafa/kp/efl/timgsys/api/row', api.updateRow);
// delete a record in a table
app.delete('/k4e2DtKgXLG445435yj4345435/radkiddo/eafa/kp/efl/timgsys/api/row', api.deleteRow);
// delete all the records in a table
app.delete('/k4e2550htDtKgXLG4455435/radkiddo/eafa/kp/efl/timgsys/api/table', api.deleteAllRows);
// insert a record in a table
app.post('/k4e2550550htDtKgXLj4345435/radkiddo/eafa/kp/efl/timgsys/api/row', api.insertRow);

// Send email activation
app.get('/activation/send/:to', page.sendActivationEmail);
// Activate account link
app.get('/activate/:to', page.activateAccount);

// 404
app.get('*', function(req, res){
  res.redirect('/#/404');
});

app.listen(process.env.VCAP_APP_PORT || 3000); // AppFog
//app.listen(3000); // local node

//server.listen(3500);
//server.listen(3000); // AppFog