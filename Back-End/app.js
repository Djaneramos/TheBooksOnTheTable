const express = require ('express');
const app = express();
const Livro = require('./model/livro');
const mongoose = require('mongoose');
const env = require('./env');

mongoose.connect(`mongodb+srv://Djane:${env.mongoPassword}@cluster0.smulk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
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
  const livro = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    npaginas: req.body.npaginas
  })
  livro.save ().then (livroInserido => {
    res.status(200).json({
    mensagem: 'Livro inserido',
    id: livroInserido._id
 })
 });
});

app.get('/api/livros',async (req, res, next) => {
  const result = await Livro.find({})
  console.log(result);
  res.status(200).json({
    mensagem: "Tudo OK",
    livros: result
  });
});

app.delete ('/api/livros/:id', (req, res, next) => {
Livro.deleteOne ({_id: req.params.id}).then((resultado) => {
console.log (resultado);
res.status(200).json({mensagem: "Livro removido"})
});
});


module.exports = app;
