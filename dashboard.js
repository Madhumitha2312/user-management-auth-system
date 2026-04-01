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
    <div class="card">
      <h3>Total Users</h3>
      <p>${allUsers.length}</p>
    </div>
  `;
}

// ==============================
// SETTINGS
// ==============================

function loadSettings() {
  const container = document.getElementById("settingsContainer");

  container.innerHTML = `
    <div class="card">
      <h3>Settings</h3>
      <button onclick="saveSettings()">Save</button>
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
