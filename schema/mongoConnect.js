const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://admin-costel:${process.env.MONGO_SECRET}@atlascluster.49fubwp.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectat la baza de date MongoDB');
    })
    .catch(error => {
        console.error('Eroare la conectarea la baza de date MongoDB:', error);
    });

module.exports = mongoose;