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
    // Listen for Submit 
    form.addEventListener('submit', addTask)
    // Listen for Remove Task
    taskList.addEventListener('click', removeTask)
}

// Remove Task
function removeTask(e) {
    const li = e.target.parentNode.parentNode
    print(li)
    li.remove()

    e.preventDefault()
}

// Add Task
function addTask(e) {
    print(`Form submitted: ${e.target} => ${taskInput.value}`)
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Ceate li elemetnt
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item';
    // Create text node, append to li
    li.appendChild(document.createTextNode(taskInput.value))
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

    //Clear input
    taskInput.value = '';

    e.preventDefault();
}