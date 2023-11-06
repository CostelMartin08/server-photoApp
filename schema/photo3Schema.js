const mongoose = require("mongoose");


const Diverse = new mongoose.Schema({
    content: {
        type: Array,
        required: true,
    },
    title: String,
    description: String,
    data: Number,
    favorit: String,

},
    {
        collection: "Diverse",
    },);


module.exports = mongoose.model("Diverse", Diverse);