const express = require("express");
const https = require("https");
const url = require("url");
const cors = require("cors");

const {
  port,
  bingHostname,
  bingWebSearchPathname,
  bingWebSearchKey,
  bingCustomSearchPathname,
  bingCustomSearchKey,
  bingCustomSearchCustomConfig,
} = require("./config");

const app = express();
app.use(cors());

app.get("/search", (req, res) => {
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
      hostname: bingHostname,
      pathname: bingCustomSearchPathname,
      query: {
        q: req.query.q,
        customconfig: req.query.customconfig || bingCustomSearchCustomConfig,
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
      headers: { "Ocp-Apim-Subscription-Key": bingCustomSearchKey },
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

app.get("*", (req, res) => {
  res.status(500).json({
    message: "Route does not exist",
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
