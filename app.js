const express = require('express');
const cors = require('cors');
const bip = require('bip');
const parada = require('transantiago-client');
const bodyParser = require('body-parser');

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.set('port', process.env.PORT || 5000);

app.get('/saldo/:number',function(req,res){
	var number = req.params.number;

	bip(number)
	.then(function(response){

		var tarjeta = response;

		res.jsonp({text: tarjeta.balance});

		console.log(tarjeta.balance);
	})
	.catch(function(err){
		console.log(err);
	});
});

app.post('/saldo',function(req,res){
	var number = req.body.trigger_word;

	bip(number)
	.then(function(response){

		var tarjeta = response;

		res.jsonp({text: tarjeta.balance});

		console.log(tarjeta.balance);
	})
	.catch(function(err){
		console.log(err);
	});
});

app.post('/tbeep',function(req,res){
	var string = req.body.text;
	var cm = string.split(" ");
	if (cm[1] == " "){
		res.json({text: "dime"});
	};
	if (cm[1] == "oye"){
		res.json({text: "ah?"});
	};
	if (cm[1] == "hola"){
		res.json({text: "Hola estimado!"});
	};
	if (cm[1] == "saldoBip"){
		var number = cm[3];
		bip(number)
		.then(function(response){

			var tarjeta = response;

			res.json({text: tarjeta.balance});

			console.log(tarjeta.balance);
		})
		.catch(function(err){
			console.log(err);
		});
	};
	if (cm[1] == "saldo"){
		var number = cm[3];
		bip(number)
		.then(function(response){

			var tarjeta = response;

			res.json({text: tarjeta.balance});

			console.log(tarjeta.balance);
		})
		.catch(function(err){
			console.log(err);
		});
	};
});


app.listen(app.get('port'), function(){
	console.log("corriendo en el puerto: "+ app.get('port'));
});
