let numOfSquares = 25;

const gridContainer = document.getElementById("grid-container");

function populateGrid() {
    for (let i = 0; i < numOfSquares; i++){
        const square = document.createElement('div');
        square.classList.add("square");
        square.style.width = `${(100/(Math.sqrt(numOfSquares))) + "%"}`;
        gridContainer.appendChild(square);
    }
}

populateGrid();

const squares = document.querySelectorAll(".square");



//squares.forEach(square=>
  //square.addEventListener("click", changeColor));
    


for (let i = 0; i < numOfSquares; i++){
        squares[i].addEventListener("click", changeColor(i));
    }

let colorSelection = "blue";

function changeColor(i){
    return function(){
        squares[i].style.backgroundColor = colorSelection;
    }
};





//function changeColor() {
 //   squares[i].style.backgroundColor = "red";
//}






