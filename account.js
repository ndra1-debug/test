document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const accountContainer = document.getElementById('account-container');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', () => {
        if (emailInput.value === 'customer@example.com' && passwordInput.value === 'password123') {
            loginContainer.classList.add('hidden');
            accountContainer.classList.remove('hidden');
            loadAccountData();
        } else {
            alert('Incorrect email or password');
        }
    });

    function loadAccountData() {
        // Mock data for the account portal
        const orderHistory = [
            {
                id: 1691353200000,
                eventDate: "2025-08-10",
                status: "Deposit Paid",
                total: 5000000
            },
            {
                id: 1691526000000,
                eventDate: "2025-08-12",
                status: "Fully Paid",
                total: 15000000
            }
        ];

        const orderHistoryContainer = document.getElementById('order-history');
        orderHistoryContainer.innerHTML = `
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="text-left">Event Date</th>
                        <th class="text-left">Status</th>
                        <th class="text-left">Total</th>
                        <th class="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderHistory.map(order => `
                        <tr>
                            <td>${order.eventDate}</td>
                            <td>${order.status}</td>
                            <td>Rp ${order.total.toLocaleString()}</td>
                            <td>
                                <button data-id="${order.id}" class="rebook-btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Re-book</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
});
