const crypto = require('crypto');
const axios = require('axios');

// Generate 6-digit OTP
const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  console.log('🔐 Generated OTP:', otp, '(type:', typeof otp, ')');
  return otp;  
};

// Calculate OTP expiry (5 minutes from now)
const getOTPExpiry = () => {
 const expiry = new Date(Date.now() + 5 * 60 * 1000);
  console.log('⏰ OTP Expiry:', expiry);
  return expiry;
};
const sendOTPFast2SMS = async (number, otp) => {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;
       console.log('='.repeat(50));
    console.log('📤 FAST2SMS REQUEST DETAILS:');
    console.log('='.repeat(50));
    console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 4)}` : 'MISSING');
    console.log('API Key Length:', apiKey ? apiKey.length : 0);
    console.log('Mobile Number:', number);
    console.log('OTP:', otp);
    console.log('Route:', 'otp');
    console.log('='.repeat(50));

    
    if (!apiKey) {
      console.log('⚠️  Fast2SMS API key not found. OTP (for testing):', otp);
      return { success: true, message: 'OTP logged (test mode)' };
    }
   
    // Using custom message with promotional route
    const message = `${otp} is your OTP for Zerodha Clone verification. Valid for 5 minutes. Do not share with anyone.`;

    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      params: {
        authorization: apiKey,
        message: message,
        language: 'english',
        route: 'p',              // Promotional route
        numbers: number,
        flash: 0
      }
    });
    console.log('='.repeat(50));
    console.log('✅ FAST2SMS RESPONSE:');
    console.log('='.repeat(50));
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    console.log('='.repeat(50));
    console.log('✅ Fast2SMS Response:', response.data);
    
    if (response.data.return === true) {
      console.log('✅ SMS sent successfully!');
      return { 
        success: true, 
        method: 'fast2sms',
        messageId: response.data.request_id 
      };
    } else {
      console.log('❌ Fast2SMS returned false');
      throw new Error(response.data.message || 'Fast2SMS failed');
    }

  } catch (error) {
    console.log('='.repeat(50));
    console.log('❌ FAST2SMS ERROR:');
    console.log('='.repeat(50));
    console.log('Error Message:', error.message);
    
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Headers:', error.response.headers);
      console.log('Response Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('Request made but no response received');
      console.log('Request:', error.request);
    } else {
      console.log('Error setting up request:', error.message);
    }
    console.log('='.repeat(50));
    
    // Development mode fallback
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  FALLBACK: Using console mode');
      return await sendOTPConsole(number, otp);
    }
    
    throw error;
  }

}
const sendOTPFast2SMS_Quick = async (number, otp) => {
  try {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) {
      console.log('⚠️  No API key found');
      return await sendOTPConsole(number, otp);
    }

    console.log('📤 Fast2SMS Quick Route - Sending OTP...');
    console.log('   Number:', number);
    console.log('   OTP:', otp);

    const options = {
  method: 'POST',
  url: 'https://www.fast2sms.com/dev/bulkV2',
  headers: {
    accept: 'application/json',
    authorization: apiKey,
    'content-type': 'application/json'
  },
  data: {route: 'q', numbers: number, message: `Your OTP is ${otp}. It is valid for 5 minutes.`, language: 'english', flash: 0}
};
    console.log('📡 Request:', options.url);
    console.log('📡 Headers:', JSON.stringify(options.headers, null, 2));
    console.log('📡 Data:', JSON.stringify(options.data, null, 2));

    axios
  .request(options)
  .then(res => console.log("axios se aaya datata",res.data))
  .catch(err => console.error("axios se aaya error data nhi aaya ",err));
  } catch (error) {
    console.error('❌ Fast2SMS Error:', error.response?.data || error.message);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  Fallback to console mode');
      return await sendOTPConsole(number, otp);
    }
    
    throw error;
  }
};
      
// Send OTP via console (for testing)
const sendOTPConsole = async (number, otp) => {
  console.log('='.repeat(50));
  console.log('📱 Mobile:', number);
  console.log('🔐 OTP:', otp);
  console.log('⏰ Valid for: 5 minutes');
  console.log('='.repeat(50));
  return { success: true, message: 'OTP logged to console' };
};

const sendOTP = async (number, otp) => {
  const method = process.env.OTP_METHOD  || 'console';
   // Temporary debug log
  console.log('===== DEBUG =====');
  console.log('OTP_METHOD from .env:', process.env.OTP_METHOD);
  console.log('Method value:', method);
  console.log('Is fast2sms?', method === 'fast2sms');
  console.log('=================');
  
  console.log(`📨 OTP Method: ${method}`);
  
  if (method === 'fast2sms') {
    return await sendOTPFast2SMS_Quick(number, otp);
  } else {
    return await sendOTPConsole(number, otp);
  }
};

module.exports = {
  generateOTP,
  getOTPExpiry,
  sendOTP
};