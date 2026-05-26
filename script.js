const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const TILE = 64;

let selected = 1;

let map = [];

for(let y=0;y<10;y++){

map[y]=[];

for(let x=0;x<15;x++){

map[y][x]=0;

}

}

canvas.onclick=(e)=>{

let x=Math.floor(e.offsetX/TILE);
let y=Math.floor(e.offsetY/TILE);

map[y][x]=selected;

};

document.addEventListener("keydown",(e)=>{

if(e.key=="1") selected=1;
if(e.key=="2") selected=2;
if(e.key=="3") selected=3;

});

function draw(){

ctx.fillStyle="#111";
ctx.fillRect(0,0,canvas.width,canvas.height);

for(let y=0;y<10;y++){

for(let x=0;x<15;x++){

ctx.strokeStyle="#333";

ctx.strokeRect(
x*TILE,
y*TILE,
TILE,
TILE
);

if(map[y][x]==1){

ctx.fillStyle="gray";

}

if(map[y][x]==2){

ctx.fillStyle="green";

}

if(map[y][x]==3){

ctx.fillStyle="red";

}

ctx.fillRect(
x*TILE,
y*TILE,
TILE,
TILE
);

}

}

requestAnimationFrame(draw);

}

draw();
