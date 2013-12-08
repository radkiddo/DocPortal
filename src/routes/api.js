/* DocPortal - Doksend - 2013 - http://doksend.com */

var model = require('../model/model.js');

// retrieve all records in a table
exports.getAll = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));    
    	model.callFind(req.param('fields'), res);
    }
    catch (e) {
		console.log(e);
	}
};

// retrieve the record in a table by field name and field value
exports.getFieldByNameValue = function(req, res) {
	try
	{
		var data = '{"' + req.param('fn1') + '":';	
		var field = req.param('fn1');
		
		if (field.indexOf('cid') >= 0) {
			data += '"' + req.param('fv1') + '"}';
		}
		else {
			data += isNaN(req.param('fv1')) ? '"' + req.param('fv1') + '"}' : req.param('fv1') + '}';
		}	

		model.callDb(req.param('db'), req.param('schema'), req.param('table'));
		model.callFind(JSON.parse(data.toString()), res);
	}
	catch (e) {
		console.log(e);
	}
};

// update a record in a table
exports.updateRow = function(req, res) { //does not seem to work with curl
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));    
	
		//model.callFindOneAndRemoveSilent(req.param('fields'), res);
		//model.callFindOneAndUpdate(req.param('update'), res);
	
		model.callUpdate(req.param('fields'), req.param('update'), res);
	}
	catch (e) {
		console.log(e);
	}
};

// delete a record in a table
exports.deleteRow = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));    
    	model.callFindOneAndRemove(req.param('fields'), res);
    }
    catch (e) {
		console.log(e);
	}
};

// delete all the records in a table
exports.deleteAllRows = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));
		model.callTableRemove(res);
	}
	catch (e) {
		console.log(e);
	}
};

// insert a record in a table
exports.insertRow = function(req, res) {
	try
	{
		model.callDb(req.param('db'), req.param('schema'), req.param('table'));	
		model.callFindOneAndUpdate(req.param('fields'), res);
	}
	catch (e) {
		console.log(e);
	}
};

