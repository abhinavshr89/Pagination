// script.js

const links = document.getElementsByClassName("link");
let currentValue = 1;

function activeLink(index) {
    for (let l of links) {
        l.classList.remove('active');
    }
    links[index].classList.add('active');
    currentValue = index + 1;
}

function prevbtn() {
    if (currentValue > 1) {
        for (let l of links) {
            l.classList.remove('active');
        }
        currentValue--;
        links[currentValue - 1].classList.add("active");
    }
}

function nextbtn() {
    if (currentValue < links.length) {
        for (let l of links) {
            l.classList.remove('active');
        }
        currentValue++;
        links[currentValue - 1].classList.add("active");
    }
}
