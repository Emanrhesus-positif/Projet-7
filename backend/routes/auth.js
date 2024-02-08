const express = require('express');

const router = express.Router();

router.post('/login', (req, res, next) => {
  // auth non requis
  // Vérification des informations d'identification de l'utilisateur puis
  // renvoie l’_id de l'utilisateur depuis la base de données et un token
  // web JSON signé (contenant également l'_id de l'utilisateur).
  // Emission : { userId: string, token: string }
  // Réception : { email: string, password: string }
  next();
});
router.post('/signup', (req, res, next) => {
  // auth non requis
  // Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données
  // émission : { message: string }
  // réception : { email: string, password: string }
  next();
});

module.exports = router;
