// Variable declarations

const form = document.querySelector("form");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const invalidCredsMsg = document.getElementById("invalidCredsMsg");

// Function declarations

function storeToken(token) {
  sessionStorage.setItem("token", token);
}

function handleAuthenticationResponse(response) {
  if (!response.ok) {
    invalidCredsMsg.classList.replace("invisible", "visible");
    form.classList.remove("was-validated");
    usernameInput.removeAttribute("disabled", "disabled");
    passwordInput.removeAttribute("disabled", "disabled");
  } else {
    return response.json();
  }
}

function login(event) {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
  } else {
    invalidCredsMsg.classList.replace("visible", "invisible");
    usernameInput.setAttribute("disabled", "disabled");
    passwordInput.setAttribute("disabled", "disabled");

    const loginData = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch("/tokens/generate", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: headers,
    })
      .then(handleAuthenticationResponse)
      .then((data) => storeToken(data.token))
      .then(() => {
        location.assign("/class_list.html");
      })
      .catch((error) => console.error(error));
  }
}

// Code to execute when document loaded

sessionStorage.removeItem("token");
form.addEventListener("submit", login);
