var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');
var taskToDoEl = document.querySelector('#tasks-to-do');
var formEl = document.querySelector('#task-form');

var taskFormHandler = function (event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    //Validating data
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
    };
    createTaskEl(taskDataObj);
}


//Passing in only one variable that hold both the name and the type, so we are going to make an object
// We're not passing html elements around, this is kinda the end point of what we're trying to do
var createTaskEl = function (taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Add task ID as custom data attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //div that holds info about task to be added
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name +
        "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl)
    taskToDoEl.appendChild(listItemEl);

    taskIdCounter++;
}

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editBtnEl = document.createElement("btn");
    editBtnEl.textContent = "Edit";
    editBtnEl.className = "btn edit-btn";
    editBtnEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editBtnEl);

    var deleteBtnEl = document.createElement("btn");
    deleteBtnEl.textContent = "Delete";
    deleteBtnEl.className = "btn delete-btn";
    deleteBtnEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteBtnEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To-Do", "In-Progress", "Completed"];

    statusChoices.forEach(status => {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.setAttribute("value", status);
        statusOptionEl.textContent = status;
        statusSelectEl.appendChild(statusOptionEl);
    });

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
    //Get the specific listItemEl
    // var listItemEl = document.querySelector(`data-task-id=${taskId}`);
    // listItemEl.appendChild(actionContainerEl);
    //Make 2 buttons and a drop down menu
}

var taskButtonHandler = function (event) {
    // console.log(event.target);
    if (event.target.matches(".edit-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    } else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};

var editTask = function (taskId) {
    console.log("editing task #" + taskId);

    //Get task list item element, since there are multiple
    //Asking what are we specifically trying to get, then being more specific
    //Here, we want a task item, and then a specific one
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    var taskName = taskSelected.querySelector('h3.task-name').textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector('input[name="task-name"]').value = taskName;
    document.querySelector('select[name="task-type"]').value = taskType;
    document.querySelector('#save-task').textContent = "Save Task";
    // Getting the specific task to have the right ID by giving the formEl that ID, huh.
    formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    taskSelected.remove();
}

formEl.addEventListener('submit', taskFormHandler);
pageContentEl.addEventListener('click', taskButtonHandler);
// // getName takes a function as a parameter
// var getName = function (callBack) {
//     var name = prompt("Enter name:");
//     callBack(name);
// }

// var doSomethingWithName = function (name, somethingFunction) {
//     somethingFunction(name);
// }

// function printName(name) {
//     console.log(name);
// }

// function printDoubleName(name) {
//     console.log(`${name}${name}`);
// }

// // var counter = 5;
// // var everySec = function () {
// //     console.log(counter);
// //     counter--;
// //     if (counter === 0) {
// //         console.log('sad');
// //         clearInterval(startCountdown);
// //     };
// // }

// // var startCountdown = setInterval(everySec, 500);

// var sayHello = function () {
//     console.log("Hello");
// };

// var timedGreeting = setTimeout(sayHello, 2000);
// clearTimeout(timedGreeting);

// // startCountdown;
// //We call a function like getName, which takes a function as a parameter
// //It uses the callback function parameter in it's execution