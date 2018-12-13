const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerSportifs = require("./app/routers/SportifsRouter");
const routeUser = require("./app/routers/UserRouter");
const UserController = require('./app/controller/UserController');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routerSportifs.use(UserController.verifJTW);

app.use('/api/membres',routerSportifs);
app.use('/api/users',routeUser);

mongoose.Promise = global.Promise;
// tentative de connexion à une base de données
mongoose.connect("mongodb://localhost/collegefrance", { useNewUrlParser : true});
// test connexion réussie ?
let db = mongoose.connection;
db.on('error', console.error.bind(console,'erreur connexion :'));
db.once('open', function() { console.log('Connecté')});



//routerApi.get('/',function(req,res) { res.send('Bienvenue sur le serveur REST de l’API du Collège de France ');
//});

var port = 5000;
app.listen(port);
console.log('le serveur REST est lancé sur le port ' + port);