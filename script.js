console.log("script working");

const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {

e.preventDefault();

// get input values
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

// password validation
if(password.length < 6){
message.innerText = "Password must be at least 6 characters";
return;
}

try{

const response = await fetch("/api/auth/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
name:name,
email:email,
password:password
})
});

const data = await response.json();

if(response.ok){

message.innerText="User registered successfully ✅";

form.reset();

setTimeout(()=>{
window.location.href="login.html";
},1000);

}
else{

message.innerText=data.message || "Registration failed";

}

}catch(error){

console.error(error);
message.innerText="Server error ❌";

}

});