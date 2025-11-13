'use strict';

const slides = [
    {
        desktopImage: "./images/desktop-image-hero-1.jpg",
        mobileImage: "./images/mobile-image-hero-1.jpg",
        heading: "Discover innovative ways to decorate",
        description: "We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love."
    },
    {
        desktopImage: "./images/desktop-image-hero-2.jpg",
        mobileImage: "./images/mobile-image-hero-2.jpg",
        heading: "We are available all across the globe",
        description: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today."
    },
    {
        desktopImage: "./images/desktop-image-hero-3.jpg",
        mobileImage: "./images/mobile-image-hero-3.jpg",
        heading: "Manufactured with the best materials",
        description: "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office."
    },
];

let current = 0;

function getDeviceType() {
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
}

function updateButtons() {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    prevButton.disabled = current === 0;
    nextButton.disabled = current === slides.length - 1;
}

function loadSlide() {
    const deviceType = getDeviceType();
    const slide = slides[current];
    const image = deviceType === 'mobile' ? slide.mobileImage : slide.desktopImage;

    document.getElementById('slider-image').src = image;
    document.getElementById('slider-heading').textContent = slide.heading;
    document.getElementById('slider-description').textContent = slide.description;
    updateButtons();

}

function nextSlide() {
    if(current < slides.length - 1){
        current++;
        loadSlide();
    }
}

function prevSlide() {
    if(current > 0){
        current--;
        loadSlide();
    }
}

const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.add('active');
    hamburger.style.display = 'none';
    closeBtn.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.style.display = 'block';
    closeBtn.style.display = 'none';
});

hamburger.addEventListener('click', () => {
    navMenu.classList.add('active');
    if (getDeviceType() === 'mobile') {
        mainElement.classList.add('blur'); // Add blur class to main on mobile
    }
});

closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mainElement.classList.remove('blur'); // Remove blur class from main
});



window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        hamburger.style.display = 'none';
    }else{
        hamburger.style.display = 'block';
    }
});


window.addEventListener('resize', loadSlide);
loadSlide();

