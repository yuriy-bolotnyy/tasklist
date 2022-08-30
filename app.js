print = console.log
// Define UI vars
const form = document.querySelector("#task-form")
const taskList = document.querySelector(".collection")
const clearBtn = document.querySelector(".card-action .btn")
const filter = document.querySelector("input#filter")
const taskInput = document.querySelector("input[type=text][name=task]")

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', loadTasks);
    // Listen for Submit 
    form.addEventListener('submit', addTask)
    // Listen for Remove Task
    taskList.addEventListener('click', removeTask)
    // Clear all tasks event
    clearBtn.addEventListener('click', clearTaskList)
    // Filter tasks
    filter.addEventListener('keyup', filterTasks)
}

// Load Tasks from local storage
function loadTasks() {
    tasks = tasksInLocalStorage()
    // print(typeof tasks)
    if (tasks) {
        print(`Tasks in LocalStorage: ${tasks}`)
        tasks.forEach(task => addTaskLi(task))
    }
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    print(text)

    const allTasks = document.querySelectorAll(".collection li.collection-item")
    allTasks.forEach(task => {
        const taskText = task.textContent
        if (taskText.toLowerCase().indexOf(text) != -1) {
            print(`'${text}' found in ${task}`)
            task.style.display = 'block'
        } else {
            print(`'${text}' NOT found in ${task}`)
            task.style.display = 'none'
        }
    })
    
    e.preventDefault()
}

// Clear Task List
function clearTaskList(e) {
    if (confirm('Are you sure, to delete all tasks?')) {
        print("YES")
        const allTasksLi = document.querySelectorAll(".collection li")
        allTasksLi.forEach(task => {task.remove()})
    } else {
        print("Cancel")
    }
    
    e.preventDefault()
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        const li = e.target.parentNode.parentNode
        // print(li)
        if (confirm('Are you sure?')) {
            task = li.firstChild.textContent
            li.remove() 
            removeTaskFromLocalStorage(task)
        }
    }

    

    e.preventDefault()
}

function addTaskLi(task) {
       // Create li elemetnt
       const li = document.createElement('li')
       // Add class
       li.className = 'collection-item';
       // Create text node, append to li
       li.appendChild(document.createTextNode(task))
       // Create link 'x' for task deletion
       const link = document.createElement('a');
       link.className = 'delete-item secondary-content';
       // Add icon html
       link.innerHTML = '<i class="fa fa-remove"></i>'
       // Append link to li
       li.appendChild(link);
       print(li)
   
       // Append li to ui
       taskList.appendChild(li)
}

// Add Task
function addTask(e) {
    print(`Form submitted: ${e.target} => ${taskInput.value}`)
    if (taskInput.value === '') {
        alert('Add a task');
    }

    addTaskLi(taskInput.value)

    // Store in local storage
    storeInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}

function tasksInLocalStorage() {
    let tasks = [];
    localStorageTasks = localStorage.getItem('tasks');
    if (localStorageTasks) {
       tasks = JSON.parse(localStorageTasks);
       print(`Local storage has tasks: ${tasks}`)
    }
    return tasks
}

function storeInLocalStorage(task) {
     let tasks = tasksInLocalStorage();

     tasks.push(task);
     print(`Added ${task} to all tasks list => ${tasks}`)

     localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = tasksInLocalStorage();
    if (tasks.includes(task)) {
        tasks = tasks.filter(it => it != task);
        print(`Removed task '${task}'`)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    print(`Stored new tasks list: ${tasks}`)
}