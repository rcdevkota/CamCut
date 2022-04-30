const start = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia(
        {
            video:{
                mediaSource:"screen",

            },
        }
    );

    const data=[];
const mdeisRecorder= new MediaRecorder(stream);
MediaRecorder.ondataavailable=(e)=>{
    data.push(e.data);
}
MediaRecorder.start();
MediaRecorder.onstop=(e)=>{
   document.querySelector("video").src = URL.createObjectURL(

new Blob(data,{
    type:data[0].type,
})


   );
};
};
