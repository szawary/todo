'use strict';

import localDb from './localdb.js';

let todos = [];
const cont = document.querySelector('.container');
const bodyDay = document.querySelector('.body__day');
const bodyDate = document.querySelector('.body__date');
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
const todoAddBtn = document.querySelector('.todo__btn');
const todoInput = document.querySelector('.todo__input');
const todoListPending = document.querySelector('.todo__list--pending');
const todoListDone = document.querySelector('.todo__list--done');
const todoNumber = document.querySelector('.todo__number');
const showHideCompletedBtn = document.querySelector('.footer__btn--complete');
const clearAllBtn = document.querySelector('.footer__btn--clear');



(function () {
    // Initialize application
    const init = () => {
        showDate();
        setListeners();
        loadExistingTodos();
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
        // showPending(); Cserkó József megoldása

    };

    // set event listeners
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
        showHideCompletedBtn.addEventListener('click', () =>
            cont.classList.toggle('show-done'));
        clearAllBtn.addEventListener('click', removeAllDone);
    };

    // save and add todo to the datebase
    const addNewTodo = () => {
        if (todoInput.value === "") {
            alert('Please type a todo.');
            return;
        };

        const todo = {
            id: `todo-${new Date().getTime()}-${Math.floor(Math.random() * 100000)}`,
            content: todoInput.value,
            ready: false,
        };
        todos.push(todo);
        localDb.setItem('todos', todos);
        showToDo(todo);
        todoInput.value = '';

        todosNumbers();
        // showPending(); Cserkó József megoldása
    };

    // show todo in the list
    const showToDo = todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo__item');
        todoItem.setAttribute('data-todoid', todo.id);

        if (todo.done) {
            todoListDone.appendChild(todoItem);
        } else {
            todoListPending.appendChild(todoItem);
        }

        todoItem.innerHTML = `
            <input type="checkbox" ${todo.done ? 'checked' : ''}>
            <span>${todo.content}</span>
            <button>
            <i class="fa fa-trash"></i>
            </button>
        `;

        const delBtn = todoItem.querySelector('button');
        delBtn.addEventListener('click', delTodo);

        const checkbox = todoItem.querySelector('input');
        checkbox.addEventListener('change', changeTodoDone);
    };


    // Change todo's done property.
    const changeTodoDone = ev => {
        const input = ev.currentTarget;
        const parent = input.parentElement;
        const todoID = parent.getAttribute('data-todoid');
        const todoIndex = todos.findIndex(todo => todo.id === todoID);

        if (input.checked) {
            todoListDone.appendChild(parent);
            todos[todoIndex].done = true;
        } else {
            todoListPending.appendChild(parent);
            todos[todoIndex].done = false;
        };



        // parent.parentElement.removeChild(parent);
        //todos.splice(todoInput, 1);
        localDb.setItem('todos', todos);
        todosNumbers();
    };

    // Delete todo item
    const delTodo = (ev) => {
        const button = ev.currentTarget;
        const btnParent = button.parentElement;
        const todoID = btnParent.getAttribute('data-todoid');
        const todoIndex = todos.findIndex(todo => todo.id === todoID);

        btnParent.parentElement.removeChild(btnParent);
        todos.splice(todoInput, 1);
        localDb.setItem('todos', todos);
        todosNumbers();

    };


    // show pending todos
    const todosNumbers = () => {
        let todosLength = todos.filter(todo => !todo.done).length;
        todoNumber.innerHTML = todosLength;
    }

    // remove all done todo

    const removeAllDone = () => {
        const allDone = todoListDone.querySelectorAll('.todo__item');
        allDone.forEach(todoItem => {
            const todoID = todoItem.getAttribute('data-todoid');
            const todoIndex = todos.findIndex(todo => todo.id === todoID);
            todos.splice(todoIndex, 1);
            todoItem.parentElement.removeChild(todoItem);

        });

        localDb.setItem('todos', todos);
        todosNumbers();


    };


    init();
})();