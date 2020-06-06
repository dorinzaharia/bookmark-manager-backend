const express = require("express");
const https = require("https");
const url = require("url");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME;
const WEB_SEARCH_PATHNAME = process.env.WEB_SEARCH_PATHNAME;
const CUSTOM_SEARCH_PATHNAME = process.env.CUSTOM_SEARCH_PATHNAME;
const WEB_SEARCH_KEY = process.env.WEB_SEARCH_KEY;
const CUSTOM_SEARCH_KEY = process.env.CUSTOM_SEARCH_KEY;

app.get("*", (req, res) => {
  res.status(500).json({
    message: "Route does not exist",
  });
});

app.get("/search", (req, res) => {
  const requestUrl = url.parse(
    url.format({
      protocol: "https",
      hostname: HOSTNAME,
      pathname: WEB_SEARCH_PATHNAME,
      query: {
        q: req.query.q,
        count: req.query.count || 10,
        offset: req.query.offset || 0,
        mkt: req.query.mkt || "en-US",
      },
    })
  );
  https.get(
    {
      hostname: requestUrl.hostname,
      path: requestUrl.path,
      headers: { "Ocp-Apim-Subscription-Key": WEB_SEARCH_KEY },
    },

    (response) => {
      let body = [];
      response
        .on("data", (responseData) => {
          body += responseData;
        })
        .on("end", () => {
          const data = JSON.parse(body);
          res.status(200).json(data);
        })
        .on("error", (error) => {
          res.status(500).json({ error });
        });
    }
  );
});

app.get("/customsearch", (req, res) => {
  const requestUrl = url.parse(
    url.format({
      protocol: "https",
      hostname: HOSTNAME,
      pathname: CUSTOM_SEARCH_PATHNAME,
      query: {
        q: req.query.q,
        customconfig: req.query.customconfig,
        count: req.query.count || 10,
        offset: req.query.offset || 0,
        mkt: req.query.mkt || "en-US",
      },
    })
  );
  https.get(
    {
      hostname: requestUrl.hostname,
      path: requestUrl.path,
      headers: { "Ocp-Apim-Subscription-Key": CUSTOM_SEARCH_KEY },
    },

    (response) => {
      let body = [];
      response
        .on("data", (responseData) => {
          body += responseData;
        })
        .on("end", () => {
          const data = JSON.parse(body);
          res.status(200).json(data);
        })
        .on("error", (error) => {
          res.status(500).json({ error });
        });
    }
  );
});

app.listen(PORT);
