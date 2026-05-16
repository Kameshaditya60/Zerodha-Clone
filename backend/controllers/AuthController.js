const User = require("../model/UserModel");
const UserNumber = require("../model/UserNumberModel");
const {
  sendOTP,
  generateOTP,
  getOTPExpiry,
  send,
} = require("../services/otpService");

console.log("UserNumber model:", UserNumber);
console.log("UserNumber.findOne:", typeof UserNumber.findOne);
console.log(UserNumber);

const { createSecretToken } = require("../util/SecrectToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error.message });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};
module.exports.NumberSignup = async (req, res, next) => {
  try {
    const { number } = req.body;
    console.log("received number:", number);
    //validate number
    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Number is required",
      });
    }
    //validate format
    if (!/^[6-9]\d{9}$/.test(number)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid mobile number",
      });
    }
    //check if number already exists
    const existingUser = await UserNumber.findOne({ number });
    console.log("existing user:", existingUser);
    if (existingUser) {
      return res.json({
        success: false,
        message: "Number already registered",
      });
    }

    // Create new user with mobile number
    const user = await UserNumber.create({ number });
    console.log("created user:", user);
    //create token
    const token = createSecretToken(user._id);
    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      domain: "localhost", // 👈 Important for cross-port cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      token: token, // 👈 Also send in response
      user: {
        id: user._id,
        number: user.number,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};
module.exports.NumberLogin = async (req, res, next) => {
  try {
    const { number, password } = req.body;
    console.log('login attempt:', number);
    //validate number
    if (!number || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Number and password are required" }); 
    }
     if (!/^[6-9]\d{9}$/.test(number)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number"
      });
    }

    // find user
    const user = await UserNumber.findOne({ number });
    console.log("user detail ", user)
    if (!user) {
      return res.status(400).json({
        success: false,
         message: "Number not registered. Please SignUp First" });
    }

    // check user registered or not
    if (!user.isRegistered) {
      return res.status(400).json({
        success: false,
        message: "Please complete registration first"
      });
    }

    // check password match
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }
     console.log('✅ Login successful:', user._id);
     // create token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 86400000
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      user: {
        id: user._id,
        number: user.number,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        isRegistered: user.isRegistered
      }
    });
  } catch (error) {
    console.log("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
        error: error.message,
      });
  }
};

module.exports.Logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully", success: true 
});
};

// Step 1: Send OTP
module.exports.SendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    console.log("=".repeat(50));
    console.log("📞 Step 1: Received number:", number);
    // Validate number
    if (!number || !/^[6-9]\d{9}$/.test(number)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid mobile number",
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();
    console.log("📊 Step 2: OTP Details:");
    console.log("   Generated OTP:", otp);
    console.log("   OTP Type:", typeof otp);
    console.log("   OTP Expiry:", otpExpiry);

    // Check if user exists
    let user = await UserNumber.findOne({ number });
    console.log("👤 Step 3: User check:", user ? "Found" : "Not found");

    if (user) {
      // User exists - update OTP
      console.log("📝 Step 4: Updating existing user...");
      console.log("   Old OTP:", user.otp);

      user.otp = otp;
      user.otpExpiry = otpExpiry;
      console.log("   New OTP:", user.otp);
      if (user) {
        user.otp = otp;
        user.otpExpiry = otpExpiry;

        await user.save(); // 👈 Save karo

        console.log("✅ User updated successfully");
        console.log("   Saved OTP:", user.otp); // 👈 user use karo, not savedUser
      }
    } else {
      // New user - create with OTP
      console.log("📝 Step 4: Creating new user...");
      user = await UserNumber.create({
        number,
        otp,
        otpExpiry,
        isVerified: false,
      });
      console.log("✅ User created:", user);
      console.log("   Created OTP:", user.otp);
      console.log("   Created Expiry:", user.otpExpiry);
    }

    // Verify save ho gaya
    const checkUser = await UserNumber.findOne({ number });
    console.log("🔍 Step 5: Verification check:");
    console.log("   DB OTP:", checkUser.otp);
    console.log("   DB Expiry:", checkUser.otpExpiry);

    // Send OTP via SMS
    console.log("📨 Step 6: Sending OTP via SMS...");
    const smsResult = await sendOTP(number, otp);
    console.log("📨 SMS Result:", smsResult);
    console.log("=".repeat(50));
    res.status(200).json({
      success: true,
      message: "OTP sent successfully" + number,
      userId: user._id,
      // Only for testing - remove in production
      ...(process.env.NODE_ENV === "development" && { test: otp }),
    });
  } catch (error) {
    console.error("=".repeat(50));
    console.error("❌ SEND OTP ERROR:");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    console.error("=".repeat(50));
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: error.message,
    });
  }
};

// Step 2: Verify OTP and Complete Signup
module.exports.VerifyOTP = async (req, res) => {
  try {
    const { number, otp } = req.body;
    console.log("🔍 Verifying OTP for:", number);

    console.log("=".repeat(50));
    console.log("🔍 VERIFY OTP REQUEST:");
    console.log("Number:", number);
    console.log("OTP received:", otp);
    console.log("=".repeat(50));

    // Validate input
    if (!number || !otp) {
      return res.status(400).json({
        success: false,
        message: "Number and OTP are required",
      });
    }

    // Find user
    const user = await UserNumber.findOne({ number });
    console.log("👤 User found:", user ? "Yes" : "No");

    if (user) {
      console.log("📊 User data:");
      console.log("   - Stored OTP:", user.otp);
      console.log("   - OTP Expiry:", user.otpExpiry);
      console.log("   - Current Time:", new Date());
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please request OTP again.",
      });
    }

    // Check if OTP exists
    if (!user.otp) {
      console.log("❌ OTP mismatch");
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new OTP.",
      });
    }

    // Check if OTP expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }
    console.log("✅ OTP verified successfully");
    console.log("✅ OTP matched! Verifying user...");

    // OTP verified - update user
    user.isVerified = true;
    user.otp = null; // Clear OTP
    user.otpExpiry = null;
    await user.save();
// 👇 KEY CHANGE: Check if already registered
    if (user.isRegistered) {
      // Already registered - send token
      console.log('✅ User already registered, logging in...');
      
    // Create token
    const token = createSecretToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400000, // 1 day
      domain:
        process.env.NODE_ENV === "production" ? ".onrender.com" : "localhost",
    });
    console.log("✅ User verified successfully");

    res.status(200).json({
      success: true,
      message: "OTP verified successfully, Logging in...",
      isRegistered: true, 
      token: token,
      user: {
        id: user._id,
        number: user.number,
        name: user.name,
         email: user.email,
        isVerified: user.isVerified,
        isRegistered: user.isRegistered,
        createdAt: user.createdAt,
      },
    });
  } else {
      // New user - needs registration
      console.log('📝 New user, needs registration');
      
      return res.status(200).json({ 
        success: true,
        message: "OTP verified successfully",
        isRegistered: false,  // 👈 Frontend will show registration form
        user: {
          id: user._id,
          number: user.number,
          isVerified: user.isVerified,
          isRegistered: user.isRegistered
        }
      });
    }

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP. Please try again.",
      error: error.message,
    });
  }
};

// Step 3: Resend OTP
module.exports.ResendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    console.log("🔄 Resending OTP for:", number);
    if (!number) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    // Find user
    const user = await UserNumber.findOne({ number });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Update user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP
    await sendOTP(number, otp);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      // Only for testing
      ...(process.env.NODE_ENV === "development" && { otp }),
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
      error: error.message,
    });
  }
};

module.exports.CompleteRegistration = async (req, res) => {
  try {
    const { number, name, email, password, confirmPassword } = req.body;

    console.log('📝 Registration Request:', { number, name, email });

    // Validation
    if (!number || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Find user by number
    const user = await UserNumber.findOne({ number });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please verify OTP first."
      });
    }

    // Check if OTP was verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first"
      });
    }

    // Check if already registered
    if (user.isRegistered) {
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login."
      });
    }

    // Check if email already exists (for another user)
    const existingEmail = await UserNumber.findOne({ 
      email: email,
      _id: { $ne: user._id }
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

  
    // Hash password manually
    console.log('🔒 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('✅ Password hashed');

    // Update user
    user.name = name;
    user.email = email;
    user.password = hashedPassword;  // Already hashed
    user.isRegistered = true;
    user.updatedAt = new Date();

    // Save WITHOUT triggering pre-save hook
    await UserNumber.updateOne(
      { _id: user._id },
      {
        $set: {
          name: name,
          email: email,
          password: hashedPassword,
          isRegistered: true,
          updatedAt: new Date()
        }
      }
    );

    console.log('✅ User updated');

    // Get updated user
    const updatedUser = await UserNumber.findById(user._id);

    // Create token
    const token = createSecretToken(updatedUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 86400000
    });

    res.status(200).json({
      success: true,
      message: "Registration completed successfully",
      token: token,
      user: {
        id: updatedUser._id,
        number: updatedUser.number,
        name: updatedUser.name,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
        isRegistered: updatedUser.isRegistered
      }
    });

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};