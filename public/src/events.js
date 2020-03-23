
export class Events{
    gameOver(playerName,level){
        let ajax = new XMLHttpRequest()
        ajax.open('POST','/ranking')
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({player:playerName,score:level}))
        window.location.replace(document.querySelector('.game-over').value)
    }
}