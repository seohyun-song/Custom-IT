import { validateRegExp } from './constants/regexp.js';
import * as api from './common/api.js';

// 회원가입 버튼 활성화 함수
function enableSignUpButton() {
    const $signupButton = document.querySelector('#btn-signin');
    $signupButton.disabled = false;
}

// 이메일 유효성 검사
const $emailInput = document.querySelector('#emailInput');

async function validateEmail() {
    const $emailInput = document.querySelector('#emailInput');
    const $emailCheck = document.querySelector('#emailCheck');

    if ($emailInput.value.match(validateRegExp.email)) {
        $emailCheck.style.fontSize = '12px';
        $emailCheck.textContent = '올바른 이메일 형식입니다.';
        $emailCheck.style.color = 'blue';

        // 서버로 이메일 중복확인 요청 보내기
        const isDuplicate = await checkEmailDuplicate($emailInput.value);
        return isDuplicate;
    } else {
        $emailCheck.style.fontSize = '12px';
        $emailCheck.textContent = '올바른 이메일 형식이 아닙니다.';
        $emailCheck.style.color = 'red';
        return false;
    }
}

$emailInput.addEventListener('change', validateEmail);

// 이메일 중복확인
const $emailCheckBtn = document.querySelector('#emailCheckBtn');

async function checkEmailDuplicate() {
    const $emailInput = document.querySelector('#emailInput');
    const $emailCheck = document.querySelector('#emailCheck');
    const email = $emailInput.value;
    const apiUrl = '/api/users/join/emailDuplicate';
    const data = { email };

    try {
        const res = api.post(apiUrl, data);

        if (res.ok) {
            const result = await res.json();
            if (result.message === '중복된 이메일이 존재합니다.') {
                $emailCheck.style.fontSize = '12px';
                $emailCheck.textContent = '중복된 이메일입니다.';
                $emailCheck.style.color = 'red';
                return true;
            } else {
                $emailCheck.style.fontSize = '12px';
                $emailCheck.textContent = '사용 가능한 이메일입니다.';
                $emailCheck.style.color = 'blue';
                enableSignUpButton();
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

$emailCheckBtn.addEventListener('click', checkEmailDuplicate);

// 비밀번호 유효성 검사
const $passwordInput = document.querySelector('#passwordInput');
function validatePassword() {
    const $passwordInput = document.querySelector('#passwordInput');
    const $passwordCheck = document.querySelector('#passwordCheck');

    if ($passwordInput.value.match(validateRegExp.password)) {
        $passwordCheck.style.fontSize = '12px';
        $passwordCheck.textContent = '안전한 비밀번호입니다.';
        $passwordCheck.style.color = 'blue';
        return true;
    } else {
        $passwordCheck.style.fontSize = '12px';
        $passwordCheck.textContent = '영문, 숫자, 특수기호 조합 8~15자리 이하로 입력해주세요.';
        $passwordCheck.style.color = 'red';
        return false;
    }
}
$passwordInput.addEventListener('change', validatePassword);

// 비밀번호 재확인 검사
const $passwordInputConfirm = document.querySelector('#passwordInputConfirm');

function validatePasswordConfirm() {
    const $passwordInputConfirm = document.querySelector('#passwordInputConfirm');
    const $passwordInput = document.querySelector('#passwordInput');
    const $pwConfirmCheck = document.querySelector('#pwConfirmCheck');

    if ($passwordInputConfirm.value === $passwordInput.value) {
        $pwConfirmCheck.style.fontSize = '12px';
        $pwConfirmCheck.textContent = '비밀번호가 일치합니다.';
        $pwConfirmCheck.style.color = 'blue';
        return true;
    } else {
        $pwConfirmCheck.style.fontSize = '12px';
        $pwConfirmCheck.textContent = '비밀번호가 일치하지 않습니다.';
        $pwConfirmCheck.style.color = 'red';
        return false;
    }
}
$passwordInputConfirm.addEventListener('change', validatePasswordConfirm);

// 이름 유효성 검사
const $nameInput = document.querySelector('#nameInput');

function validateName() {
    const $nameInput = document.querySelector('#nameInput');
    const $nameCheck = document.querySelector('#nameCheck');

    if ($nameInput.value.match(validateRegExp.name)) {
        $nameCheck.textContent = '';
        return true;
    } else {
        $nameCheck.style.fontSize = '12px';
        $nameCheck.textContent = '이름은 2~4글자로 입력해주세요.';
        $nameCheck.style.color = 'red';
        return false;
    }
}
$nameInput.addEventListener('change', validateName);

// 휴대폰 번호 유효성 검사
const $phoneNumInput = document.querySelector('#phoneNumInput');

function validatePhoneNum() {
    const $phoneNumInput = document.querySelector('#phoneNumInput');
    const $phoneNumCheck = document.querySelector('#phoneNumCheck');

    if ($phoneNumInput.value.match(validateRegExp.phoneNumber)) {
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

// 다음 주소 검색
const $addressCheckBtn = document.querySelector('#addressCheckBtn');

function openKakaoMap() {
    new daum.Postcode({
        oncomplete: function (data) {
            var $addressInput = document.querySelector('#addressInput');
            $addressInput.value = data.address;
            $addressInput.focus();
        },
    }).open();
}
$addressCheckBtn.addEventListener('click', openKakaoMap);

// 회원가입 조건 검사
const $btnSignin = document.querySelector('#btnSignin');

function validateCondition() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmValid = validatePasswordConfirm();
    const isNameValid = validateName();
    const isPhoneNumValid = validatePhoneNum();

    if (
        isEmailValid &&
        isPasswordValid &&
        isPasswordConfirmValid &&
        isNameValid &&
        isPhoneNumValid
    ) {
        registerUser(); // 회원가입 수행
    } else {
    }
}
$btnSignin.addEventListener('click', validateCondition);

// 서버로 회원가입 요청을 보내는 함수
async function registerUser() {
    const $emailInput = document.querySelector('#emailInput').value;
    const $passwordInput = document.querySelector('#passwordInput').value;
    const $nameInput = document.querySelector('#nameInput').value;
    const $phoneNumInput = document.querySelector('#phoneNumInput').value;
    const $addressInput = document.querySelector('#addressInput').value;
    const $detailAddressInput = document.querySelector('#detailAddress').value;
    const apiUrl = '/api/users/join';
    const userData = {
        email: $emailInput,
        password: $passwordInput,
        name: $nameInput,
        phoneNumber: $phoneNumInput,
        address: {
            address1: $addressInput,
            address2: $detailAddressInput,
        },
    };

    const isDuplicate = await checkEmailDuplicate();
    if (isDuplicate) {
        return;
    }

    try {
        const res = await api.post(apiUrl, userData);

        if (res.ok) {
            window.location.href = res.url;
        } else {
        }
    } catch (error) {}
}
