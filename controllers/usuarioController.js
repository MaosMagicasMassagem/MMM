const bcrypt = require('bcrypt')
const Usuario = require('../Models/Usuarios')

module.exports = class usuarioController {
    
    static home(req, res){
        res.render('home');
    }
    static about(req, res){
        res.render('about')
    }

    static login(req, res){
        res.render('login')
    }
    static windows(req , res){
        res.render('windows')
    }

    static async loginPost(req, res){
        const {email, senha} = req.body

        const usuario = await Usuario.findOne({where: {email: email}})

        if(!usuario){
            res.render('login', {
            message: 'Usuário não encontrado',
            })
        return
        }

        const senhaMatch = bcrypt.compareSync(senha, usuario.senha)
        if(!senhaMatch){
            res.render('login', {
                message: 'Senha inválida',
            })
            return
        }


        req.session.usuarioid = usuario.id
        req.flash('message2', 'Login realizado com sucesso!')

        req.session.save(()=>{
            res.redirect('/')
        })
    }

    static register(req, res){
        res.render('register', {message2: req.flash('message2')});
    }

    static async registerPost(req, res) {
        try {
            const { nome, email, senha } = req.body;
    
            const usuarioNaoValido = await Usuario.findOne({ where: { email: email } });
    
            if (usuarioNaoValido) {
                req.flash('message', 'Este e-mail já está sendo utilizado em outra conta');
                res.render('register', { message: req.flash('message') })
                return;
            }
    
            const salt = bcrypt.genSaltSync(10);
            const senhaHashed = bcrypt.hashSync(senha, salt);
    
            const usuario = {
                nome,
                email,
                senha: senhaHashed
            };
    
            const novoUsuario = await Usuario.create(usuario);
    
            req.session.userID= novoUsuario.id;
    
            // // TESTE
            // if (novoUsuario.papel == 'Administrador') {
            //     req.session.save(() => {
            //         res.redirect('/admin');
            //     });
            // } else {
                req.flash('message2', 'Usuario criado com sucesso!\n Faça o login!');
                req.session.save(() => {
                res.redirect('login');
                });
            }
            catch (error) {
            console.error('Erro ao registrar usuário:', error);
            //req.flash('error', 'Ocorreu um erro ao registrar o usuário');
        }
    }
    

    static logoutUsuario(req, res){
        req.session.destroy()
        res.redirect('/')
    }

}