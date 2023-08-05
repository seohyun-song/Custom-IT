import { validateRegExp } from './constants/regexp.js';

// 비밀번호 유효성 검사
const $passwordInput = document.querySelector('#passwordInput');
async function validatePassword() {
    const $passwordInput = document.querySelector('#passwordInput');
    const $passwordCheck = document.querySelector('#passwordCheck');

    if ($passwordInput.value.match(validateRegExp.password)) {
        $passwordCheck.style.fontSize = '12px';
        $passwordCheck.textContent = '';
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

// 일치 확인
const $passwordCheckBtn = document.querySelector('#passwordCheckBtn');
async function checkPasswordDuplicate() {
    const $passwordInput = document.querySelector('#passwordInput');
    const $passwordCheck = document.querySelector('#passwordCheck');
    const password = $passwordInput.value;

    try {
        const res = await fetch('/api/users/info/edit/pwCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            const result = await res.json();
            if (result.message === '비밀번호가 일치하지 않습니다') {
                $passwordCheck.style.fontSize = '12px';
                $passwordCheck.textContent = '비밀번호가 일치하지 않습니다.';
                $passwordCheck.style.color = 'red';
                return true;
            } else {
                $passwordCheck.style.fontSize = '12px';
                $passwordCheck.textContent = '비밀번호가 확인되었습니다.';
                $passwordCheck.style.color = 'blue';
                enablePasswordUpButton();
                return false;
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
    } catch (error) {
        return false;
    }
}
$passwordCheckBtn.addEventListener('click', checkPasswordDuplicate);

// 회원가입 버튼 활성화 함수
function enablePasswordUpButton() {
    const $passwordButton = document.querySelector('#changePassword');
    $passwordButton.disabled = false;
}

// 새 비밀번호
const $newPasswordInput = document.querySelector('#newPasswordInput');
function validateNewPassword() {
    const $newPasswordInput = document.querySelector('#newPasswordInput');
    const $newPasswordCheck = document.querySelector('#newPasswordCheck');

    if ($newPasswordInput.value.match(validateRegExp.password)) {
        $newPasswordCheck.style.fontSize = '12px';
        $newPasswordCheck.textContent = '안전한 비밀번호입니다.';
        $newPasswordCheck.style.color = 'blue';
        return true;
    } else {
        $newPasswordCheck.style.fontSize = '12px';
        $newPasswordCheck.textContent = '영문, 숫자, 특수기호 조합 8~15자리 이하로 입력해주세요.';
        $newPasswordCheck.style.color = 'red';
        return false;
    }
}
$newPasswordInput.addEventListener('change', validateNewPassword);

// 비밀번호 재확인 검사
const $passwordInputConfirm = document.querySelector('#passwordInputConfirm');
function validatePasswordConfirm() {
    const $passwordInputConfirm = document.querySelector('#passwordInputConfirm');
    const $newPasswordInput = document.querySelector('#newPasswordInput');
    const $pwConfirmCheck = document.querySelector('#pwConfirmCheck');

    if ($passwordInputConfirm.value === $newPasswordInput.value) {
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

// 비밀번호 조건 검사
const $changePassword = document.querySelector('#changePassword');
async function validateCondition() {
    const isPasswordValid = await validatePassword();
    const isNewPasswordValid = validateNewPassword();
    const isPasswordConfirmValid = validatePasswordConfirm();
    const isPasswordDuplicateValid = await checkPasswordDuplicate();

    if (
        isPasswordValid &&
        isNewPasswordValid &&
        isPasswordConfirmValid &&
        !isPasswordDuplicateValid
    ) {
        changePassword();
    } else {
    }
}
$changePassword.addEventListener('click', validateCondition);

async function changePassword() {
    const $passwordInput = document.querySelector('#passwordInput').value;
    const $newPasswordInput = document.querySelector('#newPasswordInput').value;

    const userData = {
        password: $passwordInput,
        newPassword: $newPasswordInput,
    };

    const isDuplicate = await checkPasswordDuplicate();
    if (isDuplicate) {
        return;
    }

    try {
        const res = await fetch('/api/users/info/edit/pw', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (res.ok) {
            window.location.href = '/users/info';
        } else {
        }
    } catch (error) {}
}
