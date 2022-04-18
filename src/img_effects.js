let ctx = canvas.getContext("2d"), img = new Image;
img.onload = setup;  img.crossOrigin = "";
img.src = 'resources/non_grey.png';

function setup() {
  canvas.width = this.naturalWidth;  canvas.height = this.naturalHeight;
  ctx.drawImage(this, 0, 0);
  btn.disabled = false;
  btn2.disabled = false
}

btn.onclick = function() {

  var idataSrc = ctx.getImageData(0, 0, canvas.width, canvas.height), // original
      idataTrg = ctx.createImageData(canvas.width, canvas.height),    // empty data
      dataSrc = idataSrc.data,                              // reference the data itself
      dataTrg = idataTrg.data,
      len = dataSrc.length, i = 0, luma;

  // convert by iterating over each pixel each representing RGBA
  for(; i < len; i += 4) {
    // calculate luma, here using Rec 709
    luma = dataSrc[i] * 0.2126 + dataSrc[i+1] * 0.7152 + dataSrc[i+2] * 0.0722;

    // update target's RGB using the same luma value for all channels
    dataTrg[i] = dataTrg[i+1] = dataTrg[i+2] = luma;
    dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
  }

  // put back luma data so we can save it as image
  ctx.putImageData(idataTrg, 0, 0);
  sample.src = canvas.toDataURL();

  // restore backup data
  ctx.putImageData(idataSrc, 0, 0);
};

btn2.onclick = function() {

  let idataSrc = ctx.getImageData(0, 0, canvas.width, canvas.height), // original
      idataTrg = ctx.createImageData(canvas.width, canvas.height),    // empty data
      dataSrc = idataSrc.data,                              // reference the data itself
      dataTrg = idataTrg.data,
      len = dataSrc.length, i = 0, lumaRed, lumaGreen, lumaBlue;

  // convert by iterating over each pixel each representing RGBA
  for(; i < len; i += 4) {
    // calculate luma for each color channel
    lumaRed = dataSrc[i] * 0.393 + dataSrc[i+1] * 0.769 + dataSrc[i+2] * 0.189;
    lumaGreen = dataSrc[i] * 0.349 + dataSrc[i+1] * 0.686 + dataSrc[i+2] * 0.168;
    lumaBlue = dataSrc[i] * 0.272 + dataSrc[i+1] * 0.534 + dataSrc[i+2] * 0.131;

    // set color channel values for each channel, limit to 255
    dataTrg[i] = lumaRed < 255 ? lumaRed : 255;
    dataTrg[i+1] = lumaGreen < 255 ? lumaGreen : 255;
    dataTrg[i+2] = lumaBlue < 255 ? lumaBlue : 255;
    dataTrg[i+3] = dataSrc[i+3];                            // copy alpha
  }

  // put back luma data so we can save it as image
  ctx.putImageData(idataTrg, 0, 0);
  sample.src = canvas.toDataURL();

  // restore backup data
  ctx.putImageData(idataSrc, 0, 0);
};