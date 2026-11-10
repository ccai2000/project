// Add a click event listener to the Add button
document.getElementById("addTaskBtn").addEventListener("click", function() {
    // Get the input value from the text box
    var inputValue = document.getElementById("taskInput").value;
    
    // Create a new list item element
    var li = document.createElement("li");
    
    // Create a new text node with the input value
    var textNode = document.createTextNode(inputValue);
    
    // Append the text node to the list item
    li.appendChild(textNode);
    
    // Append the list item to the unordered list
    document.getElementById("taskList").appendChild(li);
    
    // Clear the input box after adding the item
    document.getElementById("taskInput").value = "";
});