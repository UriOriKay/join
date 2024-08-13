let back_btn;
let custom_checkbox_remember_me;
let custom_checkbox_accept_privacy;
let input_name_value;
let input_email_value;
let input_password_value;
let input_confirm_password_value;
let isCheckedBox;

let name_value;
let email_value;
let password_value;
let confirm_password_value;

let email;
let emails = [];

async function initLogin() {
  await loadUsers();
  setBackBtnsignup();
  renderLoginElements("Login");
}

function renderLoginElements(bool) {
  docID("inputs-con").textContent = "";
  docID("login-form-button-group").textContent = "";

  if (bool == "Login") {
    input_email = new Divinputimg(
      "inputs-con",
      "imput-img-div",
      "mail",
      "Email",
      "../assets/img/icon-mail.png",
      "input-con-email-input-id",
      "input-con-email-input-div-id"
    );
    docID("input-con-email-input-id").required = true;

    input_password = new Divinputimg(
      "inputs-con",
      "imput-img-div",
      "password",
      "Password",
      "../assets/img/icon-lock-closed.png",
      "input-con-password-input-id",
      "input-con-password-input-div-id"
    );
    docID("input-con-password-input-id").required = true;
    custom_checkbox_remember_me = new CustomCheckbox(
      "inputs-con",
      "checkbox-remember-me",
      "Remember Me"
    );

    new Button(
      "login-form-button-group",
      "login-button",
      "button font-t5",
      function () {
        loginUser("Login");
      },
      "Log in"
    );
    new Button(
      "login-form-button-group",
      "guest-login-button",
      "secondary-button font-t5",
      function () {
        loginUser("Guest");
      },
      "Guest Log in"
    );
  }

  if (bool === "Sign up") {
    docID("login-form").onsubmit = function () {
      return false;
    };

    input_name = new Divinputimg(
      "inputs-con",
      "imput-img-div",
      "text",
      "Name",
      "../assets/img/icon-person.png",
      "input-con-name-input-id",
      "input-con-name-input-div-id"
    );
    docID("input-con-name-input-id").required = true;
    input_email = new Divinputimg(
      "inputs-con",
      "imput-img-div",
      "mail",
      "Email",
      "../assets/img/icon-mail.png",
      "input-con-email-input-id",
      "input-con-email-input-div-id"
    );
    docID("input-con-email-input-id").required = true;
    input_password = new Divinputimg(
      "inputs-con",
      "imput-img-div",
      "password",
      "Password",
      "../assets/img/icon-lock-closed.png",
      "input-con-password-input-id",
      "input-con-password-input-div-id"
    );
    docID("input-con-password-input-id").required = true;
    docID("inputs-con-img").onclick = togglePassword;
    input_confirm_password = new Divinputimg(
      "inputs-con",
      "imput-img-div",
      "password",
      "Confirm Password",
      "../assets/img/icon-lock-closed.png",
      "input-con-confirm-password-input-id",
      "input-con-confirm-password-input-div-id"
    );
    docID("input-con-confirm-password-input-id").required = true;

    //Inhalt des Labels sind Span und Achor, muss noch geändert werden.
    custom_checkbox_accept_privacy = new CustomCheckbox(
      "inputs-con",
      "checkbox-accept-privacy",
      ""
    ); 
    docID("checkbox-accept-privacy").required = true;
    custom_checkbox_accept_privacy.text =
      new Span(`labelcheckbox-accept-privacy`, "", "", "I accept the") +
      new Anchor(
        `labelcheckbox-accept-privacy`,
        "",
        "",
        "../html/PrivacyPolicy.html",
        " Privacy Policy"
      );
    docID("checkbox-accept-privacy").onclick = checkAcception;
    new Button(
      "login-form-button-group",
      "signup-form-btn",
      "button font-t5",
      function () {
        saveInputValues();
      },
      "Sign up"
    );
    docID("signup-form-btn").disabled = true;
  }

  docID("login-headline").textContent = bool;
  changeStyle(bool);
}

function setBackBtnsignup() {
  back_btn = new BackBtn("login-item", "signup", function () {
    renderLoginElements("Login");
  });
}

/*** Sign-up ***/

function changeStyle(bool) {
  let links = document.querySelectorAll("#login-link-group a");

  if (bool === "Sign up") {
    docID("button-group").style.display = "none";
    docID("logo-login").src = "../assets/img/Logo-middle_white.png";
    docID("login-main").style.backgroundColor = "var(--primary)";
    docID("inputs-con-div").style.justifyContent = "center";
    docID("login-form-button-group").style.justifyContent = "center";
    docID("signup-back-btn").style.display = "flex";
    docID("login-link-group").innerHTML = "";
    new Anchor(
      "login-link-group",
      "",
      "link-group-a",
      "../html/PrivacyPolicy.html",
      "Private Policy"
    );
    new Anchor(
      "login-link-group",
      "",
      "link-group-a",
      "../html/LegalNotice.html",
      "Legal Notice"
    );
  } else {
    docID("signup-back-btn").style.display = "none";
    docID("button-group").style.display = "flex";
    docID("login-main").style.backgroundColor = "var(--white)";
    docID("logo-login").src = "../assets/img/Logo-middle_blue.png";
    docID("login-link-group").innerHTML = "";
    docID("login-form-button-group").style.justifyContent = "unset";

    new Anchor(
      "login-link-group",
      "",
      "",
      "../html/PrivacyPolicy.html",
      "Private Policy"
    );
    new Anchor(
      "login-link-group",
      "",
      "",
      "../html/LegalNotice.html",
      "Legal Notice"
    );
  }
}

function navToSummary() {
  window.location = "../html/summary.html";
}

async function saveInputValues() {
  input_name_value = docID("input-con-name-input-id").value;
  input_email_value = docID("input-con-email-input-id").value;
  input_password_value = docID("input-con-password-input-id").value;
  input_confirm_password_value = docID(
    "input-con-confirm-password-input-id"
  ).value;
  isCheckedBox = docID("checkbox-accept-privacy").checked;

  if (isCheckSignupForm() && isSamePassword()) {
    if (!isContainedMails()) {
      name_value = input_name_value;
      email_value = input_email_value;
      password_value = input_password_value;
      confirm_password_value = input_confirm_password_value;
      await addNewUser();
      renderLoginElements("Login");
      new Confirmation("login-main", "You Signed Up successfully", false);
    } else {
      docID("input-con-email-input-id").value = "";
      alert(
        "Diese Mail ist schon registriert. Loggen Sie sich ein oder nutzen Sie eine andere Mail-Adresse."
      );
    }
  }
}

function isCheckSignupForm() {
  return (
    input_name_value != "" &&
    input_email_value != "" &&
    input_password_value != "" &&
    input_confirm_password_value != "" &&
    isCheckedBox
  );
}

function isSamePassword() {
  return input_password_value == input_confirm_password_value;
}

async function addNewUser() {
  let newUser = {
    name: input_name_value,
    mail: input_email_value,
    nameTag: setNameTag(input_name_value),
    password: input_password_value,
  };
  users.push(newUser);
  await setItem("users", users);
  await loadUsers();
}

function isContainedMails() {
  emails = [];
  input_email_value = docID("input-con-email-input-id").value;
  users.forEach((user) => {
    emails.push(user.mail);
  });
  return emails.includes(input_email_value) ? (bool = true) : (bool = false);
}

function loginUser(bool) {
  active_user = "";
  if (bool == "Login") {
    active_user = "";
    input_email_value = docID("input-con-email-input-id").value;
    input_password_value = docID("input-con-password-input-id").value;

    if (isContainedMails()) {
      let login_idx = emails.indexOf(input_email_value);
      active_user = users[login_idx];

      if (active_user.password == input_password_value) {
        active_user = JSON.stringify(active_user);

        if (docID("checkbox-remember-me").checked) {
          sessionStorage.removeItem("activeuser");
          localUsersave(active_user);
        } else {
          localStorage.removeItem("activeuser");
          sessionUsersave(active_user);
        }
        navToSummary();
      } else {
        docID("input-con-password-input-id").value = "";
        alert("Das Passwort stimmt nicht überein, bitte noch einmal eingeben.");
      }
    } else {
      docID("input-con-email-input-id").value = "";
      docID("input-con-password-input-id").value = "";
      alert(
        "Bitte gebe deine Email und Password ein oder nutze den Guest Login."
      );
    }
  } else if (bool == "Guest") {
    active_user = users[0];
    active_user = JSON.stringify(active_user);
    sessionUsersave(active_user);
    navToSummary();
  }
}

function checkAcception() {
  if (docID("checkbox-accept-privacy").checked) {
    docID("signup-form-btn").disabled = false;
  } else {
    docID("signup-form-btn").disabled = true;
  }
}

let istogglePassword = false;

function togglePassword(id) {
  let input_id = id;
  let img_id = input_id + "-img";
  if (istogglePassword) {
    docID(input_id).type = "text";
    docID(img_id).src = "../assets/img/showpassword.png";
    istogglePassword = false;
  } else {
    docID(input_id).type = "password";
    docID(img_id).src = "../assets/img/icon-lock-closed.png";
    istogglePassword = true;
  }
}
