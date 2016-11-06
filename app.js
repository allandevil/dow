/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

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

app.get('/MyLoc', function(req, res){

  var result = [
    {
      "id":"3",
      "pantacao":"Tomate",
      "valor":"R$ 5,00 - 20,00",
      "Latitude":"-23.547454",
      "Longitude":"-46.636768"
    },
    {
      "id":"4",
      "pantacao":"Cenora",
      "valor":"R$ 1,20 - 10,00",
      "Latitude":"-23.547518",
      "Longitude":"-46.636654"
    },
    {
      "id":"5",
      "pantacao":"Alface",
      "valor":"R$ 3,50 - 15,00",
      "Latitude":"-23.547801",
      "Longitude":"-46.636529"
    }
  ]
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
