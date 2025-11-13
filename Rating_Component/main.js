'use strict';

const listBtn = document.querySelectorAll('li');
const submitBtn = document.getElementById('submit');
const selected = document.querySelector('span');

listBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const option = btn.dataset.option;
        listBtn.forEach(item => item.style.backgroundColor = 'hsl(217, 12%, 63%)');
        btn.style.backgroundColor = 'hsl(0, 0%, 100%)';
        selected.textContent = option;
        submitBtn.disabled = false;
    })
});

submitBtn.addEventListener('click', () => {
    let ratingArticle = document.getElementById('ratingState');
    let thankyouArticle = document.getElementById('thankyouState');
    ratingArticle.style.display = 'none';
    thankyouArticle.style.display = 'flex';
});
