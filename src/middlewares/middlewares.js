// Middleware que define uma variável local no objeto de resposta com um valor específico
exports.middleWaresGlobal = (req,res,next)=>{
    res.locals.umaVariavelLocal = 'Este é o valor da variável local';
    next();
}

// Middleware que verifica se ocorreu um erro de CSRF e renderiza a página de erro 404 caso tenha ocorrido
exports.checkCsrfError = (err,req,res,next) =>{
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('404')
    }
}

// Middleware que define uma variável local no objeto de resposta com o token CSRF
exports.csrfMiddleware = (req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
}
