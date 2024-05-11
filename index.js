const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const usuarioRoutes = require('./routes/usuarioRoutes');
const db = require('./db/conn');


const Usuario = require('./models/Usuarios');
const Servicos = require('./models/Servicos');
const Terapeutas = require('./models/Terapeutas');
const Sessoes = require('./models/Sessoes');

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 36000000,
      expires: new Date(Date.now() + 36000000),
      httpOnly: true,
    },
  }),
)

app.use(flash());

app.use((req, res, next) =>{
  console.log(req.session.userID)

  if (req.session.usuarioid){
    res.locals.session = req.session;
  }

  next();
});
async function syncDatabase() {
  try {
    await Usuario.sync();
    await Servicos.sync();
    await Terapeutas.sync();
    await Sessoes.sync();
    console.log('Modelo sincronizado com o banco de dados');
    // Inicia o servidor após a sincronização
    app.listen(5000, () => {
      console.log('Servidor iniciado na porta 7000');
    });
  } catch (error) {
    console.error('Erro ao sincronizar modelo com o banco de dados:', error);
  }
}

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(usuarioRoutes);

syncDatabase();



