var express = require('express');
var router = express.Router();
var QuizAdmin = require('../models/questions');
var QuizResult = require('../models/result');
var moment = require('moment');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('quizpage', { title: 'Welcome to Quiz'});
});
router.get('/admin', function (req, res){
	res.render('admin', {title: 'Welcome dear quiz setter'});
});
router.post('/show', function (req, res){
	var num = req.body.count;
	var a = req.body.username;
	var b = req.body.checkedOption;
    
	QuizAdmin.findOne({index : num}).exec(function(err,doc){
		return res.send(doc);
	});
  if(num>1){
  	var k = num-1;
    QuizAdmin.findOne({index : k}).exec(function(err,doc){
		console.log('List of questions : ------------');
		console.log(doc);
		if(doc.answer==b){
			console.log("correct answer:-->" + b + "given answer: " + doc.answer);
          QuizResult.findOneAndUpdate({name : a}, { $inc: { score: 1 } }, function(err, data) {
								if (err) {
									console.log(err);
									return res.send(500, {
									error: err
									});
								}

								if (data == null) {
									console.log("NULLL");
									res.locals=b;
								}

		  });
	    }
		if(doc.answer!=b){console.log("wrong answer:-->" + b + "|| given answer : " + doc.answer);}
		return res.locals=b;
	});
  }
	
});


router.post('/user_function', function(req, res){
	var user = req.body.username;
	console.log(user);
	var a = moment().format('LLL');
	var data = {name : user, data : a};
	console.log(data);
	
    var query = QuizResult(data);
        query.save(function (err, val){
           	if (err){
              console.log("error");
            }
           	else{
               console.log(val);
              console.log("data sent");
           	res.send(val);
            }
        });

});
/*
router.get('/list', function(req, res){
    //var query = QuizResult(data);
        QuizResult.find().sort({data: -1}).exec(function (err, val){
           	if (err){
              //console.log("error");
              res.send("error");
            }
           	else{
               console.log(val);
              //console.log("data sent");
           	//res.send(val);
           	res.render('list', {title : "hi"});
            }
        });
	
});
*/
router.get('/list/:fname', function (req, res){
	        var usr = req.params.fname;
                 QuizResult.find().sort({score:-1, data: -1}).exec(function (err, val){
           	if (err){
              //console.log("error");
              res.send("error");
            }
           	else{
               console.log(val);
               //if
              //console.log("data sent");
           	//res.send(val);
           	res.render('list',  {result : val, username : usr});
            }
        });
	           // res.render('list', {title: 'Welcome dear quiz setter'});
});

router.post('/admin_users', function (req, res){
	var num = req.body.num;
	var ques = req.body.question;
	var op1 = req.body.option1;
	var op2 = req.body.option2;
	var op3 = req.body.option3;
	var op4 = req.body.option4;
	var ans = req.body.answer;
	var data = {
		index : num,
		quest : ques,
		options  :{
			option1 : op1,
		    option2 : op2,
		    option3 : op3,
		    option4 : op4
		},
		
		answer : ans
	};
	
	//console.log(data);
	
	var query = QuizAdmin(data);
        query.save(function (err, val){
           	if (err){
              console.log("error");
            }
           	else{
               console.log(val);
              console.log("data sent");
           	res.send(val);
            }
        });
	res.send("hi");
});
 




module.exports = router;
