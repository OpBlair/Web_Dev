# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [Solution](https://your-solution-url.com)
- Live Site URL: [Live Site](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript
- Form validation
- File input and image preview

### What I learned

While working on this project, I learned how to use CSS background images more effectively, especially when positioning decorative images at different points of the page.

I learned how to use `background-position` to precisely control where a background image appears. I also became more comfortable using `background-size` and `background-repeat` to control how background images behave across different screen sizes.

One technique I found particularly useful was using multiple background images on the same element. Each background image can have its own position, size, and repeat behavior. This allowed me to recreate the decorative elements from the design without needing to add unnecessary HTML elements.

For example:

```css
.container {
  background-image:
    url("./images/pattern.svg"),
    url("./images/circle.svg");

  background-position:
    top left,
    bottom right;

  background-repeat: no-repeat;
}
```

This helped me understand how background layers work in CSS and how they can be used to create more complex layouts while keeping the HTML clean.

I also improved my understanding of form validation and handling user input with JavaScript. This project gave me more practice with checking required fields, validating email addresses, handling file uploads, and displaying appropriate error messages.

### Continued development

I want to continue improving my CSS skills, especially when working with responsive layouts and decorative background elements.

I also want to get better at accessibility, particularly making forms easier to use with keyboards and screen readers.

In future projects, I would like to focus more on writing reusable JavaScript functions and keeping my code organized as projects become more complex.

### Useful resources

MDN - background-position
 - This helped me understand how to position background images at specific points within an element.

MDN - background-size
 - This helped me understand how to control the size of background images using values such as cover, contain, percentages, and fixed dimensions.

MDN - CSS backgrounds and borders
 - A useful resource for learning about background images, positioning, sizing, and multiple backgrounds.

MDN - background
 - This helped me understand the CSS background shorthand and how multiple background layers can be combined.

Frontend Mentor
 - I used Frontend Mentor to practice building a realistic project from a provided design.

### Author
Tonny Blair

### Acknowledgments

Thanks to Frontend Mentor for providing the design and challenge. It was a great opportunity to practice responsive layouts, CSS background positioning, form validation, and accessibility.