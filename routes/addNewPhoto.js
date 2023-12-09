const express = require("express");
const router = express.Router();
require('dotenv').config();
const uploadMiddleware = require('../packages/multerConfig.v2');
const jwt = require('jsonwebtoken');
const Nunti = require("../schema/photo1Schema");
const Botezuri = require("../schema/photo2Schema");
const Diverse = require("../schema/photo3Schema");

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


router.put("/:category/:title/:id", checkAuthenticated, (req, res, next) => {

    uploadMiddleware({ title: req.params.title, category: req.params.category })(req, res, next);

}, async (req, res) => {

    try {
      
        const uploadedFiles = req.file;
        const id = req.params.id;
        let filtredData = uploadedFiles.originalname;

        const filter = { _id: id };
        const update = { $push: { content: filtredData} };

        let upd = await Nunti.findOneAndUpdate(filter, update, { new: true });


        res.status(200).send('Datele au fost procesate cu succes.');

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});



module.exports = router    