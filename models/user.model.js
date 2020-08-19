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
    },
    password: {
        type: String,
        required: [true, "Password field for user is required"],
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Bookmark'
    }],
    collections: [{
        type: Schema.Types.ObjectId,
        ref: 'Collection'
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

module.exports = mongoose.model("User", UserSchema);


