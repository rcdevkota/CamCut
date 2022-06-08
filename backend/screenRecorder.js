var mdeiaRecorderScreen;

//for naming the video

var dateTime = date + ',' + time;
var dateTimeNameScr =  dateTime.toString()+"Screen" ;

console.log(dateTimeNameScr);

//saves the blob streams into this array
let chunksScreen = [];



function uploadVideo() {
	if(document.getElementById("checkbox🖥").checked){

	const blob = new Blob(chunksScreen, { type: 'video/webm' });
	chunksScreen = [];
	//for posting the video to the server
	let videoFile = new File([blob], dateTimeNameScr);

	var formData = new FormData();
	formData.append("file", videoFile);

	fetch('upload', {
		method: "POST",
		body: formData
	});
}
}

function downloadVideoLocal() {
	if(document.getElementById("checkbox🖥").checked){
	//for downloading the video to the local repository
	const blob = new Blob(chunksScreen, { type: 'video/webm' });
	chunksScreen = [];
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
}

async function openExpForScreen() {
	document.getElementById("popupHoldexp").style.display = "block";
}

document.getElementById("uplode").addEventListener("click", () => {
	uploadVideo();
	document.getElementById("popupHoldexp").style.display = "none";
})
document.getElementById("donwlode").addEventListener("click", () => {
	downloadVideoLocal();
	document.getElementById("popupHoldexp").style.display = "none";
})


document.getElementById("closexp").addEventListener("click", () => {
		document.getElementById("popupHoldexp").style.display = "none";
	})

