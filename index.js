const express = require("express");
const https = require("https");
const url = require("url");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;
const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY;
if (!SUBSCRIPTION_KEY) {
  throw new Error("Missing the AZURE_SUBSCRIPTION_KEY environment variable");
}

app.get("/search", (req, res) => {
  const requestUrl = url.parse(
    url.format({
      protocol: "https",
      hostname: "api.cognitive.microsoft.com",
      pathname: "/bing/v7.0/search",
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
      headers: { "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY },
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

app.listen(port);
