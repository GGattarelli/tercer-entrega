// Obtener elementos del DOM
const nameInput = document.getElementById("nameInput");
const priceInput = document.getElementById("priceInput");
const categoryInput = document.getElementById("categoryInput");
const addProductBtn = document.getElementById("addProductBtn");
const productTable = document.getElementById("productTable");
const totalPrice = document.getElementById("totalPrice");

// Array para almacenar los productos
let products = [];

// Cargar productos guardadas en el almacenamiento local
loadProducts();

// Agregar manejador de evento para el botón de agregar producto
addProductBtn.addEventListener("click", handleAddProduct);

// Función para manejar el evento de agregar producto
function handleAddProduct() {
    // Obtener valores de los inputs
    const name = nameInput.value;
    const price = priceInput.value;
    const category = categoryInput.value;

    // Validar que los campos no estén vacíos
    if (!name || !price || !category) {
        alert("Por favor, llene todos los campos");
        return;
    }

    // Crear un nuevo objeto con los datos del producto
    const product = {
        name: name,
        price: price,
        category: category
    };

    // Agregar producto al array
    products.push(product);

    // Limpiar los campos de los inputs
    nameInput.value = "";
    priceInput.value = "";
    categoryInput.value = "";

    // Agregar producto a la tabla en el DOM
    addProductToTable(product);

    // Guardar productos en el almacenamiento local
    saveProducts();

    // Actualizar el precio total en el DOM
    updateTotalPrice();
}

// Función para agregar un producto a la tabla en el DOM
function addProductToTable(product) {
    // Crear una nueva fila para la tabla
    const newRow = productTable.insertRow();

    // Crear y llenar las celdas con la información del producto
    const nameCell = newRow.insertCell(0);
    nameCell.innerHTML = product.name;
    const priceCell = newRow.insertCell(1);
    priceCell.innerHTML = product.price;
    const categoryCell = newRow.insertCell(2);
    categoryCell.innerHTML = product.category;
    const actionsCell = newRow.insertCell(3);
    actionsCell.innerHTML = "<button class='deleteProductBtn' data-product-name='" + product.name + "'>Eliminar</button>";

    // Agregar manejador de evento para el botón de eliminar producto
    const deleteProductBtn = actionsCell.querySelector(".deleteProductBtn");
    deleteProductBtn.addEventListener("click", deleteProductFromTable);
}

// Función para guardar productos en el almacenamiento local
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Función para cargar productos guardados en el almacenamiento local
function loadProducts() {
    const storedProducts = JSON.parse(localStorage.getItem("products"));

    if (storedProducts && storedProducts.length > 0) {
        products = storedProducts;
        for (let i = 0; i < products.length; i++) {
            addProductToTable(products[i]);
        }
    }
}

// Función para actualizar el precio total en el DOM
function updateTotalPrice() {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += parseFloat(products[i].price);
    }
    totalPrice.innerHTML = total;
}

// Función para eliminar un producto de la tabla en el DOM
function deleteProductFromTable(event) {
    // Obtener el nombre del producto a eliminar
    const productName = event.target.getAttribute("data-product-name");

    // Eliminar producto del array
    products = products.filter(product => product.name !== productName);

    // Eliminar producto de la tabla en el DOM
    event.target.parentNode.parentNode.remove();

    // Guardar productos en el almacenamiento local
    saveProducts();

    // Actualizar el precio total en el DOM
    updateTotalPrice();
}