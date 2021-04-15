const express = require ('express');
const app = express();
const Livro = require('./model/livro');
const mongoose = require('mongoose');
const env = require('./env');

mongoose.connect(`mongodb+srv://mongo:${env.mongoPassword}@cluster0.f6nhk.mongodb.net/db_livros?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post ('/api/livros', (req, res, next) => {
  const book = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    npaginas: req.body.npaginas
  })
  book.save();
  res.status(201).json({mensagem: 'Livro inserido'})
});

app.get('/api/livros',async (req, res, next) => {
  const result = await Livro.find({})
  console.log("teste");
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: result
  });
});
module.exports = app;
