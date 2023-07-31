// function getItemByLocalStorage(item) {
//     const data = localStorage.getItem(item);
//     if (!data) {
//         return [];
//     }
//     return JSON.parse(data);
// }

// function setItemToLocalStorage(arr) {
//     localStorage.setItem('cart', JSON.stringify(arr));
// }
const get = (item) => {
    const data = localStorage.getItem(item);
    if (!data) {
        return [];
    }
    return JSON.parse(data);
};

const set = (arr) => {
    localStorage.setItem('cart', JSON.stringify(arr));
};

export { get, set };
