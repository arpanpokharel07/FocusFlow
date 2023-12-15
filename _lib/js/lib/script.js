// import TaskManager from "../TaskManager";
// Counter for timers
let timerCount = 1;

// Interval ID for managing timers
let intervalId;

// Previous end time for timers
let previousEndTime = "00:00";

// Previous start time for timers
let previousStartTime = "00:00";

// Array to store to-do list items (retrieved from localStorage or initialized as an empty array)
let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

// Reference to the input element for to-do list items
let todoValue = document.getElementById("todoText");

// Reference to the alert element for to-do list
let todoAlert = document.getElementById("Alert");

// Reference to the list element for to-do items
let listItems = document.getElementById("list-items");

// Reference to the button for adding or updating to-do items
let addUpdate = document.getElementById("AddUpdateClick");

// Text value for updating to-do items
let updateText = "";

// Reference to the input element for to-do list items
var todoText = document.getElementById("todoText");

// jQuery event for handling page creation
$(document).on("pagecreate", function () {
  // Target the button and footer elements within the active page
  var $toggleNavButton = $(
    '[data-role="page"].ui-page-active #toggleNavButton'
  );
  var $footer = $('[data-role="page"].ui-page-active [data-role="footer"]');

  // Toggle the 'collapsed-nav' class on button click
  $toggleNavButton.click(function () {
    $footer.toggleClass("collapsed-nav");
  });
});

// Event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  // Function to update the timer container on page load
  updateTimerContainer();
});

// --------------------------- LONG TERM GOAL ----------------------------------

// Function to add a new timer
function addTimer() {
  closeTimer();
  const timerContainer = document.getElementById("timer-container");
  const timerNameInput = document.getElementById("timer-name");
  const timerEndDateInput = document.getElementById("timer-end-date");
  const timerElement = document.createElement("div");
  timerElement.className = "timer-container";
  timerElement.id = `timer-container-${timerCount}`;
  const endDate = new Date(timerEndDateInput.value + "T00:00:00");
  const now = new Date();
  const timeRemaining = endDate - now;

  if (timeRemaining > 0) {
    timerElement.innerHTML = `
      <div class="timer-name" id="timer-name-${timerCount}">${
      timerNameInput.value
    }</div>
      <div class="timer-value" id="timer-${timerCount}">${formatTimeRemaining(
      timeRemaining
    )}</div>
      <button class="delete-timer-btn" onclick="deleteTimer(${timerCount})">Delete</button>
    `;

    timerContainer.appendChild(timerElement);

    startCountdown(`timer-${timerCount}`, timeRemaining);

    timerCount++;
  } else {
    alert("Please choose a future date.");
  }

  // Clear input fields
  timerNameInput.value = "";
  timerEndDateInput.value = "";
  updateTimerContainer();
}

// Function to update the timer container
function updateTimerContainer() {
  const timerContainer = document.getElementById("timer-container");

  // Check if there are timers present
  const timersPresent = timerContainer.children.length > 0;

  if (!timerContainer.innerHTML.trim()) {
    // If empty, display "Empty" message
    timerContainer.innerHTML = '<div class="empty-message">Empty</div>';
  }

  // If there are no timers, display the current date and time
  if (!timersPresent) {
    const currentDate = new Date();
    timerContainer.innerHTML = `
      <div id="empty-timer-message">
        <p>Current Date and Time:</p>
        <p>${currentDate.toLocaleString()}</p>
      </div>`;
  }
}

// Function to format the remaining time
function formatTimeRemaining(timeRemaining) {
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return `${days} days ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
    seconds
  )}`;
}

// Function to toggle the visibility of the "Add Timer" form
function toggleAddTimerForm() {
  const addTimerForm = document.getElementById("add-timer-form");
  document.getElementById("add-timer-form").style.display = "block";
  addTimerForm.classList.toggle("visible");
}

// Function to start the countdown for a timer
function startCountdown(timerId, timeRemaining) {
  const timerValueElement = document.getElementById(timerId);

  function updateTimer() {
    if (timeRemaining > 0) {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      timerValueElement.textContent = `${days} days ${formatTime(
        hours
      )}:${formatTime(minutes)}:${formatTime(seconds)}`;
      timeRemaining -= 1000;
      setTimeout(updateTimer, 1000);
    } else {
      timerValueElement.textContent = "Timer expired!";
    }
  }

  updateTimer();
}

// Function to get milliseconds from duration
function getMillisecondsFromDuration(duration) {
  const [minutes, seconds] = duration
    .split(":")
    .map((part) => parseInt(part, 10));
  return (minutes * 60 + seconds) * 1000;
}

// Function to format time with leading zeros
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Function to toggle options menu for a timer
function toggleOptionsMenu(timerId) {}

// Function to delete a timer
function deleteTimer(timerId) {
  const timerContainer = document.getElementById(`timer-container-${timerId}`);
  if (timerContainer) {
    timerContainer.remove();
    updateTimerContainer();
  }
}

// Function to close the "Add Timer" form
function closeTimer() {
  document.getElementById("add-timer-form").style.display = "none";
}

// -------------------------------HABIT PAGE-----------------------------------

// Habit List Page Functions

// Function to show the "Add Habit" dialog
function showAddHabitDialog() {
  document.getElementById("addHabitDialog").style.display = "block";
  document.getElementById("startTimeInput").value = previousEndTime;
}

// Function to hide the "Add Habit" dialog
function hideAddHabitDialog() {
  document.getElementById("addHabitDialog").style.display = "none";
  clearAddHabitDialogInputs();
}

// Function to add a new habit
function addHabit() {
  const habitName = document.getElementById("habitNameInput").value;
  const startTime = document.getElementById("startTimeInput").value;
  const endTime = document.getElementById("endTimeInput").value;
  if (habitName && startTime && endTime) {
    const habitContainer = addHabitContainer(habitName, startTime, endTime);
    hideAddHabitDialog();
    previousStartTime = startTime;
    previousEndTime = endTime;
    startCountdown(habitContainer, endTime);
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to clear the input fields in the "Add Habit" dialog
function clearAddHabitDialogInputs() {
  document.getElementById("habitNameInput").value = "";
  document.getElementById("startTimeInput").value = "00:00";
  document.getElementById("endTimeInput").value = "00:00";
  document.getElementById("colorPicker").value = "light-red";
}

// Function to add a habit container to the page
function addHabitContainer(habitName, startTime, endTime) {
  const habitContainer = document.createElement("div");
  habitContainer.className = "habit-container";
  habitContainer.innerHTML = `
  <div class="habit-name">${habitName}</div>
    <div class="start-time">${startTime}</div>
    <div class="end-time">${endTime}</div>
    <div class="timer-display"></div>
    <button onclick="deleteHabit(this)">Delete</button>`;

  habitContainer.style.display = "flex";
  habitContainer.style.flexDirection = "row";
  habitContainer.style.justifyContent = "space-around";
  document.getElementById("all-habit-container").appendChild(habitContainer);

  return habitContainer;
}

// Function to get the end time of the last habit
function getLastEndTime() {
  const habitContainers = document.querySelectorAll(".habit-container");
  if (habitContainers.length > 0) {
    const lastContainer = habitContainers[habitContainers.length - 1];
    if (lastContainer.classList.contains("gap-container")) {
      const habitName =
        lastContainer.getElementsByClassName("habit-name")[0].textContent;
      const endTimes = lastContainer.getElementsByClassName("end-time");
      if (endTimes.length > 0) {
        return endTimes[0].textContent;
      }
    } else {
      const endTimes = lastContainer.getElementsByClassName("end-time");
      if (endTimes.length > 0) {
        return endTimes[0].textContent;
      }
    }
  }
  return "00:00";
}

// Function to delete a habit
function deleteHabit(button) {
  const habitContainer = button.parentElement;
  const gapContainer = habitContainer.nextElementSibling;

  if (gapContainer && gapContainer.classList.contains("gap-container")) {
    gapContainer.parentNode.removeChild(gapContainer);
  }

  habitContainer.parentNode.removeChild(habitContainer);
}

// Function to start the countdown for a habit
function startCountdown(habitContainer, endTime) {
  const endDateTime = new Date(`${new Date().toDateString()} ${endTime}`);
  const timerDisplay = habitContainer.querySelector(".timer-display");

  const updateTimer = () => {
    const now = new Date();
    const timeRemaining = endDateTime - now;

    if (timeRemaining <= 0) {
      habitContainer.remove();
      console.log(
        `Time's up for habit: ${
          habitContainer.querySelector(".habit-name").textContent
        }`
      );
      clearInterval(countdownInterval);
    } else {
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      const timerDisplayText = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;

      console.log(`Updating timer: ${timerDisplayText}`);
      timerDisplay.textContent = timerDisplayText;
    }
  };

  // Initial call to update the timer immediately
  updateTimer();

  // Set up an interval to update the timer every second
  const countdownInterval = setInterval(updateTimer, 1000);

  return countdownInterval;
}

// ------------------------------------TO DO LIST-----------------------------

// To-Do List Page Functions

// Function to create new To-Do items
function CreateToDoItems() {
  var todoValue = document.getElementById("todoText");
  var listItems = document.getElementById("list-items");

  // Check if the 'todoText' element is present
  if (!todoValue) {
    console.error("Element with id 'todoText' not found.");
    return;
  }

  // Check if the 'list-items' element is present
  if (!listItems) {
    console.error("Element with id 'list-items' not found.");
    return;
  }

  // Check if the input field is empty
  if (todoValue.value == "" || todoValue.value == null) {
    setAlertMessage("Please enter your todo text!");
    todoValue.focus();
  } else {
    // Check if the item is already present
    if (isTodoItemPresent(todoValue.value)) {
      setAlertMessage("This item already present in the list!");
      return;
    }

    // Create and append a new list item
    const li = createTodoListItem(todoValue.value);
    li.classList.add("todo-li"); // Add the 'todo-li' class to the li element
    listItems.appendChild(li);

    // Add the new item to the 'todo' array and update local storage
    todo.push({ item: todoValue.value, status: false });
    setLocalStorage();

    // Display success message and clear input field
    setAlertMessage("Todo item Created Successfully!");
    document.getElementById("todoText").value = "";
  }
}

// Function to read and display existing To-Do items
function ReadToDoItems() {
  todo.forEach((element) => {
    const li = createTodoListItem(element.item, element.status);
    listItems.appendChild(li);
  });
}

// Function to update existing To-Do items
function UpdateToDoItems(e) {
  const listItem = e.closest(".todo-li");
  console.log("listItem:", listItem);

  const todoTextElement = listItem.querySelector("div");
  console.log("todoTextElement:", todoTextElement);

  if (isTaskNotCompleted(todoTextElement)) {
    todoValue.value = getTaskText(todoTextElement);
    updateText = todoTextElement;
    setupUpdateMode();
  }
}

// Function to update To-Do items after selection
function UpdateOnSelectionItems() {
  if (isTodoItemPresent(todoValue.value)) {
    setAlertMessage("This item already present in the list!");
    return;
  }

  updateTodoItem();
  resetUpdateMode();
  setAlertMessage("Todo item Updated Successfully!");
}

// Function to delete To-Do items
function DeleteToDoItems(e) {
  const deleteValue = getTaskText(e);

  // Confirm deletion
  if (confirm(`Are you sure you want to delete "${deleteValue}"?`)) {
    markItemAsDeleted(e);

    // Filter out the deleted item from the 'todo' array
    todo = todo.filter((element) => element.item !== deleteValue.trim());
    setLocalStorage();

    // Delay removal of the deleted item for visual effect
    setTimeout(() => {
      removeDeletedItem(e);
    }, 1000);
  }
}

// Function to mark a To-Do item as completed
function CompletedToDoItems(e) {
  if (isTaskNotCompleted(e)) {
    completeTask(e);
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}

// Function to clear all To-Do items
function ClearToDoItems() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    clearAllTasks();
    setLocalStorage();
    setAlertMessage("All tasks cleared!");
  }
}

// Shared Functions

// Function to create a new To-Do list item
function createTodoListItem(text, completed = false) {
  const li = document.createElement("li");
  let style = completed ? 'style="text-decoration: line-through"' : "";
  const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${text}
                      ${
                        completed
                          ? '<img class="todo-controls" src="../image/check-mark.png" />'
                          : ""
                      }
                    </div>
                    <div>
                      ${
                        completed
                          ? ""
                          : '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="../image/pencil.png" />'
                      }
                      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="../image/delete.png" />
                    </div>`;
  li.innerHTML = todoItems;
  return li;
}

// Function to check if a To-Do item is already present
function isTodoItemPresent(item) {
  return todo.some((element) => element.item === item);
}

// Function to get the text of a To-Do item
function getTaskText(element) {
  return element.closest("li").querySelector("div").innerText;
}

// Function to get the element of a To-Do item
function getTaskElement(element) {
  return element.closest("li").querySelector("div");
}

// Function to check if a task is not completed
function isTaskNotCompleted(element) {
  return getTaskElement(element).style.textDecoration === "";
}

// Function to update a To-Do item
function updateTodoItem() {
  const updatedText = todoValue.value.trim();
  if (!updatedText) {
    setAlertMessage("Please enter your todo text!");
    todoValue.focus();
    return;
  }

  const originalText = updateText.innerText.trim();
  todo.forEach((element) => {
    if (element.item === originalText) {
      element.item = updatedText;
    }
  });

  setLocalStorage();
  updateText.innerText = updatedText;
  resetUpdateMode();
  setAlertMessage("Todo item Updated Successfully!");
}

// Function to set up update mode for a To-Do item
function setupUpdateMode() {
  const originalText = getTaskText(updateText);
  todoValue.value = originalText;
  addUpdate.setAttribute("onclick", "updateTodoItem()");
  addUpdate.setAttribute("src", "../image/refresh.png");
  todoValue.focus();
}

// Function to reset update mode for a To-Do item
function resetUpdateMode() {
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.setAttribute("src", "../image/plus.png");
  todoValue.value = "";
}

// Function to mark a To-Do item as deleted
function markItemAsDeleted(element) {
  const deleteValue = getTaskText(element);

  if (confirm(`Confirm again! "${deleteValue}"?`)) {
    element.closest("li").classList.add("deleted-item");

    todo = todo.filter((element) => element.item !== deleteValue);
    setLocalStorage();

    setTimeout(() => {
      element.closest("li").remove();
    }, 1000);

    setAlertMessage(`Task "${deleteValue}" deleted successfully!`);
  }
}

// Function to remove a deleted To-Do item from the UI
function removeDeletedItem(element) {
  element.parentElement.parentElement.remove();
}

// Function to mark a To-Do item as completed
function completeTask(element) {
  const img = document.createElement("img");
  img.src = "../image/check-mark.png";
  img.className = "todo-controls";
  element.parentElement.querySelector("div").style.textDecoration =
    "line-through";
  element.parentElement.querySelector("div").appendChild(img);
  element.parentElement.querySelector("img.edit").remove();

  todo.forEach((el) => {
    if (
      element.parentElement.querySelector("div").innerText.trim() == el.item
    ) {
      el.status = true;
    }
  });
}

// Function to clear all To-Do tasks
function clearAllTasks() {
  listItems.innerHTML = "";
  todo = [];
}

// Function to set local storage with the current To-Do list
function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

// Function to set an alert message for the user
function setAlertMessage(message) {
  var todoAlert = document.getElementById("todoAlert");

  // Check if the 'todoAlert' element is present
  if (!todoAlert) {
    console.error("Element with id 'todoAlert' not found.");
    return;
  }
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}

// Function to navigate back in the browser history
function goBack() {
  window.history.back();
}

// Read existing To-Do items on page load
ReadToDoItems();

// Function to be called on page load
function onPageLoad() {
  updateTimerContainer();
}

// Call onPageLoad function on page load
onPageLoad();
