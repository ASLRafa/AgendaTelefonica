// Importando as dependências necessárias
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes')
const path = require('path')
const {middleWaresGlobal,checkCsrfError,csrfMiddleware} = require('./src/middlewares/middlewares');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');

// Conectando ao banco de dados MongoDB
mongoose.connect(process.env.connectionStringMODELO)
.then(()=>{
    console.log("conectei a base de dados")
    app.emit('pronto')
    
}).catch(e =>{console.log(e)});

// Configurando helmet
app.use(helmet());

// Configurando o uso do middleware para receber dados do formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json());
// Configurando o uso de arquivos estáticos na pasta 'public'
app.use(express.static('./public'))

// Configurando as opções da sessão
const sessionOptions = session({
    secret:'asdasdasdasd',
    store: MongoStore.create({ mongoUrl: process.env.connectionStringMODELO }),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }    
});
app.use(sessionOptions);

// Configurando o uso do flash para exibir mensagens temporárias
app.use(flash());

// Configurando o diretório das views e o template engine EJS
app.set('views',path.resolve(__dirname,'src','views'))
app.set('view engine','ejs')


app.use(csrf());
// Aplicando os middlewares globais
app.use(middleWaresGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

// Configurando as rotas
app.use(routes)

// Iniciando o servidor após a conexão com o banco de dados
app.on('pronto',()=> {
    app.listen(3000, ()=>{
        console.log('Acessar http://localhost:3000')
        console.log('servidor executando na porta 3000')
    })
})
