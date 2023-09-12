import * as api from './common/api.js';

const $inputPw = document.querySelector('#passwordInput');
const $btnSecession = document.querySelector('#btnSecession');

async function btnDelete(e) {
    e.preventDefault();

    const password = $inputPw.value;
    const data = { password };

    // 데이터 json 형태로 파싱
    const apiUrl = '/api/users/info/delete';
    const res = await api.post(apiUrl, data);

    if (res.status === 200) {
        alert('회원탈퇴가 완료되었습니다.');
        window.location.href = res.url;
    } else {
        alert('비밀번호가 일치하지 않습니다.');
    }
}

$btnSecession.addEventListener('click', btnDelete);
