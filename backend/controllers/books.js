/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const fs = require('fs');
const Book = require('../models/book');

exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  // eslint-disable-next-line no-underscore-dangle
  delete bookObject._id;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  book.save().then(
    () => {
      res.status(201).json({
        message: 'Livre sauvegardé',
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
exports.getOneBook = (req, res) => {
  Book.findOne({
    _id: req.params.id,
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
exports.modifyBook = (req, res) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Non autorisé' });
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Livre modifié!' }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
exports.deleteBook = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Non autorisé' });
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllBooks = (req, res) => {
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

exports.rateABook = (req, res) => {
  const rating = req.body;
  if (rating < 0 || rating > 5) {
    return res.status(400).json({ error: "Erreur sur le classement"});
  }
  Book.findOne({
    _id: req.params.id,
  }).then((book) => {
    const existingRatingIndex = book.ratings.findIndex(rating => rating.userId === req.body.userId);
    if (existingRatingIndex !== -1) {
      book.ratings[existingRatingIndex].grade = req.body.rating;
    } else {
      book.ratings.push({ userId: req.body.userId, grade: req.body.rating });
    }
    const totalRatings = book.ratings.length;

    const totalGrade = book.ratings.reduce((acc, current) => acc + current.grade, 0);
    const final = totalGrade / totalRatings;
    book.averageRating = final.toFixed(2);
    return book.save();
  }).then((updatedBook) => {
    res.status(200).json(updatedBook);
  }).catch((error) => {
    res.status(500).json({ error: 'Probleme sur le rating'});
  });
};

exports.getBestBooks = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json({ error: 'Probleme sur la recuperation des meilleurs livres '});
    });
};
