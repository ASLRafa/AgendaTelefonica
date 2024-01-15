const {Contato} = require('../model/contatoModel');


exports.index = async (req, res) => {
  const id = req.session.user._id;
  const lista = new Contato(req.body);
  const contatos = await lista.buscaContatos(id);
  if(!contatos) return res.render('404');
  console.log(contatos)
  res.render('contato',{contatos});
}

exports.cadastro = (req, res) => {
  res.render('cadastro',{
    contatoedit:{}
  });
  }

exports.register = async (req, res) => {

  try{
    const contato = new Contato(req.body);
    await contato.register()
    if(contato.errors.length > 0){
        req.flash('errors',contato.errors);
        req.session.save(()=>{
            return res.redirect('back');
        })
        return;
    }
    req.flash('success','contato registrado com sucesso.');
    req.session.save(()=>{
        return res.redirect(`/contato/cadastro/${contato.contato._id}`);
    })
  }catch(e){

      console.log(e)
      return res.render('404')

  }
}

exports.editIndex = async (req, res) => {
    const id = req.params.id;
    if(!id) return res.render('404');
    const contato = new Contato(req.body);
    const contatoedit = await contato.buscaPorId(id);
    if(!contatoedit) return res.render('404');

    res.render('cadastro', { contatoedit });
  }

