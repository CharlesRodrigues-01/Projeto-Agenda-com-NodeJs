const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
};

exports.register = async function(req, res) {
    
    try {
    const contato = new Contato(req.body);
    await contato.register();
    
    if(contato.errors.length > 0) {
        req.flash('errors', contato.errors);
        req.session.save(function() {
            return res.redirect('http://localhost:3000/contato/index');
        });
        return;
    }

    req.flash('success', 'Contato registrado com sucesso!');
    req.session.save(function() {
       return res.redirect(`/contato/index/${contato.contato._id}`);
    });
    

} catch (e) {
    console.log(e);
    return res.render('404');
}

};

exports.editIndex = async function(req, res) {
    const contatos = new Contato();
    if(!req.params.id) return res.render('404');
    const contato = await contatos.buscaPorId(req.params.id);
    if(!contato) return res.render('404');
    res.render('contato', { contato });
}