const express = require ('express');
const app = express();
const livros = [
{
    id: '1',
    nome: 'Jose',
    fone: '11223344',
    email: 'jose@email.com'
},
{
     id: '2',
     nome: 'Jaqueline',
     fone: '22112211',
     email: 'jaqueline@email.com'
 }
]
app.use('/api/livros',(req, res, next) => {
res.status(200).json({
  mensagem = "não gosto de ler",
  livros: livros
});
});
module.exports = app;
