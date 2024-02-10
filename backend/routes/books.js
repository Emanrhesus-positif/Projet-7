const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('../controllers/books');

const router = express.Router();
// router.get('/', (req, res, next) => {
//   // auth non requis
//   // Renvoie un tableau de tous les livres de la base de données.
//   // Emission : Array de books

//   const books = [
//     {
//       userId: 'kjdhf125er',
//       title: 'le monde de jean claude',
//       author: 'Paihr Nauhell',
//       imageUrl: 'https://bourgoisediteur.fr/wp-content/uploads/2019/11/Tolkien-Le-Seigneur-des-Anneaux-broch%C3%A9.jpg',
//       year: 1000,
//       genre: 'Homme',
//       ratings: [
//         {
//           userId: 'kjdhf125er',
//           grade: 0.001,
//         },
//       ],
//       averageRating: 0,
//     },
//     {
//       userId: 'kjdhf125er',
//       title: 'le monde de van damme',
//       author: 'Nohaihr Pezz',
//       imageUrl: 'https://img.livraddict.com/covers/183/183472/couv60527719.jpg',
//       year: 1001,
//       genre: 'Femme',
//       ratings: [
//         {
//           userId: 'kjdhf125er',
//           grade: 0.002,
//         },
//       ],
//       averageRating: 1,
//     },
//   ];

//   Book.find()
//     .then(books => res.status(200).json(books))
//     .catch(error => res.status(404).json({ error }));
//   res.status(200).json(books);
//   next();
// });
// router.post('/', (req, res, next) => {
//   // auth requis
//   // Capture et enregistre l'image, analyse le livre
//   // transformé en chaîne de caractères, et l'enregistre
//   // dans la base de données en définissant
//   // correctement son ImageUrl.
//   // Emission : { message: String } Verb
//   // Reception : { book: string, image: file } + token
//   delete req.body.id;
//   console.log(req.body);
//   const book = new Book({
//     ...req.body,
//   });
//   book.save()
//     .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
//     .catch(error => res.status(400).json({ error }));
//   next();
// });
// router.get('/:id', (req, res, next) => {
//   //auth non requis
//   //Renvoie le livre avec l’_id fourni.
//   Book.findOne({ id: req.params.id })
//     .then(book => res.status(200).json(book))
//     .catch(error => res.status(404).json({ error }));
//   next();
// });
// router.put('/:id', (req, res, next) => {
//   // auth requis
//   //   Met à jour le livre avec l'_id fourni. Si une image est
//   // téléchargée, elle est capturée, et l’ImageUrl du livre
//   // est mise à jour. Si aucun fichier n'est fourni, les
//   // informations sur le livre se trouvent directement
//   // dans le corps de la requête (req.body.title,
//   // req.body.author, etc.). Si un fichier est fourni, le livre
//   // transformé en chaîne de caractères se trouve dans
//   // req.body.book. Notez que le corps de la demande
//   // initiale est vide ; lorsque Multer est ajouté, il renvoie
//   // une chaîne du corps de la demande basée sur les
//   // données soumises avec le fichier.

//   // Emission : { message: string }
//   // Reception : EITHER Book as JSON OR { book: string, image: file }

//   Book.updateOne({ id: req.params.id }, { ...req.body, id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet modifié !' }))
//     .catch(error => res.status(400).json({ error }));
//   next();
// });
// router.delete('/:id', (req, res, next) => {
//   //auth requis
//   // Supprime le livre avec l'_id fourni ainsi que l’image associée.
//   //Emission : { message: string }
//   //Réception : rien + token
//   Book.deleteOne({ id: req.params.id })
//     .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
//     .catch(error => res.status(400).json({ error }));
//   next();
// });

router.get('/', booksCtrl.getAllBooks);
router.post('/', auth, multer, booksCtrl.createBook);
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);

router.post('/:id/rating', auth, (req, res, next) => {
  // auth requis
  //   Définit la note pour le user ID fourni.
  // La note doit être comprise entre 0 et 5.
  // L'ID de l'utilisateur et la note doivent être ajoutés au
  // tableau "rating" afin de ne pas laisser un utilisateur
  // noter deux fois le même livre.
  // Il n’est pas possible de modifier une note.
  // La note moyenne "averageRating" doit être tenue à
  // jour, et le livre renvoyé en réponse de la requête.
  // Emission : Single book
  // Reception : { userId: String, rating: Number } + token
  next();
});
router.get('/bestrating', (req, res, next) => {
  // auth non requis
  // Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne.
  // Emission : Array of books 

  console.log(req.body);
  res.status(201).json({ message: 'objet créé' });
  next();
});
module.exports = router;
