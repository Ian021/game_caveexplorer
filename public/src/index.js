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
        changeUrlParams(soundOn)
        music.pause()

    } else {
        soundOn = true;

        soundButton.classList.remove('sound-off')
        soundButton.classList.add('sound-on')
        changeUrlParams(soundOn)
        music.play()

    }
}

function changeUrlParams (soundOn) {
    document.querySelectorAll('a').forEach(element => {
        element.href = element.href.replace(`soundOn=${!soundOn}`,`soundOn=${soundOn}`)
    })
    document.querySelectorAll('.sound-on-form').forEach(element => {
        element.value = soundOn
        console.log(element)
    })    
}