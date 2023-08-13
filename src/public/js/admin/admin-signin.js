// 이메일 유효성 검사
const $emailInput = document.querySelector('#emailInput');
async function validateEmail() {
    const $emailInput = document.querySelector('#emailInput');
    const $emailCheck = document.querySelector('#emailCheck');
    const $emailRegex = /[a-z0-9]+@admin.com/;

    if ($emailInput.value.match($emailRegex)) {
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

// 중복확인
const $emailCheckBtn = document.querySelector('#emailCheckBtn');
async function checkEmailDuplicate() {
    const $emailCheck = document.querySelector('#emailCheck');
    const $emailInput = document.querySelector('#emailInput');
    const email = $emailInput.value;

    try {
        const res = await fetch('/api/admin/join/emailDuplicate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

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

// 회원가입 버튼 활성화 함수
function enableSignUpButton() {
    const $signupButton = document.querySelector('#btn-signin');
    $signupButton.disabled = false;
}

// 비밀번호 유효성 검사
const $passwordInput = document.querySelector('#passwordInput');
function validatePassword() {
    const $passwordInput = document.querySelector('#passwordInput');
    const $passwordCheck = document.querySelector('#passwordCheck');
    const $passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/;

    if ($passwordInput.value.match($passwordRegex)) {
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
    const $nameRegex = /^[가-힣]{2,4}$/;

    if ($nameInput.value.match($nameRegex)) {
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

// 회원가입 조건 검사
const $btnSignin = document.querySelector('#nameInput');
function validateCondition() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmValid = validatePasswordConfirm();
    const isNameValid = validateName();

    if (isEmailValid && isPasswordValid && isPasswordConfirmValid && isNameValid) {
        registerAdmin(); // 회원가입 수행
    } else {
    }
}
$btnSignin.addEventListener('change', validateCondition);

// 서버로 관리자 회원가입 요청을 보내는 함수
async function registerAdmin() {
    const $emailInput = document.querySelector('#emailInput').value;
    const $passwordInput = document.querySelector('#passwordInput').value;
    const $nameInput = document.querySelector('#nameInput').value;

    const adminData = {
        email: $emailInput,
        password: $passwordInput,
        name: $nameInput,
    };

    const isDuplicate = await checkEmailDuplicate($emailInput);
    if (isDuplicate) {
        return;
    }

    try {
        const res = await fetch('/api/admin/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
        });

        if (res.ok) {
            window.location.href = res.url;
        } else {
        }
    } catch (error) {}
}
