import React, { useState } from "react";
import { authAPI } from "../../service/authService";

function LoginForm({ onSuccess, onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    number: "",
    password: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      if (!/^\d*$/.test(value) && value.length <= 10) {
        // setFormData({ ...formData, [name]: value });
        return;
      }
    } 
    // else {
    //   setFormData({ ...formData, [name]: value });
    // }
    setFormData({ ...formData, [name]:value});
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate
    if (formData.number.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(formData.number, formData.password);

      if (response.success) {
        //save user data
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        localStorage.setItem("isAuthenticated", "true");
        
         console.log('Saved user:', localStorage.getItem('user')); // 👈 Confirm

        // call onSuccess callback
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container text-center d-flex login-form">
        <div className="my-5 col-6">
          <h1> Login to Zerodha</h1>

          <form onSubmit={handleSubmit}>
            {/* mobile NUmber  */}
            <div className="mb-3">
              <label for="number" htmlFor="number" className="form-label">
                Mobile Number
              </label>
              <input
                type="number"
                className="form-control p-2"
                id="number"
                placeholder="Enter your number"
                value={formData.number}
                onChange={handleChange}
                name="number"
                maxLength={10}
                disabled={loading}
                required
              />
            </div>

            {/* Password  */}
            <div className="mb-3">
              <label for="password" htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control p-2"
                id="password"
                name="password"
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your password"
                value={formData.password}
                required
              />
            </div>
            {/* error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Submit Button */}

            <button
              type="submit"
              className="btn btn-primary w-100 p-2 mb-3"
              disabled={loading || formData.number.length !== 10}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Login"
              )}
            </button>

            {/* Switch to Signup */}
            <div className="text-center">
              <p className="mb-0">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={onSwitchToSignup}
                >
                  Sign Up
                </button>
              </p>
            </div>

            {/* Forget Password Section */}
            <div className="text-center mt-2">
              <button
                type="button"
                className="btn btn-link btn-sm"
                onClick={() =>
                  alert("Forgot password functionality coming soon")
                }
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
