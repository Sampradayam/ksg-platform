function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/* SIGNUP */
function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  let users = getUsers();

  if (users.find(u => u.username === username)) {
    alert("User already exists");
    return;
  }

  users.push({ username, password, role });
  saveUsers(users);

  alert("Signup successful");
  window.location.href = "login.html";
}

/* LOGIN */
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let user = getUsers().find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  const redirect = localStorage.getItem("redirectAfterLogin");
  localStorage.removeItem("redirectAfterLogin");

  window.location.href = redirect || "dashboard.html";
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/* PROTECTED ROUTES */
function protectRoute(roles) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    window.location.href = "login.html";
    return;
  }

  if (!roles.includes(user.role)) {
    window.location.href = "unauthorized.html";
  }
}

/* FORGOT PASSWORD (MOCK) */
function resetPassword() {
  const username = document.getElementById("username").value;
  let users = getUsers();

  if (!users.find(u => u.username === username)) {
    alert("User not found");
    return;
  }

  alert("Password reset link sent (mock)");
  window.location.href = "login.html";
}
