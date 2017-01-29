"use strict";
var mongoose = require('mongoose');
var mySchema = mongoose.Schema({
	index           : Number,
	quest           : String,
	options         :  {
	     	option1 : { type : String },
		    option2 : { type : String },
		    option3 : { type : String },
		    option4 : { type : String }
	},
	answer          : {type : String}
	
});


   module.exports = mongoose.model('ques', mySchema);
