const $listCategory = document.querySelector('#listCategory');

$listCategory.addEventListener('click', async (e) => {
    const $target = e.target;
    // 수정
    if ($target.matches('.btn-update')) {
        const $input = $target.closest('.list-category-li').querySelector('input');
        $input.removeAttribute('readonly');
        $target.style.display = 'none';
        $target.parentNode.querySelector('.btn-delete').style.display = 'none';
        $target.parentNode.querySelector('.btn-add-newcategory').style.display = 'inline';
    }
    // 수정완료
    if ($target.matches('.btn-add-newcategory')) {
        $target.parentNode.querySelector('.btn-update').style.display = 'inline';
        $target.parentNode.querySelector('.btn-delete').style.display = 'inline';
        $target.style.display = 'none';

        const id = $target.getAttribute('data-id');
        const name = $target.closest('.list-category-li').querySelector('input').value;
        const categoryName = { name };
        const res = await fetch(`/api/category/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryName),
        });
        window.location.reload();
    }
    // 삭제
    if ($target.matches('.btn-delete')) {
        const id = $target.getAttribute('data-id');
        const res = await fetch(`/api/category/${id}`, {
            method: 'DELETE',
        });
        history.go(0);
    }
});

const $inputCategory = document.querySelector('#inputCategory');
const $createCategory = document.querySelector('#createCategory');

async function createCategory() {
    const name = $inputCategory.value;
    const categoryName = { name };
    const res = await fetch('/api/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryName),
    });
    const data = await res.json();
    $listCategory.insertAdjacentHTML(
        'beforeend',
        `   <li class="list-category-li">
                <input type="text" class="input input-box" value=${name} readonly="readonly">
                <p class="check-category"></p>

                <div class="btn-box">
                    <button class="btn btn-main sm btn-update" data-id="${data.data.id}">수정</button>
                    <button class="btn btn-main-line sm btn-delete data-id="${data.data.id}"">삭제</button>
                    <button class="btn btn-main sm btn-add-newcategory" data-id="${data.data.id}">수정 완료</button>
                </div>
            </li>`,
    );
}

$createCategory.addEventListener('click', createCategory);

function validateCategory(event) {
    if (event.target.value.length >= 10) {
        event.target.parentNode.querySelector('.check-category').textContent =
            '카테고리명을 10자 미만으로 입력해주세요.';
    } else {
        event.target.parentNode.querySelector('.check-category').textContent = '';
    }
}

$inputCategory.addEventListener('input', validateCategory);
