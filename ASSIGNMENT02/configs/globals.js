const { Connection } = require("mongoose")

require("dotenv").config
const globals = {
    ConnectionString: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
    }
}
module.exports = globals;