const express = require("express");
const router = express.Router();
const Nunti = require("../schema/photo1Schema");
const Botezuri = require("../schema/photo2Schema");
const Diverse = require("../schema/photo3Schema");


router.get('/', (req, res) => {

    Promise.all([
        Nunti.find({}).exec(),
        Botezuri.find({}).exec(),
        Diverse.find({}).exec()
    ])

        .then(([nunti, botezuri, diverse]) => {

            const collections = [nunti, botezuri, diverse];

            const iteration = collections
                .filter(collection => collection.length > 0)
                .map(collection => {
                    return {
                        title: collection[0].title,
                        content: collection[0].content[0],
                    };
                });


            iteration.forEach((element) => {
                element.title,
                    element.content
            });

            res.send(iteration);
        })
        .catch((error) => {
            console.error('Eroare:', error);
            res.status(500);
        });
});


module.exports = router    