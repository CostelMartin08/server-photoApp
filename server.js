/* -------------------------------------------------------------------------- */
/*                                  Iporturi                                  */
/* -------------------------------------------------------------------------- */
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const app = express();
const path = require('path');
const port = 5000;
/* -------------------------------------------------------------------------- */
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const uploadRouter = require('./routes/upload');
const allContent = require('./routes/allContent');
const deleteRouter = require('./routes/delete');

/* -------------------------------------------------------------------------- */
const database = require('./schema/mongoConnect');
require('dotenv').config();
/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */

const publicDirectoryPath = path.join(__dirname, 'public');

//const buildDirectoryPath = path.join(__dirname, 'client', 'dist');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicDirectoryPath));

//app.use(express.static(buildDirectoryPath));

app.use(
    cors({
        origin: ['http://localhost:5173', 'https://martinescuconstantin.com'],
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.CODE,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser(process.env.CODE));
app.use(passport.initialize());
app.use(passport.session());
require('./packages/passportConfig')(passport);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

app.use('/api/login', loginRouter);
app.use('/api/disconnection', logoutRouter);
app.use('/api/register', registerRouter);
app.use('/api/galerie', uploadRouter);
app.use('/api/allContent', allContent);
app.use('/api/delete', deleteRouter);



app.get('/api/user', (req, res) => {
    res.send(req.user);
});


app.post('/api/send-email-site', (req, res) => {

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


app.post('/api/send-email', (req, res) => {

    const nume = req.body.nume;
    const email = req.body.email;
    const telefon = req.body.telefon;
    const subiect = req.body.subiect;
    const data = req.body.data;
    const mesaj = req.body.mesaj;


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
        to: 'andreib3100@gmail.com',
        subject: `balanandrei.ro - ${subiect}`,
        text: `  Hei Andrei! Domnul/Doamna ${nume} cu numarul de telefon ${telefon} e interesat/iteresata de serviciile tale.
        Data solicitarii: ${data};
        Subiect: ${subiect};
        Mesaj: ${mesaj}`,
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




{/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});*/}



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
