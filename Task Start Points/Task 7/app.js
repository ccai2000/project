// Add a click event listener to the Add button
document.getElementById("addTaskBtn").addEventListener("click", function() {
    // Get the input value from the text box
    var inputValue = document.getElementById("taskInput").value;

    if (inputValue.trim() === "") return; // Prevent adding empty tasks

    // Create a new list item element
    var li = document.createElement("li");

    // Create a span for the task text
    var span = document.createElement("span");
    span.textContent = inputValue;
    li.appendChild(span);

    // Add a delete button to the new list item
    var deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "deleteBtn";
    li.appendChild(deleteBtn);

    // Append the list item to the unordered list
    document.getElementById("taskList").appendChild(li);

    // Clear the input box after adding the item
    document.getElementById("taskInput").value = "";

    // Save the task to localStorage
    tasks.push({ text: inputValue, completed: false });
    saveTasks();
});

// When list item is clicked, toggle 'completed' class on the span
document.getElementById("taskList").addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.classList.toggle("completed");
    }

    // Save the task to localStorage
    tasks = Array.from(document.querySelectorAll("#taskList li")).map(function(li) {
        return {
            text: li.querySelector("span").textContent.trim(),
            completed: li.querySelector("span").classList.contains("completed"),
        };
    });
    saveTasks();
});

// Add a click event listener to the delete button  
// to remove the list item when clicked
// This function listens for clicks on the delete button and removes the corresponding task from the list

document.getElementById("taskList").addEventListener("click", function(e) {
    if (e.target.className === "deleteBtn") {
        // Remove the list item from the unordered list
        e.target.parentElement.remove();

        tasks = Array.from(document.querySelectorAll("#taskList li")).map(function(li) {
            return {
                text: li.querySelector("span").textContent.trim(),
                completed: li.querySelector("span").classList.contains("completed"),
            };
        });
        saveTasks();
    }
});

let tasks = [];
// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Load tasks from localStorage and display them
function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
        var li = document.createElement("li");

        // Create a span for the task text
        var span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add("completed");
        }
        li.appendChild(span);

        // Add a delete button to the new list item
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = "deleteBtn";
        li.appendChild(deleteBtn);

        document.getElementById("taskList").appendChild(li);
    });
}
// Load tasks when the page loads
window.onload = function() {
    loadTasks();
};