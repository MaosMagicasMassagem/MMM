const Terapeuta = require('../Models/Terapeutas')

module.exports = class TerapeutaController{
    static page(req, res){
        res.render('')
    }

    static pagePost(req,res){
        const {nome, especialidade} = req.body

        const terapeuta ={
            nome,
            especialidade
        }

        Terapeuta.create(terapeuta)
        .then(()=> res.render(''))
    }

    static show(req, res){
        Terapeuta.findAll({raw: true})
        .then((data)=> {(res.render(''), {terapeuta: data})})
    }

    static delete(req, res){
        const id = req.body

        Terapeuta.destroy({where: {id:id}})
        .then(()=>{
            req.flash('Terapeuta removido com sucesso!')
            res.render('')
        })
        
    }
}