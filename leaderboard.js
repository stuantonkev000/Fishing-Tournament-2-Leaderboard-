document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const addCatchButton = document.getElementById('addCatchButton');
    const hostLoginButton = document.getElementById('hostLoginButton');

    // Event listener for the host login button
    hostLoginButton.addEventListener('click', function() {
        const pin = document.getElementById('hostPin').value;
        if (pin === "The Zero Club") {
            alert("Access granted! You can now delete players from the leaderboard.");
            document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));

            // Add delete buttons for each row
            document.querySelectorAll('#leaderboard tr').forEach(row => {
                if (!row.querySelector('button')) { // Check if delete button is already present
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = function() {
                        row.remove();
                    };
                    const td = document.createElement('td');
                    td.appendChild(deleteButton);
                    row.appendChild(td);
                }
            });
        } else {
            alert("Incorrect pin. Access denied.");
        }
    });

    // Function to add a row to the leaderboard
    function addRow(rank, name, points) {
        const tbody = document.getElementById('leaderboard');
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${rank}</td><td>${name}</td><td>${points}</td><td class="hidden"></td>`;
        tbody.appendChild(tr);
    }

    // Example rows (for demonstration purposes)
    addRow(1, 'Alice', 150);
    addRow(2, 'Bob', 120);
    addRow(3, 'Charlie', 100);

    // Example event listeners (you can customize these further as needed)
    registerButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        // Handle registration logic here
        alert(`User ${username} registered!`);
    });

    loginButton.addEventListener('click', function() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        // Handle login logic here
        alert(`User ${username} logged in!`);
    });

    addCatchButton.addEventListener('click', function() {
        const bluegill = document.getElementById('bluegill').value;
        const bass = document.getElementById('bass').value;
        const catfish = document.getElementById('catfish').value;
        const weight = document.getElementById('weight').value;
        // Handle adding catch logic here
        alert(`Catch added: Bluegill: ${bluegill}, Bass: ${bass}, Catfish: ${catfish}, Weight: ${weight}`);
    });
});

