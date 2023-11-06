const express = require("express");
const router = express.Router();
require('dotenv').config();
const Nunti = require("../schema/photo1Schema");
const Botezuri = require("../schema/photo2Schema");
const Diverse = require("../schema/photo3Schema");
const Video = require("../schema/videoSchema");
const jwt = require('jsonwebtoken');


const checkAuthenticated = function (req, res, next) {

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token.replace(/^"(.*)"$/, '$1'), process.env.JWT_CODE, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(403).send('Token invalid sau incorect. Reconecteaza-te!');
    }
    req.user = decoded;
    next();
  });
};




router.delete('/:category/:id', checkAuthenticated, (req, res) => {

  const param = req.params.category;
  const id = req.params.id;

  let collection;
  switch (param) {
    case 'Nunti':
      collection = Nunti;
      break;
    case 'Botezuri':
      collection = Botezuri;
      break;
    case 'Diverse':
      collection = Diverse;
      break;
    default:
      res.status(404).send({ error: 'Categorie Invalida' });
      return;
  }


  const query = { _id: id };

  collection.deleteOne(query)
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send({ message: 'Evenimentul a fost sters din DB!'});
      } else {
        res.status(404).send({ error: 'Evenimentul nu a fost gasit in DB!' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

router.delete('/:url', checkAuthenticated, (req, res) => {

  const url = req.params.url;

  const query = { _id: url };

  Video.deleteOne(query)
    .then((result) => {
      res.send({ message: 'Videoclipul a fost sters din DB!' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });

});

module.exports = router;