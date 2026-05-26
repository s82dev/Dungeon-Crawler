const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const TILE = 64;

const WIDTH = 30;
const HEIGHT = 20;

let selected = 1;

let map = [];

// MAP ERSTELLEN

for(let y = 0; y < HEIGHT; y++){

    map[y] = [];

    for(let x = 0; x < WIDTH; x++){

        map[y][x] = 0;

    }

}

// TILE BUTTONS

document.getElementById("stone").onclick = ()=>{

    selected = 1;

    selectTile("stone");

};

document.getElementById("grass").onclick = ()=>{

    selected = 2;

    selectTile("grass");

};

document.getElementById("lava").onclick = ()=>{

    selected = 3;

    selectTile("lava");

};

// AUSWAHL ANZEIGE

function selectTile(id){

    document
    .querySelectorAll(".tile")
    .forEach(tile=>{

        tile.classList.remove("selected");

    });

    document
    .getElementById(id)
    .classList.add("selected");

}

// TILE SETZEN

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

// TILE LÖSCHEN

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

// MAP SPEICHERN

document.getElementById("save").onclick = ()=>{

    localStorage.setItem(
        "dungeonMap",
        JSON.stringify(map)
    );

    alert("Map gespeichert!");

};

// ZEICHNEN

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for(let y = 0; y < HEIGHT; y++){

        for(let x = 0; x < WIDTH; x++){

            // GRID

            ctx.strokeStyle = "#333";

            ctx.strokeRect(
                x * TILE,
                y * TILE,
                TILE,
                TILE
            );

            // STONE

            if(map[y][x] == 1){

                ctx.fillStyle = "gray";

            }

            // GRASS

            if(map[y][x] == 2){

                ctx.fillStyle = "green";

            }

            // LAVA

            if(map[y][x] == 3){

                ctx.fillStyle = "red";

            }

            // TILE ZEICHNEN

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
    selected = 2;

    selectTile("grass");

};

document.getElementById("lava").onclick = ()=>{

    selected = 3;

    selectTile("lava");

};

function selectTile(id){

    document
    .querySelectorAll(".tile")
    .forEach(t=>{

        t.classList.remove("selected");

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

    for(let y=0;y<HEIGHT;y++){

        for(let x=0;x<WIDTH;x++){

            ctx.strokeStyle = "#333";

            ctx.strokeRect(
                x*TILE,
                y*TILE,
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
                    x*TILE,
                    y*TILE,
                    TILE,
                    TILE
                );

            }

        }

    }

    requestAnimationFrame(draw);

}

draw();
