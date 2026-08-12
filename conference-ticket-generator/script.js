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

ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const userEmail = document.getElementById('email').value;
    let githubUsername = document.getElementById('github').value;

    // Handle File Upload Preview
    if (avatarInput.files && avatarInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
            ticketAvatar.src = event.target.result;
        };
        reader.readAsDataURL(avatarInput.files[0]);
    }

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