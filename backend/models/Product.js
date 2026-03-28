const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  productName: String,
  brand: String,
  purchaseDate: Date,
  warrantyPeriod: Number,
  expiryDate: Date,
  billImage: String
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);