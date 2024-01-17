const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middlewares');


// Rotas da Home
route.get('/',homeController.index)

// Rotas do login
route.get('/login/',loginController.index)
route.post('/login/register',loginController.register)
route.post('/login/login',loginController.login)
route.get('/login/logout',loginController.logout)

// Rotas de contato
route.get('/contato', contatoController.index);
route.get('/contato/cadastro',loginRequired , contatoController.cadastro);
route.post('/contato/register',loginRequired , contatoController.register);
route.get('/contato/cadastro/:id',loginRequired , contatoController.editIndex);
route.post('/contato/edit/:id',loginRequired , contatoController.edit);
route.get('/contato/deletar/:id',loginRequired , contatoController.deletar);

module.exports = route
