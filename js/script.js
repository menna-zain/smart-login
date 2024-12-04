const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

var alertInvaliedMail = document.querySelector("#invalidmail");
const alertFailedMail = document.querySelector("#failmail");

var usersList = [];

 
if (localStorage.getItem("users") != null) {
  usersList = JSON.parse(localStorage.getItem("users"));
};

//!!!!! ADD
function registerUser() {
  
 const uesr = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  };
  
  if (!uesr.name || !uesr.email || !uesr.password) {
       alert("Please fill out both fields.");
       return;
    };

 
 if (usersList.some(uesr => uesr.email === emailInput.value)) {
  alert("email is exist");
  // alertFailedMail.classList.remove("d-none");
  return;
}

  usersList.push(uesr);
  clearForm();
  localStorage.setItem("users", JSON.stringify(usersList));
  window.location.href = '../index.html';
}

//! CLEAR
function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}


//! VALIDATION
var regex ={ 
  email : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  
}
var matched ;
function validate(elm) {
 
  matched = regex[elm.id].test(elm.value) ;
  if (matched) {
    alertInvaliedMail.classList.add("d-none");
    //!alert
  }else{
    alertInvaliedMail.classList.remove("d-none");
  }
}


function loginUser(event) {
  event.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', email);
      window.location.href = '../pages/welcomepage.html';
  } else {
      alert('Invalid email or password!');
  }
}


window.onload = function () {
  const path = window.location.pathname;
  if (path.includes('../pages/welcomepage.html')) {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
          window.location.href = 'pages/signup.html';
          return;
      }

      const currentUser = localStorage.getItem('currentUser');
      document.getElementById('welcomeMessage').innerText = `Welcome, ${currentUser}!`;
  }
};

