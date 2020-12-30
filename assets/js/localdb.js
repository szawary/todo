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

export default localDb;
