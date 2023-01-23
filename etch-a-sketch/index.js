let colorSelection = "#963A2F"; // Default color is red
const colorPicker = document.getElementById("color-picker");
const hex = document.getElementById("hex"); // HEX text in color picker

// Gets color from color picker
colorPicker.addEventListener("input", function(){
    colorSelection = colorPicker.value;
    hex.innerHTML = colorPicker.value;
    console.log(colorPicker.value);
    }, false);

const buttons = document.querySelectorAll(".button");


buttons.forEach(button => {
    button.addEventListener("click", function(){
        activateButton(button.id);
        deactivateButton(button.id);
    })
});

const slider = document.getElementById("slider");
const grid = document.getElementById("grid");
let isGridHidden = false;

let numOfSquares = 100;

let squares = document.querySelectorAll(".square");

function populateGrid(){
    for (let i = 0; i < numOfSquares; i++){
        let square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        grid.appendChild(square);
    }
}

populateGrid();

let mouseDown = false;

squares = document.querySelectorAll(".square");

function assignEventListeners(){
    for (let i = 0; i < numOfSquares; i++){
        squares[i].addEventListener("mousedown", function(){
            mouseDown = true;
            console.log("mousedown");
        });
        squares[i].addEventListener("mouseover", paint(i));
        squares[i].addEventListener("mousedown", paint(i));
    }
}

assignEventListeners()

document.addEventListener("mouseup", function(){
    mouseDown = false;
    console.log("mouseup");
});    

// Changes square colors when you drag mouse over them
function paint(i){
    let squares = document.querySelectorAll(".square");
    return function(){
        if (mouseDown && !isGridHidden){
        squares[i].style.backgroundColor = colorSelection;
        }
    };
}

function clearGrid(){
    squares.forEach(square => square.remove());
    squares = document.querySelectorAll(".square");
}
 

slider.addEventListener("change", function(){
    numOfSquares = Math.pow(Math.round(Math.sqrt(slider.value)), 2);
    clearGrid();
    setTimeout(function(){
        repopulateGrid();
    },10);
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

    squares = document.querySelectorAll(".square");

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

let isBlowtorchSelected = false;
const blowtorchButton = document.getElementById("blowtorch-button");
let isSplatterSelected = false;
const splatterButton = document.getElementById("splatter-button");
let isGridSelected = true;
const gridButtonWrapper = document.getElementById("grid-button-wrapper");



function activateButton (buttonSelection){
    if ((buttonSelection == "blowtorch-button") && !isBlowtorchSelected){
        activateBlowtorch();
        deactivateSplatter();
        deactivateGrid();
        isBlowtorchSelected = true;
        isSplatterSelected = false;
        isGridSelected = false;
    } else if ((buttonSelection == "blowtorch-button") && (isBlowtorchSelected)){
        deactivateBlowtorch();
        isBlowtorchSelected = false;
    } else if ((buttonSelection == "splatter-button") && !isSplatterSelected){
        activateSplatter();
        deactivateBlowtorch();
        deactivateGrid();
        isSplatterSelected = true;
        isBlowtorchSelected = false;
        isGridSelected = false;
    } else if ((buttonSelection == "splatter-button") && (isSplatterSelected)){
        deactivateSplatter();
        isSplatterSelected = false;
    } else if ((buttonSelection == "grid-button-wrapper") && !isGridSelected){
        activateGrid();
        deactivateBlowtorch();
        deactivateSplatter();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = true;
    } else if ((buttonSelection == "grid-button-wrapper") && (isGridSelected)){
        deactivateGrid();
        isGridSelected = false;
    }

}

function deactivateButton(buttonSelection){

}

function activateBlowtorch(){
    blowtorchButton.classList.remove("blowtorch-icon");
    blowtorchButton.classList.add("activate-button");
    monaLisaContainer.style.setProperty("--cursor", `url("images/blowtorch-cursor.png"), auto`);
}

function deactivateBlowtorch(){
    blowtorchButton.classList.remove("activate-button");
    blowtorchButton.classList.add("blowtorch-icon");
}

function activateSplatter(){
    splatterButton.classList.remove("splatter-icon");
    splatterButton.classList.add("activate-button");
    monaLisaContainer.style.setProperty("--cursor", `url("images/blowtorch-cursor.png"), auto`);
}

function deactivateSplatter(){
    splatterButton.classList.remove("activate-button");
    splatterButton.classList.add("splatter-icon");
}

function activateGrid(){
    gridButtonWrapper.classList.remove("grid-icon");
    gridButtonWrapper.classList.add("activate-button");
}

function deactivateGrid(){
    gridButtonWrapper.classList.remove("activate-button");
    gridButtonWrapper.classList.add("grid-icon");
    if (!isGridHidden){
        toggleGrid();
        isGridHidden = true;
    }
}



//records where user clicks on Mona Lisa with blowtorch cursor
monaLisaContainer.onclick = function clickEvent(e){ // e is a mouse click event
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

//PAINT SPLATTER:

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const monaLisaSize = monaLisaContainer.getBoundingClientRect();

canvas.width = window.innerWidth;
canvas.height = monaLisaSize.height + monaLisaSize.top + 40;

//canvas.style.left = monaLisaSize.left+"px";
//canvas.style.top = monaLisaSize.top+"px"; */

    

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = monaLisaSize.height + monaLisaSize.top + 40;
})


var particles = [];

// Creates new particles on user click
canvas.onmousedown = function(e){
    if (isSplatterSelected){
        for (var i = 0; i < 50 * 2; i++){
            particles.push({
                x: e.clientX,
                y: e.clientY,
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
            p.x += Math.cos(p.angle) * 9 + Math.random() * 4 - Math.random() * 2;
            p.y += Math.sin(p.angle) * 9 + Math.random() * 4 - Math.random() * 2;
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
    ctx.fillStyle = colorSelection;
    for (var i = 0; i < particles.length; i++){
        var p = particles[i];
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size, Math.random(p.size) * 7, 0, Math.PI * 2, false);
        ctx.fill();
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






