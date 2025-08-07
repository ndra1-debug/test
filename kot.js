document.addEventListener('DOMContentLoaded', () => {
    const kotContainer = document.getElementById('kot-container');
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = parseInt(urlParams.get('id'));

    fetch('orders.json')
        .then(response => response.json())
        .then(orders => {
            const order = orders.find(o => o.id === orderId);
            if (order) {
                kotContainer.innerHTML = `
                    <h1 class="text-3xl font-bold mb-4">Kitchen Order Ticket</h1>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Event Date:</strong> ${order.eventDate}</p>
                            <p><strong>Event Time:</strong> ${order.eventTime}</p>
                        </div>
                        <div>
                            <p><strong>Customer Name:</strong> ${order.customerName}</p>
                            <p><strong>Number of Guests:</strong> ${order.numGuests}</p>
                        </div>
                    </div>
                    <h2 class="text-2xl font-bold mt-6 mb-4">Menu Items</h2>
                    <ul>
                        ${order.menuItems.map(item => `<li>${item.name}</li>`).join('')}
                    </ul>
                    <h2 class="text-2xl font-bold mt-6 mb-4">Add-ons</h2>
                    <ul>
                        ${order.addons.map(addon => `<li>${addon.name}</li>`).join('')}
                    </ul>
                    <h2 class="text-2xl font-bold mt-6 mb-4">Special Instructions</h2>
                    <p class="border p-4">${order.specialInstructions || 'None'}</p>
                `;
                window.print();
            }
        });
});
