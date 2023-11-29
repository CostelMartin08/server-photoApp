const mongoose = require("mongoose");


const Video = new mongoose.Schema({
    url: String,
    data: Number,

},
    {
        collection: "Video",
    },);


module.exports = mongoose.model("Video", Video);