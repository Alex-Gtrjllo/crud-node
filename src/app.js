const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// importando rutas
const customerRoutes = require('./routes/customer');

// configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'alexito2012',
  port: 3307,
  database: 'crudnodejsmysql'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// rutas
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// correr servidor
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
