const express = require('express');

const bookRoutes = require('./routes/books');

const authRoutes = require('./routes/user');

const app = express();

const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://romainbories09:aN7Gga4OccDYubsl@cluster0.4bxggvb.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use((req, res) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
});

module.exports = app;

// User {
//   email : String - adresse e-mail de l’utilisateur [unique]
//   password : String - mot de passe haché de l’utilisateur
//   }

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

// db connect : romainbories09 aN7Gga4OccDYubsl read write
// 0gtPL70EFfxatqMD publicuser101 read only
