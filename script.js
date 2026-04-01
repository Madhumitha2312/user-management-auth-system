console.log("script working");

const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // get input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // password validation
    if (password.length < 6) {
        message.innerText = "Password must be at least 6 characters";
        return;
    }

    // ✅ FAKE SUCCESS (since no backend)
    message.innerText = "User registered successfully ✅";

    form.reset();

    setTimeout(() => {
        window.location.href = "./login.html";
    }, 1000);
});
