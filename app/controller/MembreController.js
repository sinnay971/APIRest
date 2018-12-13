var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , MembreModel = require('../models/MembresModel.js');


var MembreController = {
    liste : function(req,res){
        MembreModel.find(function (err,member) {
            if(err) {console.log(err); res.json({status: false, message:err.message})}
            else { res.json({status: true, membre:member})}
        })
    },
    getWithId : function (req, res) {
        console.log(req.params);
        MembreModel.find({'id':req.params.id},function (err, membre) {
            if(err){console.log(err); res.json({status: false, message:'membre inexistant'})}
            else{ res.json({status: true, membre:membre}) }
        })
    },
    ajouterMembre: function (req, res) {
        var mrDupont = new MembreModel(req.body);
        console.log('>'+ req.originalUrl);
        console.log('body: ', req.body);
        console.log('query: ', req.query);
        mrDupont.validate()
            .then( () => {
                console.log("membre valide");
                return mrDupont.save()})
            .then( () => { console.log("ajouté");res.json({status: true, message:'membre ajouté'}) })
            .catch( (err) =>{ console.error("ce membre existe déjà");res.json({status: false, message:'un membre avec cet id existe déjà́'})})
            .catch((err) =>{ console.log( "non valide");res.json({status: false, message:'membre validation failed: XXX̀́'})})
    },
    mettreAJourMembre: function (req, res) {
        var query = { 'id': req.body.id };
        MembreModel.update(query, req.body, function (err, membre) {
            if(err){ console.log(err); res.json({status: false, message:'echec de la mise a jour'})}
            else{ res.json({status: true, membre:membre}) }
        })
    },
    deleteMembre : function (req, res) {
        MembreModel.deleteOne({id:req.param.id})
            .then(()=> { console.log("ce membre a été supprimé"); res.json({status: true, message:'membre supprimé'}) })
            .catch((err) => { console.log(err.message); res.json({status: false, message:'membre inexistant'}) })
    }

};

module.exports = MembreController;