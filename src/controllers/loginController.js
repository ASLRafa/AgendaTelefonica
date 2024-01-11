const Login = require('../model/loginModel')

exports.index = (req, res) => {
    res.render('login')
}

exports.register = async (req,res) =>{
    try {
        const login = new Login(req.body)
        await login.register()
    
        if(login.errors.length > 0){
            req.flash('errors',login.errors);
            req.session.save(function (){
                return res.redirect('back')
            })
            return;
        }
        req.flash('success','Usuario Criado com sucesso.');
        req.session.save(function (){
            return res.redirect('back')
        })
    } catch (error) {
        console.log(error)
        return res.render('404')
    }

}