const track = document.querySelector('.carousel-track');
const container = document.querySelector('.carousel-container');

let speed = 0.4;
let position = 0;
let animation;

function animateCarousel() {

    position -= speed;

    const halfWidth = track.scrollWidth / 2;

    if (Math.abs(position) >= halfWidth) {
        position = 0;
    }

    track.style.transform = `translateX(${position}px)`;

    animation = requestAnimationFrame(animateCarousel);
}

animateCarousel();


container.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animation);
});

container.addEventListener('mouseleave', () => {
    animateCarousel();
});
