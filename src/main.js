//to-do list

const message = document.querySelector('.main__todo-message');
const taskListContainer = document.querySelector('.main__todo-list');

function showListOnload() {
    const taskListString = localStorage.getItem('taskList');
    if (taskListString != null) {
        message.innerText = '';
        message.classList.remove('main__todo-message');
        const taskListArr = JSON.parse(taskListString);
        for (let item in taskListArr) {
            taskListContainer.innerHTML += `<div class="main__todo-bullet"><li class="bullet">${taskListArr[item]}</li><input type="checkbox" class="checkbox"><br></div>`;
        }
    }
}
document.addEventListener('DOMContentLoaded', showListOnload);


const addBtn = document.querySelector('.btn-add');
const taskList = [];

function addTask() {
    const taskInput = document.getElementById('task');
    let taskValue = taskInput.value;
    message.innerText = '';
    message.classList.remove('main__todo-message');
    if (taskValue !== '') {
        taskList.push(taskValue);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        taskListContainer.innerHTML += `<div class="main__todo-bullet"><li class="bullet">${taskValue}</li><input type="checkbox" class="checkbox"><br></div>`;
        taskInput.value = '';
        } else {
            taskListContainer.innerText = 'Add a task.';
            clearBtn.disabled = true;
        }
        
    }
addBtn.addEventListener('click', addTask);

const clearBtn = document.querySelector('.btn-delete');

function deleteTaskList() {
    if (taskList != []) {
        taskListContainer.innerHTML = '';
        localStorage.removeItem('taskList');
    } else {
        clearBtn.disabled = true;
    }    
}
clearBtn.addEventListener('click', deleteTaskList);