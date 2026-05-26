const editorBtn = document.getElementById("editor");

const playBtn = document.getElementById("play");

const discordBtn = document.getElementById("discord");

editorBtn.addEventListener("click",()=>{

    window.location.href = "editor.html";

});

playBtn.addEventListener("click",()=>{

    alert("Play später");

});

discordBtn.addEventListener("click",()=>{

    window.open("https://discord.com");

});
