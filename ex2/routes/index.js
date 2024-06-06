var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  fetch('http://localhost:17000/books')
  .then((response) => response.json())
  .then((data) => {res.render('index', { title: 'Livros', books: data });})

});
router.get("authors/:id", function(req, res, next) {
  fetch('http://localhost:17000/books?author='+req.params.id)
  .then((response) => response.json())
  .then((data) => {res.render('author', { author: data });})
})

router.get('/:id', function(req, res, next) {
  fetch('http://localhost:17000/books/'+req.params.id)
  .then((response) => response.json())
  .then((data) => {res.render('livro', { book: data });})
});



module.exports = router;
