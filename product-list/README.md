# Frontend Mentor - Product list with cart solution

This is a complete, production-ready solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). 

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

Users are able to:

- Add items to the cart and remove them seamlessly.
- Increase/decrease the quantity of items directly from the product cards or let the sidebar update.
- See a beautifully styled order confirmation modal overlay when they click "Confirm Order".
- Reset their entire selection back to original empty state when they click "Start New Order".
- View the optimal layout for the interface depending on their device's screen size (using a robust mobile-to-desktop grid transition).
- Experience polished hover, focus, and transition states for all interactive elements.

### Links

- Solution URL: [solution link](https://github.com/OpBlair/Web_Dev/tree/main/product-list)
- Live Site URL: [Live site](https://product-list-cart-du7b.onrender.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS Custom Properties (Variables)
- Flexbox for alignment and layouts
- CSS Grid for the dynamic responsive product display
- Mobile-first workflow
- Vanilla JavaScript (Asynchronous `fetch` API, event delegation, and state-driven DOM manipulation)

### What I learned

This project provided invaluable practice in matching application state arrays with real-time DOM updates. 

Key architectural takeaways:
1. **Event Delegation:** Instead of attaching event listeners to hundreds of dynamic buttons, a single parent level event listener handles increments, decrements, and cart additions dynamically.
2. **Synchronizing Two-Way DOM states:** When an item is deleted from the sidebar cart, the script successfully reaches back to the main product grid cards, removes the `.selected` class, and resets its quantity counter.
3. **Seamless Modal Integration:** Grouping dynamic lists and total blocks within a single `.receipt-container` parent wrapper prevents layout gaps and handles dynamic scrolling behavior safely without squishing critical interactive elements.

Here is the event delegation logic used to orchestrate the shopping grid:

```js
productContainer.addEventListener('click', (e) => {
    const productItem = e.target.closest('.product-item');
    if(!productItem) return;

    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if(addToCartBtn){
        const name = addToCartBtn.dataset.name;
        const price = parseFloat(addToCartBtn.dataset.price);
        const image = addToCartBtn.dataset.image;

        productItem.classList.add('selected');
        addToCart(name, price, image);
        renderCartItems(cart);
        return;
    }
});
```

### Continued development

In future projects, I plan to focus on:

Adding local storage persistence so the user's cart does not wipe if they accidentally refresh the page.

Further optimizing CSS transitions and micro-interactions for adding/removing items to make the interface feel even more fluid.

## Author

- Frontend Mentor - [@opblair](https://www.frontendmentor.io/profile/OpBlair)