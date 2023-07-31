const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');





const signForm=document.querySelector(".signup")
const loginForm=document.querySelector(".login")

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for password validation (at least 8 characters)
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const userDatabase = [];


function validateSignUpForm(event){
    event.preventDefault();
    let signPassword =document.getElementById("signPassword").value;
    let signName =document.getElementById("signName").value;
    let signEmail =document.getElementById("signEmail").value;
    let errorMsg = document.getElementById("errorMsg");


    if(signName==""||signPassword==""||signEmail==""){
        errorMsg.innerHTML="Please fill the required fields"
        return false;
    } else if (!emailRegex.test(signEmail)) {
        errorMsg.innerHTML = "Invalid email address!";
        return false;
    } else if (signPassword.length < 8 || !passwordRegex.test(signPassword)) {
        errorMsg.innerHTML = "Password must include at least 8 characters, one letter, one number, and one special character!";
        return false;
    }else {
        // Save signed-up user data to session storage
        const user = {
          name: signName,
          email: signEmail,
          password: signPassword,
        };
        userDatabase.push(user);
        sessionStorage.setItem("userDatabase", JSON.stringify(userDatabase));
    
        errorMsg.innerHTML = "";
        alert("Successfully signed up!");
        return true;
      }
    }



function validateLoginForm(event){
    event.preventDefault();
    let loginPassword =document.getElementById("loginPassword").value;
    let loginEmail =document.getElementById("loginEmail").value;
    let loginErrorMsg = document.getElementById("loginErrorMsg");


    if(loginEmail===""||loginPassword===""){
        loginErrorMsg.innerHTML="Please fill the required fields!";
        return false;
    } else if (!emailRegex.test(loginEmail)) {
        loginErrorMsg.innerHTML = "Invalid email address!";
        return false;
    } else {
        // Retrieve saved user data from session storage
        const userDatabase = JSON.parse(sessionStorage.getItem("userDatabase"));
        if (!userDatabase) {
          loginErrorMsg.innerHTML =
            "No registered users found. Please sign up first!";
          return false;
        }
    
        // Check if the email exists in the user database
        const user = userDatabase.find((user) => user.email === loginEmail);
        if (!user) {
          loginErrorMsg.innerHTML =
            "Email address not found. Please sign up first!";
          return false;
        }
    
        // Check if the password matches the stored password for the email
        if (loginPassword !== user.password) {
          loginErrorMsg.innerHTML =
            "Incorrect password. Please try again!";
          return false;
        }
    
        alert("Successfully logged in!");
        loginErrorMsg.innerHTML = "";
        loginEmail='';
        loginPassword='';
        return true;
      }
    }


signForm.addEventListener('submit', validateSignUpForm)
loginForm.addEventListener('submit', validateLoginForm)