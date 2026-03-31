document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        message.innerText = "Please fill all fields";
        return;
    }

    message.innerText = "Login successful ✅";

    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1000);
});

});
