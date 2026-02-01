export default function About() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#3E2723] font-serif pt-24">
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <h1
          className="text-5xl md:text-6xl font-bold mb-12 border-b-4 border-[#D84315] pb-6 text-[#3E2723]"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Our Institution
        </h1>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 text-[#D84315]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              The Gurukulam
            </h2>
            <p
              className="text-lg leading-relaxed mb-6 text-[#5D4037]"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Sampradaayam is a National Centre for Patronizing Fine Arts,
              modeled after Smt. Rukmini Devi Arundale's Kalakshetra, Chennai.
            </p>
            <p
              className="text-lg leading-relaxed text-[#5D4037]"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Our campus at Kallepally, Srikakulam is situated on a sprawling 12
              acres, surrounded by lush green rustic nature with huge cashew
              trees. The campus lies on the banks of river Nagavali, about 3kms
              from the District Collectorate.
            </p>
          </div>

          <div className="bg-[#FFECB3] p-8 border-l-4 border-[#8D6E63] shadow-md">
            <h2
              className="text-2xl font-bold mb-6 text-[#3E2723]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Board of Trustees
            </h2>
            <ul
              className="space-y-3 text-[#5D4037]"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              <li className="flex">
                <span className="mr-3 text-[#D84315]">•</span>
                <span>
                  <strong>Chairman:</strong> District Collector, Srikakulam
                </span>
              </li>
              <li className="flex">
                <span className="mr-3 text-[#D84315]">•</span>
                <span>
                  <strong>Trustee:</strong> Principal Secretary Revenue
                  (Endowments), AP
                </span>
              </li>
              <li className="flex">
                <span className="mr-3 text-[#D84315]">•</span>
                <span>
                  <strong>Trustee:</strong> E.O., TTD, Tirupathi
                </span>
              </li>
              <li className="flex">
                <span className="mr-3 text-[#D84315]">•</span>
                <span>
                  <strong>Trustee:</strong> Vice Chancellor, JNTU Kakinada
                </span>
              </li>
              <li className="flex">
                <span className="mr-3 text-[#D84315]">•</span>
                <span>
                  <strong>Trustee:</strong> Director, Dept of Language and
                  Culture, AP
                </span>
              </li>
              <li className="flex">
                <span className="mr-3 text-[#D84315]">•</span>
                <span>
                  <strong>Director:</strong> Sampradaayam
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Uniqueness Section */}
        <div className="mb-16 bg-[#FFECB3] p-10 border-2 border-[#D7CCC8] shadow-md">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#D84315]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            The Ancient Gurukula System
          </h2>
          <p
            className="text-lg leading-relaxed text-[#5D4037] max-w-4xl mx-auto"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            The Guru and Sishya live in the same campus surrounded with pure
            green rustic nature along with huge cashew trees. The process of
            intensive learning begins with the melodious sounds of birds
            chirping in the early hours, cows grazing, and other soothing sounds
            of nature. The uniqueness of Sampradaayam lies in this ancient
            Gurukula System of teaching earnest students.
          </p>
        </div>

        {/* Complete Education */}
        <div className="mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Complete Education
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border-l-4 border-[#D84315] shadow-md">
              <h3
                className="text-xl font-bold mb-4 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Dance Excellence
              </h3>
              <p
                className="text-[#5D4037] leading-relaxed"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Sampradaayam fulfills the concept of complete education in
                Kuchipudi Dance both in theory and practicals. The idea is to
                create great exponents in dance and music like Smt. Yamini
                Krishnamurthy and Dr. Mangalampalli Balamurali Krishna.
              </p>
            </div>
            <div className="p-8 bg-white border-l-4 border-[#D84315] shadow-md">
              <h3
                className="text-xl font-bold mb-4 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Academic Pursuit
              </h3>
              <p
                className="text-[#5D4037] leading-relaxed"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Besides education in dance and music, Sampradaayam also
                encourages academic education till Master's Degree in selected
                courses through Distance Education mode.
              </p>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-16 bg-[#FFECB3] p-10 border-t-4 border-[#D84315] shadow-md">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Facilities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🏠</div>
              <h3
                className="font-bold mb-2 text-[#3E2723]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Residential Campus
              </h3>
              <p
                className="text-sm text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Food and accommodation provided within the campus
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🚌</div>
              <h3
                className="font-bold mb-2 text-[#3E2723]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Transport Service
              </h3>
              <p
                className="text-sm text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Bus facility for day scholars from Srikakulam Town
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-3">🎭</div>
              <h3
                className="font-bold mb-2 text-[#3E2723]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Evening Classes
              </h3>
              <p
                className="text-sm text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Classes for all age groups, 6 days a week (4:00 - 7:30 PM)
              </p>
            </div>
          </div>
        </div>

        {/* Global Achievements */}
        <div className="mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Global Achievements
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-8 border-l-4 border-[#8D6E63] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Digital Innovation
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Successfully initiated and implemented the digitalization of
                6-year Kuchipudi dance course, making it accessible to students
                worldwide through online platforms with structured modules
                covering theory, practical training, and performance techniques.
              </p>
            </div>

            <div className="bg-white p-8 border-l-4 border-[#8D6E63] shadow-md">
              <h3
                className="text-xl font-bold mb-3 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                International Productions
              </h3>
              <div
                className="grid md:grid-cols-2 gap-4 text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <div>
                  <p className="mb-2">
                    <strong>Ayodhya Rama (Europe)</strong>
                  </p>
                  <p className="text-sm">
                    Grand dance ballet portraying the life and legacy of Lord
                    Rama
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Ardhanareeswaram (UK)</strong>
                  </p>
                  <p className="text-sm">
                    Exploring the Shiva-Parvati concept of cosmic balance
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Shakti (Malaysia)</strong>
                  </p>
                  <p className="text-sm">Celebrating divine feminine energy</p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Dance of Yoga (USA - TANA)</strong>
                  </p>
                  <p className="text-sm">
                    Performed for Telugu Association of North America
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Giripradakshina (Tiruvannamalai)</strong>
                  </p>
                  <p className="text-sm">
                    Spiritually immersive performance dedicated to Arunachala
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <strong>Andaman & Nicobar</strong>
                  </p>
                  <p className="text-sm">
                    Cross-cultural performance to remote island communities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Festivals */}
        <div className="mb-16 bg-[#FFECB3] p-10 border-2 border-[#D7CCC8] shadow-md">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Annual Festivals
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#FFF8E7]">
              <h3
                className="font-bold mb-2 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Siddendra Jayanthi
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Celebrated in August
              </p>
            </div>
            <div className="p-6 bg-[#FFF8E7]">
              <h3
                className="font-bold mb-2 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Vaggeyakara Festival
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Celebrated in October
              </p>
            </div>
            <div className="p-6 bg-[#FFF8E7] md:col-span-2">
              <h3
                className="font-bold mb-2 text-[#D84315]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Karthika Kala Mahotsavam
              </h3>
              <p
                className="text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                Annual festival organized in the last week of November. Artistes
                of national repute are invited to perform. Students are
                encouraged to perform during this festival and other national
                festivals like Khajuraho and Taj.
              </p>
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
