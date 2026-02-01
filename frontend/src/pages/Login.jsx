import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(email, password);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #D84315 0px, #D84315 2px, transparent 2px, transparent 10px)",
          }}
        ></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-6">
            <div
              className="w-24 h-24 bg-[#D84315] flex items-center justify-center mx-auto shadow-lg border-4 border-[#8D6E63]"
              style={{ borderRadius: "50%" }}
            >
              <span className="text-5xl">💃</span>
            </div>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3 text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Welcome Back
          </h1>
          <p
            className="text-[#5D4037] text-lg"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Sign in to your Sampradaayam account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-10 shadow-xl border-4 border-[#FFECB3]">
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
                  className="w-full pl-12 pr-4 py-4 bg-[#FFF8E7] border-2 border-[#D7CCC8] focus:outline-none focus:border-[#D84315] transition-all text-[#3E2723]"
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
                  className="w-full pl-12 pr-4 py-4 bg-[#FFF8E7] border-2 border-[#D7CCC8] focus:outline-none focus:border-[#D84315] transition-all text-[#3E2723]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
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
              className="w-full py-4 bg-[#D84315] text-white font-bold hover:bg-[#BF360C] transition-all shadow-lg text-lg uppercase tracking-wide"
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
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFF8E7] border-2 border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <span className="text-xl">🔴</span>
              <span
                className="font-semibold text-[#3E2723]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Google
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FFF8E7] border-2 border-[#D7CCC8] hover:border-[#8D6E63] transition-all">
              <span className="text-xl">🔵</span>
              <span
                className="font-semibold text-[#3E2723]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Facebook
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
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
