
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MembresModel = new Schema({
    id:{ type: Number, unique: true, required:true },
    annee:  Number,
    nom:  { type: String, lowercase: false, required:true  },
    prenom: { type: String, lowercase: false, required:true  },
    categorie: String,
    sexe:   String,
    cnu: String,
    discipline: String,
    corps: String,
    academie : { code_academie:{ type: Number, required:true }, nom:{ type: String,required:true }},
    region :{ code_academie: Number, nom: String},
    etablissement : String
});

var MembreModel = mongoose.model("membre", MembresModel);

/*module.exports = {
    model: mongoose.model('membre', MembreModel),
    schema : MembreModel
};*/

module.exports = MembreModel;