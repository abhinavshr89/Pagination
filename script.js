// script.js

const links = document.getElementsByClassName("link");
const pageContentContainer = document.querySelector(".pagecontent");
let currentPage = 1;

function activeLink(index) {
    for (let l of links) {
        l.classList.remove('active');
    }
    links[index].classList.add('active');
    currentPage = index + 1;
    loadPageContent(currentPage);
}

function prevbtn() {
    if (currentPage > 1) {
        activeLink(currentPage - 2);
    }
}

function nextbtn() {
    if (currentPage < links.length) {
        activeLink(currentPage);
    }
}

function loadPageContent(pageNumber) {
    const pageURL = `page${pageNumber}.html`;
    
    fetch(pageURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load page ${pageNumber}`);
            }
            return response.text();
        })
        .then(htmlContent => {
            pageContentContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error(error);
        });
}

// Initial load
loadPageContent(currentPage);

