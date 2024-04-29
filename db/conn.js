const {Sequelize} = require('sequelize')
const sequelize  = new Sequelize('MaosMageadora', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})
try{
    sequelize.authenticate()
    console.log('Conectamos com o sequelize')
}
catch(error){
    console.log('Não foi possivel conectar')
}
module.exports = sequelize