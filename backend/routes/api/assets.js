const express = require("express");
const router = express.Router();
// If the folder is in backend/middleware/auth.js, use this:
const auth = require("../../middleware/authMiddleware"); 

// If you realized you don't have a middleware folder yet, 
// or it's named differently, you must create it.
const Asset = require("../../models/Asset"); // This imports the schema above

// @route    POST api/assets
router.post("/", auth, async (req, res) => {
  try {
    const newAsset = new Asset({
      ...req.body,
      user: req.user.id 
    });
    const asset = await newAsset.save();
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/assets
router.get("/", auth, async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(assets);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
// @route    DELETE api/assets/:id
// @desc     Delete an asset
router.delete("/:id", auth, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ msg: "Asset not found" });
    }

    // Check if the asset belongs to Vishnu
    if (asset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await asset.deleteOne();
    res.json({ msg: "Asset removed from vault" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/assets/:id
// @desc     Update asset details
router.put("/:id", auth, async (req, res) => {
  try {
    let asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ msg: "Asset not found" });

    // Ensure Vishnu owns this asset
    if (asset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;