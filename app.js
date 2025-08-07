document.addEventListener('DOMContentLoaded', () => {
    const menuItemsContainer = document.getElementById('menu-items');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const orderButton = document.getElementById('order-button');
    const cartElement = document.getElementById('cart');

    const menu = [
        { id: 1, name: 'Nasi Goreng', description: 'Classic Indonesian fried rice.', price: 25000, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Mie Goreng', description: 'Spicy fried noodles.', price: 22000, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Sate Ayam', description: 'Chicken satay with peanut sauce.', price: 30000, image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Gado-Gado', description: 'Vegetable salad with peanut sauce.', price: 20000, image: 'https://via.placeholder.com/150' }
    ];

    let cart = [];

    function renderMenu() {
        menuItemsContainer.innerHTML = '';
        menu.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item bg-white p-4 rounded-lg shadow-md';
            menuItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-md mb-4">
                <h3 class="text-xl font-bold">${item.name}</h3>
                <p class="text-gray-600">${item.description}</p>
                <div class="flex justify-between items-center mt-4">
                    <span class="font-bold text-lg">Rp ${item.price.toLocaleString()}</span>
                    <button data-id="${item.id}" class="add-to-cart-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add to Cart</button>
                </div>
            `;
            menuItemsContainer.appendChild(menuItemElement);
        });
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500">Your cart is empty.</p>';
            orderButton.disabled = true;
        } else {
            cart.forEach(cartItem => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'flex justify-between items-center mb-2 cart-item-animation';
                cartItemElement.innerHTML = `
                    <div>
                        <p class="font-bold">${cartItem.name}</p>
                        <p class="text-sm text-gray-600">Rp ${cartItem.price.toLocaleString()} x ${cartItem.quantity}</p>
                    </div>
                    <p class="font-bold">Rp ${(cartItem.price * cartItem.quantity).toLocaleString()}</p>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
            orderButton.disabled = false;
        }
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `Rp ${total.toLocaleString()}`;
    }

    function addToCart(itemId) {
        const itemInCart = cart.find(item => item.id === itemId);
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            const itemToAdd = menu.find(item => item.id === itemId);
            cart.push({ ...itemToAdd, quantity: 1 });
        }
        renderCart();
        animateCart();
    }

    function animateCart() {
        cartElement.classList.add('animate-pulse');
        setTimeout(() => {
            cartElement.classList.remove('animate-pulse');
        }, 500);
    }

    menuItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            addToCart(itemId);
        }
    });

    orderButton.addEventListener('click', () => {
        const phoneNumber = '+628123456789';
        let message = 'Hello, I would like to order:\n\n';
        cart.forEach(item => {
            message += `${item.name} (x${item.quantity})\n`;
        });
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: Rp ${total.toLocaleString()}`;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Smooth scrolling for the "View Our Menu" button
    document.querySelector('a[href="#menu"]').addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });

    renderMenu();
    renderCart();
});
