// ==============================
// AUTH CHECK
// ==============================
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

// ==============================
// GLOBAL DATA
// ==============================
let allUsers = JSON.parse(localStorage.getItem("users")) || [];

// ==============================
// ON LOAD
// ==============================
window.onload = function () {
  loadDashboard();
};

// ==============================
// SECTION SWITCH (MAIN FIX)
// ==============================
function showSection(event, section) {

  // hide all sections
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });

  // show selected
  document.getElementById(section + "Section").style.display = "block";

  // active sidebar
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.classList.remove("active");
  });

  event.currentTarget.classList.add("active");

  // load respective data
  if (section === "dashboard") loadDashboard();
  if (section === "users") loadUsers();
  if (section === "analytics") loadAnalytics();
  if (section === "settings") loadSettings();
}

// ==============================
// DASHBOARD
// ==============================
function loadDashboard() {

  allUsers = JSON.parse(localStorage.getItem("users")) || [];

  document.getElementById("totalUsers").innerText = allUsers.length;
  document.getElementById("activeUsers").innerText = allUsers.length;
  document.getElementById("newUsers").innerText = 0;

  loadChart();
}

// ==============================
// USERS
// ==============================
function loadUsers() {

  allUsers = JSON.parse(localStorage.getItem("users")) || [];

  const container = document.getElementById("usersContainer");
  container.innerHTML = "";

  allUsers.forEach((user, index) => {
    container.innerHTML += `
      <tr>
        <td>
          <div class="avatar">${user.name ? user.name[0].toUpperCase() : "U"}</div>
          ${user.name || "User"}
        </td>
        <td>${user.email}</td>
        <td class="actions">
          <button class="delete" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// ==============================
// DELETE USER (FIXED)
// ==============================
function deleteUser(index) {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  loadUsers();
  loadDashboard();
  loadAnalytics();
}

// ==============================
// SEARCH
// ==============================
document.addEventListener("input", function (e) {

  if (e.target.id === "searchInput") {

    const value = e.target.value.toLowerCase();

    const filtered = allUsers.filter(user =>
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );

    const container = document.getElementById("usersContainer");
    container.innerHTML = "";

    filtered.forEach((user, index) => {
      container.innerHTML += `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>
            <button onclick="deleteUser(${index})">Delete</button>
          </td>
        </tr>
      `;
    });
  }
});

// ==============================
// ANALYTICS (FIXED UI)
// ==============================
function loadAnalytics() {

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const total = users.length;
  const active = users.length;
  const inactive = 0;

  document.getElementById("analyticsContainer").innerHTML = `
    <div class="cards">

      <div class="card">
        <h4>Total Users</h4>
        <h2>${total}</h2>
      </div>

      <div class="card">
        <h4>Active Users</h4>
        <h2 style="color:green">${active}</h2>
      </div>

      <div class="card">
        <h4>Inactive Users</h4>
        <h2 style="color:red">${inactive}</h2>
      </div>

    </div>

    <div class="chart">
      <canvas id="analyticsChart"></canvas>
    </div>
  `;

  const ctx = document.getElementById("analyticsChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Total", "Active", "Inactive"],
      datasets: [{
        label: "Users",
        data: [total, active, inactive]
      }]
    }
  });
}

// ==============================
// SETTINGS
// ==============================
function loadSettings() {

  document.getElementById("settingsContainer").innerHTML = `
    <div class="card" style="max-width:400px;">
      
      <h3>⚙️ Settings</h3>

      <p>Theme</p>
      <button onclick="toggleTheme()" class="edit">
        Toggle Dark Mode 🌙
      </button>

      <br><br>

      <p>Account</p>
      <button onclick="logout()" class="delete">
        Logout 🚪
      </button>

    </div>
  `;
}

// ==============================
// DARK MODE
// ==============================
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ==============================
// CHART
// ==============================
function loadChart() {

  const ctx = document.getElementById("growthChart");

  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [{
        label: "Users",
        data: [2, 4, 6, 8, allUsers.length],
        borderWidth: 2
      }]
    }
  });
}

// ==============================
// LOGOUT
// ==============================
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
