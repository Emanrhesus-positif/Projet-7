const express = require('express');

const app = express();

app.use('/api/books', (req, res, next) => {
  const books = [
    {
      userId: 'kjdhf125er',
      title: 'le monde de jean claude',
      author: 'Paihr Nauhell',
      imageUrl: 'https://bourgoisediteur.fr/wp-content/uploads/2019/11/Tolkien-Le-Seigneur-des-Anneaux-broch%C3%A9.jpg',
      year: 1000,
      genre: 'Homme',
      ratings: [
        {
          userId: 'kjdhf125er',
          grade: 0.001,
        },
      ],
      averageRating: 0,
    },
    {
      userId: 'kjdhf125er',
      title: 'le monde de van damme',
      author: 'Nohaihr Pezz',
      imageUrl: 'https://img.livraddict.com/covers/183/183472/couv60527719.jpg',
      year: 1001,
      genre: 'Femme',
      ratings: [
        {
          userId: 'kjdhf125er',
          grade: 0.002,
        },
      ],
      averageRating: 1,
    },
  ];
  res.status(200).json(books);
  next();
});

module.exports = app;


// {
//   userId: String - identifiant MongoDB unique de l'utilisateur qui a créé le livre
//   title : String - titre du livre
//   author : String - auteur du livre
//   imageUrl : String - illustration / couverture du livre
//   year: Number - année de publication du livre
//   genre: String - genre du livre
//   ratings : [
//     {
//       userId: String - identifiant MongoDB unique de l'utilisateur qui a noté le livre
//       grade : Number - note donnée à un livre
//     }
//   ]- notes données à un livre
//   averageRating : Number - note moyenne du livre
// },
