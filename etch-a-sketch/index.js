let numOfSquares = 100;

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

// Gets color from color pickeer
colorPicker.addEventListener("input", function(){
    colorSelection = colorPicker.value;
    console.log(colorPicker.value);
    }, false);









//function changeColor() {
 //   squares[i].style.backgroundColor = "red";
//}






