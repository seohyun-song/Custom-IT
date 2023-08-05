import { validateRegExp } from '../constants/regexp.js';

const $inputEmail = document.querySelector('#email');
const $inputPw = document.querySelector('#password');
const $loginForm = document.querySelector('#loginForm');

$loginForm.addEventListener('submit', btnLogin);

async function btnLogin(e) {
    e.preventDefault();

    const email = $inputEmail.value;
    const password = $inputPw.value;

    const data = { email, password };

    if (email === '') {
        return alert('이메일 입력이 되지 않았습니다.');
    }

    if (!validateRegExp.adminEmail.test(email)) {
        return alert('이메일 형식이 올바르지 않습니다.');
    }

    if (!password) {
        return alert('비밀번호를 입력하지 않았습니다.');
    }

    const jsonData = JSON.stringify(data);
    const apiUrl = '/api/admin/login';
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    });
    if (res.status === 200) {
        window.location.href = '/admin/category';
    } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
}
