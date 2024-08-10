const mongoose = require("mongoose");
const passport = require("passport");
// Take the out of the box functionality from the plm package to extend the user model
const plm = require("passport-local-mongoose");

// var dataSchemaObj = {
//     username: String,
//     password: String
// }
const dataSchemaObject = {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
};
var mongooseSchema = new mongoose.Schema(dataSchemaObject);
// Use passport-local-mongoose to indicate this is a special authentication model
// plugin() adds plm functionality to our model
// i.e. hashing/salting password, and handling authentication attempts
mongooseSchema.plugin(plm);
// export the enhanced model
module.exports = mongoose.model("User", mongooseSchema);
