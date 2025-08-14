

import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [showLogin, setShowLogin] = useState(false);

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
    phone: "",
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
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const endpoint =
        activeTab === "user"
          ? "http://localhost:5000/api/users/register"
          : "http://localhost:5000/api/providers/register";

      const payload =
        activeTab === "user"
          ? { name, phone, email, location, password }
          : { name, phone, email, location, service, password };

      const res = await axios.post(endpoint, payload);

      const user = res.data.user || {
        _id: res.data._id,
        name: res.data.name,
        phone: res.data.phone,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);

      toast.success("Registration successful!");

      if (activeTab === "user") {
        navigate("/available-services");
      } else {
        navigate("/provider-profile");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = loginData;

    try {
      const endpoint =
        activeTab === "user"
          ? "http://localhost:5000/api/users/login"
          : "http://localhost:5000/api/providers/login";

      const res = await axios.post(endpoint, { phone, password });

      const user = res.data.user || {
        _id: res.data._id,
        name: res.data.name,
        phone: res.data.phone,
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");

      if (activeTab === "user") {
        navigate("/available-services");
      } else {
        navigate("/provider-profile");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white border shadow rounded-x1">
      <ToastContainer />
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-4 py-2 font-semibold rounded-l ${
            activeTab === "user"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Register as Customer
        </button>
        <button
          onClick={() => setActiveTab("provider")}
          className={`px-4 py-2 font-semibold rounded-r ${
            activeTab === "provider"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Register as Worker
        </button>
      </div>

      {!showLogin ? (
        <>
          <h2 className="mb-4 text-xl font-bold text-center">
            {activeTab === "user" ? "User" : "Provider"} Registration
          </h2>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={registerData.location}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            {activeTab === "provider" && (
              <input
                type="text"
                name="service"
                placeholder="Service (e.g., Electrician)"
                value={registerData.service}
                onChange={handleRegisterChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already registered?{" "}
            <span
              onClick={() => setShowLogin(true)}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </>
      ) : (
        <>
          <h2 className="mb-4 text-xl font-bold text-center">
            {activeTab === "user" ? "User" : "Provider"} Login
          </h2>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={loginData.phone}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            New here?{" "}
            <span
              onClick={() => setShowLogin(false)}
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
