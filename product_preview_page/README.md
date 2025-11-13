# Frontend Mentor - Product preview card component solution

This is a solution to the [Product preview card component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-preview-card-component-GO7UmttRfa). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

### Links

- Solution URL: [https://github.com/Tonny-Blair-Daniel/product_preview_page.git]
- Live Site URL: [website](https://tonny-blair-daniel.github.io/product_preview_page/)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox

### What I learned

- I learnt how to include images for different screen sizes using the picture element of HTML.

```html
<picture>
  <source media="(max-width: 375px)" srcset="./images/image-product-mobile.jpg">
  <source media="(min-width: 768px)" srcset="./images/image-product-desktop.jpg">
  <img class="perfume" src="./images/image-product-mobile.jpg" alt="image of a Perfume" >
</picture>
```
### Continued development

- Responsive web design using Flexbox and @media queries

## Author

- Website - [website](https://tonny-blair-daniel.github.io/product_preview_page/)
