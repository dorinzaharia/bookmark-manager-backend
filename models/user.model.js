// External imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field for user is required"]
    },
    email: {
        type: String,
        required: [true, "Email field for user is required"],
        unique: [true, "Email field for user must be unique"]
    },
    password: {
        type: String,
        required: [true, "Password field for user is required"],
    },
    allowCollectingData: {
        type: Boolean,
        default: false
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Bookmark'
    }],
    collections: [{
        type: Schema.Types.ObjectId,
        ref: 'Collection'
    }],
    searchCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

module.exports = mongoose.model("User", UserSchema);


