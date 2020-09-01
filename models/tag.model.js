// External imports
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title field for tag is required"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model("Tag", TagSchema);
