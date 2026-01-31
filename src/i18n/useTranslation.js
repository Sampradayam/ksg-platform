const translations = {
  en: {
    featuredPrograms: {
      title: "Featured Programs",
      loading: "Loading programs...",
      empty: "No programs available.",
      error: "Failed to load programs.",
      programs: [
        { title: "Classical Dance", description: "Learn traditional dance forms" },
        { title: "Music Lessons", description: "Master classical music instruments" },
        { title: "Cultural Studies", description: "Explore cultural heritage" },
      ],
    },
    cta: {
      title: "Join Our Community",
      description: "Be part of a vibrant cultural journey and connect with fellow enthusiasts.",
      button: "Join Now",
      loading: "Loading...",
      error: "Failed to load content.",
    },
    hero: {
      title: "Welcome to Sampradayam",
      subtitle: "Preserving Cultural Heritage Through Art and Education",
      cta: "Get Started",
      loading: "Loading...",
      error: "Failed to load content.",
    },
    about: {
      title: "About Us",
      description: "Discover the rich cultural heritage and traditional arts through our comprehensive programs and events.",
      loading: "Loading...",
      error: "Failed to load content.",
      readMore: "Read More",
    },
    gallery: {
      title: "Gallery",
      loading: "Loading gallery...",
      empty: "No images available.",
      error: "Failed to load gallery.",
      viewAll: "View All",
    },
    highlights: {
      title: "Highlights",
      loading: "Loading highlights...",
      empty: "No highlights available.",
      error: "Failed to load highlights.",
      cards: [
        { title: "Cultural Events", description: "Experience rich cultural performances" },
        { title: "Educational Programs", description: "Learn from expert instructors" },
        { title: "Community Engagement", description: "Connect with like-minded individuals" },
      ],
    },
    achievements: {
      title: "Achievements",
      awards: {
        title: "Awards",
        loading: "Loading awards...",
        empty: "No awards found.",
        error: "Failed to load awards.",
        viewDetails: "View details",
      },
      students: {
        title: "Student Achievements",
        loading: "Loading student achievements...",
        empty: "No student achievements found.",
        error: "Failed to load student achievements.",
      },
      festivals: {
        title: "Festival Participation",
        loading: "Loading festival participations...",
        empty: "No festival participation records.",
        error: "Failed to load festival data.",
      },
      certificates: {
        title: "Certificates Gallery",
        loading: "Loading certificates...",
        empty: "No certificates to show.",
        error: "Failed to load certificates.",
        open: "Open certificate",
        close: "Close",
      },
    },
  },
};

export function useTranslation(locale = "en") {
  function t(key) {
    const parts = key.split(".");
    let cur = translations[locale] || {};
    for (const p of parts) {
      cur = cur && cur[p];
      if (cur === undefined) return key;
    }
    return cur !== undefined ? cur : key;
  }

  return { t };
}

export default useTranslation;
