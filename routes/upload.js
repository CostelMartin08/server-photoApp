const express = require("express");
const router = express.Router();
require('dotenv').config();
const upload = require('../packages/multerConfig');
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

/*
router.get('/video', (req, res) => {

    Video.find({})
        .then(foundVideo => {
            if (foundVideo) {
                res.send(foundVideo);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500);
        });


});

*/

router.get("/video/:parametruURL", (req, res) => {
    const param = req.params.parametruURL;

    const validCategories = ["Nunti", "Botezuri", "Diverse"];
    if (!validCategories.includes(param)) {
        res.status(404).send({ error: 'Categorie invalidă!' });
        return;
    }

    Video.find({ category: param })
        .then((videos) => {
            if (videos.length === 0) { 
                res.status(404).send({ error: 'Nu s-au găsit videoclipuri în această categorie!' });
            } else {
                const selectedFields = videos.map((video) => ({
                    _id: video._id,
                    title: video.title,
                    description: video.description,
                    thumbnail: video.thumbnail,
                    url: video.url,
                    data: video.data,
                }));
                res.send(selectedFields);
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: 'Eroare la încărcarea videoclipurilor!' });
        });
});

router.get("/:parametruURL", (req, res) => {

    const param = req.params.parametruURL;

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

    collection.find()
        .then((gallery) => {
            if (gallery) {

                const selectedFields = gallery.map((item) => {

                    return {
                        _id: item._id,
                        title: item.title,
                        data: item.data,
                        favorit: item.favorit,
                        content: item.content[0]
                    }
                });


                res.send(selectedFields);

            } else {
                res.status(404).send({ error: 'Nu s-au gasit evenimentele!' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });
});


router.get("/:even/:title", (req, res) => {

    const eveniment = req.params.even;
    const title = req.params.title;

    let collection;
    switch (eveniment) {
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


    collection.findOne({ title: title })
        .then((document) => {
            if (document) {
                res.send(document);
            } else {
                res.status(404).send({ error: 'Titlul cautat nu exista in DB!' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
        });

});


router.post("/", checkAuthenticated, upload.fields([

    { name: 'nunti', maxCount: 100 },
    { name: 'botezuri', maxCount: 100 },
    { name: 'diverse', maxCount: 100 }

]), (req, res) => {

    const filtredData = [];
    const category = req.body.select;
    const fav = req.body.favorite;
    const time = Date.now();

    switch (category) {

        case 'Nunti':
            if (Array.isArray(req.files['nunti'])) {
                req.files['nunti'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['nunti']) {
                filtredData.push(req.files['nunti'].originalname);
            }

            const newNunta = new Nunti({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });

            Nunti.create(newNunta)
                .then((createdNunta) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        case 'Botezuri':

            if (Array.isArray(req.files['botezuri'])) {
                req.files['botezuri'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['botezuri']) {
                filtredData.push(req.files['botezuri'].originalname);
            }
            const newBotez = new Botezuri({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });
            Botezuri.create(newBotez)
                .then((createdBotez) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        case 'Diverse':

            if (Array.isArray(req.files['diverse'])) {
                req.files['diverse'].forEach((element) => filtredData.push(element.originalname));
            } else if (req.files['diverse']) {
                filtredData.push(req.files['diverse'].originalname);
            }

            const newDiverse = new Diverse({
                content: filtredData,
                title: req.body.text,
                description: req.body.textArea,
                data: time,
                favorit: fav,
            });
            Diverse.create(newDiverse)
                .then((createdDiverse) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    res.sendStatus(500);
                    console.error(error);
                });
            break;

        default:
            res.status(404).send({ error: 'Categorie Invalida' });
    }

});

router.post('/video', upload.fields([{ name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
    const { category, title, description, favorite, titlex } = req.body;
    let thumbnailPath = req.files['thumbnail'] ? req.files['thumbnail'][0].path : null; 

    if (!category  || !thumbnailPath) {
        return res.status(400).send({ error: 'Unele campuri sunt necesare!' });
    }

    thumbnailPath = thumbnailPath.replace(/\\/g, "/");

    try {
        const newVideo = new Video({
            title: titlex, 
            description,
            url: title, 
            thumbnail: thumbnailPath, 
            category,
            favorite: favorite === 'true'
        });

        await newVideo.save();
        res.status(200).send({ message: 'Videoclip încărcat cu succes!' });
    } catch (error) {
        console.error('Eroare la încărcare:', error);
        res.status(500).send({ error: 'Eroare la încărcarea videoclipului!' });
    }
});


module.exports = router    
