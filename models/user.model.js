// External imports
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name field for user is required"],
        },
        email: {
            type: String,
            required: [true, "Email field for user is required"],
            unique: [true, "Email field for user must be unique"],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password field for user is required"],
            select: false,
        },
        allowCollectingData: {
            type: Boolean,
            default: false,
        },
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Bookmark",
            },
        ],
        collections: [
            {
                type: Schema.Types.ObjectId,
                ref: "Collection",
            },
        ],
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
    },
    { versionKey: false }
);

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(this.password, salt, function (err, hash) {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("User", UserSchema);
