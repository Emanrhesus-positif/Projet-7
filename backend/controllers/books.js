/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const Book = require('../models/book');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  // eslint-disable-next-line no-underscore-dangle
  delete bookObject._id;

  const book = new Book({
    ...bookObject,
    userId: req.auth.id,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  console.log(book);
  console.log(book.title);
  book.save().then(
    () => {
      res.status(201).json({
        message: 'Book saved successfully!',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    },
  );
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({
    id: req.params.id,
  }).then(
    (book) => {
      res.status(200).json(book);
    },
  ).catch(
    (error) => {
      res.status(404).json({
        error: error,
      });
    },
  );
};

exports.modifyBook = (req, res, next) => {
  const book = new Book({
    id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
  });
  Book.updateOne({ id: req.params.id }, book).then(
    () => {
      res.status(201).json({
        message: 'Book updated successfully!',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error: error,
      });
    },
  );
};

exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error: error,
      });
    },
  );
};

exports.getAllBooks = (req, res, next) => {
  Book.find().then(
    (books) => {
      res.status(200).json(books);
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error: error,
      });
    },
  );
};
