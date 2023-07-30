function getItemByLocalStorage(item) {
    const data = localStorage.getItem(item);
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}

function setItemToLocalStorage(arr) {
    localStorage.setItem('cart', JSON.stringify(arr));

    alert('장바구니에 상품을 담았습니다.');
}

const $btnCart = document.querySelector('#btnCart');

const addProductToCart = () => {
    const productName = document.querySelector('#name').textContent;
    const price = Number(document.querySelector('#price').textContent.replace(/,/g, ''));
    const image = document.querySelector('#image').getAttribute('src');
    const quantity = 1;

    const cart = getItemByLocalStorage('cart');
    const data = {
        productName,
        price,
        image,
        quantity,
    };

    let arr;
    if (!cart.length) {
        arr = [];
        arr.push(data);
    } else {
        arr = cart.slice();
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i].productName === productName) {
                arr[i].quantity += 1;
                setItemToLocalStorage(arr);
                return;
            }
        }
        arr.push(data);
    }
    setItemToLocalStorage(arr);
};

$btnCart.addEventListener('click', addProductToCart);
