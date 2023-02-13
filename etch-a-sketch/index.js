//COLOR PICKER:
let colorSelection = "#000000"; // Default color is black
const colorPicker = document.getElementById("color-picker");
const hex = document.getElementById("hex"); // HEX text in color picker

// Gets color from color picker
colorPicker.addEventListener("input", function(){
    colorSelection = colorPicker.value;
    }, false);

const gridSlider = document.getElementById("grid-slider");
const grid = document.getElementById("grid");
let isGridHidden = true;

let numOfSquares = 100;

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
});    

// Changes square colors when you drag mouse over them
function paint(i){
    let squares = document.querySelectorAll(".square");
    return function(){
        if (mouseDown && !isGridHidden && !isEraserSelected){
            squares[i].style.backgroundColor = colorSelection;
        } else if (mouseDown && isEraserSelected) {
            squares[i].style.backgroundColor = ""; //Eraser tools resets background colors of squares
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

const squareCount = document.getElementById("square-count")

function getNumberOfSquares(){
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
const gridButtonOff = document.getElementById("grid-button-off");
gridButtonOff.addEventListener("click", toggleGrid);


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

const monaLisaContainer = document.getElementById("mona-lisa-container");

/*const buttons = document.querySelectorAll(".button");
let isPenSelected = false;
const penButton = document.getElementById("pen-button");
let isBlowtorchSelected = false;
const blowtorchButton = document.getElementById("blowtorch-button");
let isSplatterSelected = false;
const splatterButton = document.getElementById("splatter-button");
let isGridSelected = false;
const gridButtonWrapper = document.getElementById("grid-button-wrapper");
let isEraserSelected = false;
const eraserButton = document.getElementById("eraser-button");
let isResetButtonSelected = false;
const resetButton = document.getElementById("reset-button");*/



const buttons = {
    blowtorch: {
      element: document.getElementById("blowtorch-button"),
      isActive: false,
      activate: activateBlowtorch,
      deactivate: deactivateBlowtorch,
    },

    splatter: {
      element: document.getElementById("splatter-button"),
      isActive: false,
      activate: activateSplatter,
      deactivate: deactivateSplatter,
    },
    grid: {
      element: document.getElementById("grid-button-wrapper"),
      isActive: false,
      activate: activateGrid,
      deactivate: deactivateGrid,
    },
    eraser: {
      element: document.getElementById("eraser-button"),
      isActive: false,
      activate: activateEraser,
      deactivate: deactivateEraser,
    },
    pen: {
      element: document.getElementById("pen-button"),
      isActive: true,
      activate: activatePen,
      deactivate: deactivatePen,
    },
    reset: {
      element: document.getElementById("reset-button"),
      isActive: false,
      activate: resetMonaLisa,
      deactivate: deactivateResetButton,
    }
};


/*buttons.forEach(button => {
    button.addEventListener("click", function(){
        if (button.isActive) {
            button.deactivate();
        }
        activateButton(button.id);
    })
});*/

const buttonsArray = Object.values(buttons);

buttonsArray.forEach(button => {
    button.element.addEventListener("click", function() {
      if (button.isActive) {
        button.deactivate();
      } else {
        buttons.forEach(otherButton => {
          if (otherButton.isActive) {
            otherButton.deactivate();
          }
        });
        button.activate();
      }
      button.isActive = !button.isActive;
    });
  });


/*
function activateButton(buttonSelection){
    if ((buttonSelection == "blowtorch-button") && !isBlowtorchSelected){
        deactivateSplatter();
        deactivateGrid();
        deactivateEraser();
        deactivatePen();
        deactivateResetButton();
        activateBlowtorch();
        isBlowtorchSelected = true;
        isSplatterSelected = false;
        isGridSelected = false;
        isEraserSelected = false;
        isPenSelected = false;
        isResetButtonSelected = false;
    } else if ((buttonSelection == "blowtorch-button") && (isBlowtorchSelected)){
        deactivateBlowtorch();
        isBlowtorchSelected = false;
    } else if ((buttonSelection == "splatter-button") && !isSplatterSelected){
        deactivateBlowtorch();
        deactivateGrid();
        deactivateEraser();
        deactivatePen();
        deactivateResetButton();
        activateSplatter();
        isSplatterSelected = true;
        isBlowtorchSelected = false;
        isGridSelected = false;
        isEraserSelected = false;
        isPenSelected = false;
        isResetButtonSelected = false;
    } else if ((buttonSelection == "splatter-button") && (isSplatterSelected)){
        deactivateSplatter();
        isSplatterSelected = false;
    } else if ((buttonSelection == "grid-button-wrapper") && !isGridSelected){
        deactivateBlowtorch();
        deactivateSplatter();
        deactivateEraser();
        deactivatePen();
        deactivateResetButton();
        activateGrid();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = true;
        isEraserSelected = false;
        isPenSelected = false;
        isResetButtonSelected = false;
    } else if ((buttonSelection == "grid-button-wrapper") && (isGridSelected)){
        deactivateGrid();
        isGridSelected = false;
    } else if ((buttonSelection == "eraser-button") && !isEraserSelected){
        deactivateGrid();
        deactivateBlowtorch();
        deactivateSplatter();
        deactivatePen();
        deactivateResetButton();
        activateEraser();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = false;
        isEraserSelected = true;
        isPenSelected = false;
        isResetButtonSelected = false;
    } else if ((buttonSelection == "eraser-button") && (isEraserSelected)){
        deactivateEraser();
        isEraserSelected = false;
    } else if ((buttonSelection == "pen-button") && !isPenSelected){
        deactivateGrid();
        deactivateBlowtorch();
        deactivateSplatter();
        deactivateEraser();
        deactivateResetButton();
        activatePen();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = false;
        isEraserSelected = false;
        isPenSelected = true;
        isResetButtonSelected = false;
    } else if ((buttonSelection == "pen-button") && (isPenSelected)){
        deactivatePen();
        isPenSelected = false;
    } else if ((buttonSelection == "reset-button") && !isResetButtonSelected){
        deactivateGrid();
        deactivateBlowtorch();
        deactivateSplatter();
        deactivateEraser();
        deactivatePen();
        resetMonaLisa();
        isSplatterSelected = false;
        isBlowtorchSelected = false;
        isGridSelected = false;
        isEraserSelected = false;
        isPenSelected = false;
        isResetButtonSelected = true;
    }
}
*/

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
    monaLisaContainer.style.setProperty("--cursor", `url("images/paint-bucket-cursor.png"), auto`);
}

function deactivateSplatter(){
    splatterButton.classList.remove("selected");
    splatterButton.classList.add("unselected");
}

function activateGrid(){
    gridButtonWrapper.classList.remove("unselected");
    gridButtonWrapper.classList.add("selected");
    gridSlider.style.display = "block";
    squareCount.style.display = "block";
    gridButton.style.display = "block";
    gridButtonOff.style.display = "none";
    monaLisaContainer.style.setProperty("--cursor", `url("images/grid-cursor.png") 0 0, auto`);
}

function deactivateGrid(){
    gridButtonWrapper.classList.remove("selected");
    gridButtonWrapper.classList.add("unselected");
    gridSlider.style.display = "none";
    squareCount.style.display = "none";
    gridButton.style.display = "none";
    gridButtonOff.style.display = "block";
    if (!isGridHidden){
        toggleGrid();
        isGridHidden = true;
    }
}

function activateEraser(){
    eraserButton.classList.remove("unselected");
    eraserButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/eraser-cursor.png") 15 45, auto`);
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
    monaLisaContainer.style.setProperty("--cursor", `url("images/pen-cursor.png") 0 32, auto`);
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

function resetMonaLisa(){
    resetButton.classList.remove("unselected"); //Highlights button
    resetButton.classList.add("selected");
    resetCanvas(); //Erases items drawn on canvas
    for (let i = 0; i < numOfSquares; i++){ //Resets squares' colors
        squares[i].style.backgroundColor = "";
    }
    if (isMonaLisaBurning){ //Erases burning SVG layer
        const fire = document.querySelector(".circle");
        monaLisaContainer.removeChild(fire);
        isMonaLisaBurning = false;
    }
}

function deactivateResetButton(){
    resetButton.classList.remove("selected"); //Highlights button
    resetButton.classList.add("unselected");
}

//RESET WARNING:
const tooltip = document.getElementById("tooltip");

//Displays warning on mouseover
buttons.reset.onmouseover = function(e){
    if (!buttons.reset.isActive){
        tooltip.style.display = "block";
    }
}

//Hides warning on mouseout
buttons.reset.onmouseout = function(e){
    tooltip.style.display = "none";
}


//BLOWTORCH:

let isMonaLisaBurning = false;

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
            const fire = document.createElement("div");
            fire.className = "circle";
            monaLisaContainer.appendChild(fire);
            isMonaLisaBurning = true;
    }
}};



const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var monaLisaSize = monaLisaContainer.getBoundingClientRect();

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

// PEN and ERASER:

let linewidth = 3; //default line width for pen and eraser

const widthSlider = document.getElementById("width-slider");
const penWidthText = document.getElementById("pen-width-text")
const eraserWidthText = document.getElementById("eraser-width-text")

//Allows user to change line width
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

//Gets properties on window load because pen is default tool selection
window.onload = function(){
    widthSlider.style.display = "block"
    penWidthText.style.display = "block";
    linewidth = widthSlider.value;
    penWidthText.innerHTML = `${linewidth}px`;
    eraserWidthText.innerHTML = `${linewidth}px`; //Preloads eraser text in case it's selected before width is changed
}

activatePen();

let isDrawing = false;

const startDrawing = (e) => {
    if (isPenSelected || isEraserSelected){
        context.strokeStyle = colorSelection;
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

canvas.addEventListener("mousedown", startDrawing);
window.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseover", enterCanvas);

//Increases z-index of colored squares so they can be erased
function findColoredSquares(){
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < numOfSquares; i++){
        const compStyle = window.getComputedStyle(squares[i]).backgroundColor;
        if (compStyle != "rgba(0, 0, 0, 0)"){
            squares[i].style.zIndex = "1";
        }
    }
}

//Allows eraser to also work on squares layer when canvas layer is clicked
canvas.addEventListener("mousedown", function(){
    mouseDown = true;
});

function erase(){
    context.globalCompositeOperation = "destination-out";
}

monaLisaContainer.onmousedown = function clickEvent(e){
    if (isEraserSelected){
        erase();
    }
}


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

//RESET CANVAS:

function resetCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//RAINBOW PUKE SITE INFO MODAL:

const infoLink = document.getElementById("site-info");
const infoBackground = document.getElementById("info-background");
const sunglasses = document.getElementById("sunglasses");
const siteInfo = document.getElementById("info-wrapper")
let infoIsDisplayed = false;

//Reveals modal:
infoLink.onclick = function(e){
    infoIsDisplayed = true;
    siteInfo.classList.add("reveal");
    siteInfo.style.display = "block";
    infoBackground.style.display = "block";
    sunglasses.style.display = "block";
    monaLisaContainer.style.overflow = "visible";
    if (isMonaLisaBurning){ //Hides burning SVG layers
        const fires = document.querySelectorAll(".circle");
        fires.forEach((fire) => {
            fire.style.visibility = "hidden";
        });
        }
}

//Hides modal:
window.onclick = function(e) {
    if (infoIsDisplayed && (e.target !== infoLink)) {
        infoBackground.style.display = "none";
        siteInfo.style.display = "none";
        sunglasses.style.display = "none";
        monaLisaContainer.style.overflow = "hidden";
        infoIsDisplayed = false;
        const fire = document.querySelector(".circle");
        if (isMonaLisaBurning){ //Shows burning SVG layers
            const fires = document.querySelectorAll(".circle");
            fires.forEach((fire) => {
                fire.style.visibility = "visible";
            });
            }
        }
}