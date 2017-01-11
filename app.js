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
	if (cm[1] == "gracias"){
		res.json({text: "De nada estimado, un placer ayudarlo!"});
	};
	if (cm[1] == "saldoBip"){
		var number = cm[2];
		bip(number)
		.then(function(response){
			var tarjeta = response;
			res.json({text: "Estimado el saldo de su tarjeta bip! es = $" + tarjeta.balance});
		})
		.catch(function(err){
			res.json({text: "No pude obtener la informacion de su tarjeta, lo siento"});
		});
	};
});


app.listen(app.get('port'), function(){
	console.log("corriendo en el puerto: "+ app.get('port'));
});
