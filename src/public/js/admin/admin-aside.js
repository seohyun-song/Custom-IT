async function btnLogout(e) {
    e.preventDefault();
    const apiUrl = '/api/admin/logout';
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

const $logout = document.querySelector('#logout');
$logout.addEventListener('click', btnLogout);
