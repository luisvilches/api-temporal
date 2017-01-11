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
	var string = req.body.trigger_word;
	var cm = string.split(" ",3);
	if (cm[1] = "dowhi"){
	//res.json({text: "me pase po!"});
		res.json({text: "me pase po!!!!"});
	}
	if (cm[1] = "hola"){
	//res.json({text: "me pase po!"});
		res.json({text: "Hola estimado!"});
	}
	
	//if (cm[1] == "saldo"){
	//	res.json({text: "tu saldo es:  $1200"});
	//}else{
	//	res.json({text: "hola"});
	//}
});


app.listen(app.get('port'), function(){
	console.log("corriendo en el puerto: "+ app.get('port'));
});
