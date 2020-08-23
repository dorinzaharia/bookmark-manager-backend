// External imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field for bookmark is required"]
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        required: [true, "URL field is required"]
    },
    counter: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    collectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Collection'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);