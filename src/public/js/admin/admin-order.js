import * as api from '../common/api.js';

const $orderList = document.querySelector('#orderList');

$orderList.addEventListener('click', (e) => {
    const $target = e.target;
    if ($target.matches('.select-delivery')) {
        updateDeliveryStatus($target);
    }
    if ($target.matches('.btn-delete-order')) {
        deleteOrder($target);
    }
});

async function updateDeliveryStatus(target) {
    const orderId = target.getAttribute('data-id');
    const deliveryStatus = target.value;
    const data = { orderId, deliveryStatus };
    const apiUrl = `/api/orders/${orderId}`;
    const res = await api.put(apiUrl, data);

    if (res.status === 201) {
        alert('배송 상태가 변경되었습니다.');
    } else {
        alert('배송 상태 변경에 실패하였습니다.');
    }
}
async function deleteOrder(target) {
    const orderId = target.getAttribute('data-id');
    const apiUrl = `/api/orders/${orderId}`;
    const res = await api.del(apiUrl);
    window.location.reload();
}
