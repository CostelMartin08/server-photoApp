const mongoose = require("mongoose");


const Video = new mongoose.Schema({
    url: String,
    uploadedAt: {
        type: Date,
        default: Date.now(),
    },

},
    {
        collection: "Video",
    },);


module.exports = mongoose.model("Video", Video);