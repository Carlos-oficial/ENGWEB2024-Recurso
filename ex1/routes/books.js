var express = require('express');
var router = express.Router();
var booksController = require('../controllers/book');
var Livro = require("../models/livro")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  if (req.query.character){
    booksController.listByCharacter(req.query.character)
     .then(book => { res.jsonp(book) })
     .catch(error => { res.status(500).json({ message: 'error fetchin books' }) });
  } else if (req.query.genre){
    booksController.listByGenre(req.query.genre)
    .then(book => { res.jsonp(book) })
    .catch(error => { res.status(500).json({ message: 'error fetchin books' }) });
  } else if (req.query.author){
    booksController.listByAuthor(req.query.author)
     .then(book => { res.jsonp(book) })
     .catch(error => { res.status(500).json({ message: 'error fetchin books' }) });
  }
  else{
    booksController.list()
    .then(books => { res.jsonp(books) })
    .catch(error => { res.status(500).json({ message: 'error fetchin books' }) });
  }
});

router.get("/genres", async function (req, res, next) {
  console.log("HI");
  booksController.listGenres()
  .then(genres => { res.jsonp(genres.map(genre => genre._id)) })
  .catch(error => { res.status(500).json({ message: 'error fetching genres'}) });
})

router.get("/characters", async function (req, res, next) {
  console.log("HI");
  booksController.listCharacters()
  .then(characters => { res.jsonp(characters.map(c => c._id)) })
  .catch(error => { res.status(500).json({ message: 'error fetching characters'}) });
})
router.get('/:id', async function (req, res, next) {

  booksController.getByID(req.params.id)
    .then(book => { res.jsonp(book) })
    .catch(error => { res.status(500).json({ message: 'error fetchin books' }) });
})

router.delete('/:id', async function (req, res, next) {
  booksController.deleteByID(req.params.id)
    .then(book => { res.jsonp(book) })
    .catch(error => { res.status(500).json({ message: 'error fetchin books' }) });
})

module.exports = router;
