'use strict';
// test datas
let todos = [
    { title: 'Lunch', content: 'Lunch with my friends' },
    { title: 'Lunch', content: 'Lunch with my friends' },
    { title: 'Lunch', content: 'Lunch with my friends' },
];

//Parsts of date
const bodyDay = document.querySelector('.body__day');
const bodyDate = document.querySelector('.body__date');

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

    // Initialize application
    const init = () => {
        const savedTodos = localDb.getItem('todos');
        if (savedTodos) {
            todos = savedTodos;
        }

        showDate();
    };

    // show date
    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate(),
        ].map(num => num < 10 ? `0${num}` : num);

        bodyDay.textContent = dayNames[currentDate.getDay()];
        bodyDate.textContent = day.join('-');
    };


    init();
})();