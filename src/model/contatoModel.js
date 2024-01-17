const mongoose = require('mongoose');
const validator = require('validator');

const contatoSchema = new mongoose.Schema({
    nome:{type:String,required:true},
    sobrenome:{type:String,required:false,default:''},
    telefone:{type:String,required:false,default:''},
    email:{type:String,required:false,default:''},
    usuario:{type:String,required:false,default:''},
    criadoEm:{type:Date,default:Date.now},
});

const ContatoModel = mongoose.model('contato',contatoSchema);

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;

    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }
    async buscaPorId(id){
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    }
    async buscaContatos(id){
        const contatos = await ContatoModel.find({usuario:id}).sort({criadoEm:-1});
        return contatos;
    }
    async delete(id){
        if(typeof id !== 'string') return;
        const contatos = await ContatoModel.findOneAndDelete({_id:id});
        return contatos;
    }

    async edit(id){
        if(typeof id !== 'string') return;
        this.valida();
        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.findByIdAndUpdate(id,this.body,{new:true})
    }


    valida() {
        this.cleanUp();

        // Validação
        // O e-mail precisa ser válido
        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail Inválido');
        }
        if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
        if(!this.body.email && !this.body.telefone) {
            this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            telefone: this.body.telefone,
            email: this.body.email,
            usuario:this.body.id,
        };
    }



}

module.exports = {Contato,};
