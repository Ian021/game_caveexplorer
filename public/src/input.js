
export class InputHandler{
    constructor(player,monster){
        this.gamePaused = false;
        this.enableCommands();
        this.player = player
        this.monster = monster

        document.addEventListener('keydown',this.spacebarPause.bind(this))
        document.addEventListener('keyup',()=>{this.move('STOP')})
    }

    enableCommands(){
        document.addEventListener('keydown',this.keyboardCommands.bind(this))
        document.querySelectorAll(".commands-move img").forEach(element => {element.classList.remove("commands-move-disabled")});
        document.querySelector(".commands-power").classList.remove("commands-power-disabled")
        document.querySelector(".move-circle").classList.remove("move-circle-disabled")
        document.querySelector(".pause-text").classList.add("pause-text-hide")
    }

    spacebarPause() {
        switch (event.keyCode){
            case 32: this.pause()
            break
        }
    }

    move(direction) {
        if (!this.gamePaused){
            switch(direction){
                case 'LEFT':
                    this.move('STOP')
                    this.player.speed.x = -1
                    break
                case 'UP':
                    this.move('STOP')
                    this.player.speed.y = -1
                    break
                case 'RIGHT':
                    this.move('STOP')
                    this.player.speed.x = 1
                    break
                case 'DOWN':
                    this.move('STOP')
                    this.player.speed.y = 1
                    break
                case 'STOP':
                    this.player.speed.x = 0
                    this.player.speed.y = 0
                    break
            }
        }
    }

    keyboardCommands(event){
        switch(event.keyCode) {
            case 37:
                this.move('LEFT')
                break
            case 65:
                this.move('LEFT')
                break
            case 38:
                this.move('UP')
                break
            case 87:
                this.move('UP')
                break
            case 39:
                this.move('RIGHT')
                break
            case 68:
                this.move('RIGHT')
                break
            case 40:
                this.move('DOWN')
                break
            case 83:
                this.move('DOWN')
                break
        }
    }

    usePower() {
        
    }

    pause() {
        const x = document.getElementsByClassName("play-pause")[0];
        if (this.gamePaused === true) {
            x.style.backgroundColor = "#07070700" 
            this.gamePaused = false
            this.enableCommands()
            this.monster.pause(false)
        } else {
            this.disableCommands()
            this.move('STOP')
            x.style.backgroundColor = "#07070780"
            this.monster.pause(true)
            this.gamePaused = true
        }
    }

    disableCommands(){
        document.removeEventListener('keydown',this.keyboardCommands)
        document.querySelectorAll(".commands-move img").forEach(element => {element.classList.add("commands-move-disabled")});
        document.querySelector(".commands-power").classList.add("commands-power-disabled")
        document.querySelector(".move-circle").classList.add("move-circle-disabled")
        document.querySelector(".pause-text").classList.remove("pause-text-hide")
    }
}