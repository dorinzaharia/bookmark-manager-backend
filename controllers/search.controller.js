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
    web: (req, res) => {
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
        const { tags } = req.body;
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
                        if (data && tags) {
                            data.map((item) => {
                                item.match = 0;
                                tags.map((str) => {
                                    item.snippet
                                        .toLowerCase()
                                        .includes(str.toLowerCase())
                                        ? item.match++
                                        : item.match;
                                });
                            });
                            const result = data.sort(
                                (a, b) => b.match - a.match
                            );
                            return res.status(200).json(result);
                        }
                        return res.status(200).json(data);
                    });
            }
        );
    },
    custom: (req, res) => {
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
        const { tags } = req.body;
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
                        if (data && tags) {
                            data.map((item) => {
                                item.match = 0;
                                tags.map((str) => {
                                    item.snippet
                                        .toLowerCase()
                                        .includes(str.toLowerCase())
                                        ? item.match++
                                        : item.match;
                                });
                            });
                            const result = data.sort(
                                (a, b) => b.match - a.match
                            );
                            return res.status(200).json(result);
                        }
                        return res.status(200).json(data);
                    });
            }
        );
    },
};
