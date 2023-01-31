let colorSelection = "#963A2F"; // Default color is red
const colorPicker = document.getElementById("color-picker");
const hex = document.getElementById("hex"); // HEX text in color picker

// Gets color from color picker
colorPicker.addEventListener("input", function(){
    colorSelection = colorPicker.value;
  /*  hex.innerHTML = colorPicker.value; */
    console.log(colorPicker.value);
    }, false);

const buttons = document.querySelectorAll(".button");


buttons.forEach(button => {
    button.addEventListener("click", function(){
        activateButton(button.id);
    })
});

const gridSlider = document.getElementById("grid-slider");
const grid = document.getElementById("grid");
let isGridHidden = true;

let numOfSquares = 100;

let squares = document.querySelectorAll(".square");





function populateGrid(){
    for (let i = 0; i < numOfSquares; i++){
        let square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        grid.appendChild(square);
    }

    let squares = document.querySelectorAll(".square");

    if (isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.borderStyle = "none";
                squares[i].style.zIndex = "0";
            };
    }
    if (!isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.borderStyle = "dashed";
                squares[i].style.zIndex = "1";
            };
    }
}


populateGrid();



let mouseDown = false;



function assignEventListeners(){
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < numOfSquares; i++){
        squares[i].addEventListener("mousedown", function(){
            mouseDown = true;
            console.log("mousedown");
        });
        squares[i].addEventListener("mouseover", paint(i));
        squares[i].addEventListener("mousedown", paint(i));
    }
}


assignEventListeners();


document.addEventListener("mouseup", function(){
    mouseDown = false;
    console.log("mouseup");
});    

// Changes square colors when you drag mouse over them
function paint(i){
    let squares = document.querySelectorAll(".square");
    return function(){
        if (mouseDown && !isGridHidden && !isEraserSelected){
            squares[i].style.backgroundColor = colorSelection;
        } else if (mouseDown && isEraserSelected) {
            squares[i].style.backgroundColor = "transparent"; // eraser tools erases squares
            squares[i].style.zIndex = "0";
        }
    }
};

function clearGrid(){
    squares.forEach(square => square.remove());
}
 

gridSlider.addEventListener("input", function(){
    numOfSquares = Math.pow(Math.round(Math.sqrt(gridSlider.value)), 2); // returns slider value squared
    clearGrid();
    repopulateGrid();
    getNumberOfSquares();
});


function getNumberOfSquares(){
    const squareCount = document.getElementById("square-count")
    squareCount.innerHTML = `${Math.sqrt(numOfSquares)} &#215 ${Math.sqrt(numOfSquares)}`;
}

getNumberOfSquares();

function repopulateGrid(){

    for (let i = 0; i < numOfSquares; i++){
        const square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        grid.appendChild(square);
    }

    let squares = document.querySelectorAll(".square");

    if (isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
            squares[i].style.borderStyle = "none";
            squares[i].style.zIndex = "0"};
        }
    if (!isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
            squares[i].style.borderStyle = "dashed";
            squares[i].style.zIndex = "1"};
        }
    
    assignEventListeners();
}

const gridButton = document.getElementById("grid-button");
gridButton.addEventListener("click", toggleGrid);

function toggleGrid(){
    let squares = document.querySelectorAll(".square");
    if (isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.zIndex = "1";
                squares[i].style.borderStyle = "dashed"};
        console.log("show grid");
        
    } else {
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.zIndex = "0";
                squares[i].style.borderStyle = "none"};
        console.log("hide grid");
      
    }; 
    
    isGridHidden = !isGridHidden;
}
    
//window.onload = function() {
  //  const canvas = document.getElementById("mona-lisa-canvas");
    //const ctx = canvas.getContext("2d");
    //const img = document.getElementById("mona-lisa");
    //ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
//}

const monaLisaContainer = document.getElementById("mona-lisa-container");


let isPenSelected = true;
const penButton = document.getElementById("pen-button");
let isBlowtorchSelected = false;
const blowtorchButton = document.getElementById("blowtorch-button");
let isSplatterSelected = false;
const splatterButton = document.getElementById("splatter-button");
let isGridSelected = false;
const gridButtonWrapper = document.getElementById("grid-button-wrapper");
let isEraserSelected = false;
const eraserButton = document.getElementById("eraser-button");




function activateButton(buttonSelection){
    if ((buttonSelection == "blowtorch-button") && !isBlowtorchSelected){
        deactivateSplatter();
        deactivateGrid();
        deactivateEraser();
        deactivatePen();
        activateBlowtorch();
        isBlowtorchSelected = true;
        isSplatterSelected = false;
        isGridSelected = false;
        isEraserSelected = false;
        isPenSelected = false;
    } else if ((buttonSelection == "blowtorch-button") && (isBlowtorchSelected)){
        deactivateBlowtorch();
        isBlowtorchSelected = false;
    } else if ((buttonSelection == "splatter-button") && !isSplatterSelected){
        deactivateBlowtorch();
        deactivateGrid();
        deactivateEraser();
        deactivatePen();
        activateSplatter();
        isSplatterSelected = true;
        isBlowtorchSelected = false;
        isGridSelected = false;
        isEraserSelected = false;
        isPenSelected = false;
    } else if ((buttonSelection == "splatter-button") && (isSplatterSelected)){
        deactivateSplatter();
        isSplatterSelected = false;
    } else if ((buttonSelection == "grid-button-wrapper") && !isGridSelected){
        deactivateBlowtorch();
        deactivateSplatter();
        deactivateEraser();
        deactivatePen();
        activateGrid();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = true;
        isEraserSelected = false;
        isPenSelected = false;
    } else if ((buttonSelection == "grid-button-wrapper") && (isGridSelected)){
        deactivateGrid();
        isGridSelected = false;
    } else if ((buttonSelection == "eraser-button") && !isEraserSelected){
        deactivateGrid();
        deactivateBlowtorch();
        deactivateSplatter();
        deactivatePen();
        activateEraser();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = false;
        isEraserSelected = true;
        isPenSelected = false;
    } else if ((buttonSelection == "eraser-button") && (isEraserSelected)){
        deactivateEraser();
        isEraserSelected = false;
    } else if ((buttonSelection == "pen-button") && !isPenSelected){
        deactivateGrid();
        deactivateBlowtorch();
        deactivateSplatter();
        deactivateEraser();
        activatePen();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = false;
        isEraserSelected = false;
        isPenSelected = true;
    } else if ((buttonSelection == "pen-button") && (isPenSelected)){
        deactivatePen();
        isPenSelected = false;
    }
}


function activateBlowtorch(){
    blowtorchButton.classList.remove("unselected");
    blowtorchButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/blowtorch-cursor.png"), auto`);
}

function deactivateBlowtorch(){
    blowtorchButton.classList.remove("selected");
    blowtorchButton.classList.add("unselected");
}

function activateSplatter(){
    splatterButton.classList.remove("unselected");
    splatterButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/blowtorch-cursor.png"), auto`);
}

function deactivateSplatter(){
    splatterButton.classList.remove("selected");
    splatterButton.classList.add("unselected");
}

function activateSplatter(){
    splatterButton.classList.remove("unselected");
    splatterButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/blowtorch-cursor.png"), auto`);
}

function deactivateSplatter(){
    splatterButton.classList.remove("selected");
    splatterButton.classList.add("unselected");
}

function activateGrid(){
    gridButtonWrapper.classList.remove("unselected");
    gridButtonWrapper.classList.add("selected");
}

function deactivateGrid(){
    gridButtonWrapper.classList.remove("selected");
    gridButtonWrapper.classList.add("unselected");
    if (!isGridHidden){
        toggleGrid();
        isGridHidden = true;
    }
}

function activateEraser(){
    eraserButton.classList.remove("unselected");
    eraserButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/eraser-cursor.png") 40 110, auto`);
    findColoredSquares(); // finds which squares are colored and changes their z-index to make them erasable
    eraserWidthText.style.display = "block";
    widthSlider.style.display = "block";
    /*resetCanvas();*/
}

function deactivateEraser(){
    eraserButton.classList.remove("selected");
    eraserButton.classList.add("unselected");
    context.globalCompositeOperation = 'source-over';
    monaLisaContainer.style.setProperty("--cursor", "auto");
    eraserWidthText.style.display = "none";
    widthSlider.style.display = "none";
}

function activatePen(){
    penButton.classList.remove("unselected");
    penButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/pen-cursor.png") 40 110, auto`);
    penWidthText.style.display = "block";
    widthSlider.style.display = "block";
    /*resetCanvas();*/
}

function deactivatePen(){
    penButton.classList.remove("selected");
    penButton.classList.add("unselected");
    monaLisaContainer.style.setProperty("--cursor", "auto");
    penWidthText.style.display = "none";
    widthSlider.style.display = "none";
}

//records where user clicks on Mona Lisa with blowtorch cursor
monaLisaContainer.onclick = function (e){ // e is a mouse click event
    if (isBlowtorchSelected){
    const dimensions = e.currentTarget.getBoundingClientRect(); // gets size of Mona Lisa
    console.log(dimensions);
    console.log(e.clientY);
    const left = e.clientX - dimensions.left; // x position within element
    const right = dimensions.width - left;
    const top = e.clientY - dimensions.top; // y position within element
    const bottom = dimensions.height - top;
    console.log(left, right, top, bottom);

    if (e.clientX > dimensions.left && e.clientX < dimensions.right // Checks if user clicks within Mona Lisa
        && e.clientY > (dimensions.top - 15) && e.clientY < (dimensions.bottom - 15)){
            monaLisaContainer.style.setProperty("--left", `${left}px`);
            monaLisaContainer.style.setProperty("--right", `${right}px`);
            monaLisaContainer.style.setProperty("--top", `${top}px`);
            monaLisaContainer.style.setProperty("--bottom", `${bottom}px`);
            const div = document.createElement("div");
            div.className = "circle";
            monaLisaContainer.appendChild(div);
    }
}};



const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var monaLisaSize = monaLisaContainer.getBoundingClientRect();

console.log(monaLisaSize);

/*canvas.style.left = monaLisaSize.left+"px";
canvas.style.top = monaLisaSize.top+"px";*/

canvas.width = monaLisaSize.width;
canvas.height = monaLisaSize.height;
canvas.style.left = monaLisaSize.left+"px";
canvas.style.top = monaLisaSize.top+"px";

//fixes canvas position bug by delaying getBoundingClientRect() until page has loaded
window.onload = function(){
    const canvas = document.getElementById("canvas");
    monaLisaSize = monaLisaContainer.getBoundingClientRect();
    canvas.width = monaLisaSize.width;
    canvas.height = monaLisaSize.height;
    canvas.style.left = monaLisaSize.left+"px";
    canvas.style.top = monaLisaSize.top+"px";
}

    

window.onresize = function(){
    const canvas = document.getElementById("canvas");
    monaLisaSize = monaLisaContainer.getBoundingClientRect();
    canvas.width = monaLisaSize.width;
    canvas.height = monaLisaSize.height;
    canvas.style.left = monaLisaSize.left+"px";
    canvas.style.top = monaLisaSize.top+"px";
}

// PEN:

let linewidth = 3; //default line width for pen and eraser

const widthSlider = document.getElementById("width-slider");
const penWidthText = document.getElementById("pen-width-text")
const eraserWidthText = document.getElementById("eraser-width-text")



widthSlider.oninput = function(){
    linewidth = widthSlider.value;
    penWidthText.innerHTML = `${linewidth}px`;
    eraserWidthText.innerHTML = `${linewidth}px`;
    if (isPenSelected){
        penWidthText.style.display = "block";
    } else if (isEraserSelected){
        eraserWidthText.style.display = "block";
    }
}

//Onload listener because pen is default tool selection
window.onload = function(){
    widthSlider.style.display = "block"
    penWidthText.style.display = "block";
    linewidth = widthSlider.value;
    penWidthText.innerHTML = `${linewidth}px`;
    eraserWidthText.innerHTML = `${linewidth}px`; //Preloads eraser text in case it's selected before width is changed
}



//const changeWidth = value => context.lineWidth = value;

let isDrawing = false;

const startDrawing = (e) => {
    if (isPenSelected || isEraserSelected){
        isDrawing = true;
        context.beginPath();
        context.lineWidth = linewidth;
        context.moveTo(e.clientX - monaLisaSize.left, e.clientY - monaLisaSize.top);
    }
}

const stopDrawing = () => {
    isDrawing = false;
}

const draw = (e) => {
    if (!isDrawing) return; // end function if not drawing
    context.lineTo(e.clientX - monaLisaSize.left, e.clientY - monaLisaSize.top);
    context.stroke();
}




const enterCanvas = (e) => {
    context.beginPath();
}

window.addEventListener("mousedown", startDrawing);
window.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseover", enterCanvas);


//PAINT SPLATTER:

var particles = [];

// Creates new particles on user click
canvas.onmousedown = function(e){
    if (isSplatterSelected){
        for (var i = 0; i < 50 * 2; i++){
            particles.push({
                x: e.clientX - monaLisaSize.left,
                y: e.clientY - monaLisaSize.top,
                angle: i * 5,
                size: 5 + Math.random() * 4,
                life: 300 + Math.random() * 100
            });
        }
    }
}


var delta = 0;
var last = Date.now();

function animate(){
    delta = Date.now() - last; // Calculates the time elapsed since the last frame
    last = Date.now();
    for (var i = 0; i < particles.length; i++){ //updates the particle's location, size, life
            var p = particles[i];
            p.x += Math.cos(p.angle) * 4 + Math.random() * 4 - Math.random() * 2;
            p.y += Math.sin(p.angle) * 4 + Math.random() * 4 - Math.random() * 2;
            p.life -= delta;
            p.size -= delta / 75;
        
    if (p.size <= 0){ // filter out non-existent particles
            p.life = 0;
        }
        
    if (p.life <= 0){
            particles.splice(i--, 1);
            continue;
        }
    }
}

// Draws the particles on the canvas
function render() {
    context.fillStyle = colorSelection;
    for (var i = 0; i < particles.length; i++){
        var p = particles[i];
        context.beginPath();
        context.ellipse(p.x, p.y, p.size, Math.random(p.size) * 7, 0, Math.PI * 2, false);
        context.fill();
    }
}

// Tells browser you want to perform an animation and to update before the next repaint
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function animloop(){
    requestAnimFrame(animloop);
    animate();
    render();
};

animloop();


//ERASER:

function findColoredSquares(){
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < numOfSquares; i++){
        const compStyle = window.getComputedStyle(squares[i]).backgroundColor;
        if (compStyle != "rgba(0, 0, 0, 0)"){
            squares[i].style.zIndex = "1";
        }
    }
}

/*function assignEventListeners(){
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < numOfSquares; i++){
        squares[i].addEventListener("mousedown", function(){
            mouseDown = true;
            console.log("mousedown");
        });
        squares[i].addEventListener("mouseover", paint(i));
        squares[i].addEventListener("mousedown", paint(i));
    }
}
*/





function erase(){
    
    context.globalCompositeOperation = "destination-out";

    //setInterval(toggleGrid, 1);
}

monaLisaContainer.onmousedown = function clickEvent(e){ // e is a mouse click event
    if (isEraserSelected){
        erase();
        
}
}



//RESET CANVAS:

const resetCanvas = () => context.clearRect(0, 0, canvas.width, canvas.height);



/*
const particles = [];

// Creates new particles on user click
canvas.onmousedown = function(e){
    for (let i = 0; i < 36 * 2; i++){
        particles.push({
            x: e.clientX,
            y: e.clientY,
            angle: i * 5,
            size: 5 + Math.random() * 3,
            life: 200 + Math.random() * 50
        });
    }
}

let delta = 0;
const last = Date.now();

function animate(){
    delta = Date.now() - last; // calculates the time elapsed since the last frame
    for (var i = 0; i < particles.length; i++){ //updates the particle's location, size, life
        const particle = particles[i];
        particle.x += Math.cos(particle.angle) * 4 + Math.random() * 2 - Math.random() * 2;
        particle.y += Math.sin(particle.angle) * 4 + Math.random() * 2 - Math.random() * 2;
        particle.life -= delta;
        particle.size -= delta / 50;

// Checks the life and size of each particle and removes ones with zero or negative values//
        if (particle.size <= 0){
            particle.life = 0;
        }
        if (particle.life <= 0){
            particles.splice(i--, 1);
            continue;
        }
    }
}

// Draws the particles on the canvas
function render(){
    ctx.fillStyle = colorSelection;
    for (let i = 0; i < particles.length; i++){
        if (Math.random() < 0.1)
        {
            continue;
        }
        const particle = particles[i];
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2, false);
        ctx.fill();
    }
}


window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();


(function animloop(){
    requestAnimFrame(animloop);
    animate();
    render();
})();




*/

    





//function changeColor() {
 //   squares[i].style.backgroundColor = "red";
//}






