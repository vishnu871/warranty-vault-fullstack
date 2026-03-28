// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");


// // SIGNUP API
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const jwt = require("jsonwebtoken");

// // LOGIN API
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/authMiddleware');

// 🔥 BCRYPT HAS BEEN REMOVED TO ALLOW PLAIN TEXT PASSWORDS

// SIGNUP API
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Saving password directly as plain text
    const user = await User.create({
      name,
      email,
      password: password 
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ Direct comparison (Plain Text)
    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE SETTINGS (Toggles)
router.put('/settings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.userId); // Support for both id naming conventions
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.settings = {
      ...user.settings,
      ...req.body.settings
    };

    await user.save();
    res.json(user.settings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// CHANGE PASSWORD (Plain Text)
router.put('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  try {
    const user = await User.findById(req.user.id || req.userId);
    
    // ✅ Direct Comparison
    if (currentPassword !== user.password) {
      return res.status(400).json({ msg: 'Current password incorrect' });
    }

    // ✅ Save the raw string directly
    user.password = newPassword; 
    
    await user.save();
    res.json({ msg: 'Password updated successfully in plain text' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route    POST api/auth/forgot-password
// @desc     Find user by email and reset password (PLAIN TEXT)
router.post('/forgot-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'No account found with this email' });
    }

    // Save the new plain text password
    user.password = newPassword;
    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;