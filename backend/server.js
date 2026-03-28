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
const fs = require("fs"); // Added to ensure upload folder exists
require("dotenv").config();

const app = express();

// ✅ Create uploads folder if it doesn't exist (Important for new deployments)
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Updated CORS: Allow both your local machine AND your future Netlify app
// app.use(cors({
//   origin: ["http://localhost:5173", "https://your-app-name.netlify.app"], // Change this after you get your Netlify link
//   credentials: true
// }));
app.use(cors({
  origin: ["http://localhost:5173", "https://wvault.netlify.app"], // 👈 Use the new name here
  credentials: true
}));

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
const assetRoutes = require("./routes/api/assets");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/assets", assetRoutes);

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
  res.json({ 
    status: "Online", 
    message: "Warranty Vault API is running perfectly",
    timestamp: new Date()
  });
});

// ✅ MongoDB connection (Using Environment Variable)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error ❌:", err));

// ✅ START SERVER (Crucial update for Render/Deployment)
// This tells the app: Use Render's port, or 5000 if running on my laptop
const PORT = process.env.PORT || 5000; 

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});