const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const Terapeutas = db.define('terapeutas',{
    nome:{
        type: DataTypes.STRING
    },
    especialidade:{
        type: DataTypes.STRING
    }
})

module.exports = Terapeutas