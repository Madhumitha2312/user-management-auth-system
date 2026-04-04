    window.onload = function () {
    loadUsers();   // default load
  };

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
  
  let allUsers = JSON.parse(localStorage.getItem("users")) || [];;
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
    
      // ✅ Use real users from localStorage
      allUsers = JSON.parse(localStorage.getItem("users")) || [];
    
      renderUsers(allUsers);
  
        if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
    
      document.getElementById("totalUsers").innerText = allUsers.length;
      document.getElementById("activeUsers").innerText = allUsers.length;
    
      loadChart();
    }
  
  // ==============================
  // RENDER USERS
  // ==============================
  
  function renderUsers(users) {

  const content = document.getElementById("content");

  let html = `
    <h2>Users Management</h2>
    <input type="text" id="search" placeholder="Search users..." onkeyup="searchUser()">

    <table>
      <tr>
        <th>User</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
  `;

  users.forEach((user, index) => {
    html += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  html += `</table>`;

  content.innerHTML = html;
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
  
    function deleteUser(index) {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.splice(index, 1);

  localStorage.setItem("users", JSON.stringify(users));

  // reload UI
  loadUsers();
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

  const content = document.getElementById("content");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const total = users.length;
  const active = users.length;
  const inactive = 0;

  content.innerHTML = `
  <h2>Analytics</h2>

  <div class="cards">

    <div class="card">
      <h4>Total Users</h4>
      <h2>${users.length}</h2>
    </div>

    <div class="card">
      <h4>Active Users</h4>
      <h2 style="color:green;">${users.length}</h2>
    </div>

    <div class="card">
      <h4>Inactive Users</h4>
      <h2 style="color:red;">0</h2>
    </div>

  </div>

  <canvas id="analyticsChart"></canvas>
`;

  const ctx = document.getElementById("analyticsChart").getContext("2d");

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
