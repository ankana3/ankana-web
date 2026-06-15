const carousel = document.querySelector('.carousel-3d');
const items = document.querySelectorAll('.carousel-item');
const wrapper = document.querySelector('.carousel-3d-wrapper');

const totalItems = items.length;

let angle = 0;
let radius = 520;
let animationId;
let isPaused = false;

function updateCarousel() {

items.forEach((item, index) => {

    const itemAngle = ((360 / totalItems) * index) + angle;

    const radians = itemAngle * (Math.PI / 180);

    const z = Math.cos(radians) * radius;
    const x = Math.sin(radians) * radius;

    const scale = ((z + radius) / (radius * 2)) * 0.55 + 0.45;

    const opacity = ((z + radius) / (radius * 2)) * 0.75 + 0.25;

    item.style.transform = `
        translateX(${x}px)
        translateZ(${z}px)
        scale(${scale})
    `;

    item.style.opacity = opacity;
    item.style.zIndex = Math.round(z);

    if (z > radius * 0.75) {

        item.classList.add('front-item');

    } else {

        item.classList.remove('front-item');

    }

});

}

function animate() {

if (!isPaused) {

    angle += 0.12;

    updateCarousel();

}

animationId = requestAnimationFrame(animate);

}

updateCarousel();
animate();

wrapper.addEventListener('mouseenter', () => {

isPaused = true;

});

wrapper.addEventListener('mouseleave', () => {

isPaused = false;

});

window.addEventListener('resize', () => {

if (window.innerWidth < 768) {

    radius = 320;

} else if (window.innerWidth < 1200) {

    radius = 420;

} else {

    radius = 520;

}

updateCarousel();

});

if (window.innerWidth < 768) {

radius = 320;

} else if (window.innerWidth < 1200) {

radius = 420;

}

updateCarousel();
