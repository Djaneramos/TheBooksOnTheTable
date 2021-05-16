const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const env = require('./env');
const livroRoutes = require ('./rotas/livros');

mongoose.connect(`mongodb+srv://angular:${env.mongoPassword}@cluster0.djhgu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log ("Conexão OK")
}).catch((e) => {
  console.log("Conexão NOK")
  console.log(e);
});

app.use(express.json());

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use ('/api/livros',livroRoutes);

module.exports = app;
