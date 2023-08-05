const post = async (path, body, headers = {}) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
    };

    const res = await fetch(path, options);
    return res;
};

const get = async (path) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = await fetch(path, options);
    return res;
};

const put = async (path, body, headers = {}) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
    };

    const res = await fetch(path, options);
    return res;
};

const del = async (path) => {
    const options = {
        method: 'DELETE',
    };

    const res = await fetch(path, options);
    return res;
};

export { post, get, put, del };
