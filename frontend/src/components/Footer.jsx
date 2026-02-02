import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Tourism", path: "/tourism" },
    { name: "Gallery", path: "/gallery" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
  ];

  const courses = [
    { name: "Certificate Course", path: "/courses#certificate" },
    { name: "Diploma Course", path: "/courses#diploma" },
    { name: "PG Course", path: "/courses#pg" },
    { name: "Choreography", path: "/courses#choreography" },
    { name: "Evening Classes", path: "/courses#evening" },
  ];

  return (
    <footer className="relative bg-[#3E2723] text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-2 bg-[#D84315]"></div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #8D6E63 0px, #8D6E63 2px, transparent 2px, transparent 10px)",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-10 md:mb-12">
          {/* About Section */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <div className="w-12 h-12 bg-[#D84315] flex items-center justify-center shadow-lg border-2 border-[#8D6E63]">
                <span className="text-2xl">💃</span>
              </div>
              <div>
                <h3
                  className="text-lg font-bold text-[#FFECB3]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Sampradaayam
                </h3>
              </div>
            </div>
            <p
              className="text-[#D7CCC8] text-sm leading-relaxed"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              A National Centre for Patronizing Fine Arts, dedicated to
              protecting, preserving, and promoting the sacred tradition of
              Kuchipudi classical dance since its establishment.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#D84315] flex items-center justify-center hover:bg-[#BF360C] transition-all duration-300 shadow-md border border-[#8D6E63]"
                aria-label="Facebook"
              >
                <span className="text-lg">📘</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#D84315] flex items-center justify-center hover:bg-[#BF360C] transition-all duration-300 shadow-md border border-[#8D6E63]"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#D84315] flex items-center justify-center hover:bg-[#BF360C] transition-all duration-300 shadow-md border border-[#8D6E63]"
                aria-label="YouTube"
              >
                <span className="text-lg">📹</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#D84315] flex items-center justify-center hover:bg-[#BF360C] transition-all duration-300 shadow-md border border-[#8D6E63]"
                aria-label="Twitter"
              >
                <span className="text-lg">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4
              className="text-lg font-bold text-[#FFECB3] mb-6 border-b-2 border-[#8D6E63] pb-2"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#D7CCC8] hover:text-[#FFECB3] transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    <span className="text-[#D84315] group-hover:translate-x-1 transition-transform duration-300">
                      ›
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="text-center sm:text-left">
            <h4
              className="text-lg font-bold text-[#FFECB3] mb-6 border-b-2 border-[#8D6E63] pb-2"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Our Courses
            </h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.path}>
                  <Link
                    to={course.path}
                    className="text-[#D7CCC8] hover:text-[#FFECB3] transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    <span className="text-[#D84315] group-hover:translate-x-1 transition-transform duration-300">
                      ›
                    </span>
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4
              className="text-lg font-bold text-[#FFECB3] mb-6 border-b-2 border-[#8D6E63] pb-2"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-[#D7CCC8]">
              <li className="flex items-start justify-center sm:justify-start gap-3 text-left">
                <span className="text-[#D84315] mt-1 text-lg">🏛️</span>
                <div style={{ fontFamily: "Crimson Text, serif" }}>
                  <p className="font-bold text-[#FFECB3] mb-1">Address</p>
                  <p>Kallepally, Srikakulam</p>
                  <p>Andhra Pradesh</p>
                  <p>India - 532001</p>
                </div>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3 text-left">
                <span className="text-[#D84315] mt-1 text-lg">📞</span>
                <div style={{ fontFamily: "Crimson Text, serif" }}>
                  <p className="font-bold text-[#FFECB3] mb-1">Phone</p>
                  <p>+91 XXXXX XXXXX</p>
                  <p>+91 XXXXX XXXXX</p>
                </div>
              </li>
              <li className="flex items-start justify-center sm:justify-start gap-3 text-left">
                <span className="text-[#D84315] mt-1 text-lg">✉️</span>
                <div style={{ fontFamily: "Crimson Text, serif" }}>
                  <p className="font-bold text-[#FFECB3] mb-1">Email</p>
                  <p>info@sampradaayam.org</p>
                  <p>director@sampradaayam.org</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-[#8D6E63] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p
              className="text-[#D7CCC8] text-sm text-center md:text-left"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              © {currentYear} Sampradaayam Cultural Trust, Govt. of A.P. All
              rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                to="/privacy"
                className="text-[#D7CCC8] hover:text-[#FFECB3] transition-colors duration-300"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-[#D7CCC8] hover:text-[#FFECB3] transition-colors duration-300"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-[#D7CCC8] hover:text-[#FFECB3] transition-colors duration-300"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Sitemap
              </Link>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-8 pt-6 border-t border-[#8D6E63]">
            <p
              className="text-[#FFECB3] italic text-base font-bold"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              "Protect. Preserve. Promote."
            </p>
            <p
              className="text-[#D7CCC8] text-sm mt-2"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Reliving the ancient fine arts of India
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-2 bg-[#8D6E63]"></div>

      {/* Google Fonts Import */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600;700&display=swap");
      `}</style>
    </footer>
  );
}
