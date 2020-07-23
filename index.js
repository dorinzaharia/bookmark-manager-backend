const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const {
  port
} = require("./config");

const app = express();
app.use(cors());

const searchRoutes = require("./routes/webSearch");

app.use("/search", searchRoutes);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Route does not exist",
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
