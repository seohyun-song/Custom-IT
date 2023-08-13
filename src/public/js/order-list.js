document.addEventListener('DOMContentLoaded', function () {
    // 주문 조회 기능
    // '/api/orders' 라는 경로에서 주문 내역을 가져온다면
    let a = fetch('/order/test1@test.com/orderList', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {});

    // 주문 취소 기능
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    cancelButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const orderId = this.parentNode.parentNode.dataset.orderId;
            fetch(`/api/orders/${orderId}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Order cancellation failed');
                    }
                    // 주문 취소가 성공하면, 주문 취소 버튼을 비활성화
                    this.disabled = true;
                    alert('주문이 취소되었습니다.');
                })
                .catch((error) => {
                    const errorMessageElement = document.getElementById('error-message');
                    errorMessageElement.textContent = error.message; // 에러 메시지를 HTML 요소에 표시
                });
        });
    });
    // 각 주문 아이템에 대해
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach((orderItem) => {
        // 주문 상태를 확인하고
        const orderStatus = orderItem.querySelector('.order-status').dataset.orderStatus;

        // 만약 주문 상태가 '배송중' 이나 '배송완료'이면,
        if (orderStatus === '배송중' || orderStatus === '배송완료') {
            // 주문 취소 버튼을 숨김
            const cancelButton = orderItem.querySelector('.btn-cancel');
            if (cancelButton) {
                cancelButton.style.display = 'none';
            }
        }
    });
});
