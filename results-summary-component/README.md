# Frontend Mentor - Results summary component solution

This is a solution to the [Results summary component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/results-summary-component-CE_K6s0maV). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Use the local JSON data to dynamically populate the content

### Links

- Solution URL: [solution URL](https://github.com/OpBlair/Web_Dev/tree/main/results-summary-component)
- Live Site URL: [live site](https://results-summary-component-13r4.onrender.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS Custom Properties (Variables)
- Flexbox layout design
- Mobile-first responsive workflow
- Vanilla JavaScript (ES6+)
- Asynchronous Fetch API & DOM Manipulation

### What I learned

This project provided a critical learning breakthrough regarding code ownership. Initially, relying on pre-written code snippets obscured how asynchronous mechanisms linked together. Moving away from copy-pasting forced me to truly master the lifecycle of a network request, variable scope boundaries, and error boundaries.

I learned how to check network response health metrics safely before attempting to process raw chunks into native data structures:

```js
const response = await fetch('./data.json');

if (!response.ok) {
    throw new Error("There was an error fetching the data");
} else {
    const data = await response.json();
    // Safe to loop and inject into the DOM here
}
```

I also strengthened my structural layout logic by dynamically mapping array elements straight to targeted DOM inner lists using explicit class assignments rather than messy, nested template wrappers:

```js
data.forEach(item => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('summary-item', item.category.toLowerCase());
    
    itemContainer.innerHTML = `
        <div class="result-category">
            <img src="${item.icon}" alt="">
            <span>${item.category}</span>
        </div>
        <div class="score"><span><strong>${item.score}</strong> / 100</span></div>
    `;
    resultSummary.appendChild(itemContainer);
});
```

### Continued development

In future projects, I intend to continue focusing on:
- **Git Flow Management**: Refining sparse checkouts and cleaner commit grouping patterns.
- **Asynchronous States**: Gracefully rendering visual loading skeletons or explicit error cards directly in the UI if local or external file requests take a long time to load.
- **Advanced Layout Handling**: Seamlessly shifting full-screen vertical scrolling mobile mechanics into fixed dual-pane desktop grid components.

## Author

- Frontend Mentor - [@opblair](https://www.frontendmentor.io/profile/OpBlair)
