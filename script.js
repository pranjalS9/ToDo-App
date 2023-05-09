'use strict'
        let inputtext = document.getElementById("tasktext");
        let tasklist = document.getElementById("tasklist");
        let tasks = [];
        let taskid = 1;
        //if input box has something written then call addtotask function
        inputtext.addEventListener("keydown", function(event){
          if(event.key == 'Enter'){
            if(inputtext.value!=""){
              addtotask();
            }
          }
        });
      
        function loadtask(){
          taskid = 0;
          tasks = (localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[]);
          tasks.forEach(function(task){
            addtodom(task);
            if(taskid < task.taskid){
              taskid = task.taskid;
            }
          });
          taskid++;
        }
      
        function addtotask(){
          let task = new Object();
          task.title = inputtext.value;
          task.status = "pending";
          task.taskid = taskid;
          taskid++;
          tasks.push(task);
          //add task to local storage
          localStorage.setItem("tasks", JSON.stringify(tasks));
          addtodom(task);
        }


      



        function addtodom(task){
          let newtask = document.createElement("div");
          newtask.setAttribute("id", task.taskid);
          
          let spantext = document.createElement("span");
          spantext.innerHTML = task.title;
      
          let checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.addEventListener("click", function(event){
            if(checkbox.checked == true){
              spantext.style.textDecoration = "line-through";
              updateStatus(task.taskid, "Completed");
            }else{
              spantext.style.textDecoration = "none";
              updateStatus(task.taskid, "pending");
            }
          });
      
          let img = document.createElement("img");
          img.setAttribute("src", "images/trash-can.png");
          img.setAttribute("class", "trash");
          img.setAttribute("width", "15px");
          img.setAttribute("height", "15px");
          img.setAttribute("margin", "100px");

          

          img.addEventListener("click", function(event){
            tasklist.removeChild(event.target.parentNode);



            let removedItem = event.target.parentNode;


            const newArr = tasks.filter(task => task !== removedItem)
            tasks = newArr
            localStorage.removeItem("tasks");
            localStorage.setItem('tasks', JSON.stringify(tasks))
            addtodom(task)



            
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
      
        function updateStatus(id, status){
          tasks.forEach(function(task){
            if(task.taskid == id){
              task.status = status;
            }
          });
          localStorage.setItem("tasks", JSON.stringify(tasks));
        }
      
        function taskcomplete(event){
          let t = JSON.parse(localStorage.getItem("tasks"));
          t.forEach(function(task){
            if(task.task === event.parentNode.children[1].value){
              t.splice(tasks.indexOf(task), 1);
            }
          });
        }