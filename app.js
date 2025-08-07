document.addEventListener('DOMContentLoaded', () => {
    const menuItemsContainer = document.getElementById('menu-items');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const orderButton = document.getElementById('order-button');
    const cartElement = document.getElementById('cart');
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    const searchBar = document.getElementById('search-bar');
    const filterCuisine = document.getElementById('filter-cuisine');

    const menu = [
        { id: 1, name: 'Nasi Goreng', description: 'A classic Indonesian fried rice dish, seasoned with sweet soy sauce, shrimp paste, and a blend of spices. Served with a fried egg, pickled vegetables, and prawn crackers.', price: 25000, image: 'https://via.placeholder.com/400x300', ingredients: ['Rice', 'Sweet Soy Sauce', 'Shrimp Paste', 'Egg', 'Pickled Vegetables'], allergens: ['Shellfish'], cuisine: 'indonesian' },
        { id: 2, name: 'Mie Goreng', description: 'Spicy and savory fried noodles, stir-fried with chicken, prawns, and vegetables. A staple of Indonesian street food.', price: 22000, image: 'https://via.placeholder.com/400x300', ingredients: ['Noodles', 'Chicken', 'Prawns', 'Vegetables', 'Spices'], allergens: ['Gluten', 'Shellfish'], cuisine: 'indonesian' },
        { id: 3, name: 'Sate Ayam', description: 'Tender chicken skewers marinated in a flavorful blend of spices and grilled to perfection. Served with a rich and creamy peanut sauce.', price: 30000, image: 'https://via.placeholder.com/400x300', ingredients: ['Chicken', 'Peanut Sauce', 'Spices'], allergens: ['Peanuts'], cuisine: 'indonesian' },
        { id: 4, name: 'Gado-Gado', description: 'A vibrant Indonesian salad featuring a mix of blanched vegetables, boiled potatoes, hard-boiled eggs, and tofu, all drizzled with a delicious peanut sauce dressing.', price: 20000, image: 'https://via.placeholder.com/400x300', ingredients: ['Mixed Vegetables', 'Potatoes', 'Eggs', 'Tofu', 'Peanut Sauce'], allergens: ['Peanuts', 'Soy'], cuisine: 'indonesian' },
        { id: 5, name: 'Beef Burger', description: 'A classic American burger with a juicy beef patty, lettuce, tomato, and cheese.', price: 45000, image: 'https://via.placeholder.com/400x300', ingredients: ['Beef Patty', 'Lettuce', 'Tomato', 'Cheese', 'Bun'], allergens: ['Gluten', 'Dairy'], cuisine: 'western' },
        { id: 6, name: 'Spaghetti Carbonara', description: 'A creamy pasta dish with bacon, eggs, and Parmesan cheese.', price: 55000, image: 'https://via.placeholder.com/400x300', ingredients: ['Spaghetti', 'Bacon', 'Eggs', 'Parmesan Cheese'], allergens: ['Gluten', 'Dairy', 'Eggs'], cuisine: 'western' },
        { id: 7, name: 'Korean Fried Chicken', description: 'Crispy fried chicken coated in a sweet and spicy gochujang sauce.', price: 65000, image: 'https://via.placeholder.com/400x300', ingredients: ['Chicken', 'Gochujang', 'Soy Sauce', 'Garlic'], allergens: ['Gluten', 'Soy'], cuisine: 'asian' },
        { id: 8, name: 'Pad Thai', description: 'A popular Thai noodle dish with shrimp, tofu, and a tamarind-based sauce.', price: 60000, image: 'https://via.placeholder.com/400x300', ingredients: ['Rice Noodles', 'Shrimp', 'Tofu', 'Tamarind', 'Peanuts'], allergens: ['Shellfish', 'Peanuts'], cuisine: 'asian' }
    ];

    let cart = [];

    function renderMenu(searchTerm = '', cuisine = 'all') {
        menuItemsContainer.innerHTML = '';
        const filteredMenu = menu.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCuisine = cuisine === 'all' || item.cuisine === cuisine;
            return matchesSearch && matchesCuisine;
        });

        filteredMenu.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item bg-white p-4 rounded-lg shadow-md cursor-pointer';
            menuItemElement.setAttribute('data-id', item.id);
            menuItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-md mb-4">
                <h3 class="text-xl font-bold">${item.name}</h3>
                <p class="text-gray-600">${item.description.substring(0, 50)}...</p>
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

    function openModal(itemId) {
        const item = menu.find(item => item.id === itemId);
        modal.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-full h-64 object-cover rounded-md mb-4">
            <h2 class="text-3xl font-bold mb-2">${item.name}</h2>
            <p class="text-gray-700 mb-4">${item.description}</p>
            <h3 class="text-xl font-bold mb-2">Ingredients</h3>
            <p class="text-gray-600 mb-4">${item.ingredients.join(', ')}</p>
            <h3 class="text-xl font-bold mb-2">Allergens</h3>
            <p class="text-red-500 font-bold mb-4">${item.allergens.join(', ')}</p>
            <div class="flex justify-between items-center">
                <span class="font-bold text-2xl">Rp ${item.price.toLocaleString()}</span>
                <button data-id="${item.id}" class="add-to-cart-btn-modal bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">Add to Cart</button>
            </div>
            <button id="close-modal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900">&times;</button>
        `;
        modalContainer.classList.remove('hidden');
    }

    function closeModal() {
        modalContainer.classList.add('hidden');
    }

    menuItemsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.menu-item') && !e.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(e.target.closest('.menu-item').getAttribute('data-id'));
            openModal(itemId);
        } else if (e.target.classList.contains('add-to-cart-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            addToCart(itemId);
        }
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target.id === 'close-modal' || e.target.id === 'modal-container') {
            closeModal();
        } else if (e.target.classList.contains('add-to-cart-btn-modal')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            addToCart(itemId);
            closeModal();
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

    searchBar.addEventListener('input', (e) => {
        renderMenu(e.target.value, filterCuisine.value);
    });

    filterCuisine.addEventListener('change', (e) => {
        renderMenu(searchBar.value, e.target.value);
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

    // Package Builder Wizard
    const wizardSteps = document.querySelectorAll('#wizard > div');
    const nextButtons = document.querySelectorAll('[id^="next-step-"]');
    const prevButtons = document.querySelectorAll('[id^="prev-step-"]');
    const packageMenuItemsContainer = document.getElementById('package-menu-items');
    const summaryContainer = document.getElementById('summary');
    const numGuestsInput = document.getElementById('num-guests');

    let currentStep = 1;
    let package = {
        eventDate: '',
        eventTime: '',
        numGuests: 1,
        menuItems: [],
        addons: []
    };

    function showStep(step) {
        wizardSteps.forEach(s => s.classList.add('hidden'));
        document.getElementById(`step-${step}`).classList.remove('hidden');
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < 4) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    function renderPackageMenuItems() {
        packageMenuItemsContainer.innerHTML = '';
        menu.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item bg-white p-4 rounded-lg shadow-md cursor-pointer';
            menuItemElement.setAttribute('data-id', item.id);
            menuItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-md mb-4">
                <h3 class="text-xl font-bold">${item.name}</h3>
                <div class="flex justify-between items-center mt-4">
                    <span class="font-bold text-lg">Rp ${item.price.toLocaleString()}</span>
                    <button data-id="${item.id}" class="add-to-package-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Add</button>
                </div>
            `;
            packageMenuItemsContainer.appendChild(menuItemElement);
        });
    }

    function updateSummary() {
        package.numGuests = parseInt(numGuestsInput.value);
        let total = 0;
        let summaryHTML = `
            <p><strong>Event Date:</strong> ${package.eventDate}</p>
            <p><strong>Event Time:</strong> ${package.eventTime}</p>
            <p><strong>Number of Guests:</strong> ${package.numGuests}</p>
            <h4 class="text-xl font-bold mt-4">Menu Items:</h4>
        `;
        package.menuItems.forEach(item => {
            summaryHTML += `<p>${item.name} - Rp ${item.price.toLocaleString()}</p>`;
            total += item.price;
        });
        summaryHTML += `<h4 class="text-xl font-bold mt-4">Add-ons:</h4>`;
        package.addons.forEach(addon => {
            summaryHTML += `<p>${addon.name} - Rp ${addon.price.toLocaleString()}/guest</p>`;
            total += addon.price;
        });
        total *= package.numGuests;
        summaryHTML += `<h3 class="text-2xl font-bold mt-4">Total Estimate: Rp ${total.toLocaleString()}</h3>`;
        summaryContainer.innerHTML = summaryHTML;
    }

    document.getElementById('next-step-1').addEventListener('click', () => {
        package.eventDate = document.getElementById('event-date').value;
        package.eventTime = document.getElementById('event-time').value;
        package.numGuests = parseInt(numGuestsInput.value);
        renderPackageMenuItems();
    });

    packageMenuItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-package-btn')) {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            const item = menu.find(i => i.id === itemId);
            package.menuItems.push(item);
            e.target.textContent = 'Added';
            e.target.disabled = true;
        }
    });

    document.getElementById('next-step-2').addEventListener('click', () => {
        updateSummary();
    });

    document.getElementById('next-step-3').addEventListener('click', () => {
        package.addons = [];
        const addons = document.querySelectorAll('input[name="addons"]:checked');
        addons.forEach(addon => {
            package.addons.push({
                name: addon.nextElementSibling.textContent.split(' (')[0],
                price: parseInt(addon.value)
            });
        });
        updateSummary();
    });

    document.getElementById('confirm-package').addEventListener('click', () => {
        let total = 0;
        package.menuItems.forEach(item => {
            total += item.price;
        });
        package.addons.forEach(addon => {
            total += addon.price;
        });
        total *= package.numGuests;

        const orderDetails = {
            ...package,
            total: total
        };

        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        window.location.href = 'checkout.html';
    });

    const packages = {
        silver: [1, 2, 4],
        gold: [1, 2, 3, 5, 6],
        platinum: [1, 2, 3, 4, 5, 6, 7, 8]
    };

    document.getElementById('packages').addEventListener('click', (e) => {
        if (e.target.classList.contains('select-package-btn')) {
            const selectedPackage = e.target.getAttribute('data-package');
            package.menuItems = [];
            packages[selectedPackage].forEach(itemId => {
                const item = menu.find(i => i.id === itemId);
                package.menuItems.push(item);
            });
            showStep(2);
            renderPackageMenuItems();
            // Disable the "Add" button for the items in the package
            package.menuItems.forEach(item => {
                const button = packageMenuItemsContainer.querySelector(`button[data-id="${item.id}"]`);
                button.textContent = 'Added';
                button.disabled = true;
            });
        }
    });

    // Calendar
    const calendarDaysContainer = document.getElementById('calendar-days');
    const monthYearElement = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const eventDateInput = document.getElementById('event-date');

    let currentDate = new Date();
    let bookedDates = [];

    async function fetchBookedDates() {
        try {
            const response = await fetch('booked-dates.json');
            const data = await response.json();
            bookedDates = data.bookedDates;
            renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
        } catch (error) {
            console.error('Error fetching booked dates:', error);
        }
    }

    function renderCalendar(year, month) {
        calendarDaysContainer.innerHTML = '';
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        monthYearElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

        for (let i = 0; i < startDay; i++) {
            const emptyDay = document.createElement('div');
            calendarDaysContainer.appendChild(emptyDay);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            dayElement.className = 'p-2 text-center cursor-pointer';
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            if (bookedDates.includes(dateString)) {
                dayElement.classList.add('bg-red-500', 'text-white', 'cursor-not-allowed');
                dayElement.setAttribute('disabled', true);
            } else {
                dayElement.classList.add('hover:bg-blue-200');
            }

            dayElement.addEventListener('click', () => {
                if (!dayElement.hasAttribute('disabled')) {
                    eventDateInput.value = dateString;
                }
            });

            calendarDaysContainer.appendChild(dayElement);
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    fetchBookedDates();
});
