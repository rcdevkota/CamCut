var mediaRecorder;

//for naming the video
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + '_' + time;
var dateTimeName =   "webcam_"+dateTime.toString();
console.log(dateTimeName);


//saves the blob streams into this array
let chunks = [];
const checkboxRec = document.getElementById("checkbox🎙");
checkboxRec.addEventListener("click", () => {
	if (document.getElementById("checkbox🎙").checked) {
		console.log("webcam recording started");
		var audioStatus = document.getElementById("checkbox🔊").checked;
			console.log(audioStatus);
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
				uploadVideo();
			};
		}).catch(function(err) {
			console.log(err.name, err.message);
		});
	} else {
		mediaRecorder.stop();
		console.log("webcam recording stopped");

	}
})
function uploadVideo() {
	//for downloading the video to the local repository
	const blob = new Blob(chunks, { type: 'video/webm' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = dateTimeName;
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 100);
	
	
	
	//for posting the video to the server
	let videoFile = new File([blob],dateTimeName);
	
	var formData = new FormData();
	formData.append("file", videoFile);
	
	fetch('upload', {
		method: "POST",
		body: formData
	});
	console.log("endf");
	alert('uploded successfully');
}
