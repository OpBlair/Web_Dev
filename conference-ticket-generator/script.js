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
const uploadArea = document.getElementById('uploadArea');
const uploadDefaultContent = document.getElementById('uploadDefaultContent');
const uploadPreviewContent = document.getElementById('uploadPreviewContent');
const formAvatarPreview = document.getElementById('formAvatarPreview');
const removeAvatarBtn = document.getElementById('removeAvatarBtn');
const changeAvatarBtn = document.getElementById('changeAvatarBtn');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

// email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time email validation
emailInput.addEventListener('input', () => {
    const userEmail = emailInput.value.trim();
    if (isValidEmail(userEmail)) {
        emailInput.classList.remove('error');
        emailError.style.display = 'none';
    }
});

// Handle File Selection & Preview
avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const maxSize = 500 * 1024; // 500KB

        if (file.size > maxSize) {
            uploadInfoHint.textContent = 'File too large. Please upload a photo under 500KB';
            uploadInfo.classList.add('error');
            uploadArea.classList.add('error');
            avatarInput.value = ''; // Reset input
            return;
        } else {
            uploadInfoHint.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
            uploadInfo.classList.remove('error');
            uploadArea.classList.remove('error');
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            formAvatarPreview.src = event.target.result; // Set form preview thumb
            ticketAvatar.src = event.target.result;      // Set final ticket image
            
            // Switch view inside upload area
            uploadDefaultContent.style.display = 'none';
            uploadPreviewContent.style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
});

// Remove Image Handler
removeAvatarBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering click on upload area container
    avatarInput.value = ''; // Clear file input
    formAvatarPreview.src = '';
    ticketAvatar.src = '';

    // Switch back to default upload view
    uploadPreviewContent.style.display = 'none';
    uploadDefaultContent.style.display = 'block';
});

// Change Image Handler (Opens file dialog again)
changeAvatarBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarInput.click();
});

// Form Submission
ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const userEmail = emailInput.value.trim();
    let githubUsername = document.getElementById('github').value;

    // Check if file is selected
    if (!avatarInput.files || !avatarInput.files[0]) {
        uploadInfoHint.textContent = 'Please upload a photo for your ticket.';
        uploadInfo.classList.add('error');
        uploadArea.classList.add('error');
        return;
    }

    // Email Validation Check
    if (!isValidEmail(userEmail)) {
        emailInput.classList.add('error');
        emailError.style.display = 'flex';
        return;
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
    
    if (!githubUsername.startsWith('@')) {
        githubUsername = '@' + githubUsername;
    }
    githubDisplayName.textContent = `${githubUsername}`;

    const randomNumber = String(Math.floor(Math.random() * 10000)).padStart(5, '0');
    document.querySelector('.ticket-number').textContent = `#${randomNumber}`;
});