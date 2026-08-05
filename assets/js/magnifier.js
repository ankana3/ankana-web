/* ==========================================
   ANKANA MAGNIFIER v2.0
========================================== */

const magnifier = document.createElement("div");

magnifier.className = "ankana-magnifier";

document.body.appendChild(magnifier);

const ZOOM = 2.2;

const LENS_SIZE = 170;
const HALF_LENS = LENS_SIZE / 2;

let activeImage = null;

function activateMagnifier(img){

    activeImage = img;

    magnifier.style.backgroundImage = `url(${img.src})`;

    magnifier.classList.add("visible");

    document.body.classList.add("magnifier-active");

}

function deactivateMagnifier(){

    activeImage = null;

    magnifier.classList.remove("visible");

    document.body.classList.remove("magnifier-active");

}

function moveMagnifier(e){

    if(!activeImage) return;

    const rect = activeImage.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Limita la lupa para que nunca salga de la fotografía

    x = Math.max(HALF_LENS / ZOOM, Math.min(x, rect.width - HALF_LENS / ZOOM));
    y = Math.max(HALF_LENS / ZOOM, Math.min(y, rect.height - HALF_LENS / ZOOM));

    // Posición de la lupa

    magnifier.style.left = `${rect.left + window.scrollX + x}px`;
    magnifier.style.top = `${rect.top + window.scrollY + y}px`;

    // Tamaño del fondo

    magnifier.style.backgroundSize =
        `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;

    // Desplazamiento del fondo

    magnifier.style.backgroundPosition =
        `-${x * ZOOM - HALF_LENS}px -${y * ZOOM - HALF_LENS}px`;

}
