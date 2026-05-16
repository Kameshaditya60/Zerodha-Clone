
import React, { useState, useEffect} from "react";
import { authAPI } from "../../service/authService";
import {OTPInput} from "./OTPInput";
import RegistrationForm from './RegistrationForm';
import LoginForm from '../Login/LoginForm';
console.log('OTPInput:', OTPInput);
console.log('Type:', typeof OTPInput);
function SignupCTA() {
  const [mode, setMode] = useState('signup'); // sign up or login 
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const [timer, setTimer] = useState(0);

const API_URL = import.meta.env.DASHBOARD_URL || 'http://localhost:3001';

// Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
      setError(""); // Clear error on input
    }
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (mobileNumber.length !== 10) {
      setError('Please enter 10 digit mobile number');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('📤 Sending OTP to:', mobileNumber);
      
      const response = await authAPI.sendOTP(mobileNumber);
      
      console.log('📥 Response:', response);

      if (response.success) {
        setShowOTP(true);
        setTimer(300); // 5 minutes
        setSuccess('OTP sent successfully!');
        
        // Development mode - show OTP
        if (response.testOTP) {
          console.log('🔐 TEST OTP:', response.testOTP);
          alert(`TEST OTP: ${response.testOTP}`);
        }
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (otpValue) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('🔍 Verifying OTP:', otpValue);
      
      const response = await authAPI.verifyOTP(mobileNumber, otpValue);
      
      console.log('📥 Response:', response);

      if (response.success) {
        setSuccess('✅ OTP verified! Redirecting...');
         if (response.isRegistered === true) {
          // User already registered - redirect to dashboard
          console.log('✅ User already registered, redirecting to dashboard...');
        // Save user data
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = `${API_URL}?auth=success&number=${mobileNumber}`;
        }, 2000);
      } else{
          // New user - show registration form
          console.log('📝 New user, showing registration form...');
          
          setTimeout(() => {
            setShowOTP(false);
            setShowRegistration(true);
          }, 1000);
        }
      } else {
        setError(response.message || 'Invalid OTP');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationSuccess = (response) => {
    console.log('✅ Registration successful, redirecting...');
    window.location.href = `${API_URL}?auth=success&registered=true`;
  };

  const handleLoginSuccess = ( response) => {
    window.location.href= `${API_URL}?auth=success&login=true`;
  };

  // Step 3: Resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.resendOTP(mobileNumber);

      if (response.success) {
        setTimer(300);
        setSuccess('OTP resent successfully!');
        
        if (response.testOTP) {
          console.log('🔐 TEST OTP:', response.testOTP);
          alert(`TEST OTP: ${response.testOTP}`);
        }
      } else {
        setError(response.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setMode('login');
    setShowOTP(false);
    setShowRegistration(false);
    setMobileNumber('');
    setError('');
    setSuccess('');
  };

  const switchToSignup = () => {
    setMode('signup');
    setError('');
    setSuccess('');
  };
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };


  // Validate mobile number
  // const validateMobile = (number) => {
  //   if (!number) {
  //     return "Mobile number is required";
  //   }
  //   if (number.length !== 10) {
  //     return "Mobile number must be 10 digits";
  //   }
  //   if (!/^[6-9]\d{9}$/.test(number)) {
  //     return "Please enter a valid Indian mobile number";
  //   }
  //   return null;
  // };

  // // Handle form submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate
  //   const validationError = validateMobile(mobileNumber);
  //   if (validationError) {
  //     setError(validationError);
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");
  //   setSuccess("");

  //   try {
  //     // Call signup API
  //     const response = await authAPI.signup(mobileNumber);

  //     if (response.success) {
  //       setSuccess("Signup successful! Redirecting...");
  //       console.log("User created:", response.user);

  //       // Redirect to dashboard after 2 seconds
  //       setTimeout(() => {
  //         window.location.href = `${API_URL}?auth=success&number=${mobileNumber}`;
  //       }, 2000);
  //     } else {
  //       // Handle error message from backen
  //       setError(response.message || "Signup failed");
  //     }
  //   } catch (err) {
  //     console.error("Signup error:", err);
  //     setError(err.message || "Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div className="container text-center d-flex">
      <div className="my-5 col-6">
        <img
          src="./media/images/account_open.svg"
          alt="Signup CTA"
          className="img-fluid"
        />
      </div>
      <div className="col-6 justify-content-center align-items-center my-5 m-3">
       {mode === 'login' ? ( 
        <LoginForm 
        onSuccess={handleLoginSuccess}
        onSwitchToSignup={switchToSignup}
        /> 
       ): (
        // Sign Up MOde
        <> <h1 className="mb-2"> Signup Now</h1>
           {!showOTP && !showRegistration ? (
          // Step 1: Mobile Number Form
          <>
                  <p className="mt-5">Or track your existing application</p>
         <form onSubmit={handleSendOTP}>
          <input
            type="number"
            value={mobileNumber}
            onChange={handleInputChange}
            maxLength={10}
            disabled={loading}
            placeholder="Enter Your Mobile Number"
            className="me-2 p-2 mb-2"
          />
          <br />
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {/* Show success message */}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary p-2 "
            disabled={loading || mobileNumber.length !== 10}
          >
             {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Processing...
    </>
  ) : (
    'Get OTP'
  )}
</button>
        </form>
         {/* Switch to Login */}
                <div className="mt-4">
                  <hr />
                  <p className="mb-0">
                    Already have an account?{' '}
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={switchToLogin}
                    >
                      Login with Password
                    </button>
                  </p>
                </div>
          </>
         ) : showOTP ? (
          // Step 2 :  OTP Verification
          <div className="otp-section">
            <p className="mb-3">
              OTP sent to <strong>{mobileNumber}</strong>
              <button 
                className="btn btn-link btn-sm"
                onClick={() =>
                  {
                    setShowOTP(false);
                     setShowRegistration(false);
                  } }
              >
                Change
              </button>
            </p>
            
            <OTPInput 
              length={6}
              onComplete={handleVerifyOTP}
              disabled={loading}
            />
            
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
            
            {success && (
              <div className="alert alert-success mt-3" role="alert">
                {success}
              </div>
            )}
            
            <div className="mt-3">
              {timer > 0 ? (
                <p>Resend OTP in <strong>{formatTime(timer)}</strong></p>
              ) : (
                <button 
                  className="btn btn-link"
                  onClick={handleResendOTP}
                  disabled={loading}
                >
                  Resend OTP
                </button>
              )}
            </div>
            
            {loading && <p>Verifying...</p>}
            {/* Switch to Login */}
                <div className="mt-4">
                  <button
                    type="button"
                    className="btn btn-link btn-sm"
                    onClick={switchToLogin}
                  >
                    Login with Password instead
                  </button>
                </div>
          </div>
        ): showRegistration ?  (
          // Step 3: Registration Form
          <div className="mt-5">
            <RegistrationForm 
              mobileNumber={mobileNumber}
              onSuccess={handleRegistrationSuccess}
            />
          </div>
        ) : null}
      </>
)}
        <p className="mt-3">
          {" "}
          By proceeding, you agree to the Zerodha{" "}
          <a href="https://zerodha.com/terms-and-conditions">terms</a>&{" "}
          <a href="https://zerodha.com/privacy-policy"> privacy policy </a>
        </p>
        <hr />
        <p>
          Looking to open NRI account?{" "}
          <a href="https://zerodha.com/open-account/nri">Click Here</a>
        </p>
      </div>
    </div>
  );
}

export default SignupCTA;
