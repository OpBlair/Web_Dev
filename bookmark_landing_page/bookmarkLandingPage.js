'use strict';

const slides = [
    {
        image: './images/illustration-features-tab-1.svg',
        heading: 'Bookmark in one click',
        description: 'Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.'
    },
    {
        image: './images/illustration-features-tab-2.svg',
        heading: 'Intelligent search',
        description: 'Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks.'
    },
    {
        image: './images/illustration-features-tab-3.svg',
        heading: 'Share your bookmarks',
        description: 'Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button.'
    }
];

let count = 0;

// DOM elements for the slider
const slideImage = document.getElementById('slide-image');
const slideHeading = document.getElementById('slide-heading');
const slideDescription = document.getElementById('slide-description');
const navLinks = document.querySelectorAll('.feature-links ul li a');
const moreInfoButton = document.querySelector('.features button');

if (!slideImage || !slideHeading || !slideDescription || !navLinks.length) {
    console.error('One or more slider elements not found. Please check IDs and selectors.');
}

// Function to update slide content
function updateSlide(index) {
    if (index >= 0 && index < slides.length) {
        count = index;
        slideImage.src = slides[index].image;
        slideImage.alt = slides[index].heading;
        slideHeading.textContent = slides[index].heading;
        slideDescription.textContent = slides[index].description;

        // Update active state for navigation links
        navLinks.forEach((link, i) => {
            link.classList.toggle('border-red-500', i === index);
            link.classList.toggle('text-red-500', i === index);
            link.classList.toggle('border-transparent', i !== index);
            link.setAttribute('aria-current', i === index ? 'true' : 'false');
        });

        if (moreInfoButton) {
            moreInfoButton.style.display = 'block';
        }
    }
}

navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        updateSlide(index);
    });
});

// Accordion functionality
const accordionButtons = document.querySelectorAll('.accordion-content .question');
accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        answer.style.display = isExpanded ? 'none' : 'block';
        button.setAttribute('aria-expanded', !isExpanded);
        
        const arrow = button.querySelector('img');
        arrow.classList.toggle('rotate-180', !isExpanded);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    updateSlide(0);
});

if (moreInfoButton) {
    moreInfoButton.addEventListener('click', () => {
        alert(`Learn more about ${slides[count].heading}!`); // Placeholder action
    });
}
