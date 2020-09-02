// External imports
const cheerio = require("cheerio");

// Internal imports
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");

module.exports = {
    import: async (req, res) => {
        if (!req.files) {
            return res.status(400).json({
                status: false,
                message: "No file uploaded",
            });
        }
        // User ID
        const { userId } = req.params;

        const $ = cheerio.load(req.files.bookmarks.data);
        const user = await User.findById(userId);
        await $("a").each(async function(index, a) {
            let $a = $(a);
            let title = $a.text();
            let url = $a.attr("href");
            let bookmark = new Bookmark({
                userId,
                title: title || " ",
                url
            })
            bookmark.userId = user;
            user.bookmarks.push(bookmark);
            await bookmark.save();

        });
        await user.save();

        return res.status(201).json({
            status: true,
            message: "Bookmarks imported",
        });
    },
};