import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import logo from "../assets/logo.png";
import { clearUserInfo, getUserInfo } from "../utils/auth";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    return getUserInfo();
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Tourism", path: "/tourism" },
  ];
  const authLink = userInfo?.token
    ? { name: "Profile", path: "/profile" }
    : { name: "Login", path: "/login" };

  useEffect(() => {
    setIsMenuOpen(false);
    setUserInfo(getUserInfo());
  }, [pathname]);

  const handleLogout = useCallback(() => {
    clearUserInfo();
    setUserInfo(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (!userInfo?.expiresAt) return;
    const remaining = userInfo.expiresAt - Date.now();
    if (remaining <= 0) {
      handleLogout();
      return;
    }
    const timeoutId = setTimeout(handleLogout, remaining);
    return () => clearTimeout(timeoutId);
  }, [userInfo?.expiresAt, handleLogout]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const info = getUserInfo();
      if (!info) {
        setUserInfo(null);
      }
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-xl border-b-2 border-[#D7CCC8]"
          : "bg-[#FFF8E7] shadow-md border-b-2 border-[#FFECB3]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-2">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group py-1">
            {/* Logo image */}
            <div className="h-16 w-auto transform group-hover:scale-105 transition-all duration-300">
              <img
                src={logo}
                alt="Sampradayam Logo"
                className="h-full w-auto object-contain"
              />
            </div>

            <div className="flex flex-col">
              <p
                className="text-lg font-bold text-[#D84315] leading-tight"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Kuchipudi Kala Gurukulam
              </p>
              <p
                className="text-xs text-[#5D4037] font-semibold tracking-wide"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Srikakulam District, Andhra Pradesh
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-2 md:flex">
            {[...links, authLink].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative px-6 py-2.5 font-bold text-sm transition-all duration-300 uppercase tracking-wider ${
                  pathname === link.path
                    ? "bg-[#D84315] text-white shadow-lg"
                    : "text-[#3E2723] hover:text-[#D84315] hover:bg-[#FFECB3]"
                }`}
                style={{ fontFamily: "Cinzel, serif" }}
              >
                <span className="relative z-10">{link.name}</span>

                {/* Active link underline */}
                {pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#8D6E63]"></span>
                )}

                {/* Hover underline for inactive links */}
                {pathname !== link.path && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D84315] group-hover:w-full transition-all duration-300"></span>
                )}
              </Link>
            ))}
            {userInfo?.token && (
              <button
                type="button"
                onClick={handleLogout}
                className="group relative px-6 py-2.5 font-bold text-sm transition-all duration-300 uppercase tracking-wider text-[#3E2723] hover:text-[#D84315] hover:bg-[#FFECB3]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                <span className="relative z-10">Logout</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D84315] group-hover:w-full transition-all duration-300"></span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`md:hidden inline-flex items-center justify-center rounded-md border-2 px-3 py-2 transition-all duration-300 ${
              isScrolled
                ? "border-[#D7CCC8] text-[#3E2723] hover:bg-[#FFECB3]"
                : "border-[#FFECB3] text-[#3E2723] hover:bg-[#FFECB3]"
            }`}
          >
            <span className="sr-only">Open main menu</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-5 pb-4 pt-2 ${
            isScrolled ? "bg-white" : "bg-[#FFF8E7]"
          }`}
        >
          <div className="flex flex-col gap-2">
            {[...links, authLink].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative rounded-md px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  pathname === link.path
                    ? "bg-[#D84315] text-white shadow-lg"
                    : "text-[#3E2723] hover:text-[#D84315] hover:bg-[#FFECB3]"
                }`}
                style={{ fontFamily: "Cinzel, serif" }}
              >
                <span className="relative z-10">{link.name}</span>
                {pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-[#8D6E63]"></span>
                )}
                {pathname !== link.path && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D84315] group-hover:w-full transition-all duration-300"></span>
                )}
              </Link>
            ))}
            {userInfo?.token && (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="group relative rounded-md px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 text-[#3E2723] hover:text-[#D84315] hover:bg-[#FFECB3]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                <span className="relative z-10">Logout</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D84315] group-hover:w-full transition-all duration-300"></span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      {/* <div className="h-1 bg-[#8D6E63] opacity-20"></div> */}

      {/* Google Fonts Import */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600;700&display=swap");
      `}</style>
    </nav>
  );
}
