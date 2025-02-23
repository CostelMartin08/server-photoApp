const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    thumbnail:{type: String},
    url: { type: String, required: true },
    data: { type: Date, default: Date.now }, 
    category: { type: String, required: true }, 
    favorite: {type: Boolean},
});

const Video = mongoose.model('Video-Category', videoSchema);

module.exports = Video;