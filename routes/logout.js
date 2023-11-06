const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    req.logout(err => {
        if (err) throw err;
        res.status(200).json({ message: "Deconectare cu succes!" });
    });
});

module.exports = router    