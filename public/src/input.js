
export class InputHandler{
    constructor(player){
        document.addEventListener('keydown',function(event){
            switch(event.keyCode) {
                case 37:
                    player.speed.x = -1
                    break
                case 38:
                    player.speed.y = -1
                    break
                case 39:
                    player.speed.x = 1
                    break
                case 40:
                    player.speed.y = 1
                    break
            }
        })
        document.addEventListener('keyup',function(e){
            player.speed.x = 0
            player.speed.y = 0
        })
    }
}