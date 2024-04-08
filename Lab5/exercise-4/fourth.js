let catalog = new Map();
let orders = new Set();
let productHistory = new WeakMap();
let nextProductId = 1;

function addProduct() {
    const name = document.getElementById('add-name').value;
    const price = parseFloat(document.getElementById('add-price').value);
    const quantity = parseInt(document.getElementById('add-quantity').value);

    if (!name || isNaN(price) || isNaN(quantity)) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const productId = nextProductId++;
    const product = { id: productId, name, price, quantity };
    catalog.set(productId, product);
    updateProductList();
}

function deleteProduct() {
    const productId = parseInt(document.getElementById('delete-id').value);
    if (catalog.delete(productId)) {
        updateProductList();
    } else {
        alert('Product not found.');
    }
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
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';
    catalog.forEach((product, productId) => {
        const productLi = document.createElement('li');
        productLi.textContent = `ID: ${productId}, Name: ${product.name}, Price: $${product.price}, Quantity: ${product.quantity}`;
        productsList.appendChild(productLi);
    });
}
