//to-do list

const message = document.querySelector('.main__todo-message');
const taskListContainer = document.querySelector('.main__todo-list');
let taskList = [];
//let unchecked = [];
//let checked = [];

//show to-do list onload

function showListOnload() {
    const taskListString = localStorage.getItem('taskList');
    if (taskListString != null) {
        message.innerText = '';
        message.classList.remove('main__todo-message');
        const taskListArr = JSON.parse(taskListString);
        taskList = taskListArr;
        
        taskListContainer.innerHTML = "";
        taskList.forEach(item => {
            const inputCheck = item.check ? 'checked' : '';
            taskListContainer.innerHTML += `<div class="main__todo-bullet"><li class="bullet">${item.taskValue}</li> <input type="checkbox" id=${item.id} class="checkbox" ${inputCheck} value="${item.taskValue}"></input> <br></div>`;
        })           
        }
    }

document.addEventListener('DOMContentLoaded', showListOnload);

//add tasks 

const addBtn = document.querySelector('.btn-add');

function addTask() {
    const taskInput = document.getElementById('task');
    let taskValue = taskInput.value;
    message.innerText = '';
    message.classList.remove('main__todo-message');
    if (taskValue !== '') {
        const id = Math.floor(Math.random()*100);
        document.getElementById('task').placeholder = 'New task';
        taskList.push({taskValue, id, check: false});
        //unchecked.push(taskValue);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        //localStorage.setItem('unchecked', JSON.stringify(unchecked));  
        taskListContainer.insertAdjacentHTML ('beforeend', `<div class="main__todo-bullet"><li class="bullet">${taskValue}</li><input type="checkbox" id=${id} class="checkbox" value="${taskValue}"><br></div>`);
        taskInput.value = '';
        } else {
            document.getElementById('task').placeholder = 'Add a task!';
        }
}

addBtn.addEventListener('click', addTask);

//count checked and unchecked boxes


function showChecked(event) {
    renderChecked(event.target);
}

document.addEventListener('change', showChecked);

function renderChecked(element) {
    const elementId = element.id;
    const arrCards = taskList.map(item =>{    
        if(item.id == elementId) {
            if (item.check) {
                item.check = false;
                return item;
            } 
            item.check = true;
            return item;
            
        }
        return item;
    })

    taskList = arrCards;
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

//doughnut-chart for the to-do list    


import Chart from 'chart.js/auto';

(async function showDoughnutChart() {

    const data = {
        labels: [
            'Done',
            'To Do'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [1, 
                3],
            backgroundColor: [
                'rgb(195, 226, 216)',
                'rgb(153, 147, 147)'
            ],
            hoverOffset: 4
        }]
    };
    new Chart (
        document.querySelector('.doughnut'), 
        {
            type: 'doughnut',
            data: data,
        });
    })();




//delete todo list
const clearBtn = document.querySelector('.btn-delete');

function deleteTaskList() {
    if (taskList !== null) {
        taskListContainer.innerHTML = '';
        taskList = [];
        localStorage.removeItem('taskList');
    }
}
clearBtn.addEventListener('click', deleteTaskList);







