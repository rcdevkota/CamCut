var ctx = c.getContext("2d"), img = new Image;
img.onload = setup;  img.crossOrigin = "";
img.src = "http://i.imgur.com/OrYVGI8.jpg";

function setup() {
  c.width = this.naturalWidth;  c.height = this.naturalHeight;
  ctx.drawImage(this, 0, 0);    btn.disabled = false
}

btn.onclick = function() {
  
  var idataSrc = ctx.getImageData(0, 0, c.width, c.height), // original
      idataTrg = ctx.createImageData(c.width, c.height),    // empty data
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
  demo.src = c.toDataURL();
  
  // restore backup data
  ctx.putImageData(idataSrc, 0, 0);
};