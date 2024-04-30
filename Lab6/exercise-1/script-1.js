let products = [];
let currentEditIndex = -1;

document.getElementById('addProductBtn').addEventListener('click', () => {
    const name = document.getElementById('newProductName').value.trim();
    const price = parseFloat(document.getElementById('newProductPrice').value);
    const imgSrc = document.getElementById('newProductImg').value.trim();
    if (name && price && imgSrc) {
        const product = {name, price, imgSrc};
        addProduct(product);
        document.getElementById('newProductName').value = '';
        document.getElementById('newProductPrice').value = '';
        document.getElementById('newProductImg').value = '';
    }
});

document.getElementById('filterInput').addEventListener('input', filterProducts);

function addProduct(product) {
    products.push(product);
    renderProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

function editProduct(index) {
    currentEditIndex = index;
    document.getElementById('editName').value = products[index].name;
    document.getElementById('editPrice').value = products[index].price;
    document.getElementById('editModal').style.display = 'block';
}

document.getElementById('saveChanges').addEventListener('click', () => {
    if (currentEditIndex !== -1) {
        products[currentEditIndex].name = document.getElementById('editName').value;
        products[currentEditIndex].price = parseFloat(document.getElementById('editPrice').value);
        renderProducts();
        document.getElementById('editModal').style.display = 'none';
    }
});

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('editModal').style.display = 'none';
});

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.imgSrc}">
            <span class="productName">${product.name}</span>
            <span class="productPrice">${product.price} грн</span>
            <button onclick="editProduct(${index})">Редагувати</button>
            <button onclick="deleteProduct(${index})" class="deleteBtn">Видалити</button>
        `;
        productList.appendChild(li);
    });
    updateTotalPrice();
}

function updateTotalPrice() {
    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('totalPrice').textContent = `Загальна вартість: ${totalPrice} грн`;
}

function filterProducts(e) {
    const filterValue = e.target.value.toLowerCase();
    document.getElementById('productList').innerHTML = '';
    products.filter(product => product.name.toLowerCase().includes(filterValue)).forEach(addProductToList);
}

function addProductToList(product, index) {
    const productList = document.getElementById('productList');
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${product.imgSrc}">
        <span class="productName">${product.name}</span>
        <span class="productPrice">${product.price} грн</span>
        <button onclick="editProduct(${index})">Редагувати</button>
        <button onclick="deleteProduct(${index})" class="deleteBtn">Видалити</button>
    `;
    productList.appendChild(li);
}

function initializeProducts() {
    const initialProducts = [
        { name: "Cabbage", price: 100, imgSrc: "https://media.contentapi.ea.com/content/dam/game-objects/plants-vs-zombies-2-game-objects/plants/cabbage-pult.png.adapt.crop16x9.png" },
        { name: "Sunflower", price: 50, imgSrc: "https://i.seadn.io/gae/jUBhJOeIggaDxuiSM_2HxQRztSpV5h8BCjBN7Buq9Z43kcqpaL8wbV5ZGT6agR43_Of4XqFGokN83SSa6VaUk5flyGlhnnBVrh-hWQ?auto=format&dpr=1&w=1000" },
        { name: "Frozen Melon", price: 500, imgSrc: "https://media.baamboozle.com/uploads/images/554113/1651380586_463145.png" },
        { name: "Nut", price: 50, imgSrc: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/35821c3b-bd5c-411c-a67c-0e1a28a9c83d/defaxh9-d8f51ec5-0c2d-4d81-8a4e-8ff678eef847.png/v1/fill/w_1280,h_960/explode_o_nut_by_blandonproductions_defaxh9-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTYwIiwicGF0aCI6IlwvZlwvMzU4MjFjM2ItYmQ1Yy00MTFjLWE2N2MtMGUxYTI4YTljODNkXC9kZWZheGg5LWQ4ZjUxZWM1LTBjMmQtNGQ4MS04YTRlLThmZjY3OGVlZjg0Ny5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Mo51o3QkBdA-RKOAvAfsaK7DXex2hhTRTNMTCBAlrK4" },
        { name: "Potato", price: 25, imgSrc: "https://www.models-resource.com/resources/big_icons/65/64069.png?updated=1685341761" },
        { name: "Cherry", price: 150, imgSrc: "https://openseauserdata.com/files/002455b7501984f99c8d154a894879ce.png" },
        { name: "Jalapeno", price: 100, imgSrc: "https://cdn.staticneo.com/ca/plants_vs_zombies_conceptart_AOA34.png" },
    ];
    products = [...initialProducts];
    renderProducts();
}

window.onclick = function(event) {
    if (event.target == document.getElementById('editModal')) {
        document.getElementById('editModal').style.display = "none";
    }
}

initializeProducts(); // Call this function to initialize your products when the script loads
