const mongoose = require("mongoose");

const AssetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  purchaseCost: { type: Number, required: true },
  purchaseDate: { type: Date, required: true },
  // Step 2 Data
  warranties: Array, 
  maintenanceTasks: Array,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("asset", AssetSchema);