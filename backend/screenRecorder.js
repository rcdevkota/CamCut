var mdeiaRecorderScreen;

//for naming the video

var dateTime = date + ',' + time;
var dateTimeNameScr =  dateTime.toString()+"Screen" ;

console.log(dateTimeNameScr);

//saves the blob streams into this array
let chunksScreen = [];

const checkboxScr = document.getElementById("checkbox");
checkboxScr.addEventListener("click", () => {
	if (document.getElementById("checkbox").checked) {
		console.log("screen recording started");
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
			console.log("screen iiiiii");
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
		console.log("screen recording stopped");

	}
})


function uploadVideo() {


	const blob = new Blob(chunksScreen, { type: 'video/webm' });

	//for posting the video to the server
	let videoFile = new File([blob], dateTimeNameScr);

	var formData = new FormData();
	formData.append("file", videoFile);

	fetch('upload', {
		method: "POST",
		body: formData
	});
	
	alert('screen recording successfully uploded to the Cloud');
	

}

function downloadVideoLocal() {
	//for downloading the video to the local repository
	const blob = new Blob(chunksScreen, { type: 'video/webm' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = dateTimeNameScr;
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 100);

	
}

async function openExpForScreen() {
	console.log("test");
	document.getElementById("popupHoldexp").style.display = "block";
	document.getElementById("uplode").addEventListener("click", () => {
		uploadVideo();
		document.getElementById("popupHoldexp").style.display = "none";
	})
	document.getElementById("donwlode").addEventListener("click", () => {
		downloadVideoLocal();
		document.getElementById("popupHoldexp").style.display = "none";
	})
	console.log("tes2");
	}


document.getElementById("closexp").addEventListener("click", () => {
		document.getElementById("popupHoldexp").style.display = "none";
	})

