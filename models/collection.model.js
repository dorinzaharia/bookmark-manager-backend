// External imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title field for collection is required"],
        },
        emoji: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Collection", CollectionSchema);
