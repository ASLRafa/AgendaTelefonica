const mongoose = require('mongoose');

const contatoSchema = new mongoose.Schema({
    nome:{type:String,required:true},
    sobrenome:String,
    telefone:String,
    email:String,
    usuario:{type:String,required:true},


})

const ContatoModel = mongoose.model('Contato',contatoSchema);
