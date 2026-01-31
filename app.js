const panels = document.querySelectorAll('.tab-panel')
const tabs = document.querySelectorAll('[role="tab"]')

// Tab switching
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'))
    panels.forEach(p => p.classList.add('hidden'))

    tab.setAttribute('aria-selected', 'true')
    document.getElementById(tab.dataset.tab).classList.remove('hidden')
  })
})

// Mock data
const academicData = [
  { title: 'calendar.academic.term1', date: '2026-06-01 – 2026-09-30' }
]

const eventsData = []

const workshopsData = [
  { title: 'calendar.workshop.yoga', date: '2026-07-12' }
]

function renderList(containerId, items, emptyKey) {
  const container = document.getElementById(containerId)
  container.innerHTML = ''

  if (!items.length) {
    container.innerHTML = `<p>${t(emptyKey)}</p>`
    return
  }

  items.forEach(item => {
    const card = document.createElement('div')
    card.className = 'card'
    card.setAttribute('tabindex', '0')
    card.innerHTML = `
      <h3>${t(item.title)}</h3>
      <p>${item.date}</p>
    `
    container.appendChild(card)
  })
}

renderList('academic', academicData, 'calendar.academic.empty')
renderList('events', eventsData, 'calendar.events.empty')
renderList('workshops', workshopsData, 'calendar.workshops.empty')

