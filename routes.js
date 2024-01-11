const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')


// Rotas da Home
route.get('/',homeController.index)

// Rotas do login
route.get('/login/',loginController.index)
route.post('/login/register',loginController.register)
route.post('/login/login',loginController.login)
route.post('/login/logout',loginController.logout)

module.exports = route
