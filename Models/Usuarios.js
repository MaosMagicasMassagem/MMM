const {DataTypes} = require('sequelize')
const db = require('../db/conn')
const { allowedNodeEnvironmentFlags } = require('process')

const Usuario = db.define('usuarios', {
    nome:{
       type: DataTypes.STRING,
       alowNull: false
    },
    email:{
        type: DataTypes.STRING
    },
    senha:{
        type: DataTypes.STRING
    },
    papel:{
        type: DataTypes.STRING
    }
})

module.exports = Usuario