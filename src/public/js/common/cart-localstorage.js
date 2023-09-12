const keyName = 'cart';

const get = () => {
    const data = localStorage.getItem(keyName);
    if (!data) {
        return [];
    }
    return JSON.parse(data);
};

const set = (arr) => {
    localStorage.setItem(keyName, JSON.stringify(arr));
};

export { get, set };
