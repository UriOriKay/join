let contact_boxes = [];
let filtered_contacts = [];
let users = [];
let contacts = [];
let categorys = [];
let tasks = [];
let task_amounts = [];
let input_name;
let input_email;
let input_phone;
let input_password;
let input_confirm_password;
let newContact;
let active_user;
let login_index = 0;
let isShown = false;

let segements_array = [
  {
    con: "to-do-con",
    headline: "To do",
  },
  {
    con: "in-progress-con",
    headline: "In progress",
  },
  {
    con: "await-feedback-con",
    headline: "Await feedback",
  },
  {
    con: "done-con",
    headline: "Done",
  },
];

/**
 * The token used for remote storage authentication.
 * @type {string}
 */
// const STORAGE_TOKEN = "CA66J9VJZ010MHTW4IAFVKAPKFNFFP7F129MWRPE";

/**
 * The URL for remote storage.
 * @type {string}
 */
const BASE_URL = "https://join-5ffbe-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Sets a key-value pair in remote storage.
 *
 * This function sends a POST request to the remote storage URL with the provided key and value.
 *
 * @param {string} key - The key for the data.
 * @param {any} value - The value to be stored.
 * @returns {Promise<Object>} - A Promise that resolves to the response data.
 */
async function setItem(path, data) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

/**
 * Retrieves an item from the storage based on the given key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @return {Promise<any>} A promise that resolves to the value of the retrieved item.
 */
async function getItem(path) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "GET",
    header: {
      "Content-Type": "application/json",
    },
  });
  return (responseToJson = await response.json());
}

/**
 * Retrieves an element from the document with the specified ID.
 *
 * @param {string} id - The ID of the element to retrieve.
 * @return {Element | null} The element with the specified ID, or null if no
 * element was found.
 */
function docID(id) {
  return document.getElementById(id);
}

/**
 * Initializes the function.
 *
 * @return {Promise<void>} Promise that resolves when the initialization is complete.
 */
async function init() {
  setHeader();
}

/**
 * Sets the header of the page.
 *
 * @return {undefined} This function does not return a value.
 */
function setHeader() {
  new Header();
  openNavMenu(); 
  if (localStorage.getItem("activeuser") === null && sessionStorage.getItem("activeuser") === null) {
    docID("header-name-tag").style.display = "none";
    docID("navbar-con").style.display = "none";
    docID("navbar").style.justifyContent = "flex-end";
  } else {
    docID("header-name-tag").style.display = "flex";
    if (sessionStorage.getItem("activeuser")) {sessionUserload()}
    else if (localStorage.getItem("activeuser")) {localUserload()}
    updateUserValues();
    docID("navbar").style.justifyContent = "space-between";
    docID("navbar-con").style.display = "flex";
  }
}

/**
 * Sets the navigation bar to active for the given container.
 *
 * @param {string} con - The container ID or class.
 * @return {void} This function does not return a value.
 */
function setNavBarActive(con) {
  docID(con).classList.add("nav-active");
}

/**
 * Opens the navigation menu by creating and appending several elements to the DOM.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function openNavMenu() {
  new Div("navbar", "navbar-con");
  new MenuLink("navbar-con", "summary");
  new MenuLink("navbar-con", "add_task");
  new MenuLink("navbar-con", "board");
  new MenuLink("navbar-con", "contacts");
  new Div("navbar", "navbar-bottom");
  new Anchor("navbar-bottom","nav-privacy","", "../html/PrivacyPolicy.html", "Privacy Policy");
  new Anchor("navbar-bottom","nav-legal","","../html/LegalNotice.html","Legal Notice");
}


/**
 * Updates the user values.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function updateUserValues() {
  docID("header-name-tag").innerHTML = active_user.nameTag;
}

/**
 * Sets the innerHTML of the element with the given id to display a message indicating that the field is required.
 *
 * @param {string} id - The id of the element to update.
 * @return {void} This function does not return anything.
 */
function isRequiered(id) {
  docID(id).innerHTML = /*html*/ `
    This field is required
  `;
}

/**
 * Creates a contact box and appends it to the given parent element.
 *
 * @param {HTMLElement} parent - The parent element to append the contact box to.
 * @return {void} This function does not return a value.
 */
function createContactBox(parent) {
  let parentArray = contact_boxes; //später Parameter
  contacts.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}

/**
 * Calculates and returns the amounts of tasks for each segment in the `segements_array`.
 *
 * @return {Array} An array containing the amounts of tasks for each segment.
 */
function getTasksAmounts() {
  task_amounts = [];
  segements_array.forEach((e) => {
    task_amounts.push(tasks.filter((obj) => obj.container == e.con).length);
  });
  return task_amounts;
}

 /**
 * Checks if the input fields for name, email, and phone are not empty.
 *
 * @return {boolean} Returns true if all input fields are not empty, otherwise false.
 */
function checkEmptyInputs() {
  return (
    input_name.value != "" &&
    input_email.value != "" &&
    !input_phone.value != ""
  );
}

/**
 * Adds a new contact to the contacts array.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function addNewContact() {
  login_index = 0;
  let idx = setNewIdx();

  newContact = {
    name: "",
    color: setRandomColor(),
    mail: "",
    phone: "",
    nameTag: "??",
    idx: idx,
  };

  contacts.push(newContact);
}

/**
 * Generates a new index for a contact item.
 *
 * @return {number} The newly generated index for the contact item.
 */
function setNewIdx() {
  let contact_index = 0;
  do contact_index++;
  while (docID(`contact-item-${contact_index}`) != null);
  {
    return contact_index;
  }
}

/**
 * Generates a random color from the 'backgroundcolors' array and returns it.
 * 
 *
 * @return {string} The randomly generated color.
 */
function setRandomColor() {
  let randomNumber = Math.floor(Math.random() * backgroundcolors.length);
  let color = backgroundcolors[randomNumber];
  return color;
}

/**
 * Generates a name tag based on the given name.
 * 
 * @param {string} name - The name to generate the name tag from.
 * @return {string} The generated name tag.
 */
function setNameTag(name) {
  let currentName = name;
  let nameArray = currentName.split(" ");
  let nameTag = nameArray[0].charAt(0);
  nameTag += nameArray[nameArray.length - 1].charAt(0);
  nameTag = nameTag.toUpperCase();
  return nameTag;
}

/**
 * Loads users from storage and parses them into an object.
 *
 * @return {Promise<void>} A promise that resolves when the users are loaded and parsed.
 */
async function loadUsers() {
  users = await getItem("users");
}

/**
 * Loads the contacts by parsing the JSON data retrieved from the "contacts" item.
 *
 * @return {Promise<void>} A Promise that resolves once the contacts are loaded.
 */
async function loadContacts() {
  contacts = await getItem("contacts");
}

/**
 * Loads tasks from storage and returns them.
 *
 * @return {Promise<Array>} The tasks retrieved from storage.
 */
async function loadTasks() {
  tasks = await getItem("tasks");
  tasks.forEach((t)=>{
    if(!t.subtasks ){
      t.subtasks = [];
      t.subtaskschecked = [];
    }
  })
}

/**
 * Loads the categorys asynchronously.
 *
 * @return {Promise<void>} A Promise that resolves with no value.
 */
async function loadCategorys() {
  categorys = await getItem("categorys");
}

/**
 * Checks if there is an active user.
 *
 * @return {boolean} Returns true if there is an active user, otherwise returns false.
 */
function activeUser() {
  if (localStorage.getItem("activeuser") === null) {
    if (sessionStorage.getItem("activeuser") === null) {
      window.location.href = "../html/index.html";
    } else {
      sessionUserload();
      return true;
    }
  } else {
    localUserload();
  }
}

/**
 * Saves the active user to the local storage.
 *
 * @param {string} user - The user to be saved.
 */
function localUsersave(user) {
  localStorage.setItem("activeuser", user);
}

/**
 * Saves the active user to the session storage.
 *
 * @param {string} user - The user to be saved.
 */
function sessionUsersave(user) {
  sessionStorage.setItem("activeuser", user);
}

/**
 * Loads the active user from local storage.
 *
 * @return {undefined} There is no return value.
 */
function localUserload() {
  let user = localStorage.getItem("activeuser");
  active_user = JSON.parse(user);
}

/**
 * Load the active user from session storage.
 *
 * @return {undefined} The function does not return a value.
 */
function sessionUserload() {
  let user = sessionStorage.getItem("activeuser");
  active_user = JSON.parse(user);
}

/**
 * Toggles the visibility of the header dropdown menu.
 *
 * @param {boolean} isShown - Indicates whether the dropdown menu is currently shown.
 * @return {void} No return value.
 */
function showHeaderDropdown() {
  if (!isShown) {
    docID("dropdown-menu").classList.add("show");
  } else {
    docID("dropdown-menu").classList.remove("show");
  }
  isShown = !isShown;
}

/**
 * Logs out the user by removing the "activeuser" item from the local storage
 * and session storage. Then redirects the user to the index.html page.
 *
 * @return {undefined} No return value.
 */
function logout() {
  if (localStorage.getItem("activeuser") != null) {
    localStorage.removeItem("activeuser");
  }
  if (sessionStorage.getItem("activeuser") != null) {
    sessionStorage.removeItem("activeuser");
  }

  window.location.href = "./index.html";
}
