/* ==========================================
   ANKANA MAGNIFIER v1.1
========================================== */

const magnifier = document.createElement("div");

magnifier.className = "ankana-magnifier";

document.body.appendChild(magnifier);

const ZOOM = 2.2;

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

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    magnifier.style.left = `${e.pageX}px`;

    magnifier.style.top = `${e.pageY}px`;

    magnifier.style.backgroundSize =
        `${rect.width * ZOOM}px ${rect.height * ZOOM}px`;

    magnifier.style.backgroundPosition =
        `-${x * ZOOM - 85}px -${y * ZOOM - 85}px`;

}
