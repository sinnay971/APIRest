// utilisation d'un routeur Express
const express = require('express');

var membreRouter = express.Router();
// utilisation du controlleur de gestion des membres
var membreController = require('../controller/MembreController.js');

// route pour la liste des membres
// utilisant la méthode liste du controlleur

membreRouter.get('/', membreController.liste);
membreRouter.get('/:id', membreController.getWithId);
membreRouter.post('/', membreController.ajouterMembre);
membreRouter.put('/',membreController.mettreAJourMembre);
membreRouter.delete('/:id',membreController.deleteMembre);

module.exports = membreRouter;