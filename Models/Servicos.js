const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const Servicos = db.define('servicos',{
    nomeMassagem:{
        type: DataTypes.STRING
    },
    descricao:{
        type: DataTypes.STRING
    },
    duracao:{
        type: DataTypes.TIME
    },
    preco:{
        type: DataTypes.DECIMAL
    }
})

module.exports = Servicos