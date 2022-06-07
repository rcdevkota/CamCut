var videos= new Array();

function lodeVideo(name) {
	video = document.createElement('video');
	video.src=name;
	video.load();
	return video;
}

function main(){
	video= lodeVideo("resources/movie2.mp4");
	addvideo(video);
	video2= lodeVideo("resources/60fps_video.mp4");
	addvideo(video2);
	showVideos();
	
	audioRec()
	
	videoCanvas=document.getElementById('video');
	video.addEventListener('loadeddata', (event) => {
		const context = videoCanvas.getContext("2d");
		context.canvas.width  = video.videoWidth;
		context.canvas.height = video.videoHeight;
	});
}

function addvideo(video){
	videodata = {
		video: video,
		von: 0,
		bis: 1,
		topvideo: null
	}
	videos.push(videodata)
}

function showVideos(){
	if(videos==null){
		return;
	}
	var element = document.getElementById("privius");
	element.innerHTML = "";
	nr=0;
	videos.forEach ((video) => {
		showPriviu(video,nr);
		nr++;
	});
}

function swopOrder(nr,hoch){
	if(nr==0&&hoch||nr==videos.length-1&& !hoch){
		return;
	}
	temp=videos[nr];
	if(hoch){
		videos[nr]=videos[nr-1];
		videos[nr-1]=temp;
	}else{
		videos[nr]=videos[nr+1];
		videos[nr+1]=temp;
	}
	showVideos();
	reset();
}

function showPriviu(video,nr){
	
	var element = document.getElementById("privius");
	
	hold=addHtml(element,"preview_"+nr,"div");
	videos[nr].html=hold;
	
	upDown=addHtml(hold,"upDown","div");
	up=addHtml(upDown,"up","div");
	up.addEventListener("click",()=>swopOrder(nr,true))
	up.appendChild(document.createTextNode("⬆️"));

	down=addHtml(upDown,"down","div");
	down.addEventListener("click",()=>swopOrder(nr,false))
	down.appendChild(document.createTextNode("⬇️"));

	hold.classList.add("preview");
	vid=addHtml(hold,"vid","div");
	addHtml(vid,"previewvideo","video").src=video.video.src;

	cutBar=addHtml(vid,"cutBar","div");
	cutBar.addEventListener("mousemove",()=>setCut(event,video))
	addHtml(cutBar,"punktL","div").classList.add("punkt");
	addHtml(cutBar,"punktR","div").classList.add("punkt");
	drowCut(cutBar,video);
}

function drowCut(cutBar,video){
	cutBar.childNodes[0].style.marginLeft= video.von*110+"px";
	cutBar.childNodes[1].style.marginLeft= video.bis*110-video.von*110+"px";
}

function setCut(event,video){
	if(event.buttons==0){
		return;
	}
	cutBar=event.target.parentElement;

	if(event.target.id=="punktL"){
		if(video.von+event.movementX/110>0&&video.von+event.movementX/110<=video.bis){
			video.von+=event.movementX/110;
			cutBar.childNodes[0].style.marginLeft= video.von*110+"px";
			cutBar.childNodes[1].style.marginLeft= video.bis*110-video.von*110+"px";
		}
	}else if(event.target.id=="punktR"){
		if(video.bis+event.movementX/110>video.von&&video.bis+event.movementX/110<=1){
			video.bis+=event.movementX/110;
		}
		cutBar.childNodes[1].style.marginLeft= video.bis*110-video.von*110+"px";
	}

	reset();
}

function reset(){
	videosPos=0
	videos[videosPos].video.currentTime=videos[videosPos].von*videos[videosPos].video.duration;
	document.getElementById('checkbox⏯').checked=false;
}

function addHtml(parent,id,typ){
	neu=document.createElement(typ);
	parent.appendChild(neu);
	neu.id=id;
	return neu;
}

//-------------------------------

videosPos=0;
document.getElementById('checkbox⏯').addEventListener("click",()=>{
	if(document.getElementById('checkbox⏯').checked){
		videos[videosPos].video.play();
		window.requestAnimationFrame(play);
	}
})

function startnext(){
	videosPos++
	if(videosPos==videos.length){
		reset();
		return;
	}


	videos[videosPos].video.currentTime=videos[videosPos].von*videos[videosPos].video.duration;
	videos[videosPos].video.play();
	window.requestAnimationFrame(play);
}

function totelLength(){
	dauer=0;
	for(i =0;i<videos.length;i++){
		dauer+=videoRealdauer(videos[i]);
	}
	
	return dauer;
}

function zeitBis(){
	dauer=0;
	for(i = 0;i<videosPos;i++){
		dauer+=videoRealdauer(videos[i]);
	}

	return dauer;
}

function play(){
	
	if(videos[videosPos].video.currentTime>=videos[videosPos].bis*videos[videosPos].video.duration){
		videos[videosPos].video.pause();
		startnext();
		return;
	}else if(!document.getElementById('checkbox⏯').checked&&!document.getElementById('checkbox🔴').checked){

		videos[videosPos].video.pause();
		return;
	}
	setSlider(videos[videosPos].video.currentTime-videos[videosPos].von*videos[videosPos].video.duration);
	videoCanvas.width=videoCanvas.width;
	var context = videoCanvas.getContext("2d");
	context.drawImage(videos[videosPos].video, 0,0);

	
	
	window.requestAnimationFrame(play);
}



function setSlider(curent){
	document.getElementById('slider').value=(curent+zeitBis())/totelLength()*1000;
}

function videoRealdauer(videoO){
	return videoO.video.duration*(videoO.bis-videoO.von);
}

function getClip(teil){
	dauer2=0;
	r=0;

	teildauer=teil*totelLength();
	while(dauer2<teildauer){
		dauer2+=videoRealdauer(videos[r]);
		r++;
	}
	videosPos=r==0?0:r-1;

	D=zeitBis();
	C=teildauer;
	A=videos[videosPos].von*videos[videosPos].video.duration;
	videos[videosPos].video.currentTime=(C-D)+A;
}

document.getElementById('slider').addEventListener("input",()=>{
	orantFram=document.getElementById('slider').value/1000;
	getClip(orantFram)
	showFrame();
})

function showFrame(){
	var context = videoCanvas.getContext("2d");
	//videoCanvas.width=videoCanvas.width;
	context.drawImage(videos[videosPos].video, 0,0)
}


//----------------------------------------------------------------------------

document.getElementById("checkbox🔴").addEventListener("click",()=>{
	if(document.getElementById("checkbox🔴").checked){
		reset();
		videos[videosPos].video.play();
		window.requestAnimationFrame(play);
		document.getElementById("checkbox⏯").checked=false;
		document.getElementById("checkbox⏯").disabled=true;
		rec();
	}else{
		stopRecording();
	}

})

chunks= new Array();

function audioRec(){

/*
	const mediaRecorder = new MediaRecorder(videos[0].video);
    mediaRecorder.start();*/
}

function rec(){
	var context = videoCanvas.getContext("2d");
	recorder = new MediaRecorder(context.canvas.captureStream(totelLength()*1000));
	recorder.ondataavailable = saveChunks;
	recorder.onstop = exportVideo;
	recorder.start();
	setTimeout(function() {
		stopRecording();
	}, totelLength()*1000);
}

function stopRecording() {
	

    recorder.stop();
	document.getElementById("checkbox⏯").disabled=false;
	document.getElementById("checkbox🔴").checked=false;
}

function saveChunks(evt) {
	if (evt.data.size > 0) {
	  chunks.push(evt.data);
	  uploadVideo()
	}
}

function exportVideo() {
	//vid.src = URL.createObjectURL(new Blob(chunks));
}
//---------------------------------------------------


function uploadVideo() {
	const blob = new Blob(chunks, { type: 'video/mp4' });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = "dateTimeName.mp4";
	document.body.appendChild(a);
	a.click();
	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 100);
	
	
	
}

//lode----------------

document.getElementById("add").addEventListener("click",()=>{
	document.getElementById("popupHold").style.display = "block";
	showAddVideos()
})

document.getElementById("clos").addEventListener("click",()=>{
	document.getElementById("popupHold").style.display = "none";
	showAddVideos()
})

function showAddVideos(){

	console.log(videos[0].video.audioTracks)
	/*
	const path = require("files/60fps_video.mp4");



	const reader = new FileReader();
	reader.onload = function(evt) {
	  console.log(evt.target.result);
	};
	reader.readAsText("files/60fps_video.mp4");
	*/
}

//--------effecte
document.getElementById("grayscale").addEventListener("click",()=>{
	if(document.getElementById("grayscale").checked){
		document.getElementById("video").style.filter = "grayscale(100%)";
		document.getElementById("sepia").checked=false;
	}else{
		document.getElementById("video").style.filter = "";
	}
	
})

document.getElementById("sepia").addEventListener("click",()=>{


	if(document.getElementById("sepia").checked){
		document.getElementById("video").style.filter = "sepia(100%)";
		document.getElementById("grayscale").checked=false;
	}else{
		document.getElementById("video").style.filter = "";
	}

})
