require("dotenv").config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;

if(!dbUsername) {
    throw new Error('DB_USERNAME is not set.')
}
if(!dbPassword) {
    throw new Error('DB_USERNAME is not set.')
}
if(!dbCluster) {
    throw new Error('DB_CLUSTER is not set.')
}
if(!dbName) {
    throw new Error('DB_NAME is not set.')
}

module.exports = {
    dbUsername,
    dbPassword,
    dbCluster,
    dbName
};


 