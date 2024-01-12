exports.index = (req,res) =>{
    if(req.session.user) return res.render('contato')
    res.render('index');
};
