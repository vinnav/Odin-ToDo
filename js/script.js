/* 
PROJECT WINDOW
    - Button to remove ToDo

NEW PROJECT BUTTON
    - Be able to delete Projects
*/

// ===LOGIC===

// ToDo and Project Classes
function Todo(title, description, dueDate, priority){
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.done = 0
}

function Project(name){
    this.name = name
    this.list = []
}

// Create new ToDo

function createTodo(){
    var newTodo =  new Todo(
        document.getElementById("title").value, 
        document.getElementById("description").value, 
        document.getElementById("dueDate").value,
        document.getElementById("priority").value        
    );
    let projectId = document.getElementById("selectProject").value
    console.log(projectId);
    //
    if(projectId == "Default Project"){
        (defaultproject.list).push(newTodo); 
    } else {
        (projectList[projectId].list).push(newTodo);
    }
    showTodos(projectId)
}
// Create new Project and add to projectList
defaultproject = new Project("default") // The Default Project, not into projectList

let projectList = []
function createProject(){
    var newProject =  new Project(
        document.getElementById("name").value, 
    );
    projectList.push(newProject);
}

//===DOM MANIPULATION===

// Appending new windows to Wrapper
let wrapper = document.getElementById("wrapper")

// Appending and closing todoWindow
document.getElementById("todoWindow").addEventListener('click', appendToDo);
function appendToDo(){
    todoWindow = document.createElement("div");
    todoWindow.className += "todoWindow";
    todoWindow.innerHTML = `Title: &emsp;&emsp;&emsp;&nbsp;<input type ="text" id = "title"><br/><br/>
    Description: <input type ="text" id = "description"><br/><br/>
    Due date: &emsp;<input type="date" id="dueDate"><br/><br/>
    Priority:&emsp;&emsp;<select id="priority"><option>High</option><option>Normal</option><option>Low</option></select><br><br>
    Project:&emsp;&emsp; <select id="selectProject"><option>Default Project</option></select><br><br>
    <input type = "submit" id="button" onclick="createTodo(); closeTodoWindow()" value = "Submit"><br/>`;
    wrapper.appendChild(todoWindow);
    populateProjects()
}
function closeTodoWindow(){
    wrapper.removeChild(todoWindow);
}

function populateProjects(){
    var select = document.getElementById("selectProject");
    for(var i = 0; i < projectList.length; i++) {
        var opt = projectList[i];
        var el = document.createElement("option");
        el.textContent = opt.name;
        el.value = i;
        console.log(el)
        select.appendChild(el);
    }
}
// Appending and closing projectWindow
document.getElementById("projectWindow").addEventListener('click', appendProject);
function appendProject(){
    projectWindow = document.createElement("div");
    projectWindow.className += "projectWindow";
    projectWindow.innerHTML = 'name: <input type ="text" id = "name"><br/><br/><input type = "submit" id="button" onclick="createProject(); closeProjectWindow();" value = "Submit"><br/>';
    wrapper.appendChild(projectWindow);
}
function closeProjectWindow(){
    wrapper.removeChild(projectWindow);
    updateProjectWindow();
    updateProjectDOM();
}
// Update Project Window
let projects = document.getElementById("projects");
let windowsList = document.createElement("span")
function updateProjectWindow(){
    printedList = "";
    let projectId = 0
    projectList.forEach(function(project){
        printedList += '<li class="projects" id="' + projectId.toString() + '">' + project.name + '</li>';
        projectId++;
    });   
    windowsList.innerHTML = printedList
    projects.appendChild(windowsList)
}

// Show project content in ToDo Window

// Select project content window
let projectContent = document.getElementById("projectContent"); // select ToDos of project showing window
document.getElementById("defProject").addEventListener("click", function(){showTodos("Default Project")}) // Add default project window showing on click

    // Choose Project to show
function updateProjectDOM(){
    let projectSelector = document.querySelectorAll(".projects");
    projectSelector.forEach(project => project.addEventListener("click", function (){showTodos(parseInt(project.id))}))
};
    // Format ToDos to show
function formatToDo(project){
    let formattedToDo = "";
    for(item in project.list){
        formattedToDo += `<input type="checkbox" class="removebutton"></input><h3>` + project.list[item].title + "</h3> : " + project.list[item].description + " - " + project.list[item].dueDate + " - " + project.list[item].priority +"<br>" 
    }
    return formattedToDo;
};

let currentProject; // Set the current project
// Show the ToDos
function showTodos(projectId){
    currentProject = projectId
    let formattedToDo = ""
    if(projectId == "Default Project"){
        formattedToDo = formatToDo(defaultproject);
        projectContent.innerHTML = "<h1>Default Project</h1>" + formattedToDo;
    } else {
        formattedToDo = formatToDo(projectList[projectId]);
        projectContent.innerHTML = "<h1>" + projectList[projectId].name + "</h1>" + formattedToDo;
    }
    addIdToCheckboxes()
};

// Delete ToDos

let removeToDoNode = document.querySelectorAll(".removebutton");
function addIdToCheckboxes(){
    removeToDoNode = document.querySelectorAll(".removebutton");
    removeToDoNode.forEach((item, id) => item.addEventListener("click", function(){removeToDo(id)}))
    
}
function removeToDo(id){
    if(currentProject == "Default Project"){
        defaultproject.list.splice(id, 1);
    } else {
        projectList[currentProject].list.splice(id, 1)
    }
    showTodos(currentProject)
}


