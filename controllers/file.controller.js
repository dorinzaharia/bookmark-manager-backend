// External imports
const cheerio = require("cheerio");
const netscape = require("netscape-bookmarks");

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
        await $("a").each(async function (index, a) {
            let $a = $(a);
            let title = $a.text();
            let url = $a.attr("href");
            let bookmark = new Bookmark({
                userId,
                title: title || " ",
                url,
            });
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
    export: async (req, res) => {
        const { userId } = req.params;
        const bookmarksArray = await Bookmark.find({ userId })
        const bookmarks = {};
        bookmarksArray.map(bookmark => { return bookmarks[bookmark.title] = bookmark.url});
        var html = netscape(bookmarks);
        const date = new Date();
        const dd = date.getDate();
        const mm = date.getMonth() + 1; 
        const yyyy = date.getFullYear();
        res.attachment("bookmarks" + dd + "_" + mm + "_" + yyyy + ".html");
        res.send(Buffer.from(html));
    },
};
