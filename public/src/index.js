// Not related to game logic
// Called at the footer partial for all pages

// ------------------ Toggle Sound ------------------ //

soundButton = document.querySelector('.toggle-sound');
music = document.querySelector('.music');

let soundOn = soundButton.classList.contains('sound-on') ? true : false

soundButton.addEventListener('click',toggleSound)

function toggleSound () {
    if (soundOn) {
        soundOn = false;

        soundButton.classList.remove('sound-on')
        soundButton.classList.add('sound-off')
        music.pause()

        fetch('/sound',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"soundOn":soundOn})
        })
    } else {
        soundOn = true;

        soundButton.classList.remove('sound-off')
        soundButton.classList.add('sound-on')
        music.play()

        fetch('/sound',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"soundOn":soundOn})
        })
    }
}