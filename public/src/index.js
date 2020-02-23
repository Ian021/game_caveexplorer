// Not related to game logic
// Called at the footer partial for all pages

// ------------------ Toggle Sound ------------------ //

let soundOn = true;

soundButton = document.querySelector('.toggle-sound');
// soundImage = document.querySelector('.toggle-sound img');
music = document.querySelector('.music');

soundButton.addEventListener('click',toggleSound)

function toggleSound () {
    if (soundOn) {
        soundOn = false;

        soundButton.classList.remove('sound-on')
        soundButton.classList.add('sound-off')
        music.pause()
    } else {
        soundOn = true;

        soundButton.classList.remove('sound-off')
        soundButton.classList.add('sound-on')
        music.play()
    }
}

// console.log('This is working!!!')