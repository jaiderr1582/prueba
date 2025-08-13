const API_URL = "http://localhost:3000/customers";
const table = document.getElementById("table");
const form = document.getElementById("form");


// Load loan list
async function loadUsers() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to load Customers');
        const data = await res.json();

        table.innerHTML = data.map(loan => `
            <tr>
                <td>${loan.id_customer}</td>
                <td>${loan.name_customer || 'N/A'}</td>
                <td>${loan.identification_number || 'N/A'}</td>
                <td>${loan.address || 'N/A'}</td>
                <td>${loan.phone || 'N/A'}</td>
                <td>${loan.email || 'N/A'}</td>
                <td>${loan.platform_used || 'N/A'}</td>
                <td>
                    <button class = "action-btn edit-btn" onclick="editLoan(${loan.id_customer})">Edit</button>
                    <button class = "action btn delete-btn" onclick="deleteLoan(${loan.id_customer})">Delete</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading Customers:', error);
        table.innerHTML = `<tr><td colspan="7">Error loading data</td></tr>`;
    }
}

// Save or Update loan
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const loanData = {
            id_customer: document.getElementById("id_customer").value,
            username: document.getElementById("username").value,
            identification: document.getElementById("identification").value,
            address: document.getElementById("address").value || null,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            state: document.getElementById("state").value,
            state_2: document.getElementById("state_2").value
        };

        const loanId = document.getElementById("id_customer").value;
        const method = loanId ? 'PUT' : 'POST';
        const url = loanId ? `${API_URL}/${loanId}` : API_URL;

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loanData)
        });

        if (!response.ok) throw new Error('Failed to save loan');

        form.reset();
        await loadUsers();
    } catch (error) {
        console.error('Error saving loan:', error);
        alert('Error saving loan: ' + error.message);
    }
});

// Edit loan with proper date handling
window.editLoan = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch loan');
        
        const loan = await res.json();

        document.getElementById("id_prestamo").value = loan.id_prestamo || '';
        document.getElementById("id_customer").value = loan.id_customer || '';
        document.getElementById("username").value = loan.username || '';
        document.getElementById("identification").value = formatDate(loan.identification);
        document.getElementById("address").value = formatDate(loan.address);
        document.getElementById("state").value = loan.state;
        document.getElementById("state_2").value = loan.state_2
    } catch (error) {
        console.error('Error editing loan:', error);
        alert('Error loading loan data');
    }
};

// Delete loan
window.deleteLoan = async (id) => {
    if (confirm("Are you sure you want to delete this loan?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error('Failed to delete loan');
            await loadUsers();
        } catch (error) {
            console.error('Error deleting loan:', error);
            alert('Error deleting loan');
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', loadUsers);