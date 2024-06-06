const mongoose = require('mongoose')
var Livro = require("../models/livro")

module.exports.list = () => {
    return Livro.find().exec()
}


module.exports.getByID = (id) => {
    return Livro.findOne({ bookId: id }).exec()
}

module.exports.listByCharacter = (name) => {
    return Livro.find({ characters: { $regex: name, $options: "i" } }).exec()
}

module.exports.listByGenre = (genre) => {
    return Livro.find({ genres: genre }).exec()
}

module.exports.listByAuthor = (name) => {
    return Livro.find({ authors: name}).exec()
}


module.exports.listGenres = () => {
    return Livro.aggregate([
        { $unwind: "$genres" },                           
        { $group: { _id: "$genres" } },                    
        { $sort: { _id: 1 } }                              
    ]).exec()
}

module.exports.listCharacters = () => {
    return Livro.aggregate([
        { $unwind: "$characters" },                           
        { $group: { _id: "$characters" } },                    
        { $sort: { _id: 1 } }                              
    ]).exec()
}

module.exports.deleteByID = (id) => {
    return Livro.deleteOne({ bookId: id }).exec()
}

module.exports.create = (bookData) => {
    const book = new Livro(bookData);
    return book.save();
  };
  
module.exports.updateByID = (id, updatedData) => {
    return Livro.findOneAndUpdate({ bookId: id }, updatedData, { new: true }).exec();
};