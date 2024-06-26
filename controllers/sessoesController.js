const Terapeuta = require('../Models/Terapeutas')
const Usuario = require('../Models/Usuarios')
const Servicos = require('../Models/Servicos')

const Sessoes = require('../Models/Sessoes');

module.exports = class SessoesController{
    static createSession(req, res){
        res.render('sessao', (err, html) => {
            if (err) {
                console.error('Erro ao renderizar a página de sessão:', err);
                // Agora você pode lidar com o erro aqui, como enviar uma resposta de erro para o cliente
                res.status(500).send('Erro ao renderizar a página de sessão');
                return;
            }
            // Se não houver erro, você pode enviar o HTML renderizado normalmente
            res.send(html);
        });
    }
    static async sessoesDashboard(req, res) {
        const UsuarioId = req.session.usuarioid
    
        const user = await Usuario.findOne({
          where: {
            id: UsuarioId,
          },
          include: Sessoes,
          plain: true,
        })
    
        const sessoes = user.sessions.map((result) => result.dataValues)
    
        let emptySessoes = true
    
        if (Sessoes.length > 0) {
            emptySessoes = false
        }
    
        console.log(sessoes)
        console.log(emptySessoes)
    
        res.render('', { sessoes, emptySessoes })
      }

      static async createSessionSave(req, res){
        const UsuarioId = req.session.userid
        const data = req.body.data
        const horario = req.body.horario

        // intermediario pra achar o ID
        const terapeuta = req.body.terapeuta
        const massagem = req.body.massagem
        
        const idTerapeuta = await Terapeuta.findOne({
            where: {
                nome: terapeuta
            }
        })

        const idServicos = await Servicos.findOne({
            where:{
                nomeMassagem: massagem
            }
        })

        
        const Sessao = {
            idTerapeuta,
            UsuarioId,
            idServicos,
            horario,
            data
        }

        Sessoes.create(Sessao)
        .then(()=>{
            req.flash('message', 'Sessão criada com sucesso!')
            res.render('/sessao', {message: message})
        })
      }

      static delete(req, res){
        const id = req.body.id

        Sessoes.destroy({where: {id:id}})
        .then(()=>{
            req.flash('Sessão desmarcada com sucesso!')
            req.session.save(()=>{
                res.redirect('')
            })
        })
      }
        /*      
        static async confirmarSessao(req, res) {
            try {
                // Extrair os dados da sessão do corpo da requisição
                const { terapeuta, servico, data, horario } = req.body;
                
                // Salvar a sessão no banco de dados usando Sequelize
                await Sessoes.create({
                    terapeuta,
                    servico,
                    data,
                    horario
                });
    
                res.sendStatus(200); // Resposta de sucesso
            } catch (error) {
                console.error('Erro ao confirmar a sessão:', error);
                res.sendStatus(500); // Resposta de erro
            }
        } */
}

