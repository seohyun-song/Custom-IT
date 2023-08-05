const $btnLogin = document.querySelector('#btn-login');
const $btnLogout = document.querySelector('#btn-logout');
const $btnSignin = document.querySelector('#btn-signin');
const $btnUser = document.querySelector('#btn-user');
$btnLogout.addEventListener('click', btnLogout);
if (document.cookie) {
    $btnLogin.style.display = 'none';
    $btnSignin.style.display = 'none';
}
if (!document.cookie) {
    $btnLogout.style.display = 'none';
    $btnUser.style.display = 'none';
}
async function btnLogout(e) {
    e.preventDefault();

    const apiUrl = '/api/users/logout';
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        window.location.href = res.url;
    } else {
        alert(res.message);
    }
}
