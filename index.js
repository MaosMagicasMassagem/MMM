const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const usuarioRoutes = require ('./routes/usuarioRoutes')

app.engine('handlebars', exphbs.engine())
app.set('view engine' , 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use (express.json())
app.use(usuarioRoutes)

app.listen(5000)


