let screen_size = 1023; //screenWidth of Window
let item_amount = 6;
let summaryBox_div_id = "summary-box";
let summary_boxes = [];
let new_number;
let sum;

let descriptions = [
  "Tasks urgent",
  "Tasks in Board",
  "Tasks To-do",
  "Tasks in Progress",
  "Awaiting Feedback",
  "Tasks done",
  "Tasks done",
];

let images = [
  "../assets/img/urgent_summary.png",
  "../assets/img/board_summary.png",
  "../assets/img/to_do_summary.png",
  "../assets/img/in_progress_summary.png",
  "../assets/img/await_feedback_summary.png",
  "../assets/img/done_summary.png",
  "../assets/img/urgent_summary.png",
];

/**
 * Initializes the summary.
 *
 * @return {Promise} A promise that resolves when the summary has been initialized.
 */
async function initSummary() {
  await loadUsers();
  await activeUser();
  init();
  await generateGreetingMessage();
  const taskAmounts = await updateTaskAmounts();
  createSummaryBoxes();
  setNavBarActive("summary-link");
}

/**
 * Updates the task amounts and returns the updated amounts array.
 */
async function updateTaskAmounts() {
  await loadTasks();
  let taskAmounts = getTasksAmounts();
  let urgentTasksCount = tasks.filter(
    (task) => task.priority === "Urgent"
  ).length;
  let sum =
    taskAmounts.reduce((total, amount) => total + amount, 0) -
    taskAmounts[taskAmounts.length - 1];
  taskAmounts.splice(0, 0, urgentTasksCount);
  taskAmounts.splice(1, 0, sum);
  return taskAmounts;
}

/**
 * Generates a greeting message based on the current hour and displays it on the webpage.
 *
 * @return {void} This function does not return anything.
 */
function generateGreetingMessage() {
  let greeting = getGreeting();
  if (active_user.name == "Guest") {
    new Div("greetings", "greetings-span", "font-t1", greeting);
    new Div("greetings", "greeting-name", "", "");
  } else {
    new Div("greetings", "greetings-span", "font-t1", `${greeting},`);
    new Div("greetings", "greeting-name", "", active_user.name);
  }
}


/**
 * Generate a greeting based on the current hour.
 *
 * @return {string} The appropriate greeting based on the current hour.
 */
function getGreeting() {
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour >= 6 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  return greeting;
}

/**
 * Creates summary boxes.
 *
 */
function createSummaryBoxes() {
  docID(summaryBox_div_id).innerHTML = "";

  for (let i = 0; i < item_amount; i++) {
    new Div(summaryBox_div_id, `${summaryBox_div_id}-${i}`);
    summary_boxes.push(new SummaryBox(summaryBox_div_id, i));
  }
  summary_boxes[0].createFirstBox();
  checkDate();
}

/**
 * Navigates to the board.html page.
 *
 * @return {undefined} No return value.
 */
function navToBoard() {
  window.location = "../html/board.html";
}
window.addEventListener("resize", function () {
  changeScreenView();
});

/**
 * Change the screen view by checking and rendering the position of each summary box.
 *
 * @param {Array} summary_boxes - An array of summary boxes.
 * @return {undefined} This function does not return a value.
 */
function changeScreenView() {
  for (let index = 0; index < summary_boxes.length; index++) {
    const element = summary_boxes[index];
    element.checkScreenView(index);
    element.renderPosition(index);
  }
}

/**
 * Retrieves the urgent tasks, sorts them by date, and displays the upcoming deadline.
 *
 * @return {void} - This function does not return a value.
 */
async function checkDate() {
  await loadTasks();
  let urgent_tasks = tasks.filter((obj) => obj.priority == "Urgent");
  let urgent_date;
  urgent_tasks.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
  urgent_date = urgent_tasks[0].date;
  urgent_date = new Date(urgent_date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  docID("upcoming-deadline").innerHTML = urgent_date;
}
