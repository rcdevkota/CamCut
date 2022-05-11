const checkboxCam = document.getElementById("checkbox📸");
const checkboxScreen = document.getElementById("checkbox🖥");
const  videoElemWebCam = document.getElementById("videoElemWebCam");
const videoElemScreen = document.getElementById("videoElementScreen");
//json parameters for the recording of the screen 
var displayMediaOptions = {
	video: {
		cursor: "always",
	},
	audio: false,
};
checkboxCam.addEventListener("click", () => {
	if (checkboxCam.checked) {
		showWebcam();
	}else{
		let tracks = videoElemWebCam.srcObject.getTracks();
		tracks.forEach(track => track.stop());
		videoElemWebCam.srcObject = null;
	}
});

checkboxScreen.addEventListener("click", () => {
	if (checkboxScreen.checked) {
		showScreen();
	}else{
		let tracks = videoElemScreen.srcObject.getTracks();
		tracks.forEach(track => track.stop());
		videoElemScreen.srcObject = null;
	}
});
async function showWebcam() {
	try {
		videoElemWebCam.srcObject = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
	} catch (err) {
		checkboxCam.checked = false;
	}
}
async function showScreen() {
	try {
		videoElemScreen.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
	} catch (err) {
		checkboxScreen.checked = false;
	}
}