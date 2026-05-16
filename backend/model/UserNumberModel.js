// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid mobile number']
  },
   name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: null
  },
  otp: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
   isRegistered: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


// // Hash password before saving
// // IMPORTANT: Use function() NOT arrow function
// userNumberSchema.pre('save', async function(next) {
//   // Only hash if password is modified and exists
//   if (!this.isModified('password') || !this.password) {
//     return next();
//   }
  
//   try {
//     console.log('🔒 Hashing password...');
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     console.log('✅ Password hashed successfully');
//     next();
//   } catch (error) {
//     console.error('❌ Password hashing error:', error);
//     next(error);
//   }
// });

// // Method to compare passwords
// userNumberSchema.methods.comparePassword = async function(candidatePassword) {
//   try {
//     if (!this.password) {
//       return false;
//     }
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (error) {
//     console.error('❌ Password comparison error:', error);
//     return false;
//   }
// };
// Add index for faster queries
userNumberSchema.index({ number: 1 });
// Export karke check karo

userNumberSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    if (!this.password){
      return false;
    }
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password compare error:', error);
    return false;
  }
};

const UserNumber = mongoose.model('UserNumber', userNumberSchema);

console.log('✅ UserNumber Model loaded');

module.exports = UserNumber;  // 👈 Direct export