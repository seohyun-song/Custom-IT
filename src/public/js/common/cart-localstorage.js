const get = (keyName) => {
    const data = localStorage.getItem(keyName);
    if (!data) {
        return [];
    }
    return JSON.parse(data);
};

const set = (arr) => {
    localStorage.setItem('cart', JSON.stringify(arr));
};

export { get, set };
