const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post("/", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) return res.status(404).json({ message: "ID sau parolă greșite" });
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                const token = jwt.sign({ id: req.user.id, username: req.user.username }, process.env.JWT_CODE, { expiresIn: '1h' });
                res.status(200).json({token: token});
            });
        }
    })(req, res, next);
});

module.exports = router    