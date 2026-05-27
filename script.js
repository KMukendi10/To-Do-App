const taskInput = document.querySelector("#taskInput");
const taskDate = document.querySelector("#taskDate");
const addButton = document.querySelector(".input-section button");
const message = document.querySelector("#message");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filters button");

// Retrieve tasks saved in local storage after refresh
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Adding tasks section
addButton.addEventListener("click", () => {

    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;

    // Error Message when there's no input typed
    if (taskText === "") {
        message.textContent = "Please enter a task before adding";
        return;
    } else {
        message.textContent = "";
    }

    // Object for new task
    const newTask = {
        text: taskText,
        date: taskDateValue,
        completed: false
    };

    tasks.push(newTask);

    // Save and display tasks added to the list
    saveTasks();
    displayTasks();

    // Refresh the input placeholders after clicking add task
    taskInput.value = "";
    taskDate.value = "";
});

// Filtering Section
function displayTasks(filter = "All") {

    taskList.innerHTML = "";

    // When there's no tasks added yet
    if (tasks.length === 0) {
        taskList.innerHTML = "<p class='no-tasks'>Start by adding a task</p>";
        return;
    }

    // Filter tasks
    tasks.forEach((task, index) => {

        if (
            filter === "Active" && task.completed ||
            filter === "Completed" && !task.completed
        ) {
            return;
        }

        // Task list
        const li = document.createElement("li");
        li.classList.add("task-item");

        const taskInfo = document.createElement("div");
        const taskText = document.createElement("p");
        taskText.textContent = task.text;

        // Task completion
        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Due Date
        const taskDateText = document.createElement("small");
        taskDateText.textContent = task.date;

        taskInfo.appendChild(taskText);
        taskInfo.appendChild(taskDateText);

        // Complete and Delete buttons section
        const buttonSection = document.createElement("div");
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.classList.add("complete-button");

        completeButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks(filter);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);

            saveTasks();
            displayTasks(filter);
        });

        buttonSection.appendChild(completeButton);
        buttonSection.appendChild(deleteButton);

        li.appendChild(taskInfo);
        li.appendChild(buttonSection);

        taskList.appendChild(li);
    });
}

// Making the filter buttons active
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filter = button.textContent;

        displayTasks(filter);
    });
});

displayTasks();

// Save my tasks to the local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}