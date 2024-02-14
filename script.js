var apiUrl = "https://dummyjson.com/products";
var productData = [];
let itemsPerPage = 6;
let currentPage = 1;

// Fetches product data from the API
function productsTable() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            productData = data.products;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById("msg").innerText = "Error fetching data. Please try again later.";
        });
}

// Renders the product data and pagination buttons
function dataTable() {
    productsTable();

    const pages = Math.ceil(productData.length / itemsPerPage);
    const pageButtons = Array.from({ length: pages }, (_, index) => index + 1);

    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentItems = productData.slice(indexOfFirstPage, indexOfLastPage);

    // Display product items
    document.getElementById("product-container").innerHTML = currentItems.map(product => {
        return `
            <div class="productBox">
                <img src=${product.images[0]} alt="${product.name}" />
                <h4>${product.name}</h4>
                <p>${product.category}</p>
            </div>
        `;
    }).join("");

    // Display page buttons
    document.getElementById("pgBtns").innerHTML = pageButtons.map(page => {
        return `
            <button class="pageBtn" onclick="goToPage(${page})">${page}</button>
        `;
    }).join("");
}

// Function to navigate to a specific page
function goToPage(page) {
    currentPage = page;
    dataTable();
}

// Function to go to the previous page
const prevBtn = () => {
    if ((currentPage - 1) > 0) {
        currentPage--;
        dataTable();
    }
}

// Function to go to the next page
const nextBtn = () => {
    if ((currentPage * itemsPerPage) < productData.length) {
        currentPage++;
        dataTable();
    }
}

// Event listeners for previous and next buttons
document.getElementById("prevBtn").addEventListener("click", prevBtn, false);
document.getElementById("nextBtn").addEventListener("click", nextBtn, false);

// Initial rendering of the data table
dataTable();
