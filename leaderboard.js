document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');
    const addCatchButton = document.getElementById('addCatchButton');
    const hostLoginButton = document.getElementById('hostLoginButton');

    // Dummy storage for user data
    const users = [];
    let loggedInUser = null;

    // Event listener for the register button
    registerButton.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            users.push({ username, password });
            alert(`User ${username} registered!`);
        } else {
            alert('Please enter a username and password.');
        }
    });

    // Event listener for the login button
    loginButton.addEventListener('click', function() {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            loggedInUser = user;
            document.getElementById('catchForm').classList.remove('hidden');
            alert(`User ${username} logged in!`);
        } else {
            alert('Invalid username or password.');
        }
    });

    // Event listener for the add catch button
    addCatchButton.addEventListener('click', function() {
        if (!loggedInUser) {
            alert('Please log in first.');
            return;
        }

        const bluegill = document.getElementById('bluegill').value;
        const bass = document.getElementById('bass').value;
        const catfish = document.getElementById('catfish').value;
        const weight = document.getElementById('weight').value;

        addRow(loggedInUser.username, calculatePoints(bluegill, bass, catfish, weight));
        alert(`Catch added: Bluegill: ${bluegill}, Bass: ${bass}, Catfish: ${catfish}, Weight: ${weight}`);
    });

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
    function addRow(name, points) {
        const tbody = document.getElementById('leaderboard');
        const tr = document.createElement('tr');
        tr.innerHTML = `<td></td><td>${name}</td><td>${points}</td><td class="hidden"></td>`;
        tbody.appendChild(tr);
        updateRanks();
    }

    // Function to update ranks
    function updateRanks() {
        const rows = document.querySelectorAll('#leaderboard
