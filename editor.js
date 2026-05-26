const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const TILE = 48;

const WIDTH = 50;
const HEIGHT = 30;

let selectedTool = "wall";

let selectedObject = null;

const objects = {

wall:{
color:"#777",
solid:true,
hurt:false,
passthrough:false,
loot:false,
mob:false
},

lava:{
color:"red",
solid:false,
hurt:true,
passthrough:false,
loot:false,
mob:false
},

chest:{
color:"gold",
solid:false,
hurt:false,
passthrough:false,
loot:true,
mob:false
},

door:{
color:"brown",
solid:true,
hurt:false,
passthrough:false,
loot:false,
mob:false
},

spawner:{
color:"purple",
solid:false,
hurt:false,
passthrough:true,
loot:false,
mob:true
}

};

let map = [];

for(let y=0;y<HEIGHT;y++){

map[y]=[];

for(let x=0;x<WIDTH;x++){

map[y][x]=null;

}

}

document.querySelectorAll(".tool").forEach(tool=>{

tool.onclick=()=>{

document
.querySelectorAll(".tool")
.forEach(t=>t.classList.remove("selectedTool"));

tool.classList.add("selectedTool");

selectedTool = tool.dataset.tool;

};

});

canvas.addEventListener("click",(e)=>{

const x = Math.floor(e.offsetX / TILE);
const y = Math.floor(e.offsetY / TILE);

if(x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return;

map[y][x] = JSON.parse(
JSON.stringify(objects[selectedTool])
);

map[y][x].type = selectedTool;

selectedObject = map[y][x];

updateProperties();

});

canvas.addEventListener("contextmenu",(e)=>{

e.preventDefault();

const x = Math.floor(e.offsetX / TILE);
const y = Math.floor(e.offsetY / TILE);

if(x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return;

map[y][x] = null;

});

function updateProperties(){

if(!selectedObject) return;

document.getElementById("selectedName")
.innerText = selectedObject.type;

document.getElementById("solid")
.checked = selectedObject.solid;

document.getElementById("hurt")
.checked = selectedObject.hurt;

document.getElementById("passthrough")
.checked = selectedObject.passthrough;

document.getElementById("loot")
.checked = selectedObject.loot;

document.getElementById("mob")
.checked = selectedObject.mob;

}

document.getElementById("solid")
.onchange = (e)=>{

if(selectedObject)
selectedObject.solid = e.target.checked;

};

document.getElementById("hurt")
.onchange = (e)=>{

if(selectedObject)
selectedObject.hurt = e.target.checked;

};

document.getElementById("passthrough")
.onchange = (e)=>{

if(selectedObject)
selectedObject.passthrough = e.target.checked;

};

document.getElementById("loot")
.onchange = (e)=>{

if(selectedObject)
selectedObject.loot = e.target.checked;

};

document.getElementById("mob")
.onchange = (e)=>{

if(selectedObject)
selectedObject.mob = e.target.checked;

};

document.getElementById("export")
.onclick = ()=>{

const data = JSON.stringify(map);

const blob = new Blob([data],{
type:"application/json"
});

const a = document.createElement("a");

a.href = URL.createObjectURL(blob);

a.download = "dungeon.json";

a.click();

};

document.getElementById("import")
.onclick = ()=>{

document.getElementById("fileInput").click();

};

document.getElementById("fileInput")
.onchange = (e)=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = ()=>{

map = JSON.parse(reader.result);

};

reader.readAsText(file);

};

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

for(let y=0;y<HEIGHT;y++){

for(let x=0;x<WIDTH;x++){

ctx.strokeStyle="#333";

ctx.strokeRect(
x*TILE,
y*TILE,
TILE,
TILE
);

const tile = map[y][x];

if(tile){

ctx.fillStyle = tile.color;

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
