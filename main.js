var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

// var logger = (req, res, next) => {
// console.log('logging ...');
// next();
// }
// app.use(logger);

//View engine Middleware

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'ejs'));

//body parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
//app.use(express.static(path.join(__dirname, 'public')));

//Global vars

app.use(function(req, res, next){
	res.locals.errors = null;
	next();
});

//Express-Validator Middleware

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

var people = [
	{
	name: 'varun',
	age: 32,
	occupation: 'Software Professional'
	},
	{
	name: 'durga',
	age: 28,
	occupation: 'Software Professional'
	},
	{
	name: 'sanjana',
	age: 3,
	occupation: 'Student'
	}
]


app.get('/', (req,res) => {
	// res.json(people);
	// res.send('Hello World'); 
	res.render('index',{
		title: 'MY APP',
		people: people
	});

});


app.post('/people/add/', function(req,res){
req.checkBody('name','name is required').notEmpty();
req.checkBody('age','age is required').notEmpty();
req.checkBody('occ','occupation is required').notEmpty();

var errors = req.validationErrors();

if (errors){
	// console.log(errors)
	res.render('index',{
		title: 'MY APP',
		people: people,
		errors: errors
	});
} else {

	var newPeople = {
		name : req.body.name,
		age : req.body.age,
		work : req.body.occ
	}

	console.log(newPeople);
	res.redirect('/');
}

});

app.listen(3000, () => {
	console.log("Application started and listinig in port 3000");
});

