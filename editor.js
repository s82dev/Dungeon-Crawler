window.onload = () => {

    document
    .getElementById("editor")
    .onclick = () => {

        window.location.href = "editor.html";

    };

    document
    .getElementById("play")
    .onclick = () => {

        alert("Play später");

    };

    document
    .getElementById("discord")
    .onclick = () => {

        window.open("https://discord.com");

    };

};
    selected = 2;

    updateSelection("grass");

};

document.getElementById("lava").onclick = ()=>{

    selected = 3;

    updateSelection("lava");

};

function updateSelection(id){

    document
    .querySelectorAll(".tile")
    .forEach(tile=>{

        tile.classList.remove("selected");

    });

    document
    .getElementById(id)
    .classList.add("selected");

}

canvas.addEventListener("click",(e)=>{

    const x = Math.floor(e.offsetX / TILE);
    const y = Math.floor(e.offsetY / TILE);

    if(
        x >= 0 &&
        y >= 0 &&
        x < WIDTH &&
        y < HEIGHT
    ){

        map[y][x] = selected;

    }

});

canvas.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

    const x = Math.floor(e.offsetX / TILE);
    const y = Math.floor(e.offsetY / TILE);

    if(
        x >= 0 &&
        y >= 0 &&
        x < WIDTH &&
        y < HEIGHT
    ){

        map[y][x] = 0;

    }

});

document.getElementById("save").onclick = ()=>{

    localStorage.setItem(
        "dungeonMap",
        JSON.stringify(map)
    );

    alert("Map gespeichert!");

};

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for(let y = 0; y < HEIGHT; y++){

        for(let x = 0; x < WIDTH; x++){

            ctx.strokeStyle = "#333";

            ctx.strokeRect(
                x * TILE,
                y * TILE,
                TILE,
                TILE
            );

            if(map[y][x] == 1){

                ctx.fillStyle = "gray";

            }

            if(map[y][x] == 2){

                ctx.fillStyle = "green";

            }

            if(map[y][x] == 3){

                ctx.fillStyle = "red";

            }

            if(map[y][x] != 0){

                ctx.fillRect(
                    x * TILE,
                    y * TILE,
                    TILE,
                    TILE
                );

            }

        }

    }

    requestAnimationFrame(draw);

}

draw();
