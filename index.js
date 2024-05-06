const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const usuarioRoutes = require('./routes/usuarioRoutes');
const db = require('./db/conn');
const Usuario = require('./models/Usuarios');
const Servicos = require('./models/Servicos');
const Terapeutas = require('./models/Terapeutas');
const Sessoes = require('./models/Sessoes');

// Sincronize o modelo com o banco de dados de forma assíncrona
async function syncDatabase() {
  try {
    await Usuario.sync();
    await Servicos.sync();
    await Terapeutas.sync();
    await Sessoes.sync();
    console.log('Modelo sincronizado com o banco de dados');
    // Inicie o servidor após a sincronização
    app.listen(5000, () => {
      console.log('Servidor iniciado na porta 5000');
    });
  } catch (error) {
    console.error('Erro ao sincronizar modelo com o banco de dados:', error);
  }
}

// Configurações do Express
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(usuarioRoutes);

// Chame a função para sincronizar o modelo com o banco de dados
syncDatabase();
