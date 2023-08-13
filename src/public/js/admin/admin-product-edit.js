import * as api from '../common/api.js';

const $inputName = document.querySelector('#inputName');
const $inputDescription = document.querySelector('#inputDescription');
const $inputCompany = document.querySelector('#inputCompany');

const $checkName = document.querySelector('#checkName');
const $checkDescription = document.querySelector('#checkDescription');
const $checkCompany = document.querySelector('#checkCompany');

function validateName() {
    if ($inputName.value.length >= 30) {
        $checkName.textContent = '상품명을 30자 미만으로 입력해주세요.';
    } else {
        $checkName.textContent = '';
    }
}

function validateDescription() {
    if ($inputDescription.value.length >= 150) {
        $checkDescription.textContent = '설명을 150자 미만으로 입력해주세요.';
    } else {
        $checkDescription.textContent = '';
    }
}

function validateCompany() {
    if ($inputCompany.value.length >= 30) {
        $checkCompany.textContent = '제조사를 30자 미만으로 입력해주세요.';
    } else {
        $checkCompany.textContent = '';
    }
}

$inputName.addEventListener('input', validateName);
$inputDescription.addEventListener('input', validateDescription);
$inputCompany.addEventListener('input', validateCompany);

const $userImage = document.querySelector('#userImage');
const $addImage = document.querySelector('#addImage');
const $addImageLabel = document.querySelector('#addImageLabel');

function previewImg() {
    let preview = new FileReader();
    preview.onload = function (e) {
        $userImage.src = e.target.result;
        imageName.textContent = $addImage.files[0].name;
    };
    preview.readAsDataURL($addImage.files[0]);

    const imageName = document.querySelector('#imageName');
}
$addImage.addEventListener('change', previewImg);

const $deleteProduct = document.querySelector('#deleteProduct');

async function deleteProduct(event) {
    const id = event.target.getAttribute('data-id');
    const apiUrl = `/api/product/${id}`;
    const res = await api.del(apiUrl);
}

$deleteProduct.addEventListener('click', deleteProduct);
