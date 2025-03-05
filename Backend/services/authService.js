const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.signup = async (username, email, password) => {
  try {
    if (!username || !email || !password) {
      throw new Error("All fields (username, email, password) are required.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    // Hash password (ensure password is a valid string)
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    // Create user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return { message: "User registered successfully!", token };
  } catch (error) {
    console.error("Signup Error:", error.message);  // Log the exact error
    throw new Error(error.message);  // Re-throw for controller to handle
  }
};

exports.login = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    // Compare password (ensure password is a valid string)
    const isMatch = await bcrypt.compare(password.toString(), user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return { message: "Login successful!", token };
  } catch (error) {
    console.error("Login Error:", error.message);  // Log the exact error
    throw new Error(error.message);
  }
};
