// ==============================
// 🔥 TEMP AUTH FIX (IMPORTANT)
// ==============================

// Use localStorage instead of token (for GitHub Pages demo)
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "login.html";
}

// ==============================
// DATA
// ==============================

let allUsers = [];
let currentPage = 1;
const usersPerPage = 10;

// ==============================
// SECTION SWITCH
// ==============================

function showSection(event, section) {

  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
  });

  document.getElementById(section + "Section").style.display = "block";

  document.querySelectorAll(".sidebar a").forEach(link => {
    link.classList.remove("active");
  });

  event.currentTarget.classList.add("active");

  if (section === "analytics") loadAnalytics();
  if (section === "settings") loadSettings();
}

// ==============================
// DARK MODE
// ==============================

document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// ==============================
// FAKE USERS (SINCE NO BACKEND)
// ==============================

function loadUsers() {

  // Fake data (for demo)
  allUsers = [
    { name: "Madhu", email: "madhu@gmail.com", _id: "1" },
    { name: "User1", email: "user1@gmail.com", _id: "2" },
    { name: "User2", email: "user2@gmail.com", _id: "3" }
  ];

  renderUsers(allUsers);

  document.getElementById("totalUsers").innerText = allUsers.length;
  document.getElementById("activeUsers").innerText = allUsers.length;

  loadChart();
}

// ==============================
// RENDER USERS
// ==============================

function renderUsers(users) {

  const container = document.getElementById("usersContainer");
  container.innerHTML = "";

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;

  users.slice(start, end).forEach(user => {

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="avatar">${user.name[0]}</div>
          ${user.name}
        </div>
      </td>
      <td>${user.email}</td>
      <td>
        <button onclick="deleteUser('${user._id}')">Delete</button>
      </td>
    `;

    container.appendChild(row);
  });

  renderPagination(users.length);
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

    renderUsers(filtered);
  }
});

// ==============================
// PAGINATION
// ==============================

function renderPagination(total) {

  const pageCount = Math.ceil(total / usersPerPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {

    const btn = document.createElement("button");
    btn.innerText = i;

    btn.onclick = () => {
      currentPage = i;
      renderUsers(allUsers);
    };

    container.appendChild(btn);
  }
}

// ==============================
// DELETE USER (LOCAL)
// ==============================

function deleteUser(id) {
  allUsers = allUsers.filter(u => u._id !== id);
  renderUsers(allUsers);
}

// ==============================
// CHART
// ==============================

function loadChart() {

  const ctx = document.getElementById("growthChart");

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


function toggleTheme() {
  document.body.classList.toggle("dark");
}


// ==============================
// LOGOUT
// ==============================

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// ==============================
// ANALYTICS
// ==============================

function loadAnalytics() {
  const container = document.getElementById("analyticsContainer");

  container.innerHTML = `
    <div class="cards">
      
      <div class="card">
        <h4>Total Users</h4>
        <h2>${allUsers.length}</h2>
      </div>

      <div class="card">
        <h4>Active Users</h4>
        <h2 style="color:green;">
          ${Math.floor(allUsers.length * 0.7)}
        </h2>
      </div>

      <div class="card">
        <h4>Inactive Users</h4>
        <h2 style="color:red;">
          ${Math.floor(allUsers.length * 0.3)}
        </h2>
      </div>

    </div>

    <canvas id="analyticsChart" height="100"></canvas>
  `;

  const ctx = document.getElementById("analyticsChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Total", "Active", "Inactive"],
      datasets: [{
        label: "Users",
        data: [
          allUsers.length,
          Math.floor(allUsers.length * 0.7),
          Math.floor(allUsers.length * 0.3)
        ],
        borderWidth: 2
      }]
    }
  });
}


// ==============================
// SETTINGS
// ==============================

function loadSettings() {
  const container = document.getElementById("settingsContainer");

  container.innerHTML = `
    <div class="card" style="max-width:400px;">
      
      <h3>⚙️ Settings</h3>

      <label>Theme</label><br>
      <button onclick="toggleTheme()" class="edit">
        Toggle Dark Mode 🌙
      </button>

      <br><br>

      <label>Account</label><br>
      <button onclick="logout()" class="delete">
        Logout 🚪
      </button>

    </div>
  `;
}
function saveSettings() {
  alert("Saved!");
}

// ==============================
// INIT
// ==============================

loadUsers();
