var inputField = document.getElementById("inputField");
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        var inputText = inputField.value;
        if (inputText == "") {
            alert("Enter task please!");
            inputField.value = "";
        } else {
            var li = document.createElement('li');
            li.className = inputText;
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className = "checkbox";

            var spanItem = document.createElement('span');
            spanItem.textContent = inputText;

            var trash = document.createElement('i');
            trash.className = "uil uil-trash trash";

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    spanItem.classList.add("selected");
                    addItemToDropdown(inputText);
                } else {
                    spanItem.classList.remove("selected");
                    var dropdownList = document.querySelector('.dropdown-list');
                    var li2 = dropdownList.getElementsByClassName(inputText);
                    li2[0].remove();
                }
            });

            trash.addEventListener("click", function () {
                li.remove();
            });

            li.appendChild(checkbox);
            li.appendChild(trash);
            li.appendChild(spanItem);

            var taskList = document.getElementsByClassName("taskList");
            taskList[0].appendChild(li);
            inputField.value = "";
        }
    }
});


function clearCompletedTasks() {
    var taskList = document.getElementsByClassName("dropdown-list");
    var liArray = taskList[0].querySelectorAll('li');
    for (let iterator of liArray) {
        iterator.remove();
    }
}
function clearTasks() {
    var taskList = document.getElementsByClassName("taskList");
    var liArray = taskList[0].querySelectorAll('li');
    for (let iterator of liArray) {
        iterator.remove();
    }
}
// Function to toggle the dropdown visibility
function toggleDropdown() {
    var dropdown = document.querySelector('.dropdown-container');
    var dropdownContent = document.querySelector('.dropdown-content');

    if (dropdown.style.display === 'block') {
        // Close the dropdown
        dropdown.style.display = 'none';
        dropdownContent.style.maxHeight = '0';
    } else {
        // Open the dropdown
        dropdown.style.display = 'block';
        dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
    }
}

// Function to add items to the dropdown
function addItemToDropdown(text) {
    var dropdownList = document.querySelector('.dropdown-list');
    var li = document.createElement('li');
    li.textContent = text;
    li.className = text;
    dropdownList.appendChild(li);

    // Save the completed item to local storage
    saveCompletedItem(text);
}



function saveCompletedItem(text) {
    // Check if there are already completed items in local storage
    var completedItems = JSON.parse(localStorage.getItem('completedItems')) || [];

    // Add the newly completed item to the list
    completedItems.push(text);

    // Store the updated list of completed items in local storage
    localStorage.setItem('completedItems', JSON.stringify(completedItems));
}

function loadCompletedItems() {
    var completedItems = JSON.parse(localStorage.getItem('completedItems')) || [];
    var dropdownList = document.querySelector('.dropdown-list');

    completedItems.forEach(function (text) {
        var li = document.createElement('li');
        li.textContent = text;
        li.className = text;
        dropdownList.appendChild(li);
    });
}

// Call the loadCompletedItems function when the page loads
window.addEventListener('load', loadCompletedItems);

