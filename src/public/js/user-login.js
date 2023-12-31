import { validateRegExp } from './constants/regexp.js';
import * as api from './common/api.js';

const $inputEmail = document.querySelector('#email');
const $inputPw = document.querySelector('#password');
const $loginForm = document.querySelector('#loginForm');

async function login(e) {
    e.preventDefault();

    const email = $inputEmail.value;
    const password = $inputPw.value;

    const data = { email, password };
    if (email === '') {
        return alert('이메일 입력이 되지 않았습니다.');
    }

    if (!validateRegExp.email.test(email)) {
        return alert('이메일 형식이 올바르지 않습니다.');
    }

    if (!password) {
        return alert('비밀번호를 입력하지 않았습니다.');
    }

    const apiUrl = '/api/users/login';
    const res = await api.post(apiUrl, data);

    if (res.status === 200) {
        window.location.href = res.url;
    } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
}

$loginForm.addEventListener('submit', login);
