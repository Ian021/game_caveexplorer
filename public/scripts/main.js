
/* ------------------------------------- PAUSE -------------------------------------*/
let gamePaused = false;

function pause() {
    var x = document.getElementsByClassName("play-pause")[0];
    if (gamePaused === true) {
        x.style.backgroundColor = "#07070700"
        gamePaused = false
    } else {
        x.style.backgroundColor = "#07070780"
        gamePaused = true
    }
  }