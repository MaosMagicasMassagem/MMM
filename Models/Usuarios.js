const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuarios', {
    nome:{
       type: DataTypes.STRING,
       allowNull: false
    },
    email:{
        type: DataTypes.STRING
    },
    senha:{
        type: DataTypes.STRING
    }
})

module.exports = Usuario