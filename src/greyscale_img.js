const canvas = document.getElementById("c1");
const ctx = canvas.getContext("2d");
const image = document.getElementById("sample_image");

image.addEventListener('load', e => {
    // Draw image with filter
    ctx.filter = "greyscale(100%)";
    ctx.drawImage(image, 400, 0, -image.width * .6, image.height * .6);
});
