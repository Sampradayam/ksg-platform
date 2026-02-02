import { useState, useEffect } from "react";
import one from "../assets/1.png";
import two from "../assets/2.png";
import three from "../assets/3.png";
import four from "../assets/4.png";

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    { src: one, alt: "Sampradaayam Dance Performance" },
    { src: one, alt: "Kuchipudi Students Training" },
    { src: three, alt: "Gurukulam Campus" },
    { src: four, alt: "Cultural Performance" },
    { src: two, alt: "Traditional Dance Form" },
    { src: one, alt: "Students Performance" },
  ];

  // Auto-scroll images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const goToImage = (index) => {
    setCurrentImage(index);
  };

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#3E2723] font-serif mt-14 sm:mt-20">
      {/* Hero Section with Full-Width Image Carousel and Text Overlay */}
      <div className="relative w-full h-screen">
        {/* Image Carousel - Full Width Background */}
        <div className="absolute inset-0 overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Dark Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Text Content Overlay with Blur Background */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-5xl mx-auto">
            {/* Backdrop Blur Container */}
            <div className=" md:p-12 rounded-2xl shadow-2xl">
              <div className="inline-block px-6 py-2 bg-[#D84315]/90 text-white text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-lg mt-5">
                Sampradaayam Cultural Trust
              </div>

              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[0.95] text-white drop-shadow-2xl"
                style={{
                  fontFamily: "Cinzel, serif",
                  textShadow:
                    "0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                Protect. Preserve. <br />
                <span className="text-[#FFECB3]">Promote.</span>
              </h1>

              <p
                className="text-lg md:text-xl text-white mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                style={{
                  fontFamily: "Crimson Text, serif",
                  textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                }}
              >
                A premier Kuchipudi Kala Gurukulam situated on a sprawling
                12-acre campus at Kallepally, Srikakulam, Andhra Pradesh. We are
                dedicated to reliving the ancient fine arts of India.
              </p>

              <div className="flex flex-wrap justify-center gap-5">
                <button
                  className="px-10 py-4 bg-[#D84315] text-white font-bold tracking-wide hover:bg-[#BF360C] transition-all shadow-2xl uppercase backdrop-blur-sm border-2 border-white/30"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Book a 2-Day Visit
                </button>
                <button
                  className="px-10 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-bold tracking-wide hover:bg-white hover:text-[#3E2723] transition-all shadow-2xl uppercase"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Know More About Sampradaayam
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-all shadow-xl border border-white/30"
          aria-label="Previous image"
        >
          <span className="text-3xl font-bold">‹</span>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-all shadow-xl border border-white/30"
          aria-label="Next image"
        >
          <span className="text-3xl font-bold">›</span>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-24 left-6 z-20 bg-white/20 backdrop-blur-md text-white px-5 py-3 text-sm font-bold shadow-lg border border-white/30">
          {currentImage + 1} / {images.length}
        </div>

        {/* Dot Indicators */}
        {/* <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 shadow-lg">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentImage
                  ? "bg-[#D84315] w-10 shadow-lg"
                  : "bg-white/70 hover:bg-white w-3"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div> */}
      </div>

      {/* Core Objective Section */}
      <div className="py-16 bg-[#FFECB3] border-y-2 border-[#D7CCC8]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Our Objective
          </h2>
          <p
            className="text-xl md:text-2xl leading-relaxed text-[#5D4037]"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            "To impart complete knowledge in the arena of Kuchipudi Dance to
            those ardent students whose goal is to become professional
            artistes."
          </p>
        </div>
      </div>

      {/* National Centre Vision */}
      <div className="py-16 px-6 bg-[#FFF8E7]">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-[#D84315]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            A National Centre for Patronizing Fine Arts
          </h2>
          <p
            className="text-lg text-[#5D4037] leading-relaxed"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Sampradaayam is constituted following the ideal of the great
            institution in India, Smt. Rukmini Devi Arundale's Kalakshetra,
            Chennai.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div className="py-20 px-6 bg-[#FFECB3]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#FFF8E7] border-l-4 border-[#D84315] shadow-md">
            <h3
              className="text-2xl font-bold mb-4 text-[#3E2723]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Ancient Gurukula System
            </h3>
            <p
              className="text-[#5D4037] leading-relaxed"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Students live and learn on campus, surrounded by lush green rustic
              nature with cashew trees along the banks of river Nagavali.
            </p>
          </div>
          <div className="p-8 bg-[#FFF8E7] border-l-4 border-[#D84315] shadow-md">
            <h3
              className="text-2xl font-bold mb-4 text-[#3E2723]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Complete Education
            </h3>
            <p
              className="text-[#5D4037] leading-relaxed"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Full mastery of both theory and practicals in Kuchipudi Dance,
              creating great exponents like Smt. Yamini Krishnamurthy.
            </p>
          </div>
          <div className="p-8 bg-[#FFF8E7] border-l-4 border-[#D84315] shadow-md">
            <h3
              className="text-2xl font-bold mb-4 text-[#3E2723]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Academic Growth
            </h3>
            <p
              className="text-[#5D4037] leading-relaxed"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              We encourage academic education up to Master's Degrees through
              distance education mode alongside intensive dance training.
            </p>
          </div>
        </div>
      </div>

      {/* Course Offerings */}
      <div className="py-20 px-6 bg-[#FFF8E7]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Our Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-[#FFECB3] border-2 border-[#D7CCC8] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Certificate Course
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Two-year certificate course in Kuchipudi Dance
              </p>
            </div>
            <div className="p-8 bg-[#FFECB3] border-2 border-[#D7CCC8] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Diploma Course
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Two-year diploma course in Kuchipudi Dance
              </p>
            </div>
            <div className="p-8 bg-[#FFECB3] border-2 border-[#D7CCC8] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                PG Course
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Two-year postgraduate course in Kuchipudi Dance
              </p>
            </div>
            <div className="p-8 bg-[#FFECB3] border-2 border-[#D7CCC8] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Choreography
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Specialized training in dance choreography
              </p>
            </div>
            <div className="p-8 bg-[#FFECB3] border-2 border-[#D7CCC8] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Nattuvangam
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Traditional rhythm and conducting techniques
              </p>
            </div>
            <div className="p-8 bg-[#FFECB3] border-2 border-[#D7CCC8] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Voice Culture
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Voice culture and modulation training
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Achievements */}
      <div className="py-20 px-6 bg-[#FFECB3]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Global Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-[#FFF8E7] shadow-md border-t-4 border-[#D84315]">
              <h3
                className="text-2xl font-bold mb-4 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Digital Innovation
              </h3>
              <p
                className="text-[#5D4037] leading-relaxed"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Successfully digitalized the 6-year Kuchipudi dance course,
                making it accessible to students worldwide through structured
                online modules.
              </p>
            </div>
            <div className="p-8 bg-[#FFF8E7] shadow-md border-t-4 border-[#D84315]">
              <h3
                className="text-2xl font-bold mb-4 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                International Productions
              </h3>
              <ul
                className="space-y-2 text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <li>• Ayodhya Rama (Europe)</li>
                <li>• Shakti (Malaysia)</li>
                <li>• Ardhanareeswaram (UK)</li>
                <li>• Dance of Yoga (USA - TANA)</li>
                <li>• Performances in Andaman & Nicobar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Google Fonts Import */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:wght@400;600;700&display=swap");
      `}</style>
    </div>
  );
}
