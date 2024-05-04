const Servicos = require('../Models/Servicos')

module.exports = class ServicosController{
    static register(req, res){
        res.render('')
    }

    static registerPost(req, res){
        const {nomeMassagem, descricao, duracao, preco} = req.body

        const servico = {
            nomeMassagem, 
            descricao,
            duracao,
            preco
        }

        Servicos.create(servico)
        .then(() =>{ 
            req.flash('Serviço cadastrado com sucesso')
            res.render('')
        })
    }

    static delete(req, res){
        const id = req.body.id

        Servicos.destroy({where: {id: id}})
        .then(()=>{
            req.flash('Serviço removido com sucesso!')
            res.render('')
        })
    }
}