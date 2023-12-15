// Initialize timer count
var timerCount = 0;

function formatTimeRemaining(timeRemaining) {
  // Calculate days, hours, minutes, and seconds
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Format the time string
  return days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

function startCountdown(timerId, timeRemaining) {
  // Implement your countdown logic here
  // Update the timer element with the remaining time
  const countdownInterval = setInterval(function () {
    // Update the timer element with the remaining time
    const timerElement = document.getElementById(timerId);
    timerElement.textContent = formatTimeRemaining(timeRemaining);
    timeRemaining -= 1000; // Decrease by 1 second (1000 milliseconds)
    if (timeRemaining < 0) {
      clearInterval(countdownInterval); // Clear the interval when time is up
    }
  }, 1000);
}

function deleteTimer(timerId) {
  // Implement your timer deletion logic here
  // Remove the timer element from the DOM
  const timerElement = document.getElementById(timerId);
  timerElement.parentNode.removeChild(timerElement);
}

function updateCurrentTime() {
  var currentTimeElement = document.getElementById("current-time");

  function updateTime() {
    var currentDate = new Date();
    var formattedDate = currentDate.toDateString();
    var formattedTime = currentDate.toLocaleTimeString();
    currentTimeElement.textContent =
      "Current Time: " + formattedTime + " - " + formattedDate;
  }

  // Update time every second
  setInterval(updateTime, 1000);

  // Initial call to display time immediately
  updateTime();
}

// Your existing functions...

function toggleAddTimerForm() {
  const addTimerForm = document.getElementById("add-timer-form");
  document.getElementById("add-timer-form").style.display = "block";
  addTimerForm.classList.toggle("visible");
}

function addTimer() {
  closeTimer();
  const timerContainer = document.getElementById("timer-container");
  const timerNameInput = document.getElementById("timer-name");
  const timerEndDateInput = document.getElementById("timer-end-date");
  const timerElement = document.createElement("div");
  timerElement.className = "timer-container";
  timerElement.id = timer - container - $timerCount;
  const endDate = new Date(timerEndDateInput.value + "T00:00:00");
  const now = new Date();
  const timeRemaining = endDate - now;

  if (timeRemaining > 0) {
    timerElement.innerHTML = `
        <div class="timer-name" id="timer-name-${timerCount}">${timerNameInput.value
      }</div>
        <div class="timer-value" id="timer-${timerCount}">${formatTimeRemaining(
        timeRemaining
      )}</div>
        <button class="delete-timer-btn" onclick="deleteTimer('timer-container-${timerCount}')">Delete</button>
      `;

    timerContainer.appendChild(timerElement);
    startCountdown(timer - $timerCount, timeRemaining);
    timerCount++;
  } else {
    alert("Please choose a future date.");
  }

  // Clear input fields
  timerNameInput.value = "";
  timerEndDateInput.value = "";
}

function closeTimer() {
  document.getElementById("add-timer-form").style.display = "none";
}

// Ensure that the document is fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Call the function when the page is loaded
  updateCurrentTime();
});

function goBack() {
  window.history.back();
}