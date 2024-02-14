var apiUrl = "https://dummyjson.com/products";
var productData = [];
let itemsPerPage = 6;
let currentPage = 1;

// Fetches product data from the API and returns a promise
async function productsTable() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        productData = data.products;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById("msg").innerText = "Error fetching data. Please try again later.";
    }
}

// Renders the product data and pagination buttons
async function dataTable() {
    await productsTable();

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
                <p>${product.category}</p>
            </div>
        `;
    }).join("");

    // Display page buttons with dynamic styling for the active page
    document.getElementById("pgBtns").innerHTML = pageButtons.map(page => {
        return `
            <button class="pageBtn ${currentPage === page ? 'activePage' : ''}" onclick="goToPage(${page})">${page}</button>
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
