document.querySelector("#playBtn").addEventListener("click", () => {
    sessionStorage.setItem("player1", document.querySelector("#player1Input").value);
    sessionStorage.setItem("player2", document.querySelector("#player2Input").value);
    if (document.querySelector("#bot").checked === true) {
        sessionStorage.setItem("player2", "Bot");
    }

    window.location.href = "html/game.html";

})

document.querySelector("#bot").addEventListener("input", () => {
    if (document.querySelector("#bot").checked === true) {

        document.querySelector("#player2Input").disabled = true;
    } else {
        document.querySelector("#player2Input").disabled = false;
    }

})