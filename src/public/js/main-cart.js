import * as cartLocalStorage from './common/cart-localstorage.js';

let cart = cartLocalStorage.get('cart');

let totalPrice = 0;
let totalQuantity = 0;
const $totalPrice = document.querySelector('.total-price');
const $totalQuantity = document.querySelector('.total-quantity');
const $buttonQuantity = document.querySelector('.btn-main span');
const $cartList = document.querySelector('#cartList');
const $noCart = document.querySelector('#noCart');
const $cartBox = document.getElementById('cartBox');

window.addEventListener('load', (event) => {
    if (cart.length) {
        let str = '';
        $cartList.style.display = 'flex';
        cart.forEach((item, index) => {
            const productName = item.productName;
            const price = item.price;
            const quantity = item.quantity;

            str += `<li class="cart-list-li" data-name="${productName}">

                    <div class="item-info">

                        <div class="info">
                            <p class="name">${productName}</p>
                            <p class="delivery">무료배송</p>
                        </div>
                    </div>
                    <div class="item-option">
                        <p>단품 구매</p>

                        <div class="option-quantity">
                            <div class="quantity">

                                <button type="button" class="btn btn-minus">-</button>
                                <span class="count" id="${index}">${quantity}</span>
                                <button type="button" class="btn btn-plus">+</button>


                            </div>
                            <div class="total">${(
                                price * quantity
                            ).toLocaleString()}<span class="unit">원</span></div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-item-delete"></button>
                </li>`;
        });

        cart.forEach((item) => {
            totalPrice += item.price * item.quantity;
            totalQuantity += item.quantity;
        });
        $totalPrice.textContent = totalPrice.toLocaleString();
        $totalQuantity.textContent = totalQuantity;
        $buttonQuantity.textContent = totalQuantity;

        $cartBox.insertAdjacentHTML('beforeend', str);
    } else {
        $noCart.style.display = 'flex';
    }
});

$cartBox.addEventListener('click', (e) => {
    const $target = e.target;
    if ($target.matches('.btn-item-delete')) {
        const $targetList = $target.closest('.cart-list-li');
        const productName = $targetList.dataset.name;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].productName === productName) {
                totalQuantity -= cart[i].quantity;
                totalPrice -= cart[i].price * cart[i].quantity;
                cart.splice(i, 1);
                break;
            }
        }
        cartLocalStorage.set(cart);
        $targetList.remove();
        $totalPrice.textContent = totalPrice.toLocaleString();
        $totalQuantity.textContent = totalQuantity;
        $buttonQuantity.textContent = totalQuantity;

        if (totalQuantity === 0) {
            $cartList.style.display = 'none';
            $noCart.style.display = 'flex';
        }
    }

    if ($target.matches('.btn-minus')) {
        const $targetList = $target.closest('.cart-list-li');
        const $count = $targetList.querySelector('.count');
        const $total = $targetList.querySelector('.total');
        const productName = $target.closest('.cart-list-li').dataset.name;
        const arr = cart.slice();
        if (totalQuantity === 0) return;
        totalQuantity--;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].productName === productName) {
                arr[i].quantity--;
                cartLocalStorage.set(arr);
                totalPrice -= arr[i].price;
                $count.textContent = `${arr[i].quantity}`;
                $total.textContent = `${(arr[i].quantity * arr[i].price).toLocaleString()}원`;
                break;
            }
        }
        $totalPrice.textContent = totalPrice.toLocaleString();
        $totalQuantity.textContent = totalQuantity;
        $buttonQuantity.textContent = totalQuantity;
    }

    if ($target.matches('.btn-plus')) {
        const $targetList = $target.closest('.cart-list-li');
        const $count = $targetList.querySelector('.count');
        const $total = $targetList.querySelector('.total');
        const productName = $target.closest('.cart-list-li').dataset.name;
        const arr = cart.slice();
        totalQuantity++;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].productName === productName) {
                arr[i].quantity++;

                cartLocalStorage.set(arr);
                totalPrice += arr[i].price;
                $count.innerHTML = `${arr[i].quantity}`;
                $total.textContent = `${(arr[i].quantity * arr[i].price).toLocaleString()}원`;
                break;
            }
        }
        $totalPrice.textContent = totalPrice.toLocaleString();
        $totalQuantity.textContent = totalQuantity;
        $buttonQuantity.textContent = totalQuantity;
    }
});

const $btnDeleteAll = document.querySelector('#btnDeleteAll');
const deleteAll = () => {
    totalPrice = 0;
    totalQuantity = 0;
    $cartBox.innerHTML = '';
    cartLocalStorage.set([]);
    $cartList.style.display = 'none';
    $noCart.style.display = 'flex';
};
$btnDeleteAll.addEventListener('click', deleteAll);
