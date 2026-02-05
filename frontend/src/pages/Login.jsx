import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, loginWithGoogle, loginWithFacebook } from "../api";
import { storeUserInfo } from "../utils/auth";
import {
  ensureGoogleScript,
  requestGoogleAccessToken,
  ensureFacebookSdk,
  requestFacebookAccessToken,
} from "../utils/socialAuth";
import logo from "../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [socialLoading, setSocialLoading] = useState(null);
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
  const isGoogleEnabled = Boolean(googleClientId);
  const isFacebookEnabled = Boolean(facebookAppId);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(email, password);
      storeUserInfo(data);
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setSocialLoading("google");
      await ensureGoogleScript(googleClientId);
      const accessToken = await requestGoogleAccessToken(googleClientId);
      const { data } = await loginWithGoogle(accessToken);
      storeUserInfo(data);
      navigate("/");
    } catch (error) {
      alert(error?.message || "Google login failed");
    } finally {
      setSocialLoading(null);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setSocialLoading("facebook");
      await ensureFacebookSdk(facebookAppId);
      const accessToken = await requestFacebookAccessToken();
      const { data } = await loginWithFacebook(accessToken);
      storeUserInfo(data);
      navigate("/");
    } catch (error) {
      alert(error?.message || "Facebook login failed");
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-4 sm:px-6 py-10 sm:py-12 relative overflow-hidden mt-14">
      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div className="h-16 w-auto transform group-hover:scale-105 transition-all duration-300">
              <img
                src={logo}
                alt="Sampradayam Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Welcome Back
          </h1>
          <p
            className="text-[#5D4037] text-base sm:text-lg"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Sign in to your Sampradaayam account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-6 sm:p-8 md:p-10 shadow-xl border-4 border-[#FFECB3]">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-[#3E2723] mb-2 uppercase tracking-wide"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-[#8D6E63] text-xl">✉</span>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#FFF8E7] border-2 border-[#D7CCC8] focus:outline-none focus:border-[#D84315] transition-all text-[#3E2723]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#3E2723] mb-2 uppercase tracking-wide"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-[#8D6E63] text-xl">🔒</span>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#FFF8E7] border-2 border-[#D7CCC8] focus:outline-none focus:border-[#D84315] transition-all text-[#3E2723]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#D84315] border-[#8D6E63] focus:ring-[#D84315]"
                />
                <span
                  className="ml-2 text-sm text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-[#D84315] hover:text-[#BF360C] font-semibold"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 sm:py-4 bg-[#D84315] text-white font-bold hover:bg-[#BF360C] transition-all shadow-lg text-base sm:text-lg uppercase tracking-wide"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[#D7CCC8]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-4 bg-white text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={!isGoogleEnabled || socialLoading === "google"}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFF8E7] border-2 border-[#D7CCC8] hover:border-[#8D6E63] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="text-xl">🔴</span>
              <span
                className="font-semibold text-[#3E2723]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                {socialLoading === "google" ? "Loading..." : "Google"}
              </span>
            </button>
            <button
              type="button"
              onClick={handleFacebookLogin}
              disabled={!isFacebookEnabled || socialLoading === "facebook"}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFF8E7] border-2 border-[#D7CCC8] hover:border-[#8D6E63] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="text-xl">🔵</span>
              <span
                className="font-semibold text-[#3E2723]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                {socialLoading === "facebook" ? "Loading..." : "Facebook"}
              </span>
            </button>
          </div>
          {!isGoogleEnabled || !isFacebookEnabled ? (
            <p
              className="mt-3 text-xs text-[#5D4037]"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Social login is unavailable right now.{" "}
              {!isGoogleEnabled ? "Google" : ""}
              {!isGoogleEnabled && !isFacebookEnabled ? " and " : ""}
              {!isFacebookEnabled ? "Facebook" : ""}{" "}
              is not configured.
            </p>
          ) : null}

          {/* Sign Up Link */}
          <div className="mt-6 sm:mt-8 text-center">
            <p
              className="text-[#5D4037]"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-[#D84315] font-bold hover:text-[#BF360C]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Sign up for free
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p
            className="text-sm text-[#5D4037]"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="text-[#D84315] hover:underline font-semibold"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-[#D84315] hover:underline font-semibold"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      {/* Google Fonts Import */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600;700&display=swap");
      `}</style>
    </div>
  );
}
