var mediaRecorder;

const checkboxRec = document.getElementById("checkbox🔴");
checkboxRec.addEventListener("click",()=>{
	if(document.getElementById("checkbox🔴").checked){
		console.log("an");
		constrainObj = {
			audio: document.getElementById("checkbox🎙").checked,
			video: {
				width: { min: 640, ideal: 1280, max: 1920 },
				height: { min: 480, ideal: 720, max: 1080 },
			},
		};

		navigator.mediaDevices.getUserMedia(constrainObj).then(function (mediaStreamObj) {
			//connect the media stream to the first video element
			mediaRecorder = new MediaRecorder(mediaStreamObj);
			let chunks = [];
			mediaRecorder = new MediaRecorder(mediaStreamObj);
			mediaRecorder.start();
			mediaRecorder.ondataavailable = function (ev) {
				chunks.push(ev.data);
			};
			mediaRecorder.onstop = (ev) => {
				let blob = new Blob(chunks, { type: "video/mp4;"});
				//clears out the chunks of array so that next time we record the array is empty and clearing out to save memory
				chunks = [];
				let videoUrl = window.URL.createObjectURL(blob);
			};
		}).catch(function (err) {
			console.log(err.name, err.message);
		});
	}else{
		mediaRecorder.stop();
		console.log("aus");
	}
})