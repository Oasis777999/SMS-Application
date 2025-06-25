const mongooose = require("mongoose");

const userSchema = new mongooose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  credits:{
    type:Number,
    default:0
  },
  password: {
    type: String,
  },
  validity: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
  userType: {
    type: String,
  },
});

const userModel = mongooose.model("user", userSchema);

module.exports = userModel;
