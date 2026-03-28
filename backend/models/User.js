// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true });

const mongoose = require('mongoose');

// We define it as 'userSchema' (lowercase 'u')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  settings: {
    warrantyAlerts: { type: Boolean, default: true },
    maintenanceReminders: { type: Boolean, default: true },
    depreciationReports: { type: Boolean, default: false }
  }
}, { timestamps: true });

// We export 'userSchema' (must match the name above exactly)
module.exports = mongoose.model("User", userSchema);