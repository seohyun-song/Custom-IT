import * as api from './common/api.js';

const $btnLogin = document.querySelector('#btn-login');
const $btnLogout = document.querySelector('#btn-logout');
const $btnSignin = document.querySelector('#btn-signin');
const $btnUser = document.querySelector('#btn-user');
const $header = document.querySelector('.header');

$btnLogout.addEventListener('click', btnLogout);
if (document.cookie) {
    $header.classList.add('login');
}
if (!document.cookie) {
    $header.classList.add('logout');
}
async function btnLogout(e) {
    e.preventDefault();

    const apiUrl = '/api/users/logout';
    const res = await api.get(apiUrl);

    if (res.status === 200) {
        window.location.href = res.url;
    } else {
        alert(res.message);
    }
}
