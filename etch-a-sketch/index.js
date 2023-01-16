let numOfSquares = 500;

const grid = document.getElementById("grid");

function populateGrid() {
    for (let i = 0; i < numOfSquares; i++){
        const square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        grid.appendChild(square);
    }
}

populateGrid();

const gridIcon = document.getElementById("grid-icon");

let isGridHidden = true;

if(isGridHidden){
    gridIcon.addEventListener("click", showGrid);
} else {
    gridIcon.addEventListener("click", hideGrid);
}

function showGrid() {
    
    for (let i = 0; i < numOfSquares; i++){
            squares[i].style.borderStyle = "dashed"
            console.log("show grid")
    };
}

function hideGrid() {
    for (let i = 0; i < numOfSquares; i++){
        squares[i].style.borderStyle = "none"
        console.log("hide grid")
};
 
}




const squares = document.querySelectorAll(".square");
    
let mouseDown = false;

for (let i = 0; i < numOfSquares; i++){
        squares[i].addEventListener("mousedown", function(){
        mouseDown = true;
        console.log("mousedown");
    })    
}

document.addEventListener("mouseup", function(){
    mouseDown = false;
    console.log("mouseup");
    })    

// Changes square colors when you drag mouse over them
function paint(i){
    return function(){
        if (mouseDown){
        squares[i].style.backgroundColor = colorSelection;
        }
    };
}

for (let i = 0; i < numOfSquares; i++){    
    squares[i].addEventListener("mouseover", paint(i));
}

for (let i = 0; i < numOfSquares; i++){    
    squares[i].addEventListener("mousedown", paint(i));
}


let colorSelection = "#FF0000"; // Default color is red
const colorPicker = document.getElementById("color-picker");
const hex = document.getElementById("hex"); // HEX text in color picker

// Gets color from color pickeer
colorPicker.addEventListener("input", function(){
    colorSelection = colorPicker.value;
    hex.innerHTML = colorPicker.value;
    console.log(colorPicker.value);
    }, false);









//function changeColor() {
 //   squares[i].style.backgroundColor = "red";
//}






