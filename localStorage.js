
const getFromLocal = ((key) => {
    return localStorage.getItem(key);
})

const saveToLocal = ((key, value) => {
    localStorage.setItem(key, value);
})