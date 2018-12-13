var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , userModel = require('../models/UserModel.js');

var jwt = require("jsonwebtoken");

var userController = {
    liste:function (req,res) {
        userModel.find(function (err,user) {
            console.log('>'+ req.originalUrl);
            console.log('body: ', req.params);
            if(err) {console.log(err); res.json({status: false, message:err.message})}
            else { res.json({status: true, membre:user})}
        });
        console.log('Viewing ' + req);
    },
    ajout: function (req, res) {
       var mrDupont = new userModel(req.body);
        console.log('>'+ req.originalUrl);
        console.log('body: ', req.body);
        console.log('query: ', req.query);
        mrDupont.validate()
            .then( () => {
                console.log("membre valide");
                return mrDupont.save()})
            .then( () => { console.log("ajouté");res.json({status: true, message:'user ajouté'}) })
            .catch( (err) =>{ console.error("ce user existe déjà" + err);res.json({status: false, message:'un user avec cet id existe déjà́'})})
            .catch((err) =>{ console.log( "non valide" + err);res.json({status: false, message:'user validation failed: XXX̀́'})})
    },
    demandejeton: function (req, res) {
        console.log('body: ', req.params);
        if(req.params.name != null && req.params.name !== undefined || req.params.password != null && req.params.password !== undefined){
            userModel.find(req.params,function (err, user) {
                console.log(req.params.name);
                if(user.length === 0){console.log(err); res.json({status: false, message:'name et/ou password incorrects'})}
                else{
                    var playload = { 'iat':new Date().getTime(), name: "toto"};
                    console.log(playload);
                    var token = jwt.sign( playload, 'maclesecrete',{ expiresIn: '1h'});
                    res.json({status: true, token :token}) }
            })
        } else {
            res.json({status: false, message:'name et/ou password absents'})
        }
    },verifjeton:function (req, res, next) {
        console.log(req.originalUrl);
        console.log('body: ', req.body);
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, 'maclesecrete',
                function (err, payload) {
                    console.log(payload);
                    if (err) {
                        console.log('token incorrect');
                        res.json({satus:false, message:'token incorrect : ' + err.message});
                    } else {
                        console.log('token correct');
                        console.log(payload);
                        req.payload = payload;
                        //next();
                        res.json({satus:true, message:'jeton OK' })
                    }
                });

        } else {
            res.json({status: false, token :'token absent'})
                }
    },verifJTW:function(req, res, next) {

    if (token) {
        jwt.verify(token, 'maclesecrete',
            function (err, payload) {
                console.log(payload);
                if (err) {
                    console.log('token incorrect');
                    res.json({satus:false, message:'token incorrect : ' + err.message});
                } else {
                    console.log('token correct');
                    console.log(payload);
                    req.payload = payload;
                    next();
                }
            });

    } else {
        res.json({status: false, token :'token absent'})
    }
}
};


module.exports = userController;