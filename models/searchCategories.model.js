// External imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field for category is required"]
    },
    values: [String]
});

module.exports = mongoose.model("Category", CategorySchema);