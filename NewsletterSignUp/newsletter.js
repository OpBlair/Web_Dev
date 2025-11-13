'use strict';

const form = document.querySelector("form");
const dismissBtn = document.querySelector(".dismiss-btn");
const confirmation = document.querySelector(".success");
const emailAddress = document.getElementById("email").value;
const email2 = document.getElementById("email2");
const container = document.querySelector(".container");

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    if (email.validity.valid){
        confirmation.style.display = "flex";
        email2.innerHTML = emailAddress;
        container.style.display = "none"; 
    }
});
            
dismissBtn.addEventListener("click", function(){
confirmation.style.display = "none";
container.style.display = "flex"; 
});


