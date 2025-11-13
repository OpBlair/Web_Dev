# Frontend Mentor - Time tracking dashboard solution

## Welcome! 👋

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Links

- Solution URL: [Solution URL](https://github.com/Tonny-Blair-Daniel/Time_Tracking_Dashbord.git)
- Live Site URL: [Live Site](https://tonny-blair-daniel.github.io/Time_Tracking_Dashbord/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

- I learned how fetch data using the Fetch API in JavaScript
```JavaScript
fetch('./data.json')
.then(response => response.json()) //convert the data to a JavaScript object
.then(data =>{
  console.log(data);
})
.catch(error => {
  console.log('Error fetching data',error);
});
```

### Continued development

- Using the fetch API to update elements content dynamically

### Useful resources

- [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) - This helped me tolearn how the fetch API works. I really liked this pattern and will use it going forward.

## Author

- Frontend Mentor - [Tonny Blair](https://www.frontendmentor.io/profile/yourusername)
