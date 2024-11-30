const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

document.getElementById('registerButton').addEventListener('click', register);
document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('addCatchButton').addEventListener('click', addCatch);
document.getElementById('hostLoginButton').addEventListener('click', hostLogin);

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        users.push({ username, password, catches: [] });
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('userForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } else {
        alert("Please enter both username and password.");
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    currentUser = users.find(user => user.username === username && user.password === password);

    if (currentUser) {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('catchForm').style.display = 'block';
        updateLeaderboard();
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

        const newCatch = { bluegill, bass, catfish, weight, username: currentUser.username };
        currentUser.catches.push(newCatch);

        localStorage.setItem('users', JSON.stringify(users));
        updateLeaderboard();
    } else {
        alert("You must be logged in to add a catch.");
    }
}

function calculatePoints(catchEntry) {
    return catchEntry.bluegill * 1 + catchEntry.bass * 5 + catchEntry.catfish * 10;
}

function calculateTotalPoints(user) {
    return user.catches.reduce((total, catchEntry) => total + calculatePoints(catchEntry), 0);
}

function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = '';

    users.sort((a, b) => calculateTotalPoints(b) - calculateTotalPoints(a)).forEach((user, index) => {
        user.catches.forEach((catchEntry, catchIndex) => {
            const row = document.createElement('tr');
            const pulsateClass = index < 3 ? 'pulsate' : '';
            row.innerHTML = `
                <td class="${pulsateClass}">${index + 1}</td>
                <td class="${pulsateClass}">${user.username}</td>
                <td class="${pulsateClass}">${calculatePoints(catchEntry)}</td>
                ${user.username === currentUser?.username ? `<td><button onclick="deleteCatch('${user.username}', ${catchIndex})">Delete</button></td>` : '<td class="hidden"></td>'}
            `;
            leaderboard.appendChild(row);
        });
    });
}

function showDetails(username) {
    const user = users.find(user => user.username === username);

    if (user) {
        const details = user.catches.map(catchEntry => `
            Bluegill: ${catchEntry.bluegill}
            Bass: ${catchEntry.bass}
            Catfish: ${catchEntry.catfish}
            Total Weight: ${catchEntry.weight}
        `).join('\n\n');

        alert(details);
    }
}

function hostLogin() {
    const pin = document.getElementById('hostPin').value;
    if (pin === "The Zero Club") {
        alert("Access granted! You can now delete players from the leaderboard.");
        document.querySelectorAll('.hidden').forEach(el => el.classList.remove('hidden'));
    } else {
        alert("Incorrect pin. Access denied.");
    }
}

function deleteUser(username) {
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
        updateLeaderboard();
    }
}

function deleteCatch(username, catchIndex) {
    const user = users.find(user => user.username === username);
    if (user) {
        user.catches.splice(catchIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
        updateLeaderboard();
    }
}

document.addEventListener('DOMContentLoaded', updateLeaderboard);
