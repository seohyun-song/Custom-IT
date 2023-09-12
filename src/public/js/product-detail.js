import * as cartLocalStorage from './common/cart-localstorage.js';

const $btnCart = document.querySelector('#btnCart');

const addProductToCart = () => {
    const productName = document.querySelector('#name').textContent;
    const price = Number(document.querySelector('#price').textContent.replace(/,/g, ''));
    const image = document.querySelector('#image').getAttribute('src');
    const quantity = 1;

    const cart = cartLocalStorage.get();
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
                cartLocalStorage.set(arr);
                alert(`장바구니에 ${productName} 상품을 한 개 담았습니다.`);
                break;
            }
        }
        arr.push(data);
    }
    cartLocalStorage.set(arr);
    alert(`장바구니에 ${productName} 상품을 한 개 담았습니다.`);
};

$btnCart.addEventListener('click', addProductToCart);
