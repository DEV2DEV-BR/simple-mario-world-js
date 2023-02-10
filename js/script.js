const body = document.querySelector("body");
const mario = document.querySelector(".mario");
const soundControl = document.querySelector(".sound-control");
const audioTheme = document.querySelector(".audio-theme");
const audioEffects = document.querySelector(".audio-effects");

let walkingTo = "right";

soundControl.addEventListener("click", () => {
  audioTheme.volume = 0.1;

  if (soundControl.src.includes("off")) {
    soundControl.src = "../assets/sound-on.svg";
    audioTheme.play();
    return;
  }
  soundControl.src = "../assets/sound-off.svg";
  audioTheme.pause();
});

function calculeNewPosition(positionIncrement) {
  return mario.style.left
    ? getCurrentPosition() + positionIncrement
    : positionIncrement;
}

function getCurrentPosition() {
  return parseInt(mario.style.left.split("px")[0]) | 0;
}

body.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "d":
      walkingTo = "right";

      mario.src = mario.src.includes("walking")
        ? "../assets/right.png"
        : "../assets/right-walking.png";

      if (getCurrentPosition() < window.innerWidth - 120) {
        mario.style.left = `${calculeNewPosition(15)}px`;
      }
      break;
    case "a":
      walkingTo = "left";

      mario.src = mario.src.includes("walking")
        ? "../assets/left.png"
        : "../assets/left-walking.png";

      if (getCurrentPosition() > 15) {
        mario.style.left = `${calculeNewPosition(-15)}px`;
      }

      break;
    case "w":
      mario.src = mario.src.includes("walking")
        ? `../assets/${walkingTo}.png`
        : `../assets/${walkingTo}-walking.png`;

      mario.style.bottom = "320px";

      setTimeout(() => {
        audioEffects.volume = 1;
        audioEffects.play();

        mario.style.bottom = "120px";

        mario.src = mario.src.includes("walking")
          ? `../assets/${walkingTo}.png`
          : `../assets/${walkingTo}-walking.png`;
      }, 200);
      break;

    default:
      break;
  }
});
