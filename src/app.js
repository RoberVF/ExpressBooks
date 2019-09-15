const express= require('express');
const server= express();
const path= require('path');
const morgan= require('morgan');


//Settings
server.set('port', process.env.PORT || 5500);
server.set('views', path.join(__dirname + '/views')); //Especificar la ruta de la carpeta views
server.set('view engine', 'ejs'); //Establecer el motor de plantillas de ejs


//Middlewares
server.use(morgan('dev')); //Ejecuta el modulo morgan para utilizar su metodo llamado 'dev'
server.use(express.urlencoded({extended:false})); //Gracias a este metodo se va a poder entender lo que viene de los formularios, es decir, que el servidor podra entender formatos json

//Routes
server.use(require('./routes/index.js'));

//Static Files
server.use(express.static(path.join(__dirname, '/public')));

// Error 404
server.use((req, res, next)=>{
    res.status(404).send('404 Not found!'); //Para cunado se busca una pagina que no existe
});


module.exports= server;