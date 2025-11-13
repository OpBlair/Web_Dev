'use strict';

const menu = document.getElementById('menu-icon');
const navBtn = document.querySelector('.menu');
const closeBtn = document.getElementById('exit-icon');

menu.addEventListener('click', () => {
    navBtn.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    navBtn.style.display = 'none';    
});

