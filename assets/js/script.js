var taskToDoEl = document.querySelector('#tasks-to-do');
var formEl = document.querySelector('#task-form');

//Make sure we're only targeting the specific button

var createTaskHandler = function (event) {
    event.preventDefault();
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task";
    taskToDoEl.appendChild(listItemEl);
}

formEl.addEventListener('submit', createTaskHandler);

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