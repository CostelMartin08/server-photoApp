const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
//Martinescu Constantin App

router.post('/', (req, res) => {

    const nume = req.body.nume;
    const email = req.body.email;
    const subiect = req.body.subiect;


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_CODE,
            pass: process.env.EMAIL_SECRET,
        }
    });

    const mailOptions = {
        from: email,
        to: 'costelmartinescu2000@gmail.com',
        subject: `martinescuconstantin.com - ${nume}`,
        text: `  Hei Costel! Domnul/Doamna ${nume} e interesat/interesata de serviciile tale sau de tine :))
        Adresa de email este: ${email}.
        Subiect: ${subiect}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Eroare la trimiterea e-mailului.' });
        } else {
            res.json({ message: 'E-mail trimis cu succes!' });
        }
    });
})

module.exports = router  
