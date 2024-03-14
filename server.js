//Imports
var express = require('express');
var bodyparser = require('body-parser');
// Importation de la route
const routes = require('./router').router;


// Utilisation de la route


//Initiate the server

var server = express();


//Body configuration

server.use(bodyparser.urlencoded({extended: true}));
server.use(bodyparser.json());

//Routes 

server.get('/', function(req,res){
   res.setHeader('Content-Type','text/html');
   res.status(200).send('<h1>Bonjour sur mon serveur</h1>')
});


//server.use('/parkings', );
server.use('/api',routes);

//Launch server
server.listen(8081,function(){
    console.log('Server');
});