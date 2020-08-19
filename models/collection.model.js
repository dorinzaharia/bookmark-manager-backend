// External imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field for collection is required"]
    },
    emoji: {
        type: String
    }
});

module.exports = mongoose.model("Collection", CollectionSchema);