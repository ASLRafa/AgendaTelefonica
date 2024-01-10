const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')


// Rotas da Home
route.get('/',homeController.index)

// Rotas do login
route.get('/login/',loginController.index)


module.exports = route
