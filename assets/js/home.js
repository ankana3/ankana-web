const carousel = document.querySelector('.carousel-3d');
const items = document.querySelectorAll('.carousel-item');
const wrapper = document.querySelector('.carousel-3d-wrapper');

let rotation = 0;
let paused = false;

function updateCarousel() {

const total = items.length;

items.forEach((item, index) => {

    const angle = ((360 / total) * index) + rotation;

    const rad = angle * Math.PI / 180;

    const radius = 450;

    const x = Math.sin(rad) * radius;

    const depth = Math.cos(rad);

    const scale = 0.90 + ((depth + 1) / 2) * 0.40;

    const opacity = 0.15 + ((depth + 1) / 2) * 0.85;

    const brightness = 0.75 + ((depth + 1) / 2) * 0.25;
    
    item.style.left = "50%";
    item.style.top = "50%";

    item.style.transform = `
        translate(-50%, -50%)
        translateX(${x}px)
        scale(${scale})
    `;

    item.style.opacity = opacity;

    item.style.zIndex = Math.round(scale * 100);

    item.style.filter = `brightness(${brightness})`;

    if (depth > 0.95) {

        item.classList.add('active-card');

    } else {

        item.classList.remove('active-card');

    }

});

}

function animate() {

if (!paused) {

    rotation += 0.08;

    updateCarousel();

}

requestAnimationFrame(animate);

}

wrapper.addEventListener('mouseenter', () => {

paused = true;

});

wrapper.addEventListener('mouseleave', () => {

paused = false;

});

items.forEach(item => {

item.addEventListener('mouseenter', () => {

    item.style.zIndex = "999";

    item.style.transform += " scale(1.12)";

    item.style.filter = "brightness(1.15)";

});

item.addEventListener('mouseleave', () => {

    updateCarousel();

});

});

updateCarousel();
animate();
