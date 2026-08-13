'use strict';

const ticketForm = document.getElementById('ticketForm');
const ticketResult = document.getElementById('ticketResult');
const mainContainer = document.querySelector('main');

const ticketHeaderTitle = document.getElementById('content-title');
const ticketHeaderDescription = document.getElementById('content-description');

const displayName = document.getElementById('displayFullName');
const githubDisplayName = document.getElementById('displayGithub');
const ticketAvatar = document.getElementById('ticketAvatar');
const avatarInput = document.getElementById('avatar');

const uploadInfoHint = document.querySelector('.hint');
const uploadInfo = document.querySelector('.upload-info');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const userEmail = emailInput.value.trim();
    let githubUsername = document.getElementById('github').value;

    // 1. File Size Validation
    if (avatarInput.files && avatarInput.files[0]) {
        const file = avatarInput.files[0];
        const maxSize = 500 * 1024; // 500KB in bytes

        if (file.size > maxSize) {
            uploadInfoHint.textContent = 'File too large. Please upload a photo under 500KB';
            uploadInfo.classList.add('error');
            return; // Stop submission
        } else {
            uploadInfoHint.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
            uploadInfo.classList.remove('error');
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            ticketAvatar.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }

    // 2. Custom Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        emailInput.classList.add('error');
        emailError.style.display = 'flex';
        return; // Stop submission
    } else {
        emailInput.classList.remove('error');
        emailError.style.display = 'none';
    }

    // Proceed to ticket generation state
    mainContainer.classList.add('submitted');
    ticketResult.removeAttribute('hidden'); 

    ticketHeaderTitle.innerHTML = `Congrats, <span id="ticketName">${fullName}</span>! Your ticket is ready.`;
    ticketHeaderDescription.innerHTML = `We've emailed your ticket to <span id="ticketEmail">${userEmail}</span> and will send updates in the run up to the event.`;

    displayName.textContent = fullName;
    
    // Auto-format GitHub syntax if user omitted the prefix symbol
    if (!githubUsername.startsWith('@')) {
        githubUsername = '@' + githubUsername;
    }
    githubDisplayName.textContent = `${githubUsername}`;

    const randomNumber = String(Math.floor(Math.random() * 10000)).padStart(5, '0');
    document.querySelector('.ticket-number').textContent = `#${randomNumber}`;
});