const slider = document.getElementById("slider");
const grid = document.getElementById("grid");
let isGridHidden = true;

let numOfSquares = 100;

let squares = document.querySelectorAll(".square");

function populateGrid(){
    for (let i = 0; i < numOfSquares; i++){
        const square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        grid.appendChild(square);
    }
    squares = document.querySelectorAll(".square");
    for (let i = 0; i < numOfSquares; i++){
        squares[i].style.borderStyle = "none"};
}

populateGrid();

let mouseDown = false;


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
    const squares = document.querySelectorAll(".square");
    return function(){
        if (mouseDown){
        squares[i].style.backgroundColor = colorSelection;
        }
    };
}

slider.addEventListener("change", function(){
    numOfSquares = slider.value;
    clearGrid();
    setTimeout(function(){
        repopulateGrid();
    },10);
})

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
            squares[i].style.borderStyle = "none"};
        }
    if (!isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
            squares[i].style.borderStyle = "dashed"};
        }

    assignEventListeners();
}


function clearGrid(){
    squares.forEach(square => square.remove());
    squares = document.querySelectorAll(".square");
}

const gridIcon = document.getElementById("grid-icon");


gridIcon.addEventListener("click", toggleGrid);

function toggleGrid(){
    const squares = document.querySelectorAll(".square");
    if (isGridHidden){
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.borderStyle = "dashed"};
        console.log("show grid");
    } else {
        for (let i = 0; i < numOfSquares; i++){
                squares[i].style.borderStyle = "none"};
        console.log("hide grid");
    }; 
    isGridHidden = !isGridHidden;
}
    






let colorSelection = "#FF0000"; // Default color is red
const colorPicker = document.getElementById("color-picker");
const hex = document.getElementById("hex"); // HEX text in color picker

// Gets color from color picker
colorPicker.addEventListener("input", function(){
    colorSelection = colorPicker.value;
    hex.innerHTML = colorPicker.value;
    console.log(colorPicker.value);
    }, false);









//function changeColor() {
 //   squares[i].style.backgroundColor = "red";
//}






