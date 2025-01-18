function createGameboard(){
    let gameboardArray = [["","",""], ["","",""], ["","",""]];
    let turn = "x";

    const changeTurn = () => {
        if(turn === "x"){
            turn = "o";
        }else{
            turn = "x";
        }
        return turn;
    }

    const whoseTurn = ()=>{ //return whose turn x or o
        return turn;
    }

    const insert = (rows, column, answer) => {
        if(gameboardArray[rows][column] !== ''){
            return false;
        }
        gameboardArray[rows][column] = answer
        return true;
    };

    const play = (rows, column) => {
        const nowTurn = whoseTurn();
        if(insert(rows, column, nowTurn)){
            changeTurn();
            return nowTurn;
        }else {
            return false;
        }
    }

    const isCanWinHorizontal = (row, column) =>{
        const arr = gameboardArray;
        let oppositeSymbol;
        if(arr[row][column] === "x"){
            oppositeSymbol = "o";
        }else if(arr[row][column] === "o"){
            oppositeSymbol = "x";
        }

        if(oppositeSymbol.indexOf(arr[row])){
            return false;
        }

        return true;
    }   

    const isCanWinVertical = (row, column) =>{
        const arr = gameboardArray;
        let oppositeSymbol;
        if(arr[row][column] === "x"){
            oppositeSymbol = "o";
        }else if(arr[row][column] === "o"){
            oppositeSymbol = "x";
        }

        const checkColumn = [];

        for(let row of arr){
            checkColumn.push(row[column]);
        }

        if(oppositeSymbol.indexOf(checkColumn)){
            return false;
        }
        return true;
    }   

    const isCanWinDiagonal = (row, column) => {
        const index1DArray = ((row + 1) * (column +1));
        if(index1DArray % 2 === 0){
            return false;
        }
        const arr = gameboardArray;
        if(arr[row][column] === "x"){
            oppositeSymbol = "o";
        }else if(arr[row][column] === "o"){
            oppositeSymbol = "x";
        }
        const diagonalLeftArr = [arr[0,0], arr[1,1], arr[2,2]]
        const diagonalRightArr = [arr[2,0], arr[1,1], arr[0,2]]

       if(index1DArray === 1 && index1DArray === 9){
            if(oppositeSymbol.indexOf(diagonalLeftArr)){
                return false;
            }
       }else if (index1DArray === 3 && index1DArray === 7){
            if(oppositeSymbol.indexOf(diagonalLeftArr)){
                return false;
            }
        }else if (index1DArray === 5){
            if(oppositeSymbol.indexOf(diagonalLeftArr) && oppositeSymbol.indexOf(diagonalRightArr)){
                return false;
            }
       }

       return true;
    }

    const isTie = ()=>{
        for(let i =0; i<3; i++){
            for(let j =0; j<3; j++){
                if(isCanWinHorizontal(i,j) || isCanWinVertical(i,j) || isCanWinDiagonal(i,j)){
                    return false;
                }
            }
        }
        return true;
    }
    
    const winCheck = () => { //return who win
        for(let i=0; i<3; i++){
            if(gameboardArray[0][i] === gameboardArray[1][i] && gameboardArray[0][i] === gameboardArray[2][i] && gameboardArray[0][i] !== ""){//check vertical
                return {winner:gameboardArray[0][i], cond: `vertical at column ${i}`} ;
            }

            if(gameboardArray[i][0] === gameboardArray[i][1] && gameboardArray[i][0] === gameboardArray[i][2] && gameboardArray[i][0] !== ""){ //check horizontal
                return {winner:gameboardArray[i][0], cond: `horizontal at row ${i}`}
            }
        }

        if(gameboardArray[0][0] === gameboardArray[1][1] && gameboardArray[0][0] === gameboardArray[2][2] && gameboardArray[0][0] !== ""){ //check diagonal left
            return {winner:gameboardArray[0][0], cond: `diagonal left`};
        }

        if(gameboardArray[2][0] === gameboardArray[1][1] && gameboardArray[2][0] === gameboardArray[0][2] && gameboardArray[2][0] !== ""){ //check diagonal right
            return {winner:gameboardArray[2][0], cond: `diagonal right`};
        }

        return false;
    }

    const resetBoard = () => {
        gameboardArray = [["","",""], ["","",""], ["","",""]];
        turn ="x"
    }

    const board = () => {
        return gameboardArray;
    }


    return {winCheck ,isTie, resetBoard, board, whoseTurn, play};
}
    

function displayController() {
    const game = createGameboard();

    const slot00 = document.querySelector("#slot1");
    const slot01 = document.querySelector("#slot2");
    const slot02 = document.querySelector("#slot3");
    const slot10 = document.querySelector("#slot4");
    const slot11 = document.querySelector("#slot5");
    const slot12 = document.querySelector("#slot6");
    const slot20 = document.querySelector("#slot7");
    const slot21 = document.querySelector("#slot8");
    const slot22 = document.querySelector("#slot9");

    const slots = [[slot00, slot01, slot02], [slot10, slot11, slot12], [slot20, slot21, slot22]];

    const crossCheck = (slot) => {
        slot.firstChild.classList.remove("cross");
        slot.firstChild.classList.remove("radio");
        slot.firstChild.textContent = "close";
        slot.firstChild.classList.add("cross");
    }

    const radioCheck = (slot) => {
        slot.firstChild.classList.remove("cross");
        slot.firstChild.classList.remove("radio");
        slot.firstChild.textContent = "radio_button_unchecked";
        slot.firstChild.classList.add("radio");
    }

    const reset = () => {
        for (let i=0; i<3; i++){
            for (let j=0; j<3; j++){
                slots[i][j].firstChild.textContent = "";
                game.resetBoard();
            }
        }
    }

    const displayWinner = () => {
        const dialog = document.querySelector("h1");
        dialog.firstChild.textContent = game.whoseTurn();
        dialog.showModal();
    }

    for (let i=0; i<3; i++){
        for (let j=0; j<3; j++){
            slots[i][j].addEventListener("click", ()=>{
                const play = game.play(i,j);
                if(play === "x"){
                    crossCheck(slots[i][j]);
                }else if(play === "o"){
                    radioCheck(slots[i][j]);
                }else {
                    console.log("slot not available");
                }

                if(game.winCheck() || game.isTie()){
                    console.log(game.winCheck());
                    console.log(game.isTie());
                    // displayWinner();
                    // reset()
                }
            })
        }
    }

    return {reset}
}

const display = displayController();