document.addEventListener("DOMContentLoaded", function() {
    // Toggle navigation menu on mobile devices (if applicable)
    var menuButton = document.querySelector('.fa-bars');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });
    }

    // Initialize Swiper slider (if used)
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper('.mySwiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Initialize image hover and switch functionality
    initializeImageContainers();

    // Initialize category switch functionality
    initializeCategorySwitch();

    // Initialize Instagram container functionality
    initializeInstagramContainers();

    // Initialize cart icon functionality
    initializeCartIcon();
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
                button.style.transitionDelay = '0s'; // Reset transition delay
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

function initializeCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            const itemName = 'Item Name'; // Replace with actual item name or ID
            addToCart(itemName); // Add item to cart
        });
    }
}

// Define a variable to store cart items (can be an array of objects)
let cartItems = [];

// Function to add item to cart
function addToCart(itemName) {
    cartItems.push({ name: itemName });
    updateCartCount(); // Update cart count in navbar
    updateCartDisplay(); // Update cart display in index2.html
}

// Function to update cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartItems.length;
    }
}

// Function to update cart display in index2.html
function updateCartDisplay() {
    const cartDisplayElement = document.getElementById('cart-display');
    if (cartDisplayElement) {
        // Clear existing content
        cartDisplayElement.innerHTML = '';

        if (cartItems.length === 0) {
            // If cart is empty, display a message
            cartDisplayElement.textContent = 'Your cart is empty.';
        } else {
            // If cart has items, create list items for each item in the cart
            const ul = document.createElement('ul');
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                ul.appendChild(li);
            });
            cartDisplayElement.appendChild(ul);
        }
    }
}

// Optional: Display "Your cart is empty" message if cartItems array is empty
window.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); // Update cart count on page load
    if (cartItems.length === 0) {
        // Example: Display a message or update UI for empty cart
        console.log('Your cart is empty!');
    }
});

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
