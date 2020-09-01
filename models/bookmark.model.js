// External imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookmarkSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title field for bookmark is required"],
        },
        description: {
            type: String,
        },
        url: {
            type: String,
            required: [true, "URL field is required"],
        },
        usageCounter: {
            type: Number,
            default: 0,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        collectionID: {
            type: Schema.Types.ObjectId,
            ref: "Collection",
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
    },
    { versionKey: false }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
