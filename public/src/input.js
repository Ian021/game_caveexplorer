
export class InputHandler{
    constructor(player){
        this.gamePaused = false;
        this.enableCommands();

        document.addEventListener('keydown',this.spacebarPause.bind(this))
        document.addEventListener('keyup',this.stopCommand)
    }

    enableCommands(){
        document.addEventListener('keydown',this.keyboardCommands)
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

    stopCommand(event){
        player.speed.x = 0
        player.speed.y = 0
    }

    keyboardCommands(event){
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
    }

    buttonDirection(direction) {
        if (!this.gamePaused){
            switch(direction) {
                case "LEFT":
                    player.speed.x = -1
                    break
                case "UP":
                    player.speed.y = -1
                    break
                case "RIGHT":
                    player.speed.x = 1
                    break
                case "DOWN":
                    player.speed.y = 1
                    break
            }
        }
    }

    usePower() {
        window.location.replace("/ranking");
    }

    pause() {
        const x = document.getElementsByClassName("play-pause")[0];
        if (this.gamePaused === true) {
            x.style.backgroundColor = "#07070700" 
            this.gamePaused = false
            this.enableCommands()
        } else {
            this.disableCommands()
            this.stopCommand()
            x.style.backgroundColor = "#07070780"
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