const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  // auth non requis
  // Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données
  // émission : { message: string }
  // réception : { email: string, password: string }
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // auth non requis
  // Vérification des informations d'identification de l'utilisateur puis
  // renvoie l’_id de l'utilisateur depuis la base de données et un token
  // web JSON signé (contenant également l'_id de l'utilisateur).
  // Emission : { userId: string, token: string }
  // Réception : { email: string, password: string }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Login introuvable dans la BDD' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
          }
          res.status(200).json({
            userId: user.id,
            token: 'TOKEN',
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
