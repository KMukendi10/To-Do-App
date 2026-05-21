const taskInput = document.querySelector("#taskInput");
const taskDate = document.querySelector("#taskDate");
const addButton = document.querySelector(".input-section button");
const taskList = document.querySelector("#taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(filter = "All") {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        if (
            filter === "Active" && task.completed ||
            filter === "Completed" && !task.completed
        ) {
            return;
        }

        const li = document.createElement("li");

        li.classList.add("task-item");

        const taskInfo = document.createElement("div");

        const taskText = document.createElement("p");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        const taskDateText = document.createElement("small");
        taskDateText.textContent = task.date;

        taskInfo.appendChild(taskText);
        taskInfo.appendChild(taskDateText);

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

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", () => {

    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;

    if (taskText === "") {
        message.textContent = "Please enter a task before adding";
        message.style.color = "red";
        return;
    } else {
        message.textContent = "";
    }

    const newTask = {
        text: taskText,
        date: taskDateValue,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskDate.value = "";
});

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filter = button.textContent;

        displayTasks(filter);
    });
});

displayTasks();