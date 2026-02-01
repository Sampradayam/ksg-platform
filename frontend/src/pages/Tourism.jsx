import { useState } from "react";

export default function Tourism() {
  const [selectedPlace, setSelectedPlace] = useState("sampradaayam");

  const places = {
    sampradaayam: {
      name: "Sampradaayam Gurukulam",
      distance: "Kallepally, Srikakulam",
      description: "12-acre campus on the banks of river Nagavali",
      image: "🏛️",
    },
    srikakulam: {
      name: "Srikakulam Town",
      distance: "3 km",
      description: "District headquarters with rich cultural heritage",
      image: "🏙️",
    },
    arasavalli: {
      name: "Arasavalli Sun Temple",
      distance: "10 km",
      description: "Ancient temple dedicated to Surya Deva",
      image: "⛩️",
    },
    kalingapatnam: {
      name: "Kalingapatnam Beach",
      distance: "15 km",
      description: "Serene coastal town with historical significance",
      image: "🏖️",
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
              <span style={{ fontFamily: "Cinzel, serif" }}>
                Explore Our Heritage
              </span>
              <div className="w-12 h-1 bg-[#8D6E63]"></div>
            </div>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold mb-6 text-[#3E2723]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Cultural Tourism
          </h1>

          <p
            className="text-xl text-[#5D4037] max-w-3xl mx-auto mb-8"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Journey to Kallepally, Srikakulam - where traditional Kuchipudi
            dance meets the serene beauty of river Nagavali and rich cultural
            heritage
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="px-8 py-4 bg-[#D84315] text-white font-bold hover:bg-[#BF360C] transition-all shadow-lg uppercase tracking-wide"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Plan Your Visit
            </button>
            <button
              className="px-8 py-4 bg-white text-[#D84315] border-2 border-[#D84315] font-bold hover:bg-[#FFECB3] transition-all uppercase tracking-wide"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              View Gallery
            </button>
          </div>
        </div>
      </div>

      {/* About Sampradaayam Campus */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#3E2723] mb-6"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Sampradaayam Cultural Trust
              </h2>

              <div
                className="space-y-4 text-lg text-[#5D4037] leading-relaxed"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <p>
                  Situated on a sprawling 12-acre campus at Kallepally,
                  Srikakulam, Andhra Pradesh, Sampradaayam Kuchipudi Gurukulam
                  is owned by Sampradaayam Cultural Trust, Government of Andhra
                  Pradesh.
                </p>

                <p>
                  Kallepally is a small beautiful village situated on the banks
                  of river Nagavali, about 3 kilometers from the District
                  Collectorate. The campus is surrounded by lush green rustic
                  nature with huge cashew trees.
                </p>

                <p>
                  The Guru and Sishya live in the same campus, where the process
                  of intensive learning begins with the melodious sounds of
                  birds chirping in the early hours, cows grazing, and other
                  soothing sounds of nature.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-6">
                  <div className="text-sm text-[#5D4037] mb-1 font-semibold">
                    Location
                  </div>
                  <div
                    className="text-xl font-bold text-[#D84315]"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    Srikakulam
                  </div>
                  <div className="text-sm text-[#5D4037]">Andhra Pradesh</div>
                </div>
                <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-6">
                  <div className="text-sm text-[#5D4037] mb-1 font-semibold">
                    Campus Size
                  </div>
                  <div
                    className="text-xl font-bold text-[#D84315]"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    12 Acres
                  </div>
                  <div className="text-sm text-[#5D4037]">
                    Kallepally Village
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#FFECB3] border-4 border-[#D7CCC8] p-8 shadow-xl">
                <div className="bg-white p-8">
                  <h3
                    className="text-2xl font-bold text-[#3E2723] mb-6 border-b-2 border-[#D84315] pb-3"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    Campus Features
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-[#FFF8E7] border-l-4 border-[#D84315]">
                      <div className="text-3xl">🏛️</div>
                      <div>
                        <h4
                          className="font-bold text-[#3E2723] mb-1"
                          style={{ fontFamily: "Cinzel, serif" }}
                        >
                          Ancient Gurukula System
                        </h4>
                        <p
                          className="text-[#5D4037] text-sm"
                          style={{ fontFamily: "Crimson Text, serif" }}
                        >
                          Residential campus where students live and learn
                          following the traditional guru-shishya parampara.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#FFF8E7] border-l-4 border-[#D84315]">
                      <div className="text-3xl">🌳</div>
                      <div>
                        <h4
                          className="font-bold text-[#3E2723] mb-1"
                          style={{ fontFamily: "Cinzel, serif" }}
                        >
                          Natural Environment
                        </h4>
                        <p
                          className="text-[#5D4037] text-sm"
                          style={{ fontFamily: "Crimson Text, serif" }}
                        >
                          Surrounded by cashew trees and river Nagavali,
                          offering a peaceful atmosphere for learning.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#FFF8E7] border-l-4 border-[#D84315]">
                      <div className="text-3xl">🎭</div>
                      <div>
                        <h4
                          className="font-bold text-[#3E2723] mb-1"
                          style={{ fontFamily: "Cinzel, serif" }}
                        >
                          Dance Studios
                        </h4>
                        <p
                          className="text-[#5D4037] text-sm"
                          style={{ fontFamily: "Crimson Text, serif" }}
                        >
                          Professional dance studios equipped for both theory
                          and practical training in Kuchipudi.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-[#FFF8E7] border-l-4 border-[#D84315]">
                      <div className="text-3xl">🏠</div>
                      <div>
                        <h4
                          className="font-bold text-[#3E2723] mb-1"
                          style={{ fontFamily: "Cinzel, serif" }}
                        >
                          Residential Facilities
                        </h4>
                        <p
                          className="text-[#5D4037] text-sm"
                          style={{ fontFamily: "Crimson Text, serif" }}
                        >
                          Complete accommodation and food facilities provided
                          within the campus for residential students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Places */}
      <div className="py-20 px-6 bg-[#FFECB3]">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center text-[#3E2723] mb-4"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Explore Nearby Attractions
          </h2>
          <p
            className="text-center text-[#5D4037] mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: "Crimson Text, serif" }}
          >
            Discover the cultural and natural beauty surrounding Sampradaayam
          </p>

          {/* Place Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {Object.keys(places).map((place) => (
              <button
                key={place}
                onClick={() => setSelectedPlace(place)}
                className={`p-6 transition-all duration-300 border-2 ${
                  selectedPlace === place
                    ? "bg-[#D84315] text-white border-[#D84315] shadow-xl"
                    : "bg-white text-[#3E2723] border-[#D7CCC8] hover:bg-[#FFF8E7]"
                }`}
              >
                <div className="text-4xl mb-2">{places[place].image}</div>
                <div
                  className="font-bold text-sm"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {places[place].name.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Place Details */}
          <div className="bg-white border-4 border-[#D7CCC8] p-10 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="md:col-span-2">
                <h3
                  className="text-3xl font-bold text-[#3E2723] mb-4"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  {places[selectedPlace].name}
                </h3>
                <p
                  className="text-lg text-[#5D4037] mb-4"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  {places[selectedPlace].description}
                </p>
                <div className="flex items-center gap-2 text-[#D84315]">
                  <span className="text-2xl">📍</span>
                  <span
                    className="font-semibold"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    {places[selectedPlace].distance}
                  </span>
                </div>
              </div>

              <div className="bg-[#FFECB3] p-6 border-l-4 border-[#D84315]">
                <h4
                  className="font-bold text-[#3E2723] mb-4"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Quick Info
                </h4>
                <div
                  className="space-y-2 text-sm text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  <div>🚗 Accessible by road</div>
                  <div>🕒 Open all year</div>
                  <div>📸 Photography allowed</div>
                </div>
              </div>
            </div>

            {/* Specific Details Based on Selection */}
            {selectedPlace === "sampradaayam" && (
              <div className="space-y-6">
                <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#8D6E63]">
                  <h5
                    className="font-bold text-[#3E2723] mb-3"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    What to Experience
                  </h5>
                  <div
                    className="space-y-2 text-sm text-[#5D4037]"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    <div>
                      🎭 Watch students practicing traditional Kuchipudi dance
                    </div>
                    <div>🏛️ Visit the dance studios and performance halls</div>
                    <div>🌅 Enjoy the serene banks of river Nagavali</div>
                    <div>🌳 Walk through the lush campus with cashew trees</div>
                    <div>
                      📚 Learn about the ancient Gurukula system of education
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#8D6E63]">
                  <h5
                    className="font-bold text-[#3E2723] mb-3"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    Annual Festivals
                  </h5>
                  <div
                    className="space-y-2 text-sm text-[#5D4037]"
                    style={{ fontFamily: "Crimson Text, serif" }}
                  >
                    <div>
                      🎊 <strong>Siddendra Jayanthi</strong> - August
                    </div>
                    <div>
                      🎵 <strong>Vaggeyakara Festival</strong> - October
                    </div>
                    <div>
                      🎭 <strong>Karthika Kala Mahotsavam</strong> - Last week
                      of November
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedPlace === "srikakulam" && (
              <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#8D6E63]">
                <h5
                  className="font-bold text-[#3E2723] mb-3"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  About Srikakulam
                </h5>
                <p
                  className="text-sm text-[#5D4037] mb-3"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  Srikakulam is the district headquarters, located just 3 km
                  from Sampradaayam campus. The town offers various amenities
                  including markets, restaurants, and accommodation options for
                  visitors.
                </p>
                <div
                  className="space-y-2 text-sm text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  <div>🏛️ District Collectorate and administrative offices</div>
                  <div>🏪 Local markets and shopping areas</div>
                  <div>🍛 Traditional Andhra cuisine restaurants</div>
                  <div>🏨 Hotels and guesthouses for accommodation</div>
                </div>
              </div>
            )}

            {selectedPlace === "arasavalli" && (
              <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#8D6E63]">
                <h5
                  className="font-bold text-[#3E2723] mb-3"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Arasavalli Sun Temple
                </h5>
                <p
                  className="text-sm text-[#5D4037] mb-3"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  One of the oldest and most significant Sun temples in India,
                  dedicated to Surya Deva. The temple attracts devotees from
                  across the country and showcases beautiful ancient
                  architecture.
                </p>
                <div
                  className="space-y-2 text-sm text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  <div>⛩️ Ancient temple with historical significance</div>
                  <div>🌅 Special prayers during sunrise</div>
                  <div>🎨 Exquisite stone carvings and sculptures</div>
                  <div>📿 Important pilgrimage destination</div>
                </div>
              </div>
            )}

            {selectedPlace === "kalingapatnam" && (
              <div className="bg-[#FFF8E7] p-6 border-l-4 border-[#8D6E63]">
                <h5
                  className="font-bold text-[#3E2723] mb-3"
                  style={{ fontFamily: "Cinzel, serif" }}
                >
                  Kalingapatnam Beach
                </h5>
                <p
                  className="text-sm text-[#5D4037] mb-3"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  A serene coastal town with pristine beaches and historical
                  significance. Kalingapatnam was once an important port town
                  and trade center during the colonial era.
                </p>
                <div
                  className="space-y-2 text-sm text-[#5D4037]"
                  style={{ fontFamily: "Crimson Text, serif" }}
                >
                  <div>🏖️ Beautiful sandy beaches</div>
                  <div>🌊 Peaceful coastal atmosphere</div>
                  <div>🏛️ Historical Dutch and French settlements</div>
                  <div>🐟 Fresh seafood and local cuisine</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Travel Information */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center text-[#3E2723] mb-12"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            Plan Your Journey
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-8">
              <div className="text-5xl mb-4">✈️</div>
              <h3
                className="text-2xl font-bold text-[#3E2723] mb-4"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                How to Reach
              </h3>
              <div
                className="space-y-3 text-[#5D4037]"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <div>
                  <div className="font-bold text-sm text-[#D84315]">By Air</div>
                  <div className="text-sm">
                    Nearest Airport: Visakhapatnam (110 km)
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm text-[#D84315]">
                    By Train
                  </div>
                  <div className="text-sm">
                    Srikakulam Road Railway Station (30 km)
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm text-[#D84315]">
                    By Road
                  </div>
                  <div className="text-sm">
                    Regular buses from Visakhapatnam and Vizianagaram
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-8">
              <div className="text-5xl mb-4">🏨</div>
              <h3
                className="text-2xl font-bold text-[#3E2723] mb-4"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Where to Stay
              </h3>
              <div
                className="space-y-3 text-[#5D4037] text-sm"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <div>
                  <strong>On Campus:</strong>
                  <br />
                  • Gurukulam residential facilities
                  <br />• Prior arrangement required
                </div>
                <div>
                  <strong>Srikakulam Town:</strong>
                  <br />
                  • Hotels and guesthouses
                  <br />• Budget to mid-range options
                </div>
              </div>
            </div>

            <div className="bg-[#FFECB3] border-2 border-[#D7CCC8] p-8">
              <div className="text-5xl mb-4">📅</div>
              <h3
                className="text-2xl font-bold text-[#3E2723] mb-4"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Best Time to Visit
              </h3>
              <div
                className="space-y-2 text-[#5D4037] text-sm"
                style={{ fontFamily: "Crimson Text, serif" }}
              >
                <div>
                  <strong>October - March:</strong> Pleasant weather, ideal for
                  visit
                </div>
                <div>
                  <strong>November:</strong> Don't miss Karthika Kala Mahotsavam
                  festival
                </div>
                <div>
                  <strong>August:</strong> Siddendra Jayanthi celebrations
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-[#D84315] p-10 text-white text-center shadow-xl">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Experience Authentic Cultural Immersion
            </h3>
            <p
              className="text-xl mb-6 max-w-3xl mx-auto"
              style={{ fontFamily: "Crimson Text, serif" }}
            >
              Visit Sampradaayam to witness the ancient Gurukula system, attend
              cultural performances, and experience traditional Kuchipudi dance
              in its authentic setting.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-8 py-4 bg-white text-[#D84315] font-bold hover:bg-[#FFECB3] transition-all shadow-lg uppercase tracking-wide"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Schedule a Visit
              </button>
              <button
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-[#D84315] transition-all uppercase tracking-wide"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Contact Us
              </button>
            </div>
            <p className="text-sm mt-6">
              📞 Contact for visit arrangements | ✉️ info@sampradaayam.org
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
