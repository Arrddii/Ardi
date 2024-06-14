document.addEventListener("DOMContentLoaded", function() {
    // Initialize all functionalities
    initializeImageContainers();
    initializeCategorySwitch();
    initializeInstagramContainers();
    initializeAddToCartButtons();
    initializeLikeButtons();
    updateCartCount(); 
    updateCartDisplay();
});

function initializeImageContainers() {
    var imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(function(container) {
        var mainImage = container.querySelector('.main-image');
        var newImage = container.querySelector('.new-image');
        var overlay = container.querySelector('.overlay');
        var circles = container.parentElement.querySelectorAll('.circle');

        container.addEventListener('mouseenter', function() {
            newImage.style.opacity = 1;
            mainImage.style.opacity = 0;
            overlay.classList.add('active');
            var buttons = container.querySelectorAll('.overlay-content button');
            buttons.forEach(function(button, index) {
                button.style.transitionDelay = (index * 0.2) + 's';
                button.style.opacity = 1;
            });
        });

        container.addEventListener('mouseleave', function() {
            mainImage.style.opacity = 1;
            newImage.style.opacity = 0;
            overlay.classList.remove('active');
            var buttons = container.querySelectorAll('.overlay-content button');
            buttons.forEach(function(button) {
                button.style.opacity = 0;
                button.style.transitionDelay = '0s';
            });
        });

        circles.forEach(function(circle, index) {
            circle.addEventListener('click', function() {
                showPhoto(index, container);
                circles.forEach(c => c.classList.remove('active'));
                circle.classList.add('active');
            });
        });
    });
}

function initializeCategorySwitch() {
    var titles = document.querySelectorAll('.title');
    titles.forEach(function(title) {
        title.addEventListener('click', function() {
            var category = title.getAttribute('onclick').split("'")[1];
            showCategory(category);
        });
    });
}

function initializeInstagramContainers() {
    var containers = document.querySelectorAll('.instagram-container');

    containers.forEach(function(container) {
        container.addEventListener('mouseenter', function() {
            var overlay = container.querySelector('.instagram-overlay');
            var logo = container.querySelector('.instagram-logo');
            overlay.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        });

        container.addEventListener('mouseleave', function() {
            var overlay = container.querySelector('.instagram-overlay');
            var logo = container.querySelector('.instagram-logo');
            overlay.style.opacity = '0';
            logo.style.transform = 'scale(0)';
        });
    });
}

function initializeAddToCartButtons() {
    document.querySelectorAll('.fa-shopping-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.closest('.image-container').querySelector('img.main-image').alt;
            const itemPrice = getPrice(itemName); 
            const itemImage = this.closest('.image-container').querySelector('img.main-image').src;
            addToCart(itemName, itemPrice, itemImage); 
            showNotification("Product added to cart successfully");
        });
    });
}

// Initialize like buttons
function initializeLikeButtons() {
    document.querySelectorAll('.fa-heart').forEach(button => {
        button.addEventListener('click', function() {
            showNotification("Liked the product");
        });
    });
}

// Define cartItems array to store items in the cart
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to add item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    const item = cartItems.find(i => i.name === itemName);
    if (item) {
        item.quantity += 1;
    } else {
        cartItems.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount(); // Update cart count in the navbar
    updateCartDisplay(); // Update cart display in index2.html
}

// Function to get the price of an item
function getPrice(itemName) {
    const prices = {
        "Long Yellow Dress": 87.00,
        "Long White Dress": 145.00,
        "Belted Dress": 111.00,
        "Fitted Dress": 104.40,
    };
    return prices[itemName] || 100.00;
}

// Function to update cart count in the navbar
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
    });
}

// Function to update cart display in index2.html
function updateCartDisplay() {
    const cartDisplayElement = document.getElementById('cart-display');
    if (cartDisplayElement) {
        cartDisplayElement.innerHTML = '';

        if (cartItems.length === 0) {
            const emptyMessage = document.createElement('h2');
            emptyMessage.id = 'nothing-in';
            emptyMessage.textContent = 'Nothing in the cart';
            cartDisplayElement.appendChild(emptyMessage);
        } else {
            cartItems.forEach((item, index) => {
                const itemContainer = document.createElement('div');
                itemContainer.classList.add('cart-item');

                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;

                const name = document.createElement('p');
                name.textContent = item.name;

                const price = document.createElement('p');
                price.textContent = `$${item.price.toFixed(2)}`;

                const quantity = document.createElement('p');
                quantity.textContent = `Quantity: ${item.quantity}`;

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', function() {
                    removeFromCart(index);
                });

                itemContainer.appendChild(img);
                itemContainer.appendChild(name);
                itemContainer.appendChild(price);
                itemContainer.appendChild(quantity);
                itemContainer.appendChild(removeButton);
                cartDisplayElement.appendChild(itemContainer);
            });
        }
    }
}

// Function to remove item from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    updateCartDisplay();
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }, 100);
}

function showPhoto(index, container) {
    var mainImage = container.querySelector('.main-image');
    var newImage = container.querySelector('.new-image');
    if (index === 0) {
        mainImage.style.opacity = 1;
        newImage.style.opacity = 0;
    } else {
        mainImage.style.opacity = 0;
        newImage.style.opacity = 1;
    }
}

function showCategory(category) {
    var categories = document.querySelectorAll('.cont');
    categories.forEach(function(cat) {
        cat.style.display = 'none';
        cat.classList.remove('active');
    });
    var activeCategory = document.getElementById(category);
    activeCategory.style.display = 'flex';
    activeCategory.classList.add('active');

    var titles = document.querySelectorAll('.title');
    titles.forEach(function(title) {
        title.classList.remove('active');
    });
    document.querySelector(`.title[onclick="showCategory('${category}')"]`).classList.add('active');
}

function search() {
    // Handle search action
}

function reload() {
    location.reload();
}
