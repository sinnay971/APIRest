const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true },
    password:  {type: String, required: true },
    email : {type: String, required: true, unique: true },
    admin : false
});

var userModel = mongoose.model("user", userSchema);

module.exports = userModel;