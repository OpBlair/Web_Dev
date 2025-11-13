'use strict';
const menu = document.getElementById('menu');
const navigation = document.querySelector('.nav');
const closeBtn = document.querySelector('.nav img');

menu.addEventListener('click', function(event){
event.preventDefault();
    navigation.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    navigation.style.display = 'none';
});

