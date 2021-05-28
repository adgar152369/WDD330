const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const completedTasks = document.querySelector('.completed-tasks');
const activeTasks = document.querySelector('.active-tasks');
const allTasks = document.querySelector('.all-tasks');

// load event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Check off task 
    taskList.addEventListener('click', checkOffItem);
    // Clear task list
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // filter by completed tasks 
    completedTasks.addEventListener('click', filterCompletedTasks);
    // filter by active tasks
    activeTasks.addEventListener('click', filterActiveTasks);
    // filter by all tasks
    allTasks.addEventListener('click', filterAllTasks);
}

// Get Tasks from ls
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // create li element
        const li = document.createElement('li');
        // add class to li element
        li.className = 'collection-item';
        // create txt node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        const check = document.createElement('a');
        // Add class
        link.className = 'delete-item';
        check.className = 'checked';
        // add icon html
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';
        check.innerHTML = '<i class="far fa-check-circle"></i>';
        // append the link to li
        li.appendChild(link);
        li.insertBefore(check, link);

        // append li to ul
        taskList.appendChild(li);
    });
}

// Add Tasks
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }


    // create li element
    const li = document.createElement('li');
    // add class to li element
    li.className = 'collection-item';
    // create txt node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    const check = document.createElement('a');
    // Add class
    link.className = 'delete-item';
    check.className = 'checked';
    // add icon html
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    check.innerHTML = '<i class="far fa-check-circle"></i>';
    // append the link to li
    li.appendChild(link);
    li.insertBefore(check, link);

    // append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Check off Tasks
function checkOffItem(e) {
    if (e.target.parentElement.classList.contains('checked')) {
        if (e.target.parentElement.parentElement.classList.toggle('checked-off')) {
            e.target.parentElement.style.color = 'yellowgreen';
        }
        else {
            e.target.parentElement.style.color = 'black';
        }
    }
}

// Remove Tasks
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();

        // remove from ls
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    // this while loop is faster than innerHTML = '';
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'flex';
        }
        else {
            task.style.display = 'none';
        }
    });
}

// filter by completed tasks
function filterCompletedTasks() {
    document.querySelectorAll('.collection-item').forEach(item => {
        if (item.classList.contains('checked-off')) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }

    })
}

function filterActiveTasks() {
    document.querySelectorAll('.collection-item').forEach(item => {
        if (!item.classList.contains('checked-off')) {
            item.style.display = 'flex';
        }
        else if (item.classList.contains('checked-off')) {
            item.style.display = 'none';
        }

    })
}

function filterAllTasks() {
    document.querySelectorAll('.collection-item').forEach(item => {
        item.style.display = 'flex';

    })
}
