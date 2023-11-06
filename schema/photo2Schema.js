const mongoose = require("mongoose");


const Botezuri = new mongoose.Schema({
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
        collection: "Botezuri",
    },);


module.exports = mongoose.model("Botezuri", Botezuri);