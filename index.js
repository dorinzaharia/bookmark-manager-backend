const express = require("express");
const https = require("https");
const url = require("url");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY;
const HOSTNAME = process.env.HOSTNAME;
const PATHNAME = process.env.PATHNAME;

if (!SUBSCRIPTION_KEY) {
  throw new Error("Missing the AZURE_SUBSCRIPTION_KEY environment variable");
}

app.get("/search", (req, res) => {
  const requestUrl = url.parse(
    url.format({
      protocol: "https",
      hostname: HOSTNAME,
      pathname: PATHNAME,
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

app.listen(PORT);
