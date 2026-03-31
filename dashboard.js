const token = localStorage.getItem("token");
if(!token){
  window.location.href = "login.html";
}

let allUsers = [];
let currentPage = 1;
const usersPerPage = 10;

/* SECTION SWITCH */

function showSection(event,section){

  document.querySelectorAll(".section").forEach(sec=>{
    sec.style.display="none";
  });

  document.getElementById(section+"Section").style.display="block";

  document.querySelectorAll(".sidebar a").forEach(link=>{
    link.classList.remove("active");
  });

  event.currentTarget.classList.add("active");

  // 🔥 ADD THIS (important)
  if(section === "analytics") loadAnalytics();
  if(section === "settings") loadSettings();
}

/* DARK MODE */

document.getElementById("darkToggle").onclick=()=>{
  document.body.classList.toggle("dark");
};

/* LOAD USERS */
async function loadUsers(){

  try{

    const res = await fetch("/api/users",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    });

    const data = await res.json();

    if(Array.isArray(data)){
      allUsers = data;
    }
    else if(Array.isArray(data.users)){
      allUsers = data.users;
    }
    else{
      allUsers = [];
    }

    renderUsers(allUsers);

    document.getElementById("totalUsers").innerText = allUsers.length;
    document.getElementById("activeUsers").innerText = allUsers.length;

    loadChart();

  }catch(err){
    console.error("Load users error:",err);
  }
}

/* RENDER USERS */

function renderUsers(users){
   
  if(!Array.isArray(users)){
    console.error("Users is not an array:", users);
    return;
  }

  const container=document.getElementById("usersContainer");
  container.innerHTML="";

  const start=(currentPage-1)*usersPerPage;
  const end=start+usersPerPage;

  users.slice(start,end).forEach(user=>{

    const row=document.createElement("tr");

    row.innerHTML=`
    <td>
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="avatar">${user.name[0].toUpperCase()}</div>
        ${user.name}
      </div>
    </td>

    <td>${user.email}</td>

    <td class="actions">
      <button class="delete"
      onclick="deleteUser('${user._id}')">
      Delete
      </button>
    </td>
    `;

    container.appendChild(row);
  });

  renderPagination(users.length);
}

/* SEARCH */

document.addEventListener("input",function(e){

  if(e.target.id==="searchInput"){

    const value=e.target.value.toLowerCase();

    const filtered=allUsers.filter(user=>
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    );

    renderUsers(filtered);
  }
});

/* PAGINATION */

function renderPagination(total){

  const pageCount=Math.ceil(total/usersPerPage);
  const container=document.getElementById("pagination");
  container.innerHTML="";

  for(let i=1;i<=pageCount;i++){

    const btn=document.createElement("button");
    btn.innerText=i;

    btn.onclick=()=>{
      currentPage=i;
      renderUsers(allUsers);
    };

    container.appendChild(btn);
  }
}

/* DELETE USER */

async function deleteUser(id){

  await fetch(`/api/users/${id}`,{method:"DELETE"});
  showToast("User deleted");
  loadUsers();
}

/* CHART */

function loadChart(){

  const ctx=document.getElementById("growthChart");

  new Chart(ctx,{
    type:"line",
    data:{
      labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets:[{
        label:"Users",
        data:[2,4,6,8,10,12,allUsers.length],
        borderWidth:2,
        tension:0.4
      }]
    }
  });
}

/* TOAST */

function showToast(message){

  const toast=document.getElementById("toast");

  toast.innerText=message;
  toast.style.display="block";

  setTimeout(()=>{
    toast.style.display="none";
  },3000);
}

/* LOGOUT */

function logout(){
  localStorage.removeItem("token");
  window.location.href="login.html";
}

/* INIT */

loadUsers();

/* ========================= */
/* 🔥 ANALYTICS (FIXED UI) */
/* ========================= */

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
        <h2 style="color:green;">${Math.floor(allUsers.length * 0.7)}</h2>
      </div>

      <div class="card">
        <h4>Inactive Users</h4>
        <h2 style="color:red;">${Math.floor(allUsers.length * 0.3)}</h2>
      </div>
    </div>
  `;
}

/* ========================= */
/* 🔥 SETTINGS (FIXED UI) */
/* ========================= */

function loadSettings() {
  const container = document.getElementById("settingsContainer");

  container.innerHTML = `
    <div class="card" style="max-width:400px;">
      <h3>Admin Settings</h3>

      <label>Username</label><br>
      <input type="text" placeholder="Enter username" style="width:100%; padding:8px;"><br><br>

      <label>Password</label><br>
      <input type="password" placeholder="Enter password" style="width:100%; padding:8px;"><br><br>

      <button onclick="saveSettings()" class="edit">Save</button>
    </div>
  `;
}

function saveSettings() {
  alert("Settings saved successfully!");
}