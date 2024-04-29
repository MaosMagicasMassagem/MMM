const db = require('../db/conn')
const { DataTypes } = require('sequelize')
const Usuarios = require('../Models/Usuarios')
const Terapeuta = require('../Models/Terapeutas')
const Servicos = require('../Models/Servicos')

const Sessoes = db.define('sessoes', {
    data:{
        type: DataTypes.DATEONLY
    },
    horario:{
        type: DataTypes.TIME
    }
})

Usuarios.hasMany(Sessoes);
Terapeuta.hasMany(Sessoes);
Servicos.hasMany(Sessoes);

module.exports = Sessoes