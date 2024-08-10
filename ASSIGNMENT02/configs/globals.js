// initialize .env
require("dotenv").config();

const globals = {
    ConnectionString: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
    }
 
}
// export the configuration object
module.exports = globals;
