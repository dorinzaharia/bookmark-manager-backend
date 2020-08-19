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
    collection_id: {
        type: Schema.Types.ObjectId,
        ref: 'Collection'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    counter: {
        type: Integer,
        default: 0
    },

});

module.exports = mongoose.model("Bookmark", BookmarkSchema);