const Usuario = require('../Models/Usuarios')
const bcrypt = require('bcrypt')

module.exporte = class usuarioController {
    static login(req, res){
        res.render('')
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        const usuario = await Usuario.findOne({where: {email: email}})

        if(!usuario){
            res.render('', {
            message: 'Usuário não encontrado',
            })
        return
        }

        const senhaMatch = bcrypt.compareSync(senha, usuario.senha)
        if(!senhaMatch){
            res.render('', {
                message: 'Senha inválida',
            })
            return
        }


        req.session.usuarioid = usuario.id
        req.flash('message', 'Login realizado com sucesso!')

        req.session.save(()=>{
            res.redirect('/')
        })
    }

    static register(req, res){
        res.render('')
    }

    static async registerPost(req, res){
        const {nome, email, senha, papel} = req.body

        const usuarioValido = await Usuario.findOne({where: {email:email}})

        if(usuarioValido){
            req.flash('message', 'Este e-mail já está sendo utilizado em outra conta')
            res.render('')

            return
        }

        const salt = bcrypt.genSaltSync(10)
        const senhaHashed = bcrypt.hashSync(senha, salt)

        const usuario = {
            nome,
            email,
            senha: senhaHashed,
            papel
        }

        Usuario.create(usuario)
        .then((usuario) =>{
            req.session.usuarioid = usuario.id

            req.session.usuarioid = usuario.id

            req.flash('message', 'Cadastro realizado com sucesso')

            req.session.save(()=>{
                res.redirect('/')
            })
        })
    }

    static logoutUsuario(req, res){
        req.session.destroy()
        res.redirect('/login')
    }

    
}