exports.index = (req,res) =>{
    if(req.session.user) return res.redirect('/contato')
    res.render('index');
};
