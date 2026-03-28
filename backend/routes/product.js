const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");


// ADD PRODUCT
router.post("/", auth, async (req, res) => {
  try {
    // const product = await Product.create({
    //   ...req.body,
    //   userId: req.userId
    // });
    const product = await Product.create({
  productName: req.body.productName,
  brand: req.body.brand,
  purchaseDate: req.body.purchaseDate,
  warrantyPeriod: req.body.warrantyPeriod,
  expiryDate: req.body.expiryDate,
  billImage: req.body.billImage,
  userId: req.userId
});

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET PRODUCTS
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.userId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE PRODUCT
router.delete("/:id", auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;