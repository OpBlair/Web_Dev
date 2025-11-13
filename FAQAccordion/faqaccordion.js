'use strict'


const faqIcons = document.querySelectorAll('.header');

faqIcons.forEach(header => {
    header.addEventListener('click', function () {
        const paragraph = this.nextElementSibling; //"this" refers to header

        if(paragraph.style.display === 'none'){
            paragraph.style.display = 'block';
        }else{
            paragraph.style.display = 'none';
        }

        const icon = this.querySelector('img'); 

        if(icon.src.includes('icon-plus.svg')){
            icon.src = './assets/images/icon-minus.svg';
        }else{
            icon.src = './assets/images/icon-plus.svg';
        }
    });
});

