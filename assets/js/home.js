const carousel = document.querySelector('.carousel-3d');
const items = document.querySelectorAll('.carousel-item');
const wrapper = document.querySelector('.carousel-3d-wrapper');

let rotation = 0;
let paused = false;
let animationId;

function updateCarousel() {

const total = items.length;

items.forEach((item, index) => {

    const angle = ((360 / total) * index) + rotation;

    const rad = angle * Math.PI / 180;

    const curveRadius = 520;

    const x = Math.sin(rad) * curveRadius;

    const depth = Math.cos(rad);

    const scale = 0.55 + ((depth + 1) / 2) * 0.55;

    const opacity = 0.20 + ((depth + 1) / 2) * 0.80;

    item.style.left = "50%";
    item.style.top = "50%";

    item.style.transform = `
        translate(-50%, -50%)
        translateX(${x}px)
        scale(${scale})
    `;

    item.style.opacity = opacity;

    item.style.zIndex = Math.round(scale * 100);

    item.style.filter = `
        brightness(${0.7 + (depth + 1) * 0.25})
    `;

});

}

function animate() {

if (!paused) {

    rotation += 0.12;

    updateCarousel();

}

animationId = requestAnimationFrame(animate);

}

wrapper.addEventListener('mouseenter', () => {

paused = true;

});

wrapper.addEventListener('mouseleave', () => {

paused = false;

});

window.addEventListener('resize', updateCarousel);

updateCarousel();
animate();
