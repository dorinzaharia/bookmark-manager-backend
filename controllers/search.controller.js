// External imports
const https = require("https");
const url = require("url");

// Internal imports
const {
    bingHostname,
    bingWebSearchPathname,
    bingWebSearchKey,
    bingCustomSearchPathname,
    bingCustomSearchKey,
    bingCustomSearchCustomConfig,
} = require("../config/search.config");

module.exports = {
    webSearch: (req, res, next) => {
        const requestUrl = url.parse(
            url.format({
                protocol: "https",
                hostname: bingHostname,
                pathname: bingWebSearchPathname,
                query: {
                    q: req.query.q,
                    count: req.query.count || 10,
                    offset: req.query.offset || 0,
                    mkt: req.query.mkt || "en-US",
                },
            })
        );
        const searchKeyWords = req.body.keysArray;
        https.get(
            {
                hostname: requestUrl.hostname,
                path: requestUrl.path,
                headers: { "Ocp-Apim-Subscription-Key": bingWebSearchKey },
            },
            (response) => {
                let body = [];
                response
                    .on("data", (responseData) => {
                        body += responseData;
                    })
                    .on("end", () => {
                        const data = JSON.parse(body).webPages.value;
                        data.map((item) => {
                            item.contains = 0;
                            searchKeyWords.map((str) => {
                                item.snippet
                                    .toLowerCase()
                                    .includes(str.toLowerCase())
                                    ? item.contains++
                                    : item.contains;
                            });
                        });
                        const result = data.sort(
                            (a, b) => b.contains - a.contains
                        );
                        res.status(200).json(result);
                    })
                    .on("error", (error) => {
                        next(error);
                    });
            }
        );
    },
    customSearch: (req, res, next) => {
        const requestUrl = url.parse(
            url.format({
                protocol: "https",
                hostname: bingHostname,
                pathname: bingCustomSearchPathname,
                query: {
                    q: req.query.q,
                    customconfig:
                        req.query.customconfig || bingCustomSearchCustomConfig,
                    count: req.query.count || 10,
                    offset: req.query.offset || 0,
                    mkt: req.query.mkt || "en-US",
                },
            })
        );
        const searchKeyWords = req.body.keysArray;
        https.get(
            {
                hostname: requestUrl.hostname,
                path: requestUrl.path,
                headers: { "Ocp-Apim-Subscription-Key": bingCustomSearchKey },
            },

            (response) => {
                let body = [];
                response
                    .on("data", (responseData) => {
                        body += responseData;
                    })
                    .on("end", () => {
                        const data = JSON.parse(body).webPages.value;
                        data.map((item) => {
                            item.contains = 0;
                            searchKeyWords.map((str) => {
                                item.snippet
                                    .toLowerCase()
                                    .includes(str.toLowerCase())
                                    ? item.contains++
                                    : item.contains;
                            });
                        });
                        const result = data.sort(
                            (a, b) => b.contains - a.contains
                        );
                        res.status(200).json(result);
                    })
                    .on("error", (error) => {
                        res.status(500).json({ error });
                    });
            }
        );
    },
};
