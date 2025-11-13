'use strict';

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('button:nth-child(1)');
const nextBtn = document.querySelector('button:nth-child(2)');

let currentSlide = 0;

function updateSlides(){
    slides.forEach((slide, index) => {
        slide.style.opacity = index === currentSlide ? "1" : "0";
        slide.style.transition = "opacity 0.5s ease-in-out";
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
});

updateSlides();

const thumbnails = document.querySelectorAll('.thumbnail img');
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentSlide = index;
        updateSlides();
    });
});

const minusBtn = document.querySelector(".minus-sign");
const plusBtn = document.querySelector(".plus-sign");
const numberOfItemsInCart = document.querySelector(".numberOfItemsInCart");
const number = document.querySelector('.number');
const price = document.getElementById('price');
const cartContent = document.querySelector('.content');
const filledCart = document.querySelector('.filledCart');

let numberOfItems = 0;

function updateCartUI(){
    number.textContent = numberOfItems;        
    if(numberOfItems === 0){
        cartContent.innerHTML = 'Your Cart is empty.';
        filledCart.style.display = 'none';
    }else{
        const total = (numberOfItems * 125).toFixed(2);
        price.textContent = `$${total}`;
        filledCart.style.display = 'flex';
        cartContent.innerHTML = '';
        cartContent.appendChild(filledCart);
    }
}

minusBtn.addEventListener('click', () => {
   if(numberOfItems >= 1){
        document.getElementById('number').innerHTML = numberOfItems - 1;
        numberOfItems--;
        numberOfItemsInCart.innerHTML = numberOfItems; 
        updateCartUI(); 
    }   
});

plusBtn.addEventListener('click', () => {
    document.getElementById('number').innerHTML = numberOfItems + 1;
    numberOfItems++;
    numberOfItemsInCart.innerHTML = numberOfItems;
    updateCartUI();
});


const cartBtn = document.querySelector('.cart');
const cart = document.getElementById('cart');

cartBtn.addEventListener('click', () => {
    if(cart.style.display === "none"){
        cart.style.display = "block";
    }else{
        cart.style.display = "none";
    }
});

const menuBtn = document.querySelector('.menu');
const closeBtn = document.querySelector('.close-menu');
const sideBar = document.querySelector('#sidebar ul');

menuBtn.addEventListener('click', () => {
    sideBar.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideBar.style.display = 'none';
});

const addToCartBtn = document.querySelector('.addToCart');

addToCartBtn.addEventListener('click', () => {
    numberOfItemsInCart.style.display = 'flex';
});

const deleteBtn = document.querySelector('.deleteIcon');

deleteBtn.addEventListener('click', () => {
    numberOfItems = 0;
    document.getElementById('number').textContent = 0;
    updateCartUI();
})

const lightbox = document.getElementById('lightbox');
const lightboxMain = document.getElementById('lightbox-main');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnails img');
const mainSlides = document.querySelectorAll('.slide img');
const lightboxPrevBtn = document.querySelector('.lightbox-prev');
const lightboxNextBtn = document.querySelector('.lightbox-next');

let lightboxIndex = 0;

function updateLightbox() {
  lightboxMain.src = `./images/image-product-${lightboxIndex + 1}.jpg`;

  lightboxThumbnails.forEach((thumb, index) => {
    if (index === lightboxIndex) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

mainSlides.forEach((img, index) => {
  img.addEventListener('click', () => {
    if (window.innerWidth >= 768) {
      lightbox.style.display = 'flex';
      lightboxIndex = index;
      updateLightbox();
    }
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightboxPrevBtn.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + 4) % 4;
  updateLightbox();
});

lightboxNextBtn.addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % 4;
  updateLightbox();
});

lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    lightboxIndex = index;
    updateLightbox();
  });
});

updateCartUI();
