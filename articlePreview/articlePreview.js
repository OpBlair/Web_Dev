'use strict';

//displaying the social media icons.
document.getElementById("share-btn").addEventListener("click", function(){
    const content = document.getElementById("active_state");
    if(content.style.display === "none"){
        content.style.display = "flex";
    }else{
        content.style.display = "none";
    }
});

//removing the social media icons.
document.getElementById("share-btn2").addEventListener("click", function(){
    const content2 = document.getElementById("active_state");
    content2.style.display = "none";
})