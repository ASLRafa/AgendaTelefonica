

// Exporting a function named "paginaInicial" as a controller for the initial page.
// This function logs the value of "req.session.usuario" and renders the "index" view with the provided data.
exports.paginaInicial = (req,res) =>{
    console.log(req.session.usuario);
    res.render('index', {
        titulo: 'Este será o titulao da páginaa',
        numeros:[0,1,2,3,4,5,6,7,8,9]
    });
};

// Exporting a function named "trataPost" as a controller for handling POST requests.
// This function sends the request body as the response.
exports.trataPost = (req,res) =>{
    res.send(req.body)
}
    



// const HomeModel = require('../model/homeModel');

// HomeModel.create({
//     titulo:'Uma noite conturbada 3',
//     descricao:'descrição de uma noite de sono da raquelzinha 2',
//     usuario:'raquelzinha'
// }).then(dados => console.log(dados))
// .catch(e => console.log(e));

    // HomeModel.find({usuario:'raquelzinha'}).then(dados => console.log(dados))