const express = require('express');
const router = express.Router();
const Livro = require('../model/livro');
const multer = require ("multer");
const checkAuth = require ('../middleware/check-auth');

const MIME_TYPE_EXTENSAO_MAPA = {
'image/png': 'png',
'image/jpeg': 'jpg',
'image/jpg': 'jpg',
'image/bmp': 'bmp'
}


const armazenamento = multer.diskStorage({
  //requisição, arquivo extraido e uma função a ser
  //executada, capaz de indicar um erro ou devolver
  //o diretório em que as fotos ficarão
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype] ? null : new Error ('Mime Type Invalido');
  callback(e, "Back-End/imagens")
},
filename: (req, file, callback) =>{
const nome = file.originalname.toLowerCase().split(" ").join("-");
const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
callback(null, `${nome}-${Date.now()}.${extensao}`);
}
})

router.post ('',checkAuth,multer({storage: armazenamento}).single('imagem'), (req, res, next) => {
  const imagemURL = `${req.protocol}://${req.get('host')}`
  const livro = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    npaginas: req.body.npaginas,
    imagemURL: `${imagemURL}/imagens/${req.file.filename}`
  })
  livro.save().then (livroInserido => {
      res.status(200).json({
      mensagem: 'Livro inserido',
     // id: livroInserido._id
     livro:{
       id:livroInserido._id,
       tituto:livroInserido.titulo,
       autor:livroInserido.autor,
       npaginas:livroInserido.npaginas,
       imagemURL: livroInserido.imagemURL
     }
    })
  })
});

router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const page = +req.query.page;
  const consulta = Livro.find();//só executa quando chamamos then
  let livroEncontrados;
  if (pageSize && page){
    consulta
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  }
  consulta.then(result =>{
  //console.log(result);
  livroEncontrados = result;
  //devolve uma Promise, tratada com o próximo then
   return Livro.count()
  })
  .then((count) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    livros:livroEncontrados,
    //devolvendo o count para o Front
    maxLivros: count
  });
})
});

router.delete ('/:id',checkAuth,(req, res, next) => {
  console.log("id:", req.params.id);
  Livro.deleteOne ({_id: req.params.id}).then((resultado) => {
  console.log (resultado);
  res.status(200).json({mensagem: "Livro removido"})
  });
});

router.put(
  '/:id',
  checkAuth,
  multer({ storage: armazenamento }).single('imagem'),
  (req, res, next) => {
   console.log (req.file);
   let imagemURL = req.body.imagemURL;//tentamos pegar a URL já existente
   if (req.file) { //mas se for um arquivo, montamos uma nova
  const url = req.protocol + "://" + req.get("host");
  imagemURL = url + "/imagens/" + req.file.filename;
}
  const livro = new Livro({
    _id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    npaginas: req.body.npaginas,
    imagemURL: imagemURL
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
