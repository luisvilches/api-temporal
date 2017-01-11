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

app.get('/saldo:text',function(req,res){
	var number = req.params.text;

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


app.get('/paradero/:paradero',cors(),function(req,res){

	var paradero = req.params.paradero;

	parada(paradero).then(function(response){
		var data = response;

		res.jsonp(data)
	})
	.error(function(){

		console.log(err);
	});

})

app.listen(app.get('port'), function(){
	console.log("corriendo en el puerto: "+ app.get('port'));
});
