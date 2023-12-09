const express = require("express");
const router = express.Router();
require('dotenv').config();
const Nunti = require("../schema/photo1Schema");
const Botezuri = require("../schema/photo2Schema");
const Diverse = require("../schema/photo3Schema");
const Video = require("../schema/videoSchema");
const jwt = require('jsonwebtoken');
const fs = require('fs');

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

router.delete('/onePhoto', checkAuthenticated, async (req, res) => {

  try {

    const { category, title, param } = req.query;
    let collection;

    switch (category) {
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

    const filter = { title: title };
    const update = { $pull: { content: param } };

    const upd = await collection.findOneAndUpdate(filter, update, { new: true });

    if (!upd) {
      res.status(404).send({ error: 'Fotografia nu a fost gasită' });
      return;
    }

    res.status(200).send('Fotografie ștearsă!');

    const file = `./public/uploads/${collection.modelName}/${title}/${title}-${param}`;

    fs.unlink(file, (err) => {
      if (err) {
        console.error('Eroare la ștergerea fișierului:', err);
        return;
      }

      console.log('Fișierul a fost șters cu succes!');
    });

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }

});


router.delete('/:category/:id', checkAuthenticated, (req, res) => {

  const { param, id } = req.param
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
        res.send({ message: 'Evenimentul a fost sters din DB!' });
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