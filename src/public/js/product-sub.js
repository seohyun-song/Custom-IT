import * as cartLocalStorage from './common/cart-localstorage.js';

const $productList = document.querySelector('#productList');

const addProductToCart = (event) => {
    if (!event.target.matches('.btn-add-cart')) return;
    event.preventDefault();

    const $product = event.target.closest('.product');
    const productName = $product.querySelector('.product-info .name').textContent;
    const price = Number(
        $product.querySelector('.product-info .price').textContent.replace(/,/g, ''),
    );
    const image = $product.querySelector('.product-img img').getAttribute('src');
    const quantity = 1;

    const cart = cartLocalStorage.get('cart');
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

$productList.addEventListener('click', addProductToCart);
