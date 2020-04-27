
export class Events{
    gameOver(playerName,level){
        var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

        fetch('/ranking', {
            credentials: 'same-origin', // <-- includes cookies in the request
            headers: {
              'Content-Type': 'application/json',
              'CSRF-Token': token // <-- is the csrf token as a header
            },
            method: 'POST',
            body: JSON.stringify({ player:playerName,score:level })
        })
        
        window.location.replace(document.querySelector('.game-over').value)
    }
}