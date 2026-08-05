/* ==========================================
   ANKANA MAGNIFIER v2.1
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

    // Coordenadas reales del cursor (para el zoom)

    const zoomX = x;
    const zoomY = y;

    // Margen para que la lupa nunca sobresalga visualmente

    const margin = HALF_LENS;

    x = Math.max(margin, Math.min(x, rect.width - margin));
    y = Math.max(margin, Math.min(y, rect.height - margin));

    // Posición de la lupa

    magnifier.style.left = `${rect.left + window.scrollX + x}px`;
    magnifier.style.top = `${rect.top + window.scrollY + y}px`;

    // Imagen ampliada

    magnifier.style.backgroundSize =
        `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;

    magnifier.style.backgroundPosition =
        `-${zoomX * ZOOM - HALF_LENS}px -${zoomY * ZOOM - HALF_LENS}px`;

}
