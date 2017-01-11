const express = require('express');
const cors = require('cors');
const bip = require('bip');
const parada = require('transantiago-client');

app = express();

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
	//var string = req.params;
	//var cm = string.split(" ",3);
	
	res.json({text: "hola que tal"});
	
	//if (cm[1] == "saldo"){
	//	res.json({text: "tu saldo es:  $1200"});
	//}else{
	//	res.json({text: "hola"});
	//}
});


app.listen(app.get('port'), function(){
	console.log("corriendo en el puerto: "+ app.get('port'));
});
