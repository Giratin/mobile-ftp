const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = Schema({
    name : {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true
    },
    size : {
        type: Number
    }
},{
    timestamp: true
});

const Media = mongoose.model('media', MediaSchema);

module.exports = Media;