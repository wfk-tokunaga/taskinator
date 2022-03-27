var tasks = [];
var taskIdCounter = 0;
var pageContentEl = document.querySelector('#page-content');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var tasksCompletedEl = document.querySelector('#tasks-completed');
var tasksInProgressEl = document.querySelector('#tasks-in-progress');
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
    var isEdit = formEl.hasAttribute("data-task-id");

    // Check to see if we're editing an old task or making a new one
    if (isEdit) {
        // If old task
        var taskId = formEl.getAttribute(`data-task-id`);
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        // If new task, then create the new li
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
}

var completeEditTask = function (taskName, taskType, taskId) {
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    debugger;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    debugger;
    alert("task updated!");

    // Reset the form
    formEl.removeAttribute(`data-task-id`);
    document.querySelector(`#save-task`).textContent = "Add Task";

    // How would I do this? 
    // I think I would remove the old task and make a new one with the new info
}


//Passing in only one variable that hold both the name and the type, so we are going to make an object
// We're not passing html elements around, this is kinda the end point of what we're trying to do
var createTaskEl = function (taskDataObj) {
    console.log(taskDataObj);
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
    taskDataObj.id = taskIdCounter; //Does this work? Can we just add a new field?
    tasks.push(taskDataObj);
    console.log(tasks);
    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl)
    tasksToDoEl.appendChild(listItemEl);

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

    var updatedTasksArr = [];
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks = updatedTasksArr;
}

var taskStatusChangeHandler = function (event) {
    var taskId = event.target.getAttribute(`data-task-id`);
    // console.log(event.target.getAttribute(`data-task-id`));
    var statusVariable = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

    if (statusVariable === "to-do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusVariable === "in-progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusVariable === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusVariable;
        }
    }
}


formEl.addEventListener('submit', taskFormHandler);
pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);