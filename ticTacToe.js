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
    };

    const play = (rows, column) => {
        insert(rows, column, whoseTurn());
        changeTurn();
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
    }

    const displayBoard = () => {
        console.log(gameboardArray);
    }


    return {insert, winCheck, resetBoard, displayBoard, whoseTurn, play};
}
    
