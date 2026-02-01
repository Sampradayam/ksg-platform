import { useState } from "react";

export default function Courses() {
  const [selectedLevel, setSelectedLevel] = useState("certificate");

  const courses = {
    certificate: {
      title: "Certificate Course in Kuchipudi Dance",
      duration: "2 Years",
      eligibility: "Students who passed 10th with passion for Kuchipudi",
      content: [
        "Complete foundation in Kuchipudi Dance theory and practicals",
        "Basic to intermediate Adavus (fundamental steps)",
        "Hastas (hand gestures) and Mudras",
        "Tala (rhythm) and body alignment",
        "Introduction to Natya Shastra principles",
        "Basic performance techniques",
        "Traditional invocations and compositions",
      ],
      benefits: [
        "Residential facility with food and accommodation",
        "Training by expert Gurus",
        "Participation in annual festivals",
        "Certificate upon completion",
      ],
    },
    diploma: {
      title: "Diploma Course in Kuchipudi Dance",
      duration: "2 Years",
      eligibility: "After completing Certificate Course or equivalent",
      content: [
        "Advanced Kuchipudi Dance theory and practicals",
        "Complex Adavu combinations and sequences",
        "Complete Mudra vocabulary and application",
        "Advanced Tala patterns and rhythm work",
        "Abhinaya (expressive techniques)",
        "Navarasas (nine emotions) mastery",
        "Study of traditional compositions",
      ],
      benefits: [
        "Intensive training in performance",
        "Participation in national festivals",
        "Exposure to professional performances",
        "Diploma certificate recognized by the government",
      ],
    },
    pg: {
      title: "Post Graduate Course in Kuchipudi Dance",
      duration: "2 Years",
      eligibility: "After completing Diploma Course or equivalent",
      content: [
        "Mastery of advanced Kuchipudi repertoire",
        "Complete understanding of theory and practicals",
        "Choreography and composition skills",
        "Teaching methodology and pedagogy",
        "Research in classical texts and traditions",
        "Performance artistry and stage presence",
        "Cultural documentation and preservation",
      ],
      benefits: [
        "Professional certification",
        "Eligibility for teaching positions",
        "Research opportunities",
        "Recognition as a Kuchipudi exponent",
      ],
    },
    specialized: {
      title: "Specialized Training Programs",
      duration: "Varies",
      eligibility: "All levels welcome",
      content: [
        "Choreography - Creative composition for performances",
        "Nattuvangam - Traditional rhythm and conducting",
        "Voice Culture - Training in vocal modulation and singing",
        "Evening Classes - For all age groups (4:00 PM - 7:30 PM)",
        "Weekend Workshops - Short-term intensive programs",
        "Online Classes - Digital learning modules",
      ],
      benefits: [
        "Flexible timing options",
        "Specialized skill development",
        "Expert faculty training",
        "Performance opportunities",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      {/* Hero Section */}
      <div className="relative py-24 px-6 bg-[#FFECB3] border-b-4 border-[#D84315]">
        <div className="max-w-6xl mx-auto relative text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 text-[#D84315] text-sm font-bold uppercase tracking-widest">
              <div className="w-12 h-1 bg-[#8D6E63]"></div>
              <span style={{ fontFamily: "Cinzel, serif" }}>Our Programs</span>
              <div className="w-12 h-1 bg-[#8D6E63]"></div>
            </div>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold mb-6 text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Kuchipudi Dance Courses
          </h1>

          <p
            className="text-xl text-[#5D4037] max-w-3xl mx-auto mb-12"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Complete education in the arena of Kuchipudi Dance for ardent
            students whose goal is to become professional artistes
          </p>

          {/* Course Level Selector */}
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {Object.keys(courses).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`p-6 transition-all duration-300 border-2 ${
                  selectedLevel === level
                    ? "bg-[#D84315] text-white border-[#D84315] shadow-xl scale-105"
                    : "bg-white text-[#3E2723] border-[#D7CCC8] hover:bg-[#FFECB3]"
                }`}
              >
                <div className="text-3xl mb-2">
                  {level === "certificate" && "🌱"}
                  {level === "diploma" && "🌿"}
                  {level === "pg" && "🌺"}
                  {level === "specialized" && "⭐"}
                </div>
                <div
                  className="font-bold text-sm uppercase"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {level === "pg" ? "PG Course" : level}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-4 border-[#D7CCC8] shadow-2xl p-12">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center md:col-span-3">
                <div className="text-5xl mb-2">📚</div>
                <h3
                  className="text-3xl md:text-4xl font-bold text-[#3E2723] mb-2"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {courses[selectedLevel].title}
                </h3>
              </div>

              <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-6 text-center">
                <div className="text-sm text-[#5D4037] mb-1 font-semibold">
                  Duration
                </div>
                <div
                  className="text-2xl font-bold text-[#3E2723]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {courses[selectedLevel].duration}
                </div>
              </div>

              <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-6 text-center md:col-span-2">
                <div className="text-sm text-[#5D4037] mb-1 font-semibold">
                  Eligibility
                </div>
                <div
                  className="text-lg font-bold text-[#3E2723]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  {courses[selectedLevel].eligibility}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Curriculum */}
              <div>
                <h4
                  className="text-2xl font-bold text-[#3E2723] mb-6 flex items-center gap-3 border-b-2 border-[#D84315] pb-3"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  <span className="text-3xl">📖</span>
                  Curriculum Highlights
                </h4>
                <div className="space-y-3">
                  {courses[selectedLevel].content.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-[#FFF8E7] border-l-4 border-[#8D6E63] p-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-[#D84315] flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div
                        className="text-[#5D4037]"
                        style={{ fontFamily: "Crimson Text, serif" }}
                      >
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4
                  className="text-2xl font-bold text-[#3E2723] mb-6 flex items-center gap-3 border-b-2 border-[#D84315] pb-3"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  <span className="text-3xl">✨</span>
                  Course Benefits
                </h4>
                <div className="space-y-3">
                  {courses[selectedLevel].benefits.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-[#FFF8E7] border-l-4 border-[#D84315] p-3"
                    >
                      <div className="text-[#D84315] text-xl">✓</div>
                      <div
                        className="text-[#5D4037]"
                        style={{ fontFamily: "Crimson Text, serif" }}
                      >
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Process */}
      <div className="py-20 px-6 bg-[#FFECB3]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center text-[#3E2723] mb-12"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Selection Process
          </h2>

          <div className="bg-white border-4 border-[#D7CCC8] p-10 shadow-xl">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-[#D84315] flex items-center justify-center text-white font-bold text-xl"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  1
                </div>
                <div>
                  <h4
                    className="font-bold text-[#3E2723] mb-2 text-xl"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    Eligibility Check
                  </h4>
                  <p
                    className="text-[#5D4037]"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    Students who passed 10th standard with a passion to take up
                    Kuchipudi Dance as a profession. Minimum age is 16 years for
                    residential students.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-[#D84315] flex items-center justify-center text-white font-bold text-xl"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  2
                </div>
                <div>
                  <h4
                    className="font-bold text-[#3E2723] mb-2 text-xl"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    Application Submission
                  </h4>
                  <p
                    className="text-[#5D4037]"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    Submit your application with required documents.
                    Applications undergo rigorous scrutiny before being
                    shortlisted for interviews.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-[#D84315] flex items-center justify-center text-white font-bold text-xl"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  3
                </div>
                <div>
                  <h4
                    className="font-bold text-[#3E2723] mb-2 text-xl"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    Interview by Expert Panel
                  </h4>
                  <p
                    className="text-[#5D4037]"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    The Interview Board constitutes Gurus in Kuchipudi Dance
                    from all over India. Candidates are assessed on aptitude,
                    dedication, and potential.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 bg-[#D84315] flex items-center justify-center text-white font-bold text-xl"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  4
                </div>
                <div>
                  <h4
                    className="font-bold text-[#3E2723] mb-2 text-xl"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    Admission & Enrollment
                  </h4>
                  <p
                    className="text-[#5D4037]"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    Selected candidates receive admission letter. Residential
                    facility including food and accommodation will be provided
                    within the campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities & Academic Support */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center text-[#3E2723] mb-12"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Facilities & Support
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Residential Facilities */}
            <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-10 shadow-lg">
              <h3
                className="text-2xl font-bold text-[#3E2723] mb-6 border-b-2 border-[#D84315] pb-3"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Residential Facilities
              </h3>

              <div
                className="space-y-4 text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">🏠</span>
                  <div>
                    <strong>Campus Living:</strong> Food and accommodation
                    provided within the 12-acre campus
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">🚌</span>
                  <div>
                    <strong>Transport:</strong> Bus facility provided for day
                    scholars from Srikakulam Town to campus and back
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">🌳</span>
                  <div>
                    <strong>Environment:</strong> Serene campus surrounded by
                    nature, cashew trees, and river Nagavali
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">🎭</span>
                  <div>
                    <strong>Practice Halls:</strong> Dedicated dance studios and
                    performance spaces
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Support */}
            <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-10 shadow-lg">
              <h3
                className="text-2xl font-bold text-[#3E2723] mb-6 border-b-2 border-[#D84315] pb-3"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Academic Education
              </h3>

              <div
                className="space-y-4 text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">📚</span>
                  <div>
                    <strong>Distance Education:</strong> Academic education up
                    to Master's Degree in selected courses
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">🎓</span>
                  <div>
                    <strong>Dual Learning:</strong> Combine dance training with
                    formal academic education
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">👨‍🏫</span>
                  <div>
                    <strong>Expert Faculty:</strong> Training by Smt. Swathy
                    Somanath and experienced teaching assistants
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D84315] text-xl">🌍</span>
                  <div>
                    <strong>Digital Access:</strong> Digitalized 6-year course
                    accessible worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evening Classes */}
      <div className="py-20 px-6 bg-[#FFECB3]">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-bold text-[#3E2723] mb-6"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Evening Classes
          </h2>
          <p
            className="text-xl text-[#5D4037] mb-8"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Evening classes in Kuchipudi Dance for all age groups including boys
            and girls
          </p>
          <div className="bg-white border-4 border-[#D7CCC8] p-10 shadow-xl">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#D84315]">
                <div className="text-3xl mb-2">⏰</div>
                <div
                  className="font-bold text-[#3E2723]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Timing
                </div>
                <div
                  className="text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  4:00 PM - 7:30 PM
                </div>
              </div>
              <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#D84315]">
                <div className="text-3xl mb-2">📅</div>
                <div
                  className="font-bold text-[#3E2723]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Schedule
                </div>
                <div
                  className="text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  6 Days a Week
                </div>
              </div>
              <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#D84315]">
                <div className="text-3xl mb-2">👥</div>
                <div
                  className="font-bold text-[#3E2723]"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Open For
                </div>
                <div
                  className="text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  All Age Groups
                </div>
              </div>
            </div>
            <p
              className="text-sm text-[#5D4037]"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              * Bus facility provided from Srikakulam Town to Sampradaayam and
              back for day scholars
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#D84315] p-12 text-white text-center shadow-2xl">
            <h3
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Join Sampradaayam
            </h3>
            <p
              className="text-xl mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              In its endeavour to relive the ancient fine arts of India. Begin
              your journey to become a professional Kuchipudi artiste.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-10 py-4 bg-white text-[#D84315] font-bold hover:bg-[#FFECB3] transition-all shadow-lg uppercase tracking-wide"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Apply Now
              </button>
              <button
                className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-[#D84315] transition-all uppercase tracking-wide"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Download Brochure
              </button>
            </div>
            <p className="text-sm mt-8">
              📞 Contact for admissions | ✉️ director@sampradaayam.org
            </p>
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
