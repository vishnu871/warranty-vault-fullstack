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
const fs = require("fs"); 
require("dotenv").config();

const app = express();

// ✅ 1. Updated CORS: Specifically for your Netlify and Local environments
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "https://wvault.netlify.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ 2. Handle File Uploads (Local folder for temp storage)
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ✅ 3. Routes (Following Scenario A: backend/routes/api/assets.js)
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const assetRoutes = require("./routes/api/assets"); 

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/assets", assetRoutes);

// ✅ 4. Utility APIs
app.post("/api/upload", upload.single("bill"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`
  });
});

// Root Health Check
app.get("/", (req, res) => {
  res.json({ 
    status: "Online", 
    message: "Warranty Vault API is running perfectly",
    timestamp: new Date()
  });
});

// ✅ 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB connection error ❌:", err));

// ✅ 6. Start Server (Standard Listen for local testing)
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ✅ 7. CRITICAL FOR VERCEL: Export the app instance
module.exports = app;