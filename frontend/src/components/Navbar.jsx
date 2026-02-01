import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

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
    { name: "Login", path: "/login" },
  ];

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
          <div className="flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-6 py-2.5 font-bold text-sm transition-all duration-300 uppercase tracking-wider ${
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
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      {/* <div className="h-1 bg-[#8D6E63] opacity-20"></div> */}

      {/* Google Fonts Import */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600;700&display=swap");
      `}</style>
    </nav>
  );
}
