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


// Погода

const apiKey = 'a60fa55cb3d341dd95d140431240303';



// Элементы на странице

const header = document.querySelector('.weather-header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');



function removeCard (){
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}


//Слушаем отправку формы
form.onsubmit = function (e) {
    //Отменяем отправку формы
    e.preventDefault();

    //Берем значение из инпута, обрезаем пробелы
    let city = input.value.trim();
    console.log (city);

    //Делаем запрос на сервер
    //Адрес запроса
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    //Выполняем запрос

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log (data);
        console.log (data);
        if (data.error) {
        // Если есть ошибка - выводим ее
        
        //Удаляем предыдущую карточку
        removeCard ();

        //Отобразить карточку с ошибкой
        const html = `<div class="card">${data.error.message}</div>`;
        header.insertAdjacentHTML('afterend', html);
        } else {
        // Если ошибки нет - выводим карточку

        //Удаляем предыдущую карточку
        removeCard ();

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
        header.insertAdjacentHTML('afterend', html);

        }


        


    })


}


// joke section

document.addEventListener('DOMContentLoaded', getJoke);

function getJoke() {
    const apis = [
        'https://geek-jokes.sameerkumar.website/api?format=json',
        'https://icanhazdadjoke.com',
        'https://official-joke-api.appspot.com/random_joke'
    ];

    const randomApi = apis[Math.floor(Math.random() * apis.length)];

    fetch(randomApi, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        let joke = '';
        if (data.joke) {
            joke = data.joke;
        } else if (data.setup) {
            joke = `${data.setup} ${data.punchline}`;
        }
        document.getElementById('joke').innerText = joke;
    })
    .catch(error => console.error('Ошибка:', error));
}
