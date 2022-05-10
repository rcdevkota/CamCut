const checkboxCam = document.getElementById("checkbox📸");
const checkboxScreen = document.getElementById("checkbox🖥");
const  videoElemWebCam = document.getElementById(" videoElemWebCam");
const videoElemScreen = document.getElementById("videoElementScreen");
//json parameters for the recording of the screen 
  var displayMediaOptions = {
      video: {
        cursor: "always",
      },
      audio: false,
    };

checkboxCam.addEventListener("click", () => {
if (document.getElementById("checkbox📸").checked) {
        console.log(" gecheckt");
    showWebcam();
    }
});
checkboxScreen.addEventListener("click", () => {
if (document.getElementById("checkbox📸").checked) {
        console.log(" gecheckt");
    showScreen();
    }
});

 async function showWebcam() {
      try {
        videoElemWebCam.srcObject = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
      } catch (err) {
        console.error("Error: " + err);
      }
 }
     async function showScreen() {
      try {
        videoElemScreen.srcObject = await navigator.mediaDevices.getDisplayMedia(
          displayMediaOptions
        );
      } catch (err) {
        console.error("Error: " + err);
      }
    }