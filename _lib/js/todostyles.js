let todo = JSON.parse(localStorage.getItem("todo-list")) || [];
let todoValue = document.getElementById("todoText");
let todoAlert = document.getElementById("Alert");
let listItems = document.getElementById("todo-list-items");
let addUpdate = document.getElementById("AddUpdateClick");
let updateText;

function CreateToDoItems() {
  if (todoValue.value === "" || todoValue.value === null) {
    setAlertMessage("Please enter your todo text!");
    todoValue.focus();
  } else {
    if (isTodoItemPresent(todoValue.value)) {
      setAlertMessage("This item already present in the list!");
      return;
    }

    const li = createTodoListItem(todoValue.value);
    listItems.appendChild(li);

    todo.push({ item: todoValue.value, status: false });
    setLocalStorage();
    setAlertMessage("Todo item Created Successfully!");
  }
}

function ReadToDoItems() {
  todo.forEach((element) => {
    const li = createTodoListItem(element.item, element.status);
    listItems.appendChild(li);
  });
}

// Add touch events or click events based on the device
const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

function UpdateToDoItems(e) {
  if (isTaskNotCompleted(e)) {
    todoValue.value = getTaskText(e);
    updateText = getTaskElement(e);
    setupUpdateMode();
  }
}

ReadToDoItems();
addUpdate.addEventListener(touchEvent, function() {
  CreateToDoItems();
});
