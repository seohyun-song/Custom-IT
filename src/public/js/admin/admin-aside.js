import * as api from '../common/api.js';

async function btnLogout(e) {
    e.preventDefault();
    const apiUrl = '/api/admin/logout';
    const res = await api.get(apiUrl);
    if (res.status === 200) {
        window.location.href = res.url;
    } else {
        alert(res.message);
    }
}

const $logout = document.querySelector('#logout');
$logout.addEventListener('click', btnLogout);
