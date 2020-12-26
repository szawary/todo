'use strict';
// test datas
let todos = [];

//Parsts of date
const bodyDay = document.querySelector('.body__day');
const bodyDate = document.querySelector('.body__date');
const todoAddBtn = document.querySelector('.todo__btn');
const todoInput = document.querySelector('.todo__input');
const todoListPending = document.querySelector('.todo__list--pending');
const todoNumber = document.querySelector('.todo__number');


const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];



(function () {
    // Initialize application
    const init = () => {
        showDate();
        setListeners();
        loadExistingTodos();

    };

    // localstorage handler object
    const localDb = {
        // localDb.setItem('todos', todos);
        setItem(key, value) {                   // creat + update date
            value = JSON.stringify(value);      // obj or array to string
            localStorage.setItem(key, value);   // localstorage store only string!!!
        },
        // localDb.getItem('todos');
        getItem(key) {
            const value = localStorage.getItem(key);
            if (!value) {                       // if no data.
                return null;
            }
            return JSON.parse(value);           // string => array
        },
        //localDb.removeItem('todos');
        removeItem(key) {
            localStorage.removeItem(key);
        },
    };

    //load existing todos
    const loadExistingTodos = () => {
        const savedTodos = localDb.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        };

        if (todos && Array.isArray(todos)) {
            todos.forEach(todo => showToDo(todo));
        };

        todosNumbers();
    };

    // show date
    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            currentDate.getFullYear(),
        ].map(num => num < 10 ? `0${num}` : num);

        bodyDay.textContent = dayNames[currentDate.getDay()];
        bodyDate.textContent = day.join('-');
    };

    // set event listeners
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
    };

    // save and add todo to the datebase
    const addNewTodo = () => {
        if (todoInput.value === "") {
            alert('Please type a todo.');
            return;
        };

        const todo = {
            content: todoInput.value,
            ready: false,
        };
        todos.push(todo);
        localDb.setItem('todos', todos);
        showToDo(todo);
        todoInput.value = '';

        todosNumbers();
    };

    // show todo in the list
    const showToDo = todo => {
        const todoItem = document.createElement('div');
        todoListPending.appendChild(todoItem);
        todoItem.innerHTML = `
            <input type="checkbox">
            <span>${todo.content}</span>
            <button>
            <i class="fa fa-trash"></i>
            </button>
        
        `;
    };

    // show pending todos
    const todosNumbers = () => {
        let todosLength = todos.length;
        todoNumber.innerHTML = todosLength;
    }





    init();
})();