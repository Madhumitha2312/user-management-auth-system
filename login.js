const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {

const response = await fetch("/api/auth/login", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({ email, password })

});

const data = await response.json();

if (response.ok) {

message.innerText = "Login successful ✅";

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

window.location.href = "dashboard.html";

} else {

message.innerText = data.message;

}

} catch (error) {

console.error(error);
message.innerText = "Server error";

}

});