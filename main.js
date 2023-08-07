let title = document.getElementById("title");
let description = document.getElementById("description");
let addBtn = document.getElementById("add");
let tasks = document.querySelector(".tasks");
let user = document.querySelector(".welcome span");
let msg = document.querySelector("msg");
let date = new Date();
let hour = date.getHours();

if (hour >= 20) {
    msg.innerHTML = "Good evening";
} else if (hour >= 12) {
    msg.innerHTML = "Good afternoon";
} else {
    msg.innerHTML = "Good evening";
}

function checkAndUpdate() {
    tasks.innerHTML = "";
    if (window.localStorage.getItem("tasks")) {
        let tasksArr = JSON.parse(window.localStorage.getItem("tasks"));
        tasksArr.forEach(task => {
            tasks.innerHTML += `
                <div class="task" style="filter:${task.status === true ? "grayscale(0.6)" : "unset"};">
                    <h1 class="${task.status === true ? "done" : ""}">${task.title}</h1>
                    <p class="${task.status === true ? "done" : ""}">${task.description}</p>
                    <span class="delete"><i class="fa-regular fa-trash-can"></i></span>
                    <span class="check ${task.status === true ? "active" : ""}"><i class="fa-solid fa-check"></i></span>
                </div>
            `;
        })
    }

    let deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let tasksArr = JSON.parse(window.localStorage.getItem("tasks"));
            tasksArr.splice(index, 1);
            window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
            checkAndUpdate()
        })
    });

    let doneBtn = document.querySelectorAll(".check");
    doneBtn.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            let tasksArr = JSON.parse(window.localStorage.getItem("tasks"));
            if (tasksArr[index].status === true) {
                tasksArr[index].status = false;
            } else {
                tasksArr[index].status = true;
            }
            window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
            checkAndUpdate();
        })
    });
}

checkAndUpdate();

addBtn.addEventListener("click", () => {
    if (title.value === "" || description.value === "") {
        swal({
            icon: "error",
            text: "You must fill the fields",
        });
    } else {
        let allTasks = [];
        let newTask = {
            title: title.value,
            description: description.value,
            status: false,
        }
        if (window.localStorage.getItem("tasks")) {
            allTasks = JSON.parse(window.localStorage.getItem("tasks"));
            allTasks.push(newTask);
        } else {
            allTasks.push(newTask);
        }
        window.localStorage.tasks = JSON.stringify(allTasks)
        swal({
            icon: "success",
            title: "Done",
            text: "Your task has been added successfully",
        });
        title.value = ""
        description.value = ""
        checkAndUpdate();
    }
})


function updateUser() {
    if (window.localStorage.username) {
        user.innerHTML = "";
        user.innerHTML = window.localStorage.username;
    }
}

updateUser();


function setUser() {
    if (!window.localStorage.username) {
        swal({
            content: {
                element: "input",
                attributes: {
                    placeholder: "Type your name",
                    type: "text",
                    id: "username",
                },
            },
            button: {
                className: "saveUser",
            },
        });
        let btn = document.querySelector(".saveUser");
        btn.onclick = () => {
            let username = document.getElementById("username").value;
            window.localStorage.username = username;
            updateUser();
        }
    }
}

setUser();