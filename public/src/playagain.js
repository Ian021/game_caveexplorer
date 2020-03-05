
document.addEventListener('keydown',playAgain)

function playAgain(event){
    switch(event.keyCode){
        case 13:
            window.location.replace(document.querySelector('.play-again').value)
        case 32:
            window.location.replace(document.querySelector('.play-again').value)
    }
}