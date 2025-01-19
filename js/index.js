document.querySelector("#playBtn").addEventListener("click", () => {
    sessionStorage.setItem("player1", document.querySelector("#player1Input").value);
    sessionStorage.setItem("player2", document.querySelector("#player2Input").value);

    window.location.href = "html/game.html";

})