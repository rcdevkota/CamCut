var mediaRecorder;

//for naming the video
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + '_' + time;
var dateTimeNameWeb = dateTime.toString() +"webcam";


//saves the blob streams into this array
let chunks = [];
const checkboxRec = document.getElementById("checkbox🔴");
checkboxRec.addEventListener("click", () => {
	if(document.getElementById("checkbox📸").checked){
		cam();
	}
	if(document.getElementById("checkbox🖥").checked){
		screen()
	}
})


function screen(){
	if (checkboxRec.checked) {
		var audioStatus = document.getElementById("checkbox🔊").checked;
		console.log("audioRecording status " + audioStatus);
		constrainObj = {
			video: {
				mediaSource: "screen",
			},
			audio: true,
		};

		navigator.mediaDevices.getDisplayMedia(constrainObj).then(function(mediaStreamObj) {
			//connect the media stream to the first video element
			mdeiaRecorderScreen = new MediaRecorder(mediaStreamObj);
			mdeiaRecorderScreen.start();
			mdeiaRecorderScreen.ondataavailable = function(ev) {
				chunksScreen.push(ev.data);
			};
			mdeiaRecorderScreen.onstop = (ev) => {
				mdeiaRecorderScreen.stop();
				mediaStreamObj.getTracks()
					.forEach(track => track.stop())
				openExpForScreen();
			};
		}).catch(function(err) {
			console.log(err.name, err.message);
		});
	} else {
		mdeiaRecorderScreen.stop();
	}
}



function cam(){
	if (checkboxRec.checked) {
		console.log("webcam recording started");
		var audioStatus = document.getElementById("checkbox🎙").checked;
		constrainObj = {

			audio: audioStatus,
			video: {
				width: { min: 640, ideal: 1280, max: 1920 },
				height: { min: 480, ideal: 720, max: 1080 },
			},
		};

		navigator.mediaDevices.getUserMedia(constrainObj).then(function(mediaStreamObj) {
			//connect the media stream to the first video element
			mediaRecorder = new MediaRecorder(mediaStreamObj);

			mediaRecorder.start();
			mediaRecorder.ondataavailable = function(ev) {
				chunks.push(ev.data);
			};
			mediaRecorder.onstop = (ev) => {
				mediaRecorder.stop();
				mediaStreamObj.getTracks()
					.forEach(track => track.stop())
				openExpForWeb();
				
			};
		}).catch(function(err) {
			console.log(err.name, err.message);
		});
	} else {
		mediaRecorder.stop();
	}
}



function uploadWebcamVideo() {
	if(document.getElementById("checkbox📸").checked){
	const blob = new Blob(chunks, { type: 'video/webm' });
	chunks = [];
	//for posting the video to the server
	let videoFile = new File([blob], dateTimeNameWeb);

	var formData = new FormData();
	formData.append("file", videoFile);

	fetch('upload', {
		method: "POST",
		body: formData
	});
}
}

function downloadWebcamVideo() {
	if(document.getElementById("checkbox📸").checked){
	//for downloading the video to the local repository
	const blob = new Blob(chunks, { type: 'video/webm' });
	chunks = [];
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = dateTimeNameWeb;
	document.body.appendChild(a);
	a.click();


	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 100);
}
}

async function openExpForWeb() {
	document.getElementById("popupHoldexp").style.display = "block";
}

document.getElementById("uplode").addEventListener("click", () => {
	uploadWebcamVideo();
	document.getElementById("popupHoldexp").style.display = "none";
})
document.getElementById("donwlode").addEventListener("click", () => {
	downloadWebcamVideo();
	document.getElementById("popupHoldexp").style.display = "none";
})
document.getElementById("closexp").addEventListener("click", () => {
	document.getElementById("popupHoldexp").style.display = "none";
})

