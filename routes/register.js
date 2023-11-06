const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../schema/userSchema");
const router = express.Router();


router.post("/", async (req, res) => {

    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            res.send("Deja exista acest utilizator!");
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("Utilizator creat cu succes!");
        }
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});


module.exports = router    