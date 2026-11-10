/**
 * Local storage key used to persist the task list.
 * @type {string}
 */
const STORAGE_KEY = "tasks";

/** @type {HTMLButtonElement} */
const addTaskBtn = document.getElementById("addTaskBtn");

/** @type {HTMLInputElement} */
const taskInput = document.getElementById("taskInput");

/** @type {HTMLUListElement} */
const taskList = document.getElementById("taskList");

/**
 * Creates a new list item for a task.
 * @param {string} taskText - The task label to display.
 * @param {boolean} [isCompleted=false] - Whether the task should start as completed.
 * @returns {HTMLLIElement} The created task list item.
 */
function createTaskItem(taskText, isCompleted = false) {
    const li = document.createElement("li");
    const text = document.createElement("span");
    const deleteBtn = document.createElement("button");

    text.textContent = taskText;
    li.classList.toggle("completed", isCompleted);

    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    li.appendChild(text);
    li.appendChild(deleteBtn);

    return li;
}

/**
 * Saves the current task list to local storage.
 * @returns {void}
 */
function saveTasks() {
    const tasks = [...taskList.querySelectorAll("li")].map((li) => ({
        text: li.querySelector("span")?.textContent.trim() || "",
        completed: li.classList.contains("completed")
    })).filter((task) => task.text);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Loads and renders saved tasks from local storage.
 * @returns {void}
 */
function renderTasks() {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    taskList.innerHTML = "";
    savedTasks.forEach((task) => {
        taskList.appendChild(createTaskItem(task.text, task.completed));
    });
}

/**
 * Adds a new task from the input field.
 * @returns {void}
 */
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if (!task) {
        return;
    }

    taskList.appendChild(createTaskItem(task));
    taskInput.value = "";
    saveTasks();
});

/**
 * Handles task interactions from the list, including delete and completion toggling.
 * @param {MouseEvent} event - The click event from the task list.
 * @returns {void}
 */
taskList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    const listItem = event.target.closest("li");

    if (deleteBtn) {
        deleteBtn.closest("li")?.remove();
        saveTasks();
        return;
    }

    if (listItem) {
        listItem.classList.toggle("completed");
        saveTasks();
    }
});

/**
 * Renders saved tasks when the page loads.
 * @returns {void}
 */
window.addEventListener("load", renderTasks);