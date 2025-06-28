// SIGNUP FUNCTION
async function signupUser() {
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("https://jay-bharat-surgical-works.onrender.com/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful!");
      window.location.href = "login.html";
    } else {
      throw new Error(data.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Signup failed: " + error.message);
  }
}

// LOGIN FUNCTION
async function loginUser() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    const response = await fetch("https://jay-bharat-surgical-works.onrender.com/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(data));
      alert("Login successful!");
      window.location.href = "account.html";
    } else {
      throw new Error(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Login failed: " + error.message);
  }
}

// ATTACH HANDLERS BASED ON PAGE
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path.includes("signup.html")) {
    const form = document.getElementById("signupForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        signupUser();
      });
    }
  }

  if (path.includes("login.html")) {
    const form = document.getElementById("loginForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        loginUser();
      });
    }
  }
});
