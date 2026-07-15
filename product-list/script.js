'use strict';

const productContainer = document.getElementById('product-list');
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

productContainer.addEventListener('click', (e) => {
    const productItem = e.target.closest('.product-item');
    if(!productItem) return;

    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if(addToCartBtn){
        const name = addToCartBtn.dataset.name;
        const price = parseFloat(addToCartBtn.data.price);

        productItem.classList.add('selected');
        addToCartBtn(name, price);
        return;
    }
})

loadProducts();