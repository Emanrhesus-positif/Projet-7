/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/user');

const app = express();

// express.static();
// path.join();

mongoose.connect(
  'mongodb+srv://romainbories09:aN7Gga4OccDYubsl@cluster0.4bxggvb.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// db connect : romainbories09 aN7Gga4OccDYubsl read write
// 0gtPL70EFfxatqMD publicuser101 read only
