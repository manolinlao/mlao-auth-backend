const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// crea el servidor de Express
const app = express();

// conexión con la DB de Mongo
dbConnection();

// Directorio Público
app.use( express.static('public') );

// cors
app.use( cors() );

// middleware para leer info del body
app.use( express.json() );

// rutas
// las rutas serán por ejemplo: http:localshot:4000/api/auth/renew
app.use('/api/auth', require('./routes/auth'));

// levanta la app de Express
// lo hacemos en un puerto que no sea el 4200, que es el que usa Angular
app.listen(process.env.PORT,()=>{
  console.log(`server running on port ${process.env.PORT}`);
});
