// Buttons

// Buttons object contains information about each button
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
    spraypaint: {
        element: document.getElementById("spraypaint-button"),
        isActive: false,
        activate: activateSpraypaint,
        deactivate: deactivateSpraypaint,
    },
    grid: {
      element: document.getElementById("grid-button-wrapper"),
      isActive: true,
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
      isActive: false,
      activate: activatePen,
      deactivate: deactivatePen,
    },
    reset: {
      element: document.getElementById("reset-button-container"),
      isActive: false,
      activate: resetMonaLisa,
      deactivate: deactivateResetButton,
    }
};

const buttonsArray = Object.values(buttons); // Creates an array from the buttons object

// Attaches a click event listener to each button in the buttons array
buttonsArray.forEach(button => {
    button.element.addEventListener("click", function() {
        if (!button.isActive) { // If the button is not already active
            buttonsArray.forEach(otherButton => {
                if (otherButton.isActive) {
                    otherButton.deactivate(); // Deactivate any other active buttons
                    otherButton.isActive = false;
                }
            });
            button.activate(); // Activate the current button
            button.isActive = true;
        }
    });
});

// The following functions are used to activate/deactivate each button

const monaLisaContainer = document.getElementById("mona-lisa-container"); // Gets Mona Lisa for custom cursors

function activateBlowtorch(){
    const blowtorchButton = document.getElementById("blowtorch-button");
    blowtorchButton.classList.remove("unselected");
    blowtorchButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/blowtorch-cursor.png"), auto`);
};

function deactivateBlowtorch(){
    const blowtorchButton = document.getElementById("blowtorch-button");
    blowtorchButton.classList.remove("selected");
    blowtorchButton.classList.add("unselected");
};

function activateSplatter(){
    const splatterButton = document.getElementById("splatter-button");
    splatterButton.classList.remove("unselected");
    splatterButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/paint-bucket-cursor.png"), auto`);
};

function deactivateSplatter(){
    const splatterButton = document.getElementById("splatter-button");
    splatterButton.classList.remove("selected");
    splatterButton.classList.add("unselected");
};

function activateSpraypaint() {
    isSpraypaintSelected = true;
    const spraypaintButton = document.getElementById("spraypaint-button");
    spraypaintButton.classList.remove("unselected");
    spraypaintButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/spraypaint-cursor.png"), auto`);
};

function deactivateSpraypaint() {
    isSpraypaintSelected = false;
    const spraypaintButton = document.getElementById("spraypaint-button");
    spraypaintButton.classList.remove("selected");
    spraypaintButton.classList.add("unselected");
};

function activateGrid(){
    const gridButtonWrapper = document.getElementById("grid-button-wrapper");
    gridButtonWrapper.classList.remove("unselected");
    gridButtonWrapper.classList.add("selected");
    gridSlider.style.display = "block";
    squareCount.style.display = "block";
    gridButton.style.display = "block";
    gridButtonOff.style.display = "none";
    monaLisaContainer.style.setProperty("--cursor", `url("images/grid-cursor.png") 0 0, auto`);
};

function deactivateGrid(){
    const gridButtonWrapper = document.getElementById("grid-button-wrapper");
    gridButtonWrapper.classList.remove("selected");
    gridButtonWrapper.classList.add("unselected");
    gridSlider.style.display = "none";
    squareCount.style.display = "none";
    gridButton.style.display = "none";
    gridButtonOff.style.display = "block";
    if (!isGridHidden){
        toggleGrid();
        isGridHidden = true;
    };
};

function activateEraser(){
    const eraserButton = document.getElementById("eraser-button");
    eraserButton.classList.remove("unselected");
    eraserButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/eraser-cursor.png") 15 45, auto`);
    findColoredSquares(); // Find which squares are colored and change their z-index to make them erasable
    eraserWidthText.style.display = "block";
    widthSlider.style.display = "block";
    isEraserSelected = true;
};

function deactivateEraser(){
    const eraserButton = document.getElementById("eraser-button");
    eraserButton.classList.remove("selected");
    eraserButton.classList.add("unselected");
    context.globalCompositeOperation = 'source-over';
    monaLisaContainer.style.setProperty("--cursor", "auto");
    eraserWidthText.style.display = "none";
    widthSlider.style.display = "none";
    isEraserSelected = false;
};

function activatePen(){
    const penButton = document.getElementById("pen-button");
    penButton.classList.remove("unselected");
    penButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", `url("images/pen-cursor.png") 0 32, auto`);
    penWidthText.style.display = "block";
    widthSlider.style.display = "block";
};

function deactivatePen(){
    const penButton = document.getElementById("pen-button");
    penButton.classList.remove("selected");
    penButton.classList.add("unselected");
    monaLisaContainer.style.setProperty("--cursor", "auto");
    penWidthText.style.display = "none";
    widthSlider.style.display = "none";
};

const resetButton = document.getElementById("reset-button");

// Clears all canvas, grid, and fire elements
function resetMonaLisa(){
    resetButton.classList.remove("unselected"); // highlights button
    resetButton.classList.add("selected");
    monaLisaContainer.style.setProperty("--cursor", "auto");
    resetCanvas(); // erases items drawn on canvas
    for (let i = 0; i < numOfSquares; i++){ // resets squares' colors
        squares[i].style.backgroundColor = "";
    };
    if (isMonaLisaBurning){ // erases burning SVG layer
        const fire = document.querySelector(".circle");
        monaLisaContainer.removeChild(fire);
        isMonaLisaBurning = false;
    };
};

function deactivateResetButton(){
    resetButton.classList.remove("selected"); // highlights button
    resetButton.classList.add("unselected");
};

// Color Picker

let colorSelection = "#000000"; // Default color is black
const colorPicker = document.getElementById("color-picker");
const hex = document.getElementById("hex"); // HEX text in color picker

// Gets color from color picker
colorPicker.addEventListener("input", function(){
    colorSelection = colorPicker.value;
}, false);


// Grid (original Odin Project assignment)

// Sets default cursor as grid cursor
function initializeGrid() {
    monaLisaContainer.style.setProperty("--cursor", `url("images/grid-cursor.png") 0 0, auto`);
};

initializeGrid();

// Selects the grid and slider elements and sets default values
const grid = document.getElementById("grid");
const gridSlider = document.getElementById("grid-slider");
let isGridHidden = false;
let numOfSquares = 100;

// Creates a grid of squares based on the numOfSquares variable, which can be changed by user
function populateGrid(){
    for (let i = 0; i < numOfSquares; i++){
        let square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        grid.appendChild(square);
    };

    let squares = document.querySelectorAll(".square");

    // Hides squares if another tool is selected
    if (isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.borderStyle = "none";
                squares[i].style.zIndex = "0";
            };
    };

    // Displays squares
    if (!isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
            squares[i].style.borderStyle = "dashed";
            squares[i].style.zIndex = "1";
        };
    };
};

populateGrid();

let mouseDown = false;

document.addEventListener("mouseup", function(){
    mouseDown = false;
});

document.addEventListener("touchend", function(){
    mouseDown = false;
});  

// Assigns event listeners to each square in the grid
function assignEventListeners(){
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < numOfSquares; i++){
        
    squares[i].addEventListener("mousedown", function(){
        mouseDown = true;
        console.log("mousedown");
    });
    
    // Colors squares
    squares[i].addEventListener("mousedown", paint(i));
    squares[i].addEventListener("mouseover", paint(i));

    // Colors squares (mobile)
    squares[i].addEventListener("touchstart", function(event) {
        paint(i)(event);
    }, { passive: true });
    squares[i].addEventListener("touchmove", function(event) {
        let touch = event.touches[0];
        let rect = grid.getBoundingClientRect();
        let x = touch.clientX - rect.left;
        let y = touch.clientY - rect.top;
        let i = Math.floor((y / rect.height) * Math.sqrt(numOfSquares)) * Math.sqrt(numOfSquares) + Math.floor((x / rect.width) * Math.sqrt(numOfSquares)); // Gets index of square
        if ((x > 0 && x < rect.width) && (y > 0 && y < rect.height)){ // Only paints if user touches within grid 
            paint(i)(event);
        }}, { passive: true });
    }
}

assignEventListeners();

// Changes the color of a square based on user interaction
function paint(i){
    let squares = document.querySelectorAll(".square");
    
    return function(event){
        let currentSquare = squares[i];

        // If the user is not using the eraser tool, paint the square with the selected color
        if (mouseDown && !isGridHidden && !buttons.eraser.isActive){
            currentSquare.style.backgroundColor = colorSelection;
        }
        // If the user is using the eraser tool, erase the color of the square
         else if (mouseDown && buttons.eraser.isActive) {
            currentSquare.style.backgroundColor = ""; 
            currentSquare.style.zIndex = "0";
        };

        // For mobile
        if (event.type === "touchstart" || event.type === "touchmove" && !buttons.eraser.isActive) {
            currentSquare.style.backgroundColor = colorSelection;
        } else if (event.type === "touchstart" || event.type === "touchmove" && buttons.eraser.isActive) {
            currentSquare.style.backgroundColor = ""; // Eraser tool resets background colors of squares
            currentSquare.style.zIndex = "0";
        };
    };
};

// Clears grid by removing all squares
function clearGrid(){
    squares.forEach(square => square.remove());
}

// Allows user to adjust grid size with slider
gridSlider.addEventListener("input", function(){
    numOfSquares = Math.pow(Math.round(Math.sqrt(gridSlider.value)), 2); // Rounds slider value to nearest square number
    clearGrid(); // Clears existing grid
    repopulateGrid(); // Repopulates grid with new number of squares
    getNumberOfSquares(); // Updates the number of squares displayed on button
});

// Retrieves square count to display on button
const squareCount = document.getElementById("square-count")
function getNumberOfSquares(){
    squareCount.innerHTML = `${Math.sqrt(numOfSquares)} &#215 ${Math.sqrt(numOfSquares)}`;
}

getNumberOfSquares();

// Repopulates grid when the user changes the size
function repopulateGrid(){
    // Creates new squares for the new grid size
    for (let i = 0; i < numOfSquares; i++){
        const square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        grid.appendChild(square);
    }

    let squares = document.querySelectorAll(".square");

    if (isGridHidden){
        // If grid is hidden, hide the new squares
        for (let i = 0; i < numOfSquares; i++){
            squares[i].style.borderStyle = "none";
            squares[i].style.zIndex = "0"};
    }

    if (!isGridHidden){
        // If grid is visible, show the new squares
        for (let i = 0; i < numOfSquares; i++){
            squares[i].style.borderStyle = "dashed";
            squares[i].style.zIndex = "1"};
    };
    
    assignEventListeners(); // Reassigns event listeners to new squares
};

// Shows or hides grid when grid button is selected or unselected
const gridButton = document.getElementById("grid-button");
gridButton.addEventListener("click", toggleGrid);
const gridButtonOff = document.getElementById("grid-button-off");
gridButtonOff.addEventListener("click", toggleGrid);

function toggleGrid(){
    let squares = document.querySelectorAll(".square");
    if (isGridHidden){
        // If grid is hidden, show it
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.zIndex = "1";
                squares[i].style.borderStyle = "dashed"};
        console.log("show grid");
        
    } else {
        // If grid is visible, hide it
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.zIndex = "0";
                squares[i].style.borderStyle = "none"};
        console.log("hide grid");
    }; 

    isGridHidden = !isGridHidden;
};


// Blowtorch:

let isMonaLisaBurning = false;

// For mobile devices
monaLisaContainer.addEventListener("touchstart", function(e) {
    
    // Checks if the blowtorch tool is active and Mona Lisa is not already burning
    if (buttons.blowtorch.isActive && !isMonaLisaBurning){
        const dimensions = e.currentTarget.getBoundingClientRect(); // Gets size of Mona Lisa
        var touch = e.touches[0] || e.changedTouches[0];
        const left = touch.pageX - dimensions.left;  // retrieves x position within element
        const right = dimensions.width - left;
        const top = touch.pageY - dimensions.top; // retrieves y position within element
        const bottom = dimensions.height - top;
        console.log("blowtorch touchstart");

    // Checks if user touches within Mona Lisa
        if (touch.pageX > dimensions.left && touch.pageX < dimensions.right 
            && touch.pageY > (dimensions.top - 15) && touch.pageY < (dimensions.bottom - 15)){
            monaLisaContainer.style.setProperty("--left", `${left}px`);
            monaLisaContainer.style.setProperty("--right", `${right}px`);
            monaLisaContainer.style.setProperty("--top", `${top}px`);
            monaLisaContainer.style.setProperty("--bottom", `${bottom}px`);
            const fire = document.createElement("div");
            fire.className = "circle";
            monaLisaContainer.appendChild(fire);
            isMonaLisaBurning = true;
        }
    };
}, { passive: true });

// For desktop
monaLisaContainer.addEventListener("mousedown", function(e) {
    
    if (buttons.blowtorch.isActive && !isMonaLisaBurning){
        const dimensions = e.currentTarget.getBoundingClientRect();
        console.log(dimensions);
        const left = e.clientX - dimensions.left;
        const right = dimensions.width - left;
        const top = e.clientY - dimensions.top;
        const bottom = dimensions.height - top; 

        if (e.clientX > dimensions.left && e.clientX < dimensions.right
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
    };
});


// Canvas (for pen, paint splatter, and spray paint tools)

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var monaLisaSize = monaLisaContainer.getBoundingClientRect();
canvas.width = monaLisaSize.width;
canvas.height = monaLisaSize.height;
canvas.style.left = monaLisaSize.left+"px";
canvas.style.top = monaLisaSize.top+"px";

// Gets canvas size and pen (default tool) properties on load, initializes pen
window.onload = function(){ //fixes canvas position bug by delaying getBoundingClientRect() until page has loaded
    const canvas = document.getElementById("canvas");
    monaLisaSize = monaLisaContainer.getBoundingClientRect();
    canvas.width = monaLisaSize.width;
    canvas.height = monaLisaSize.height;
    canvas.style.left = monaLisaSize.left+"px";
    canvas.style.top = monaLisaSize.top+"px";
};

// Gets and updates new canvas size if window is resized
window.onresize = function(){
    const canvas = document.getElementById("canvas");
    monaLisaSize = monaLisaContainer.getBoundingClientRect();
    canvas.width = monaLisaSize.width;
    canvas.height = monaLisaSize.height;
    canvas.style.left = monaLisaSize.left+"px";
    canvas.style.top = monaLisaSize.top+"px";
};


// Pen and eraser:

let linewidth = 3; // Sets default line width
const widthSlider = document.getElementById("width-slider");
const penWidthText = document.getElementById("pen-width-text");
const eraserWidthText = document.getElementById("eraser-width-text");
let isEraserSelected = false;

// Allows user to change line width
widthSlider.oninput = function(){
    linewidth = widthSlider.value;
    penWidthText.innerHTML = `${linewidth}px`;
    eraserWidthText.innerHTML = `${linewidth}px`;
    if (buttons.pen.isActive){
        penWidthText.style.display = "block";
    } else if (buttons.eraser.isActive){
        eraserWidthText.style.display = "block";
    };
};

let isDrawing = false;

// For mobile
const startDrawingMobile = (e) => {
    if (buttons.pen.isActive || buttons.eraser.isActive){
        context.strokeStyle = colorSelection;
        isDrawing = true;
        context.beginPath();
        context.lineWidth = linewidth;
        var touch = e.touches[0];
        context.moveTo(touch.pageX - monaLisaSize.left, touch.pageY - monaLisaSize.top);
    }
}

// For desktop
const startDrawingDesktop = (e) => {
    if (buttons.pen.isActive || buttons.eraser.isActive){
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

//for mobile
const drawMobile = (e) => {
    if (!isDrawing) return; // end function if not drawing
    e.preventDefault();
    console.log("is drawing on mobile");
    var touch = e.touches[0];
    context.lineTo(touch.pageX - monaLisaSize.left, touch.pageY - monaLisaSize.top);
    context.stroke();
}

//for desktop
const drawDesktop = (e) => {
    if (!isDrawing) return; // end function if not drawing
    e.preventDefault();
    console.log("is drawing on desktop");
    context.lineTo(e.clientX - monaLisaSize.left, e.clientY - monaLisaSize.top);
    context.stroke();
}

const enterCanvas = (e) => {
    context.beginPath();
}

// for mobile
canvas.addEventListener("touchstart", startDrawingMobile);
window.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchmove", drawMobile);

// for desktop
canvas.addEventListener("mousedown", startDrawingDesktop);
window.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", drawDesktop);
canvas.addEventListener("mouseover", enterCanvas);

// increases z-index of colored squares so they can be erased
function findColoredSquares(){
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < numOfSquares; i++){
        const compStyle = window.getComputedStyle(squares[i]).backgroundColor;
        if (compStyle != "rgba(0, 0, 0, 0)"){
            squares[i].style.zIndex = "1";
        }
    }
}

// ERASE:
function erase(){
    context.globalCompositeOperation = "destination-out";
}

//for mobile
monaLisaContainer.addEventListener("touchstart", function(e) {
    if (buttons.eraser.isActive){
        erase();
        console.log("is erasing on mobile");
        }
    }
)

//for desktop
monaLisaContainer.onmousedown = function clickEvent(e) {
    if (buttons.eraser.isActive){
        erase();
        console.log("is erasing on desktop");
    }
}

canvas.addEventListener("mousedown", function() { // Listens for mousedown on canvas in addition to grid so eraser affects both layers at once
    mouseDown = true;
});

// Allows mobile user to drag from off grid to on grid and erase squares
canvas.addEventListener("touchmove", function(event) {
    if (!isGridHidden || isEraserSelected) {
        let touch = event.touches[0];
        let rect = grid.getBoundingClientRect();
        let x = touch.clientX - rect.left;
        let y = touch.clientY - rect.top;
        let i = Math.floor((y / rect.height) * Math.sqrt(numOfSquares)) * Math.sqrt(numOfSquares) + Math.floor((x / rect.width) * Math.sqrt(numOfSquares)); // Gets index of square
        if ((x > 0 && x < rect.width) && (y > 0 && y < rect.height)){ // Only paints if user touches within grid 
            paint(i)(event);
        }
    }
}, { passive: true });

//PAINT SPLATTER:

var particles = [];
let isSplattering = false;

//creates new particles on user touch
canvas.addEventListener("touchstart", function(e) { // for mobile
    if (buttons.splatter.isActive && !isSplattering){
        isSplattering = true;
        console.log("splatter touch")
        var touch = e.touches[0] || e.changedTouches[0];
        for (var i = 0; i < 50 * 2; i++){
            particles.push({
                x: touch.pageX - monaLisaSize.left,
                y: touch.pageY - monaLisaSize.top,
                angle: i * 5,
                size: 5 + Math.random() * 4,
                life: 300 + Math.random() * 100
            });
        }
        setTimeout(function() { // prevents onmousedown listener from simulatenously firing
            isSplattering = false;
            console.log("done splattering")
          }, 500);
    }
}, { passive: true });

//for desktop
canvas.onmousedown = function(e) {
    if (buttons.splatter.isActive && !isSplattering){
        console.log("splatter mouse")
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
    context.globalAlpha = .8;
    delta = Date.now() - last; // Calculates the time elapsed since the last frame
    last = Date.now();
    for (var i = 0; i < particles.length; i++){ //updates the particle's location, size, life
            var p = particles[i];
            p.x += Math.cos(p.angle) * 4 + Math.random() * 4 - Math.random() * 2;
            p.y += Math.sin(p.angle) * 4 + Math.random() * 4 - Math.random() * 2;
            p.life -= delta;
            p.size -= delta / 50;
        
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

// Wait until DOM loaded in order to prevent requestAnimFrame bug
document.addEventListener("DOMContentLoaded", function(){
    animloop();
  });


// SPRAYPAINT:

var amount = 40;
let isSpraypaintSelected = false;
var intervalId = null;

// particles
function Particle(x, y, rad, alpha) {
	this.x = x;
	this.y = y;
	this.rad = rad;
	this.alpha = alpha;

	// draw circle
    if (isSpraypaintSelected) {
        context.beginPath();
        context.arc(this.x, this.y, this.rad, 0, 2 * Math.PI, false);
        context.fillStyle = colorSelection;
        context.globalAlpha = this.alpha;
        context.fill();
    }
}

// Set particle values on mousemove
canvas.addEventListener("touchmove", function(event) {
    var touch = event.touches[0];
    var rect = canvas.getBoundingClientRect();
    var stageX = touch.clientX - rect.left;
    var stageY = touch.clientY - rect.top;
     RandomizeParticles(stageX, stageY);
  }, { passive: true });


canvas.addEventListener("mousemove", function(event) {
    if (mouseDown) {
        var rect = canvas.getBoundingClientRect();
        var stageX = event.clientX - rect.left;
        var stageY = event.clientY - rect.top;
        RandomizeParticles(stageX, stageY);
    }
  });

// Set particle values
canvas.addEventListener("touchstart", function(event) {
    var touch = event.touches[0];
    var rect = canvas.getBoundingClientRect();
    var stageX = touch.clientX - rect.left;
    var stageY = touch.clientY - rect.top;
    
    // Clear interval if already set
    if (intervalId != null) {
        clearInterval(intervalId);
    }

        // Trigger RandomizeParticles repeatedly every 50ms
    intervalId = setInterval(function() {
        RandomizeParticles(stageX, stageY);
    }, 50);
    
  }, { passive: true });

// For desktop
canvas.addEventListener("mousedown", function(event) {
    if (mouseDown && event.button === 0) { // Only trigger when left mouse button is pressed

        var rect = canvas.getBoundingClientRect();
        var stageX = event.clientX - rect.left;
        var stageY = event.clientY - rect.top;
        
        RandomizeParticles(stageX, stageY);
    };
});

// Stop particle drawing
canvas.addEventListener("touchend", function(event) {
    // Clear interval if already set
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
}, { passive: true });

// For desktop
canvas.addEventListener("mouseup", function(event) {
    // Clear interval if already set
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
});

// Create random values for particles
function RandomizeParticles(stageX, stageY) {
	this.stageX = stageX;
	this.stageY = stageY;
	
	for (var i = 0; i < amount; i++) {

		var x = this.stageX + (Math.random() - 0.5) * Math.random() * 75;
		var y = this.stageY + (Math.random() - 0.5) * Math.random() * 75;
		var alpha = Math.random();

		if (x > this.stageX + 30 || x < this.stageX - 30 || y > this.stageY + 30 || y < this.stageY - 30) {
			var rad = Math.random() * 4;
		} else if (x > this.stageX + 35 || x < this.stageX - 35 || y > this.stageY + 35 || y < this.stageY - 35) {
			var rad = Math.random() * 2;
		} else {
			var rad = Math.random() * 6;
		}

		new Particle(x, y, rad, alpha);
	}
}


// RESET CANVAS:

function resetCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height); // clears canvas
}

resetWarning = document.getElementById("reset-warning");
resetButtonContainer = document.getElementById("reset-button-container");

// displays reset warning on mouseover if on desktop
resetButtonContainer.onmouseover = function(e){
    if (!buttons.reset.isActive && (window.innerWidth > 480)){
        resetWarning.style.display = "block";
        resetButton.style.display = "none";
    };
};

//Hides warning on mouseout
resetButtonContainer.onmouseout = function(e){
    resetWarning.style.display = "none";
    resetButton.style.display = "block";
}

//RAINBOW PUKE SITE INFO MODAL:

const infoLink = document.getElementById("site-info");
const infoBackground = document.getElementById("info-background");
const sunglasses = document.getElementById("sunglasses");
const siteInfo = document.getElementById("info-wrapper")
let infoIsDisplayed = false;

// Reveals modal
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

// Hides modal
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


// ORIENTATION:

// Locks orientation in portrait mode
if (screen.orientation) {
    screen.orientation.lock('portrait');
  }

// If orientation doesn't lock, display message instructing to return to portrait

const requestPortrait = document.getElementById('request-portrait');
let landscape = window.matchMedia('(orientation: landscape)');
let portrait = window.matchMedia('(orientation: portrait)');

// displays message
landscape.addEventListener('change', function(e) {
    if(e.matches && window.innerHeight < 430) {
        requestPortrait.style.display = 'flex';
        console.log('landscape mode');
    }
})

// hides message
portrait.addEventListener("change", function(e) { 
    if (e.matches) {
        requestPortrait.style.display = 'none';
    }
})