const taskList = document.querySelector('.task-list');
const userInput = document.querySelector('.user-input');
const addBtn = document.querySelector('.add-btn');

// ADD ITEMS TO LIST
function addItem() {
    let li = document.createElement("li");

    // add class from css to li
    li.classList.add('list-item');
    let item = document.createTextNode(userInput.value);

    li.appendChild(item);
    
    taskList.appendChild(li);

    // call the delete function after item is added
    deleteItem(li);
}

// DELETE ITEMS BUTTON
function deleteItem(li) {
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = 'X';

    li.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', function(e) {
        li.style.display = 'none';
    })
}

addBtn.addEventListener('click', addItem);