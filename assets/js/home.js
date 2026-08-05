const carousel = document.querySelector('.carousel-3d');
const items = document.querySelectorAll('.carousel-item');
const wrapper = document.querySelector('.carousel-3d-wrapper');

let rotation = 0;
let paused = false;

function updateCarousel() {

    const total = items.length;

    items.forEach((item, index) => {

        const angle = ((360 / total) * index) + rotation - 10;

        const rad = angle * Math.PI / 180;

        const radius = 420;

        const x = Math.sin(rad) * radius;

        const depth = Math.cos(rad);

        // Curva de profundidad
        const focus = Math.pow((depth + 1) / 2, 2.8);

        const scale = 0.78 + (focus * 0.42);

        const opacity = 0.10 + (focus * 0.90);

        const brightness = 0.60 + (focus * 0.40);

        const blur = (1 - focus) * 3;

        const rotate = -x * 0.11;

        item.style.left = "50%";
        item.style.top = "50%";

        item.style.transform = `
            translate(-50%, -50%)
            translateX(${x}px)
            rotateY(${rotate}deg)
            scale(${scale})
        `;

        item.style.opacity = opacity;

        item.style.zIndex = Math.round(focus * 1000);

        item.style.filter = `
            brightness(${brightness})
            blur(${blur}px)
        `;

        if (focus > 0.90) {

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

        if (!item.classList.contains('active-card')) return;

        item.style.zIndex = "9999";

        item.style.transform += " scale(1.12)";

    });

    item.addEventListener('mouseleave', () => {

        updateCarousel();

    });

});

updateCarousel();
animate();
