// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();

// // ✅ FIRST create app
// const app = express();

// // ✅ THEN middleware
// app.use(cors());
// app.use(express.json());

// // ✅ THEN routes
// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend running...");
// });

// // ✅ MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// // ✅ Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// const productRoutes = require("./routes/product");
// app.use("/api/products", productRoutes);

// //Update server.js
// const multer = require("multer");
// const path = require("path");

// //Create Upload API
// app.post("/api/upload", upload.single("bill"), (req, res) => {
//   res.json({
//     message: "File uploaded successfully",
//     filePath: req.file.path
//   });
// });

//This allows the frontend to talk to the backend
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Middleware (Only declared ONCE now)
app.use(cors());
app.use(express.json());

// ✅ Make uploads folder public
app.use("/uploads", express.static("uploads"));

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ✅ Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const assetRoutes = require("./routes/api/assets"); // 🔥 Moved up for clarity

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/assets", assetRoutes); // 🔥 Standardized path

// ✅ Upload API
app.post("/api/upload", upload.single("bill"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({
    message: "File uploaded successfully",
    filePath: req.file.path
  });
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});