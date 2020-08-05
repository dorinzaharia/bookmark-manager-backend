// External imports
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");

// Internal imports
const { port } = require("./config/common.config");
const { dbUsername, dbPassword, dbCluster, dbName } = require("./config/database.config");
const searchRoutes = require("./routes/search.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/search", searchRoutes);


// Database
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@${
             dbCluster}.mongodb.net/${dbName}?retryWrites=true`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(uri, options)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("*", (req, res) => {
  res.status(404).json({
    message: "Route does not exist",
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
