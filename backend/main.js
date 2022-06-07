document.getElementById("checkboxDark").addEventListener("click",()=>{
    document.body.classList.toggle("dark_mode");

    if(document.cookie=="dark_mode"){
        document.cookie  = null;

    }else{
        document.cookie = "dark_mode";
    }
})

if(document.cookie=="dark_mode"){
    document.body.classList.toggle("dark_mode");
    document.getElementById("checkboxDark").checked=true;
}

