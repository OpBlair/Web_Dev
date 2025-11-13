'use strict';


const buttons = document.querySelectorAll('.btn');
const previousElement = document.querySelectorAll('.previous');

//adding event listener to all buttons
buttons.forEach(button => {
    button.addEventListener('click', function(){
        //removing active class from buttons
        buttons.forEach(btn => btn.classList.remove('active'));

        //adding active class to clicked button
        button.classList.add('active');

        //getting data-option value
        const optionText = button.getAttribute('data-option');

        //changing the content of a paragraph based on data-option value
        previousElement.forEach( newElement => {
            if(optionText === 'daily'){
                newElement.innerHTML = 'yesterday';
            }else if(optionText === 'weekly'){
                newElement.innerHTML = 'Last week';
            }else if(optionText === 'monthly' ){
                newElement.innerHTML = 'Last Month';
            }
        })
    
        fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                const categoryElement = document.querySelector(`.${category.title.toLowerCase().replace(/\s+/g, '')}`);
                if(categoryElement){
                    //get current and previous time based on option
                    const currentTime = category.timeframes[optionText].current;
                    const previousTime = category.timeframes[optionText].previous;

                    //updating the element with the selected value
                    categoryElement.querySelector('.down p').innerHTML = `${currentTime}hrs`;
                    categoryElement.querySelector('span').innerHTML = `- ${previousTime}hrs`;
                }
            })
        })
        .catch(error => {
            console.error("Error fetching JSON data",error);
            }
        );

    });
});



