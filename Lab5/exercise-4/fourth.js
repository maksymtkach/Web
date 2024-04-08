let catalog = new Map();
let orders = new Set();
let productHistory = new WeakMap();
let nextProductId = 1;

function addProduct() {
    const name = document.getElementById('add-name').value;
    const price = parseFloat(document.getElementById('add-price').value);
    const quantity = parseInt(document.getElementById('add-quantity').value, 10);

    if (!name || isNaN(price) || price < 0 || isNaN(quantity) || quantity < 0) {
        alert('Please fill out all fields correctly with non-negative values.');
        return;
    }

    const productId = nextProductId++;
    const product = { id: productId, name, price, quantity };
    catalog.set(productId, product);
    updateProductList();
}

function deleteProduct() {
    const input = document.getElementById('delete-id').value;
    if (!validateInput(input)) return;
    const productId = parseInt(input, 10);
    if (catalog.delete(productId)) {
        updateProductList();
    } else {
        alert('Product not found.');
    }
}

function validateInput(input) {
    const value = parseInt(input, 10);
    if (isNaN(value) || value < 1) {
        alert('Invalid input.');
        return false;
    }
    return true;
}

function searchProduct() {
    const productId = parseInt(document.getElementById('search-id').value);
    if (catalog.has(productId)) {
        const product = catalog.get(productId);
        alert(`Product ID: ${product.id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}`);
    } else {
        alert('Product not found.');
    }
}

function placeOrder() {
    const productId = parseInt(document.getElementById('order-id').value);
    const orderQuantity = parseInt(document.getElementById('order-quantity').value);

    if (catalog.has(productId)) {
        const product = catalog.get(productId);
        if (product.quantity >= orderQuantity) {
            product.quantity -= orderQuantity;
            orders.add({ productId, quantity: orderQuantity });
            updateProductList();
        } else {
            alert('Insufficient quantity available.');
        }
    } else {
        alert('Product not found.');
    }
}

function updateProductList() {
    const productsList = document.querySelector('.products-list');
    productsList.innerHTML = '';
    catalog.forEach((product, productId) => {
        const productLi = document.createElement('li');
        productLi.textContent = `ID: ${productId}, Name: ${product.name}, Price: $${product.price}, Quantity: ${product.quantity}`;
        productsList.appendChild(productLi);
    });
}
