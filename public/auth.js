const API = `${window.location.origin}/api/auth`;

/* ================= REGISTER ================= */
async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) return alert("All fields required");

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (!res.ok) return alert(data.message || "Registration failed");

  alert("Registration successful! Login now.");
  window.location.href = "login.html";
}

/* ================= LOGIN ================= */
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) return alert("All fields required");

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) return alert(data.message || "Login failed");

  localStorage.setItem("token", data.token);

  // Redirect admins to admin panel; others to todo page
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    } catch (e) {
      return null;
    }
  };

  const payload = parseJwt(data.token);
  if (payload && payload.role === 'admin') {
    window.location.href = "admin.html";
  } else {
    window.location.href = "todo.html";
  }
}
