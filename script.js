'use strict'
let inputtext = document.getElementById("tasktext");
let tasklist = document.getElementById("tasklist");
let tasks = [];
let taskid = 1;

inputtext.addEventListener("keydown", function (event) {
  if (event.key == 'Enter') {
    if (inputtext.value != "") {
      addtotask();
      inputtext.value = "";
    }
  }
});

function loadtask() {
  taskid = 0;
  tasks = (localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []);
  tasks.forEach(function (task) {
    addtodom(task);
    if (taskid < task.taskid) {
      taskid = task.taskid;
    }
  });
  taskid++;
}

function addtotask() {
  let task = new Object();
  task.title = inputtext.value;
  task.status = "pending";
  task.taskid = taskid;
  taskid++;
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addtodom(task);
}

function addtodom(task) {
  let newtask = document.createElement("div");
  newtask.setAttribute("id", task.taskid);

  let spantext = document.createElement("span");
  spantext.innerHTML = task.title;

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.style.cursor = "pointer";
  if (task.status === "completed") {
    checkbox.checked = true;
    spantext.style.textDecoration = "line-through";
  }
  checkbox.addEventListener("click", function (event) {
    if (checkbox.checked == true) {
      spantext.style.textDecoration = "line-through";
      task.status = "completed";
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      spantext.style.textDecoration = "none";
      task.status = "pending";
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  let img = document.createElement("img");
  img.setAttribute("src", "images/trash-can.png");
  img.setAttribute("class", "trash");
  img.setAttribute("width", "15px");
  img.setAttribute("height", "15px");
  img.setAttribute("margin", "100px");
  img.style.cursor = "pointer";
  img.addEventListener("click", function (event) {
    tasklist.removeChild(event.target.parentNode);
    tasks = tasks.filter(function (obj) {
      return obj.taskid !== task.taskid;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  let linebreak = document.createElement("hr");
  linebreak.setAttribute("class", "linebreak");

  newtask.appendChild(checkbox);
  newtask.appendChild(spantext);
  newtask.appendChild(img);
  newtask.appendChild(linebreak);
  tasklist.appendChild(newtask);
}
loadtask();
