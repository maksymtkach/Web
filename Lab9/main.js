let users = [];
let page = 1;
let loading = false;

document.addEventListener('DOMContentLoaded', () => {
    $('#myTab a[href="#login"]').tab('show');

    if (window.location.pathname.endsWith('main.html')) {
        fetchUserData();
        window.addEventListener('scroll', handleScroll);
        applyFiltersFromURL();
    }
});

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateUsername(username) {
    return username.trim().length >= 3;
}

function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    let isValid = true;

    if (!validateUsername(username)) {
        document.getElementById('signupUsername').classList.add('is-invalid');
        document.getElementById('signupUsernameError').innerText = 'Username must be at least 3 characters';
        isValid = false;
    } else {
        document.getElementById('signupUsername').classList.remove('is-invalid');
        document.getElementById('signupUsername').classList.add('is-valid');
        document.getElementById('signupUsernameError').innerText = '';
    }

    if (!validateEmail(email)) {
        document.getElementById('signupEmail').classList.add('is-invalid');
        document.getElementById('signupEmailError').innerText = 'Invalid email format';
        isValid = false;
    } else {
        document.getElementById('signupEmail').classList.remove('is-invalid');
        document.getElementById('signupEmail').classList.add('is-valid');
        document.getElementById('signupEmailError').innerText = '';
    }

    if (!validatePassword(password)) {
        document.getElementById('signupPassword').classList.add('is-invalid');
        document.getElementById('signupPasswordError').innerText = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        document.getElementById('signupPassword').classList.remove('is-invalid');
        document.getElementById('signupPassword').classList.add('is-valid');
        document.getElementById('signupPasswordError').innerText = '';
    }

    if (password !== confirmPassword) {
        document.getElementById('signupConfirmPassword').classList.add('is-invalid');
        document.getElementById('signupConfirmPasswordError').innerText = 'Passwords do not match';
        isValid = false;
    } else {
        document.getElementById('signupConfirmPassword').classList.remove('is-invalid');
        document.getElementById('signupConfirmPassword').classList.add('is-valid');
        document.getElementById('signupConfirmPasswordError').innerText = '';
    }

    if (isValid) {
        showLoader().then(() => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful!');
            document.getElementById('signupForm').reset();
            document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
            document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            $('#myTab a[href="#login"]').tab('show'); 
        }).catch((error) => {
            alert('Signup failed: ' + error.message);
        });
    }
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    let isValid = true;

    if (!validateEmail(email)) {
        document.getElementById('loginEmail').classList.add('is-invalid');
        document.getElementById('loginEmailError').innerText = 'Invalid email format';
        isValid = false;
    } else {
        document.getElementById('loginEmail').classList.remove('is-invalid');
        document.getElementById('loginEmail').classList.add('is-valid');
        document.getElementById('loginEmailError').innerText = '';
    }

    if (!validatePassword(password)) {
        document.getElementById('loginPassword').classList.add('is-invalid');
        document.getElementById('loginPasswordError').innerText = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        document.getElementById('loginPassword').classList.remove('is-invalid');
        document.getElementById('loginPassword').classList.add('is-valid');
        document.getElementById('loginPasswordError').innerText = '';
    }

    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            showLoader().then(() => {
                alert('Login successful!');
                window.location.href = 'main.html';
            }).catch((error) => {
                alert('Login failed: ' + error.message);
            });
        } else {
            alert('Invalid email or password');
        }
    }
}

function showLoader() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

function fetchUserData() {
    if (loading) return;
    loading = true;
    document.getElementById('loader').style.display = 'block';

    fetch(`https://randomuser.me/api/?results=10&page=${page}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            users = [...users, ...data.results];
            applyFilters(); 
            loading = false;
            page++;
        })
        .catch(error => {
            document.getElementById('loader').style.display = 'none';
            console.error('Error fetching user data:', error);
            loading = false;
        });
}

function renderUserCards(users) {
    const userCardsContainer = document.getElementById('userCards');
    userCardsContainer.innerHTML = '';
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'col-md-4 mb-3';
        userCard.innerHTML = `
            <div class="card">
                <img src="${user.picture.large}" class="card-img-top" alt="User Picture">
                <div class="card-body">
                    <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                    <p class="card-text">Email: ${user.email}</p>
                    <p class="card-text">Phone: ${user.phone}</p>
                    <p class="card-text">Location: ${user.location.city}, ${user.location.country}</p>
                    <p class="card-text">Age: ${user.dob.age}</p>
                    <p class="card-text">Registered: ${new Date(user.registered.date).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        userCardsContainer.appendChild(userCard);
    });
}

function filterUsers(users) {
    let filteredUsers = users;
    const filterInput = document.getElementById('filterInput').value.toLowerCase();
    const filterEmail = document.getElementById('filterEmail').value.toLowerCase();
    const filterLocation = document.getElementById('filterLocation').value.toLowerCase();
    const filterAge = document.getElementById('filterAge').value;

    if (filterInput) {
        filteredUsers = filteredUsers.filter(user => 
            `${user.name.first} ${user.name.last}`.toLowerCase().includes(filterInput)
        );
    }

    if (filterEmail) {
        filteredUsers = filteredUsers.filter(user => 
            user.email.toLowerCase().includes(filterEmail)
        );
    }

    if (filterLocation) {
        filteredUsers = filteredUsers.filter(user => 
            `${user.location.city}, ${user.location.country}`.toLowerCase().includes(filterLocation)
        );
    }

    if (filterAge) {
        filteredUsers = filteredUsers.filter(user => 
            user.dob.age === parseInt(filterAge, 10)
        );
    }

    return filteredUsers;
}

function sortUsers(users) {
    const sortOption = document.getElementById('sortOptions').value;

    if (sortOption === 'name-asc') {
        return users.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (sortOption === 'name-desc') {
        return users.sort((a, b) => b.name.first.localeCompare(a.name.first));
    } else if (sortOption === 'age-asc') {
        return users.sort((a, b) => a.dob.age - b.dob.age);
    } else if (sortOption === 'age-desc') {
        return users.sort((a, b) => b.dob.age - a.dob.age);
    } else if (sortOption === 'registered-asc') {
        return users.sort((a, b) => new Date(a.registered.date) - new Date(b.registered.date));
    } else if (sortOption === 'registered-desc') {
        return users.sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));
    }
    return users;
}

function applyFilters() {
    let filteredUsers = filterUsers(users);
    filteredUsers = sortUsers(filteredUsers);
    renderUserCards(filteredUsers);
    updateURLParams();
}

function updateURLParams() {
    const params = new URLSearchParams();

    const filterInput = document.getElementById('filterInput').value;
    const filterEmail = document.getElementById('filterEmail').value;
    const filterLocation = document.getElementById('filterLocation').value;
    const filterAge = document.getElementById('filterAge').value;
    const sortOption = document.getElementById('sortOptions').value;

    if (filterInput) params.set('name', filterInput);
    if (filterEmail) params.set('email', filterEmail);
    if (filterLocation) params.set('location', filterLocation);
    if (filterAge) params.set('age', filterAge);
    if (sortOption) params.set('sort', sortOption);

    history.replaceState(null, '', '?' + params.toString());
}

function applyFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('name')) {
        document.getElementById('filterInput').value = params.get('name');
    }
    if (params.has('email')) {
        document.getElementById('filterEmail').value = params.get('email');
    }
    if (params.has('location')) {
        document.getElementById('filterLocation').value = params.get('location');
    }
    if (params.has('age')) {
        document.getElementById('filterAge').value = params.get('age');
    }
    if (params.has('sort')) {
        document.getElementById('sortOptions').value = params.get('sort');
    }

    applyFilters();
}

function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        fetchUserData();
    }
}
