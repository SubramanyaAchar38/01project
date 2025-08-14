

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [activeTab, setActiveTab] = useState("customer");
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    service: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const {
      name,
      phone,
      email,
      location,
      service,
      password,
      confirmPassword,
    } = registerData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email,
        password,
        name,
        phone,
        user_type: activeTab
      };

      const response = await register(userData);
      
      // If provider, create provider profile
      if (activeTab === "provider") {
        // This will need to be implemented after successful registration
        // For now, just navigate to provider profile page
        navigate("/ProviderProfile");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(loginData.email, loginData.password);
      navigate("/");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRegisterData({
      name: "",
      phone: "",
      email: "",
      location: "",
      service: "",
      password: "",
      confirmPassword: "",
    });
    setLoginData({ email: "", password: "" });
    setError("");
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetForm();
  };

  const switchToLogin = (show) => {
    setShowLogin(show);
    resetForm();
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white border shadow rounded-xl">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => switchTab("customer")}
          className={`px-4 py-2 font-semibold rounded-l ${
            activeTab === "customer"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Customer
        </button>
        <button
          onClick={() => switchTab("provider")}
          className={`px-4 py-2 font-semibold rounded-r ${
            activeTab === "provider"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Service Provider
        </button>
      </div>

      {error && (
        <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {!showLogin ? (
        <>
          <h2 className="mb-4 text-xl font-bold text-center">
            {activeTab === "customer" ? "Customer" : "Provider"} Registration
          </h2>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={registerData.location}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {activeTab === "provider" && (
              <select
                name="service"
                value={registerData.service}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Service Type</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Painter">Painter</option>
                <option value="Cook">Cook</option>
                <option value="Driver">Driver</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Gardener">Gardener</option>
                <option value="Tutor">Tutor</option>
              </select>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              minLength={6}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already registered?{" "}
            <span
              onClick={() => switchToLogin(true)}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-bold text-center">Login</h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            New here?{" "}
            <span
              onClick={() => switchToLogin(false)}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default SignIn;
