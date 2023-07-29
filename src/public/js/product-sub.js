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

const $productList = document.querySelector('#productList');

const addProductToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.target.matches('.btn-add-cart')) return;

    const $product = event.target.closest('.product');
    const productName = $product.querySelector('.product-info .name').textContent;
    const price = Number(
        $product.querySelector('.product-info .price').textContent.replace(/,/g, ''),
    );
    const image = $product.querySelector('.product-img img').getAttribute('src');
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

$productList.addEventListener('click', addProductToCart);
