const mongoose = require("mongoose");


const Nunti = new mongoose.Schema({
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
        collection: "Nunti",
    },);


module.exports = mongoose.model("Nunti", Nunti);