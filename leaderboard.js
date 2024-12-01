const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

document.getElementById('registerButton').addEventListener('click', register);
document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('addCatchButton').addEventListener('click', addCatch);
document.getElementById('deleteCatchButton').addEventListener('click', deleteCatch); // Add delete button event listener

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        const hashedPassword = btoa(password);  // Simple base64 hash for demonstration purposes
        users.push({ username, password: hashedPassword, bluegill: 0, bass: 0, catfish: 0, totalWeight: 0 });
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('userForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } else {
        alert("Please enter both username and password.");
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = btoa(document.getElementById('loginPassword').value);  // Simple base64 hash for demonstration purposes

    currentUser = users.find(user => user.username === username && user.password === password);

    if (currentUser) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('catchForm').style.display = 'block';
    } else {
        alert("Incorrect username or password.");
    }
}

function addCatch() {
    if (currentUser) {
        const bluegill = parseInt(document.getElementById('bluegill').value) || 0;
        const bass = parseInt(document.getElementById('bass').value) || 0;
        const catfish = parseInt(document.getElementById('catfish').value) || 0;
        const weight = parseInt(document.getElementById('weight').value) || 0;

        currentUser.bluegill += bluegill;
        currentUser.bass += bass;
        currentUser.catfish += catfish;
        currentUser.totalWeight += weight;

        localStorage.setItem('users', JSON.stringify(users));
        updateLeaderboard();
    } else {
        alert("You must be logged in to add a catch.");
    }
}

function deleteCatch() {
    if (currentUser) {
        currentUser.bluegill = 0;
        currentUser.bass = 0;
        currentUser.catfish = 0;
        currentUser.totalWeight = 0;

        localStorage.setItem('users', JSON.stringify(users));
        updateLeaderboard();
    } else {
        alert("You must be logged in to delete a catch.");
    }
}

function calculatePoints(user) {
    return user.bluegill * 1 + user.bass * 5 + user.catfish * 10;
}

function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    users.sort((a, b) => calculatePoints(b) - calculatePoints(a)).forEach((user, index) => {
        const row = document.createElement('tr');
        const pulsateClass = index < 3 ? 'pulsate' : '';
        row.innerHTML = `
            <td class="${pulsateClass}">${index + 1}</td>
            <td class="${pulsateClass}" onclick="showDetails('${user.username}')">${user.username}</td>
            <td class="${pulsateClass}">${calculatePoints(user)}</td>
        `;
        leaderboard.appendChild(row);
    });
}

function showDetails(username) {
    const user = users.find(user => user.username === username);

    if (user) {
        alert(`
            Bluegill: ${user.bluegill}
            Bass: ${user.bass}
            Catfish: ${user.catfish}
            Total Weight: ${user.totalWeight}
        `);
    }
}

document.addEventListener('DOMContentLoaded', updateLeaderboard);
