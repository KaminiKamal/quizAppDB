"use strict";
var mongoose = require('mongoose');
var resSchema = mongoose.Schema({
	name : {type : String},
	date : { type: Date, default: Date.now},
	score : {type : Number},
	
	
});


   module.exports = mongoose.model('result', resSchema);
