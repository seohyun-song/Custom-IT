// 휴대폰 번호 유효성 검사
const $phoneNumInput = document.querySelector('#phoneNumInput');
function validatePhoneNum() {
    const $phoneNumInput = document.querySelector('#phoneNumInput');
    const $phoneNumCheck = document.querySelector('#phoneNumCheck');
    const $phoneNumRegex = /^[0-9]+$/; //숫자로만 입력 가능

    if ($phoneNumInput.value.match($phoneNumRegex)) {
        $phoneNumCheck.style.fontSize = '12px';
        $phoneNumCheck.textContent = '올바른 휴대폰 번호입니다.';
        $phoneNumCheck.style.color = 'blue';
        return true;
    } else {
        $phoneNumCheck.style.fontSize = '12px';
        $phoneNumCheck.textContent = '휴대폰 번호는 숫자로 입력해주세요.';
        $phoneNumCheck.style.color = 'red';
        return false;
    }
}
$phoneNumInput.addEventListener('change', validatePhoneNum);

// 개인정보 수정 조건 검사
function validateCondition() {
    const isPhoneNumValid = validatePhoneNum();
    if (isPhoneNumValid) {
        editUserInfoChange();
    } else {
    }
}

// 유저 정보 변경 요청
const $editUserInfo = document.querySelector('#editUserInfo');
async function editUserInfoChange() {
    const $emailInput = document.querySelector('#emailInput').value;
    const $nameInput = document.querySelector('#nameInput').value;
    const $phoneNumInput = document.querySelector('#phoneNumInput').value;
    const $addressInput = document.querySelector('#addressInput').value;
    const $detailAddressInput = document.querySelector('#detailAddress').value;

    // 서버에 요청하여 수정된 정보를 받아옴
    const updatedData = {
        email: $emailInput,
        name: $nameInput,
        phoneNumber: $phoneNumInput,
        address: {
            address1: $addressInput,
            address2: $detailAddressInput,
        },
    };

    try {
        // 서버에 수정된 정보 전송
        const res = await fetch('/api/users/info/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (res.ok) {
            // 성공적으로 수정되었을 경우 처리
            // 화면에 출력하는 로직 추가
            alert('개인정보 수정에 성공하였습니다');
            window.location.href = '/users/info'; // 수정 완료 후 이동할 페이지 URL
        } else {
        }
    } catch (error) {}
}
$editUserInfo.addEventListener('click', editUserInfoChange);

const $addressCheckBtn = document.querySelector('#addressCheckBtn');
function openKakaoMap() {
    new daum.Postcode({
        oncomplete: function (data) {
            const $addressInput = document.querySelector('#addressInput');
            $addressInput.value = data.address;
            $addressInput.focus();
        },
    }).open();
}

$addressCheckBtn.addEventListener('click', openKakaoMap);
