/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var request = require('request');
var bodyparser = require('body-parser');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.post('/cp',function(req,res){

 var postado = JSON.stringify(req.body);
 var post = JSON.parse(postado);
 console.log(post.name);

 var maps = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+post.consumidor_local.latitude+","+post.consumidor_local.longitude+"|&destinations="+post.fornecedor_local.latitude+","+post.fornecedor_local.longitude+"|&mode="+"bicycling"+"&language=pt-BR&key=AIzaSyDktMhpR4D_ecvEzeSVwwo8uxvTl1CUmA4";
 //console.log(maps);
var resultJson = [];
 request(maps, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //var corpo = JSON.stringify(body);
        resultJson = JSON.parse(body); // Show the HTML for the Modulus homepage.
        console.log(resultJson.rows[0].elements[0]);
        res.send({resultCode:"sucesso",
                  envio:"bike",
                  distancia:resultJson.rows[0].elements[0].distance.text,
                  tempo:resultJson.rows[0].elements[0].duration.text,
                  frete:"2.00"
                });
    }
  });


});

app.get('/MyLoc', function(req, res){

  var result = [
    {
      "id":"1",
      "produto":"Morango",
      "preco":"1.20",
      "Latitude":"-23.560369",
      "Longitude":"-46.686511"
    },
    {
      "id":"3",
      "produto":"Tomate",
      "preco":"5.00",
      "Latitude":"-23.547434",
      "Longitude":"-46.638978"
    },
    {
      "id":"4",
      "produto":"Morango",
      "preco":"1.20",
      "Latitude":"-23.546004",
      "Longitude":"-46.634033",
    },
    {
      "id":"5",
      "produto":"Pera",
      "preco":"3.50",
      "Latitude":"-23.548689",
      "Longitude":"-46.634301"
    },
    {
      "id":"8",
      "produto":"Pera",
      "preco":"3.50",
      "Latitude":"-23.574017",
      "Longitude":"-46.623171"
    },
    {
      "id":"10",
      "produto":"Pera",
      "preco":"3.50",
      "Latitude":"-23.546221",
      "Longitude":"-46.588579"
    },
    {
      "id":"13",
      "produto":"Tomate",
      "preco":"3.50",
      "Latitude":"-23.535334",
      "Longitude":"-46.656225"
    },
    {
      "id":"15",
      "produto":"Pera",
      "preco":"3.50",
      "Latitude":"-23.592549",
      "Longitude":"-46.645290"
    }
  ];

  if (result) {
    //res.send(JSON.stringify(result));
    res.send(result);
  }else {
    res.send('Json invalido');
  }

});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
