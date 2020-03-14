let canvas = document.querySelector(".canvas");
let mouseDown = 0;
let selected = document.querySelector(".selected").dataset.id;

//Adiciona event listeners para as tools da esquerda
let tools = document.getElementsByClassName("tool-box-icon");
for (let tool of tools) {
    tool.addEventListener("click",(e)=>{selectTool(e.target)})
}


document.querySelector(".main").addEventListener('wheel',function(e){
    scale(canvas,e.deltaY)
});
function scale(canvas,direction) {
    let style = window.getComputedStyle(canvas);
    if(direction < 0){
        canvas.style.height = parseInt(style.getPropertyValue("height")) + 20 + "px";
        canvas.style.width = parseInt(style.getPropertyValue("width")) + 20 + "px";
    }

    if(direction > 0){
        canvas.style.height = parseInt(style.getPropertyValue("height")) - 20 + "px";
        canvas.style.width = parseInt(style.getPropertyValue("width")) - 20 + "px";
    }
}

function createCanvas(rows,columns) {

    canvas.style.gridTemplateColumns = "1fr ".repeat(columns);
    canvas.style.gridTemplateRows = "1fr ".repeat(rows);

    for (let i = 1; i <= rows ; i++) {
        for (let j = 1; j <= columns ; j++) {
            let div = document.createElement("div");
            div.style.gridColumn = j + "/" + (j + 1);
            div.style.gridRow = i + "/" + (i+1);
            div.classList.add("pixel");
            div.setAttribute("id",i +"_" + j);


            div.style.border = "0.1px solid black";
            div.addEventListener('mouseenter',(e) => {
                if(mouseDown) {
                    paintPixel(e.target,"black");
                }
            });
            div.addEventListener('mousedown',(e) => {
                if(selected === "pencil"){
                    paintPixel(e.target,"black");7
                }

                if (selected === "fill"){
                    paintBucket(e.target,"black")
                }

            });



            canvas.appendChild(div)
        }
    }
}

window.onload = function(){
    createCanvas(10,10);

    document.onmousedown =  () => {mouseDown = 1;};

    document.onmouseup = () => {mouseDown = 0;};
};

function paintPixel(target,color){

    target.style.backgroundColor = color;
}

function getNeighboors(pixel) {
    let position = pixel.id;
    let positionsGroup = position.split("_");
    let b1 = document.getElementById(parseInt(positionsGroup[0]) + 1 + "_" + parseInt(positionsGroup[1]));
    let b2 = document.getElementById(parseInt(positionsGroup[0]) - 1  + "_" + parseInt(positionsGroup[1]))
    let b3=document.getElementById(parseInt(positionsGroup[0])  + "_" + (parseInt(positionsGroup[1]) + 1));
    let b4 = document.getElementById(parseInt(positionsGroup[0]) + "_" + (parseInt(positionsGroup[1]) - 1));


    return [b1,b2,b3,b4]





}

function paintBucket(target,color) {
    let bg = target.style.backgroundColor;

    paintPixel(target,color);

        let neighborrs = getNeighboors(target);
        for (let neighborr of neighborrs) {

            if (neighborr){
                if (bg === neighborr.style.backgroundColor){
                   paintBucket(neighborr,color)
                }
            }

        }
}

function selectTool(target) {
    document.querySelector(".selected").classList.remove("selected");
    target.classList.add("selected");


    selected = target.dataset.id;



}


