

const translations = {
  en: {
    'auth.loginTitle': 'Login',
    'auth.signupTitle': 'Sign Up',
    'auth.forgotTitle': 'Reset Password',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.login': 'Login',
    'auth.signup': 'Create Account',
    'auth.reset': 'Send Reset Link',
    'auth.forgot': 'Forgot password?',
    'auth.noAccount': 'Create account',
    'auth.haveAccount': 'Already have an account?',
    'auth.backToLogin': 'Back to login',
  },
}

const lang = 'en'
const t = key => translations[lang][key] || key

/* ---------------- Elements ---------------- */

const title = document.getElementById('authTitle')
const loginForm = document.getElementById('loginForm')
const signupForm = document.getElementById('signupForm')
const forgotForm = document.getElementById('forgotForm')

/* ---------------- Helpers ---------------- */

function showForm(form) {
  loginForm.hidden = true
  signupForm.hidden = true
  forgotForm.hidden = true
  form.hidden = false
}

function setTitle(key) {
  title.textContent = t(key)
}

/* ---------------- Navigation ---------------- */

document.body.addEventListener('click', e => {
  const action = e.target.dataset.action
  if (!action) return

  if (action === 'login') {
    showForm(loginForm)
    setTitle('auth.loginTitle')
  }
  if (action === 'signup') {
    showForm(signupForm)
    setTitle('auth.signupTitle')
  }
  if (action === 'forgot') {
    showForm(forgotForm)
    setTitle('auth.forgotTitle')
  }
})

/* ---------------- Submit Handlers ---------------- */

loginForm.addEventListener('submit', e => {
  e.preventDefault()
  alert('Login submitted')
})

signupForm.addEventListener('submit', e => {
  e.preventDefault()
  alert('Signup submitted')
})

forgotForm.addEventListener('submit', e => {
  e.preventDefault()
  alert('Password reset submitted')
})

/* ---------------- Init ---------------- */

document.querySelectorAll('[data-i18n]').forEach(el => {
  el.textContent = t(el.dataset.i18n)
})

showForm(loginForm)
setTitle('auth.loginTitle')


