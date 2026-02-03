import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import { storeUserInfo } from "../utils/auth";
import logo from "../assets/logo.png";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { data } = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
      );
      storeUserInfo(data);
      navigate("/profile");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to register";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center px-6 py-12 mt-14">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl w-full relative">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="h-16 w-auto transform transition-all duration-300">
              <img
                src={logo}
                alt="Sampradayam Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          <h1
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 via-red-600 to-amber-700 bg-clip-text text-transparent"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Begin Your Journey
          </h1>
          <p
            className="text-gray-600 text-lg"
            style={{ fontFamily: "Crimson Text, Georgia, serif" }}
          >
            Join Sampradhayam Kuchipudi Gurukulam and embrace the divine art
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-orange-100">
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400">👤</span>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Email and Phone in Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">✉️</span>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">📞</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Inputs in Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔒</span>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    autoComplete="new-password"
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔒</span>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    autoComplete="new-password"
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
                  required
                />
                <span className="ml-3 text-sm text-gray-700">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-orange-600 font-semibold hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-orange-600 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  . I understand that the Gurukulam follows traditional
                  Guru-Shishya principles and requires dedication to learning.
                </span>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                or sign up with
              </span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <span>🔍</span>
              <span className="font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <span>📘</span>
              <span className="font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-orange-600 font-semibold hover:text-orange-700"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">
              Expert Gurus
            </div>
            <div className="text-xs text-gray-600">
              Learn from traditional masters
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">🏛️</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">
              Authentic Training
            </div>
            <div className="text-xs text-gray-600">300+ years of tradition</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
            <div className="text-3xl mb-2">🎭</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">
              Performance Ready
            </div>
            <div className="text-xs text-gray-600">
              Regular recital opportunities
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Crimson+Text:wght@400;600;700&display=swap");
      `}</style>
    </div>
  );
}
