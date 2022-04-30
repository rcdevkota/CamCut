

var video = document.querySelector("#videoElement");

var cam=false;
document.getElementById("camButton").addEventListener("click", function() {
    const element = document.getElementById("camButton");


if (navigator.mediaDevices.getUserMedia) {       
    cam= !cam
    if(cam){
        document.getElementById("camButton").style.backgroundColor = "green";
    navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream) {video.srcObject = stream;})
    .catch(function(err0r) {console.log("Something went wrong!");});
    }else{
        video.srcObject = null;
        document.getElementById("camButton").style.backgroundColor = null;
    }
}
});


//Put event listeners into place
window.addEventListener("DOMContentLoaded", function() {
    // Grab elements, create settings, etc.
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function(error) {
            console.log("Video capture error: ", error.code); 
        };

    // Put video listeners into place
    if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
    else if(navigator.mozGetUserMedia) { // Firefox-prefixed
        navigator.mozGetUserMedia(videoObj, function(stream){
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
}, false);