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
    type: Number
  },
  credits: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
  },
  validity: {
    type: Date,
    default: () => {
      const now = new Date();
      now.setFullYear(now.getFullYear() + 1); // Add 1 year
      return now;
    },
  },
  status: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    default: "user",
  },
});

const userModel = mongooose.model("user", userSchema);

module.exports = userModel;
