// External imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

// Internal imports
// Internal imports | Constants
const { port } = require("./config/common.config");
const {
    dbUsername,
    dbPassword,
    dbCluster,
    dbName,
} = require("./config/database.config");

// Internal imports | Routes
const searchRoutes = require("./routes/search.routes");
const userRoutes = require("./routes/user.routes");
const bookmarkRoutes = require("./routes/bookmark.routes");
const collectionRoutes = require("./routes/collection.routes");
const tagRoutes = require("./routes/tag.routes");

const app = express();

// Middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware | Routes
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/bookmarks", bookmarkRoutes);
app.use("/collections", collectionRoutes);
app.use("/tags", tagRoutes);

// Database connection
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}.mongodb.net/${dbName}?retryWrites=true`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(uri, options)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err));

// Handle 404 errors and forward to error handler
app.use((req, res, next) => {
    const error = new Error("Not Found");
    err.status = 404;
    next(error);
});

// Error handler
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    if (error.message === "err is not defined") {
        error.message = "Route does not exist.";
    }

    res.status(status).json({
        error: {
            message: error.message,
        },
    });
    console.error(err);
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
