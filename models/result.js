"use strict";
var mongoose = require('mongoose');
var resSchema = mongoose.Schema({
	name           : String,
	score          : Number,
	data           : String   
	
});


   module.exports = mongoose.model('result', resSchema);
