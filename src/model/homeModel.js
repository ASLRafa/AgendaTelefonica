const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    titulo:{type:String,required:true},
    descricao:String,
    usuario:{type:String,required:true},


})

const HomeModel = mongoose.model('Home',homeSchema);
