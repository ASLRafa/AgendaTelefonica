const Login = require('../model/loginModel')

exports.index = (req, res) => {
    console.log(req.session.user)
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

exports.login = async (req,res) =>{
    try {
        const login = new Login(req.body)
        await login.login()
    
        if(login.errors.length > 0){
            req.flash('errors',login.errors);
            req.session.save(function (){
                return res.redirect('back')
            })
            return;
        }
        req.flash('success','Login efetuado com sucesso');
        req.session.user= login.user;
        req.session.save(function (){
            return res.redirect('back')
        })
    } catch (error) {
        console.log(error)
        return res.render('404')
    }

}

exports.logout = (req,res)=>{
    req.session.destroy();
    res.redirect('/')
}