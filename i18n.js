const translations = {
  en: {
    "calendar.title": "Calendar",
    "calendar.tabs.academic": "Academic Calendar",
    "calendar.tabs.events": "Events",
    "calendar.tabs.workshops": "Workshops",
    "calendar.academic.empty": "No academic schedule available",
    "calendar.events.empty": "No events found",
    "calendar.workshops.empty": "No workshops available",
    "calendar.loading": "Loading…",
    "calendar.error": "Something went wrong"
  }
}

const lang = 'en'

function t(key) {
  return translations[lang][key] || key
}

document.querySelectorAll('[data-i18n]').forEach(el => {
  el.textContent = t(el.dataset.i18n)
})
