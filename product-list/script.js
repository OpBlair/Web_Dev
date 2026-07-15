'use strict';

const productContainer = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items-list');
const emptyCart = document.querySelector('.empty-cart');
const filledCart = document.getElementById('cart-items');
const totalCartItems = document.querySelector('.cart-count');
const subTotalSpan = document.getElementById('subTotal');

let cart = [];

async function loadProducts(){
    try{
        const response = await fetch('./data.json');

        if(!response.ok){
            throw new Error('There was an error fetching the data');
        }else{
            const data = await response.json();
            
            data.forEach(item => {
                const itemContainer = document.createElement('div');
                itemContainer.classList.add('product-item');

                itemContainer.classList.add(item.category.toLowerCase().replace(/\s+/g, '-'));

                itemContainer.innerHTML = `
                    <div class="product-image-container">
                        <picture>
                            <source media="(min-width: 1024px)" srcset="${item.image.desktop}">
                            <source media="(min-width: 768px)" srcset="${item.image.tablet}">
                            <img src="${item.image.mobile}" alt="${item.name}" class="product-image">
                        </picture>
                        <button class="add-to-cart-btn" data-name="${item.name}" data-price="${item.price}" data-image="${item.image.thumbnail}">
                            <img src="./assets/images/icon-add-to-cart.svg" alt="cart icon" /> Add to Cart
                        </button>
                        <div class="cart-control-btn" data-name="${item.name}" data-price="${item.price}" data-image="${item.image.thumbnail}">
                            <button class="decrement-btn" data-name="${item.name}">
                                <img src="./assets/images/icon-decrement-quantity.svg" alt="decrement icon" />
                            </button>
                            <span class="item-count">1</span>
                            <button class="increment-btn" data-name="${item.name}">
                                <img src="./assets/images/icon-increment-quantity.svg" alt="increment icon" />
                            </button>
                        </div>
                    </div>
                    <p class="category">${item.category}</p>
                    <p class="name">${item.name}</p>
                    <p class="price">$${item.price.toFixed(2)}</p>        
                `;

                productContainer.appendChild(itemContainer);
            });
        }
    }catch(error){
        console.error("An error occured");
    }
}

// Event delegation
productContainer.addEventListener('click', (e) => {
    const productItem = e.target.closest('.product-item');
    if(!productItem) return;

    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if(addToCartBtn){
        const name = addToCartBtn.dataset.name;
        const price = parseFloat(addToCartBtn.dataset.price);

        productItem.classList.add('selected');
        addToCart(name, price);
        renderCartItems(cart);
        return;
    }

    const decrementBtn = e.target.closest('.decrement-btn');
    if(decrementBtn){
        const name = decrementBtn.dataset.name;
        const countSpan = productItem.querySelector('.item-count');
        
        decrementCartItem(name, countSpan, productItem);
        renderCartItems(cart);
        return;
    }

    const incrementBtn = e.target.closest('.increment-btn');
    if(incrementBtn){
        const name = incrementBtn.dataset.name;
        const countSpan = productItem.querySelector('.item-count');

        incrementCartItem(name, countSpan);
        renderCartItems(cart);
        return;
    }
})

// Add to Cart
function addToCart(name, price){
    let cartItem;
    const existingItem = cart.find(item => item.name === name);

    if(existingItem){
        existingItem.quantity++;
    }else{
        cartItem = {
            name: name,
            price: price,
            quantity: 1
        }
        cart.push(cartItem);
    }
}

// Decrement Cart Item
function decrementCartItem(name, countSpan, productItem){
    const existingItem = cart.find(item => item.name === name);
    if(!existingItem) return;
    existingItem.quantity--;
    if(existingItem.quantity === 0){
        cart = cart.filter(item => item.name !== name);

        productItem.classList.remove('selected');
        countSpan.textContent = 1;
    }else{
        countSpan.textContent = existingItem.quantity;
    }
}

// Increment Cart Item
function incrementCartItem(name, countSpan){
    const existingItem = cart.find(item => item.name === name);
    if(!existingItem) return;
    existingItem.quantity++;
    countSpan.textContent = existingItem.quantity;
}

// Render Items in the Cart
function renderCartItems(cartItemsArray){
    cartItemsContainer.innerHTML = '';

    const totalItemsCount = cartItemsArray.reduce((acc, item) => acc + item.quantity, 0);
    totalCartItems.textContent = totalItemsCount;

    if(cartItemsArray.length === 0){
        emptyCart.classList.remove('inactive');
        filledCart.classList.remove('active');
    }else{
        filledCart.classList.add('active');
        emptyCart.classList.add('inactive');
    }

    const grandTotal = cartItemsArray.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    subTotalSpan.textContent = `$${grandTotal.toFixed(2)}`;

    cartItemsArray.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-item';

        itemRow.innerHTML = `
            <p class="item-name">${item.name}</p>
            <div class="item-price-details">
                <p class="price-detail"><span class="item-quantity">${item.quantity}x</span> @ $${item.price} <span class="item-total-price">$${(item.price*item.quantity).toFixed(2)}</span></p>
                <button class="remove-item-btn" data-name="${item.name}"><img src="./assets/images/icon-remove-item.svg"></button>
            </div>
        `;
        cartItemsContainer.appendChild(itemRow);
    })
}

filledCart.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-item-btn');
    if (!removeBtn) return;

    const name = removeBtn.dataset.name;

    cart = cart.filter(item => item.name !== name);

    const productCards = productContainer.querySelectorAll('.product-item');
    productCards.forEach(card => {
        const titleElement = card.querySelector('.name');
        if (titleElement && titleElement.textContent === name) {
            card.classList.remove('selected');
            
            const countSpan = card.querySelector('.item-count');
            if (countSpan) countSpan.textContent = 1;
        }
    });

    renderCartItems(cart);
})

loadProducts();