//to-do list

const message = document.querySelector(".main__todo-message");
const taskListContainer = document.querySelector(".main__todo-list");
let taskList = [];

//show to-do list onload

function showListOnload() {
    const taskListString = localStorage.getItem("taskList");
    if (taskListString != null) {
        message.innerText = "";
        message.classList.remove("main__todo-message");
        const taskListArr = JSON.parse(taskListString);
        taskList = taskListArr;

        taskListContainer.innerHTML = "";
        taskList.forEach((item) => {
        const inputCheck = item.check ? "checked" : "";
        taskListContainer.innerHTML += `<div class="main__todo-bullet"><li class="bullet">${item.taskValue}</li> <input type="checkbox" id=${item.id} class="checkbox" ${inputCheck} value="${item.taskValue}"></input> <br></div>`;
        });
    }
}

document.addEventListener("DOMContentLoaded", showListOnload);

//add tasks

const addBtn = document.querySelector(".btn-add");

function addTask() {
const taskInput = document.getElementById("task");
let taskValue = taskInput.value;
message.innerText = "";
message.classList.remove("main__todo-message");
    if (taskValue !== "") {
        const id = Math.floor(Math.random() * 100);
        document.getElementById("task").placeholder = "New task";
        taskList.push({ taskValue, id, check: false });
        localStorage.setItem("taskList", JSON.stringify(taskList));
        taskListContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="main__todo-bullet"><li class="bullet">${taskValue}</li><input type="checkbox" id=${id} class="checkbox" value="${taskValue}"><br></div>`
        );
        taskInput.value = "";
    } else {
        document.getElementById("task").placeholder = "Add a task!";
    }
}

addBtn.addEventListener("click", addTask);

//count checked and unchecked boxes

function showChecked(event) {
    renderChecked(event.target);
}

function checkProgress() {
    let tasks = JSON.parse(localStorage.getItem('taskList'));      
    let checked=[];
    let unchecked=[];
    if (tasks !== null) {
        tasks.forEach((task) => {
            if(task.check === true) {
                checked.push(task);
                
            } else {
                unchecked.push(task);
                
            }
        })
        localStorage.setItem('unchecked', JSON.stringify(unchecked));
        localStorage.setItem('checked', JSON.stringify(checked));
    }
}

document.addEventListener("change", showChecked);
document.addEventListener("change", checkProgress);


function renderChecked(element) {
const elementId = element.id;
const arrCards = taskList.map((item) => {
    if (item.id == elementId) {
        if (item.check) {
            item.check = false;
            return item;
        }   item.check = true;
            return item;
    }
    return item;
});
    taskList = arrCards;
    
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

//doughnut-chart (progress); for now shows progress onload

import Chart from 'chart.js/auto';

let checkedTasks = JSON.parse(localStorage.getItem('checked'));
let done = checkedTasks !== null ? checkedTasks.length : 0;

let uncheckedTasks = JSON.parse(localStorage.getItem('unchecked'));
let toDo = uncheckedTasks !== null ? uncheckedTasks.length : 1;

(async function showDoughnutChart() {

    const data = {
        labels: [
            'Done',
            'To Do'
        ],
        datasets: [{ 
            label: 'Tasks',
            data: [done, 
                    toDo],
            backgroundColor: [
                'rgb(195, 226, 216)',
                'rgb(153, 147, 147)'
            ],
            hoverOffset: 2
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
const clearBtn = document.querySelector(".btn-delete");

function deleteTaskList() {
    if (taskList !== null) {
        taskListContainer.innerHTML = "";
        taskList = [];
        localStorage.clear();
    }
}
clearBtn.addEventListener("click", deleteTaskList);

// Погода

const apiKey = "a60fa55cb3d341dd95d140431240303";

// Элементы на странице

const header = document.querySelector(".weather-header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

function removeCard() {
    const prevCard = document.querySelector(".card");
    if (prevCard) prevCard.remove();
}

//Слушаем отправку формы
form.onsubmit = function (e) {
  //Отменяем отправку формы
    e.preventDefault();

  //Берем значение из инпута, обрезаем пробелы
  let city = input.value.trim();
  console.log(city);

  //Делаем запрос на сервер
  //Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  //Выполняем запрос

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(data);
      if (data.error) {
        // Если есть ошибка - выводим ее

        //Удаляем предыдущую карточку
        removeCard();

        //Отобразить карточку с ошибкой
        const html = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML("afterend", html);
      } else {
        // Если ошибки нет - выводим карточку

        //Удаляем предыдущую карточку
        removeCard();

        //Отображаем полученные данные в карточке
        // Разметка для карточки

        const html = `<div class="card">
                        <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

                        <div class="card-weather">
                            <div class="card-value">${data.current.temp_c}<sup>°C</sup></div>
                            <img  class="card-img"  src="./public/5538410.png" alt="weather">
                        </div>

                        <div class="card-description">${data.current.condition.text}</div>

                    </div>`;

        //Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      }
    });
};

// joke section

document.addEventListener("DOMContentLoaded", getJoke);

function getJoke() {
  const apis = [
    "https://geek-jokes.sameerkumar.website/api?format=json",
    "https://icanhazdadjoke.com",
    "https://official-joke-api.appspot.com/random_joke",
  ];

  const randomApi = apis[Math.floor(Math.random() * apis.length)];

  fetch(randomApi, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let joke = "";
      if (data.joke) {
        joke = data.joke;
      } else if (data.setup) {
        joke = `${data.setup} ${data.punchline}`;
      }
      document.getElementById("joke").innerText = joke;
    })
    .catch((error) => console.error("Ошибка:", error));
}

//currency
function CBR_XML_Daily_Ru(rates) {
  function trend(current, previous) {
    if (current > previous) return " ▲";
    if (current < previous) return " ▼";
    return "";
  }

  let USDrate = rates.Valute.USD.Value.toFixed(4).replace(".", ",");
  let USD = document.getElementById("USD");
  USD.innerHTML = USD.innerHTML.replace("00,0000", USDrate);
  USD.innerHTML += trend(rates.Valute.USD.Value, rates.Valute.USD.Previous);

  let EURrate = rates.Valute.EUR.Value.toFixed(4).replace(".", ",");
  let EUR = document.getElementById("EUR");
  EUR.innerHTML = EUR.innerHTML.replace("00,0000", EURrate);
  EUR.innerHTML += trend(rates.Valute.EUR.Value, rates.Valute.EUR.Previous);

  let CADrate = rates.Valute.CAD.Value.toFixed(4).replace(".", ",");
  let CAD = document.getElementById("CAD");
  CAD.innerHTML = CAD.innerHTML.replace("00,0000", CADrate);
  CAD.innerHTML += trend(rates.Valute.CAD.Value, rates.Valute.CAD.Previous);

  let GBPrate = rates.Valute.GBP.Value.toFixed(4).replace(".", ",");
  let GBP = document.getElementById("GBP");
  GBP.innerHTML = GBP.innerHTML.replace("00,0000", GBPrate);
  GBP.innerHTML += trend(rates.Valute.GBP.Value, rates.Valute.GBP.Previous);

  let CNYrate = rates.Valute.CNY.Value.toFixed(4).replace(".", ",");
  let CNY = document.getElementById("CNY");
  CNY.innerHTML = CNY.innerHTML.replace("00,0000", CNYrate);
  CNY.innerHTML += trend(rates.Valute.CNY.Value, rates.Valute.CNY.Previous);

  let JPYrate = rates.Valute.JPY.Value.toFixed(4).replace(".", ",");
  let JPY = document.getElementById("JPY");
  JPY.innerHTML = JPY.innerHTML.replace("00,0000", JPYrate);
  JPY.innerHTML += trend(rates.Valute.JPY.Value, rates.Valute.JPY.Previous);
}
