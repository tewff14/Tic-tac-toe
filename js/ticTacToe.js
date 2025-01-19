function createGameboard(p1, p2) {
    let gameboardArray = [["", "", ""], ["", "", ""], ["", "", ""]];
    let turn = "x";
    let player1 = p1;
    let player2 = p2;
    let winner = "";
    let isEnd = false;

    const changeTurn = () => {
        if (turn === "x") {
            turn = "o";
        } else {
            turn = "x";
        }
        return turn;
    }

    const whoseTurn = () => { //return whose turn x or o
        return turn;
    }

    const insert = (rows, column, answer) => {
        if (gameboardArray[rows][column] !== '') {
            return false;
        }
        gameboardArray[rows][column] = answer
        return true;
    };

    const play = (rows, column) => {
        if (isEnd) {
            return;
        }

        const nowTurn = whoseTurn();
        if (insert(rows, column, nowTurn)) {
            changeTurn();
            return nowTurn;
        } else {
            return false;
        }
    }

    const whoCanWinHorizontal = (row) => {
        const arr = gameboardArray;
        let countX = 0;
        let countO = 0;
        let countBlank = 0;
        let blankLocation = [];

        let count = 0;
        for (cell of arr[row]) {
            switch (cell) {
                case "x":
                    countX++;
                    break;
                case "o":
                    countO++;
                    break;
                case "":
                    countBlank++;
                    blankLocation.push(count);
            }
            count++;
        }

        let mostWinner;
        if (countX > 0 && countO === 0) {
            mostWinner = "x";
        } else if (countO > 0 && countX === 0) {
            mostWinner = "y";
        } else if (countBlank === 3) {
            mostWinner = "xo";
        } else {
            mostWinner = "";
        }

        console.log(`most Winner h = ${mostWinner}`);
        return { mostWinner, blankLocation }
    }

    const whoCanWinVertical = (column) => {
        const arr = gameboardArray;
        let countX = 0;
        let countO = 0;
        let countBlank = 0;

        let blankLocation = [];

        for (let i = 0; i < 3; i++) {
            if (arr[i][column] == "x") {
                countX++;
            } else if (arr[i][column] == "o") {
                countO++;
            } else {
                countBlank++;
                blankLocation.push(i);
            }
        }

        let mostWinner;
        if (countX > 0 && countO === 0) {
            mostWinner = "x";
        } else if (countO > 0 && countX === 0) {
            mostWinner = "o"
        } else if (countBlank === 3) {
            mostWinner = "xo";
        } else {
            mostWinner = "";
        }

        console.log(`most WinnerV = ${mostWinner}`);
        return { mostWinner, blankLocation }
    }

    const whoCanWinDiagonalLeft = () => {
        const arr = gameboardArray;
        let countX = 0;
        let countO = 0;
        let countBlank = 0;

        let blankLocation = [];


        for (let i = 0; i < 3; i++) {
            if (arr[i][i] == "x") {
                countX++;
            } else if (arr[i][i] == "o") {
                countO++;
            } else {
                countBlank++;
                blankLocation.push(i);
            }
        }

        let mostWinner;
        if (countX > 0 && countO === 0) {
            mostWinner = "x";
        } else if (countO > 0 && countX === 0) {
            mostWinner = "o"
        } else if (countBlank === 3) {
            mostWinner = "xo";
        } else {
            mostWinner = "";
        }


        return { mostWinner, blankLocation }
    }

    const whoCanWinDiagonalRight = () => {
        const arr = gameboardArray;
        let countX = 0;
        let countO = 0;
        let countBlank = 0;

        let blankLocation = [];

        for (let i = 0; i < 3; i++) {
            if (arr[i][2 - i] == "x") {
                countX++;
            } else if (arr[i][2 - i] == "o") {
                countO++;
            } else {
                countBlank++;
                blankLocation.push(i);
            }
        }

        if (countX > 0 && countO === 0) {
            mostWinner = "x";
        } else if (countO > 0 && countX === 0) {
            mostWinner = "o"
        } else if (countBlank === 3) {
            mostWinner = "xo";
        } else {
            mostWinner = "";
        }

        return { mostWinner, blankLocation }
    }

    const isTie = () => {
        for (let i = 0; i < 3; i++) {
            if (whoCanWinHorizontal(i).mostWinner !== "" || whoCanWinVertical(i).mostWinner !== "") {
                console.log("win d or h")
                return false;
            }
        }
        if (whoCanWinDiagonalLeft().mostWinner !== "" || whoCanWinDiagonalRight().mostWinner !== "") {
            console.log(`win left: ${whoCanWinDiagonalLeft()}`);
            console.log(`win right: ${whoCanWinDiagonalRight()}`);
            console.log("win di")
            return false;
        }

        winner = "";
        isEnd = true;
        return true;
    }

    const winCheck = () => { //return who win
        for (let i = 0; i < 3; i++) {
            if (gameboardArray[0][i] === gameboardArray[1][i] && gameboardArray[0][i] === gameboardArray[2][i] && gameboardArray[0][i] !== "") {//check vertical
                isEnd = true;
                winner = gameboardArray[0][i];
                return { winner: gameboardArray[0][i], cond: `vertical at column ${i}` };
            }

            if (gameboardArray[i][0] === gameboardArray[i][1] && gameboardArray[i][0] === gameboardArray[i][2] && gameboardArray[i][0] !== "") { //check horizontal
                isEnd = true;
                winner = gameboardArray[i][0];
                return { winner: gameboardArray[i][0], cond: `horizontal at row ${i}` }
            }
        }

        if (gameboardArray[0][0] === gameboardArray[1][1] && gameboardArray[0][0] === gameboardArray[2][2] && gameboardArray[0][0] !== "") { //check diagonal left
            isEnd = true;
            winner = gameboardArray[0][0];
            return { winner: gameboardArray[0][0], cond: `diagonal left` };
        }

        if (gameboardArray[2][0] === gameboardArray[1][1] && gameboardArray[2][0] === gameboardArray[0][2] && gameboardArray[2][0] !== "") { //check diagonal right
            isEnd = true;
            winner = gameboardArray[2][0];
            return { winner: gameboardArray[2][0], cond: `diagonal right` };
        }


        return false;
    }

    const resetBoard = () => {
        gameboardArray = [["", "", ""], ["", "", ""], ["", "", ""]];
        turn = "x"
        isEnd = false;
    }

    const board = () => {
        return gameboardArray;
    }

    const getWinner = () => {
        return winner;
    }

    const botplay = (role) => {
        for (let i = 0; i < 3; i++) {
            const winDiLeftObj = whoCanWinDiagonalLeft();
            const winDiRightObj = whoCanWinDiagonalRight();
            const winVerticalObj = whoCanWinVertical(i);
            const winHorizontalObj = whoCanWinHorizontal(i);

            //prevent opponent from winning blank = 1
            if (winHorizontalObj.mostWinner !== role && winHorizontalObj.blankLocation.length === 1 && winHorizontalObj.mostWinner !== "") {
                console.log("case" + 1);
                play(i, winHorizontalObj.blankLocation[0]);
                return;
            } else if (winVerticalObj.mostWinner !== role && winVerticalObj.blankLocation.length === 1 && winVerticalObj.mostWinner !== "") {
                console.log("case" + 2);
                play(winVerticalObj.blankLocation[0], i)
                return;
            } else if (winDiLeftObj.mostWinner !== role && winDiLeftObj.blankLocation.length === 1 && winDiLeftObj.mostWinner !== "") {
                console.log("case" + 3);
                play(winDiLeftObj.blankLocation[0], winDiLeftObj.blankLocation[0])
                return;
            } else if (winDiRightObj.mostWinner !== role && winDiRightObj.blankLocation.length === 1 && winDiRightObj.mostWinner !== "") {
                console.log("case" + 4);
                play(winDiRightObj.blankLocation[0], 2 - winDiRightObj.blankLocation[0])
                return;
            }
        }
        console.log(1);

        for (let i = 0; i < 3; i++) {
            const winDiLeftObj = whoCanWinDiagonalLeft();
            const winDiRightObj = whoCanWinDiagonalRight();
            const winVerticalObj = whoCanWinVertical(i);
            const winHorizontalObj = whoCanWinHorizontal(i);

            //try to win blank = 1  
            if (winHorizontalObj.mostWinner === role && winHorizontalObj.blankLocation.length === 1) {
                play(i, winHorizontalObj.blankLocation[0]);
                return;
            } else if (winVerticalObj.mostWinner === role && winVerticalObj.blankLocation.length === 1) {
                play(winVerticalObj.blankLocation[0], i)
                return;
            } else if (winDiLeftObj.mostWinner === role && winDiLeftObj.blankLocation.length === 1) {
                play(winDiLeftObj.blankLocation[0], winDiLeftObj.blankLocation[0])
                return;
            } else if (winDiRightObj.mostWinner === role && winDiRightObj.blankLocation.length === 1) {
                play(winDiRightObj.blankLocation[0], 2 - winDiRightObj.blankLocation[0])
                return;
            }
            console.log(2);
        }

        for (let i = 0; i < 3; i++) {
            const winDiLeftObj = whoCanWinDiagonalLeft();
            const winDiRightObj = whoCanWinDiagonalRight();
            const winVerticalObj = whoCanWinVertical(i);
            const winHorizontalObj = whoCanWinHorizontal(i);
            //prevent opponent from winning blank = 2
            if (winHorizontalObj.mostWinner !== role && winHorizontalObj.blankLocation.length === 2 && winHorizontalObj.mostWinner !== "") {
                play(i, winHorizontalObj.blankLocation[0]);
                return;
            } else if (winVerticalObj.mostWinner !== role && winVerticalObj.blankLocation.length === 2 && winVerticalObj.mostWinner !== "") {
                play(winVerticalObj.blankLocation[0], i)
                return;
            } else if (winDiLeftObj.mostWinner !== role && winDiLeftObj.blankLocation.length === 2 && winDiLeftObj.mostWinner !== "") {
                play(winDiLeftObj.blankLocation[0], winDiLeftObj.blankLocation[0])
                return;
            } else if (winDiRightObj.mostWinner !== role && winDiRightObj.blankLocation.length === 2 && winDiRightObj.mostWinner !== "") {
                play(winDiRightObj.blankLocation[0], 2 - winDiRightObj.blankLocation[0])
                return;
            }
            console.log(3);
        }

        for (let i = 0; i < 3; i++) {
            const winDiLeftObj = whoCanWinDiagonalLeft();
            const winDiRightObj = whoCanWinDiagonalRight();
            const winVerticalObj = whoCanWinVertical(i);
            const winHorizontalObj = whoCanWinHorizontal(i);
            //try to win blank = 2 
            if (winHorizontalObj.mostWinner === role && winHorizontalObj.blankLocation.length === 2) {
                play(i, winHorizontalObj.blankLocation[0]);
                return;
            } else if (winVerticalObj.mostWinner === role && winVerticalObj.blankLocation.length === 2) {
                play(winVerticalObj.blankLocation[0], i)
                return;
            } else if (winDiLeftObj.mostWinner === role && winDiLeftObj.blankLocation.length === 2) {
                play(winDiLeftObj.blankLocation[0], winDiLeftObj.blankLocation[0])
                return;
            } else if (winDiRightObj.mostWinner === role && winDiRightObj.blankLocation.length === 2) {
                play(winDiRightObj.blankLocation[0], 2 - winDiRightObj.blankLocation[0])
                return;

            }
            console.log(4);
        }

        for (let i = 0; i < 3; i++) {
            const winDiLeftObj = whoCanWinDiagonalLeft();
            const winDiRightObj = whoCanWinDiagonalRight();
            const winVerticalObj = whoCanWinVertical(i);
            const winHorizontalObj = whoCanWinHorizontal(i);
            //play blank = 3
            if (winHorizontalObj.blankLocation.length === 3) {
                play(i, winHorizontalObj.blankLocation[0]);
                return;
            } else if (winVerticalObj.blankLocation.length === 3) {
                play(winVerticalObj.blankLocation[0], i)
                return;
            } else if (winDiLeftObj.blankLocation.length === 3) {
                play(winDiLeftObj.blankLocation[0], winDiLeftObj.blankLocation[0])
                return;
            } else if (winDiRightObj.blankLocation.length === 3) {
                play(winDiRightObj.blankLocation[0], 2 - winDiRightObj.blankLocation[0])
                return;
            }
            console.log(5);

        }
    }

    return { winCheck, isTie, resetBoard, board, whoseTurn, play, getWinner, botplay, player1, player2 };
}


function displayController() {
    const game = createGameboard(sessionStorage.getItem("player1"), sessionStorage.getItem("player2"));
    const resetBtn = document.querySelector("#resetBtn");

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

    const unCheck = (slot) => {
        slot.firstChild.classList.remove("cross");
        slot.firstChild.classList.remove("radio");

        slot.firstChild.textContent = "";
    }


    const displayWinner = () => {
        const dialog = document.querySelector("dialog");
        const dialogMsg = document.querySelector("dialog span");
        if (game.getWinner() === "x") {
            dialogMsg.textContent = game.player1;
        } else if (game.getWinner() === "o") {
            dialogMsg.textContent = game.player2;
        } else {
            dialogMsg.textContent = "Tie";
        }


        resetBtn.addEventListener("click", () => {
            game.resetBoard();
            dialog.close();
            render();
        });
        dialog.showModal();
    }

    const render = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (game.board()[i][j] === "x") {
                    crossCheck(slots[i][j]);
                } else if (game.board()[i][j] === "o") {
                    radioCheck(slots[i][j]);
                } else {
                    unCheck(slots[i][j]);
                }
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            slots[i][j].addEventListener("click", () => {
                if (game.play(i, j)) {
                    render();

                    if (game.winCheck() || game.isTie()) {
                        console.log(game.winCheck());
                        console.log(game.isTie());
                        displayWinner();
                        return;
                    }

                    if (game.player2 === "Bot") {
                        game.botplay("o")
                        render();
                        if (game.winCheck() || game.isTie()) {
                            console.log(game.winCheck());
                            console.log(game.isTie());
                            displayWinner();
                            return;
                        }
                    }



                }


            })
        }
    }

    return {}
}

const display = displayController();