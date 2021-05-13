const express = require('express');
const router = express.Router();
const Livro = require('../model/livro');

router.post ('', (req, res, next) => {
  const livro = new Livro({
    //id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    npaginas: req.body.npaginas
  })
  livro.save().
    then (livroInserido => {
      res.status(201).json({
      mensagem: 'Livro inserido',
      id: livroInserido._id
    })
  });
});

// router.get('/api/livros',async (req, res, next) => {
//   const result = await Livro.find({})
//   console.log(result);
//   res.status(200).json({
//     mensagem: "Tudo OK",
//     livros: result
//   });
// });
router.get('', (req, res, next) => {
  Livro.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      livros: documents
    });
  })
});

router.delete ('/:id', (req, res, next) => {
  console.log("id:", req.params.id);
  Livro.deleteOne ({_id: req.params.id}).then((resultado) => {
  console.log (resultado);
  res.status(200).json({mensagem: "Livro removido"})
  });
});





router.put('/:id', (req, res, next) => {
  const livro = new Livro({
    _id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    npaginas: req.body.npaginas
  });
  Livro.updateOne({_id: req.params.id}, livro)
  .then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Atualização realizada com sucesso"})
  });
});



router.get('/:id', (req, res, next) => {
  Livro.findById(req.params.id).then(liv => {
    if (liv) {
      res.status(200).json(liv);
    }
    else {
      res.status(404).json({mensagem: "Livro não encontrado!"})
    }
  })
});

module.exports = router;
