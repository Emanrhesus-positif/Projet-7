/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
const fs = require('fs');
const Book = require('../models/book');

exports.createBook = (req, res, next) => {
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
        message: 'Book saved successfully!',
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
exports.getOneBook = (req, res, next) => {
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
exports.modifyBook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  } : { ...req.body };

  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Livre modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
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

exports.rateABook = (req, res, next) => {
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
    res.status(500).json({ error: "Probleme sur le rating" });
  });
};

exports.getBestBooks = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json({ error: "Probleme sur la recuperation des meilleurs livres" });
    });
};

// router.post('/:id/rating', auth, (req, res, next) => {
//   // auth requis
//   //   Définit la note pour le user ID fourni.
//   // La note doit être comprise entre 0 et 5.
//   // L'ID de l'utilisateur et la note doivent être ajoutés au
//   // tableau "rating" afin de ne pas laisser un utilisateur
//   // noter deux fois le même livre.
//   // Il n’est pas possible de modifier une note.
//   // La note moyenne "averageRating" doit être tenue à
//   // jour, et le livre renvoyé en réponse de la requête.
//   // Emission : Single book
//   // Reception : { userId: String, rating: Number } + token
// 
// });
// router.get('/bestrating', (req, res, next) => {
//   // auth non requis
//   // Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne.
//   // Emission : Array of books 

//   console.log(req.body);
//   res.status(201).json({ message: 'objet créé' });
// 
// });