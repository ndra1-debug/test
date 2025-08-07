document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const dashboardContainer = document.getElementById('dashboard-container');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', () => {
        if (passwordInput.value === 'password123') {
            loginContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
            loadDashboardData();
        } else {
            alert('Incorrect password');
        }
    });

    function loadDashboardData() {
        fetch('orders.json')
            .then(response => response.json())
            .then(orders => {
                const confirmedEvents = orders.filter(order => new Date(order.eventDate) > new Date() && new Date(order.eventDate) < new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)).length;
                const newInquiries = orders.filter(order => order.status === 'Inquiry').length;
                const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

                document.getElementById('confirmed-events').textContent = confirmedEvents;
                document.getElementById('new-inquiries').textContent = newInquiries;
                document.getElementById('total-revenue').textContent = `Rp ${totalRevenue.toLocaleString()}`;

                const upcomingEventsContainer = document.getElementById('upcoming-events');
                upcomingEventsContainer.innerHTML = `
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th class="text-left">Event Date</th>
                                <th class="text-left">Customer Name</th>
                                <th class="text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.filter(order => new Date(order.eventDate) > new Date()).slice(0, 5).map(order => `
                                <tr>
                                    <td>${order.eventDate}</td>
                                    <td>${order.customerName}</td>
                                    <td>${order.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;

                const ordersTableBody = document.getElementById('orders-table-body');
                ordersTableBody.innerHTML = orders.map(order => `
                    <tr>
                        <td>${order.customerName}</td>
                        <td>${order.eventDate}</td>
                        <td>
                            <select data-id="${order.id}" class="status-select p-2 border rounded-lg">
                                <option value="Inquiry" ${order.status === 'Inquiry' ? 'selected' : ''}>Inquiry</option>
                                <option value="Deposit Paid" ${order.status === 'Deposit Paid' ? 'selected' : ''}>Deposit Paid</option>
                                <option value="Fully Paid" ${order.status === 'Fully Paid' ? 'selected' : ''}>Fully Paid</option>
                                <option value="In Preparation" ${order.status === 'In Preparation' ? 'selected' : ''}>In Preparation</option>
                                <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </td>
                        <td>${order.numGuests}</td>
                        <td>Rp ${order.total.toLocaleString()}</td>
                        <td>
                            <button data-id="${order.id}" class="print-kot-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Print KOT</button>
                        </td>
                    </tr>
                `).join('');
            });
    }

    document.getElementById('order-management').addEventListener('click', (e) => {
        if (e.target.classList.contains('print-kot-btn')) {
            const orderId = parseInt(e.target.getAttribute('data-id'));
            window.open(`kot.html?id=${orderId}`, '_blank');
        }
    });

    document.getElementById('order-management').addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            const orderId = parseInt(e.target.getAttribute('data-id'));
            const newStatus = e.target.value;
            // In a real application, you would make a request to your backend to update the order status.
            console.log(`Order ${orderId} status updated to ${newStatus}`);
        }
    });
});
