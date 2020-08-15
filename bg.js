const body = document.querySelector("body");

const IMG_NUMBER = 3;

const image = new Image();

function paintImage(randomNumber012) {
  image.src = `VJS.images/${randomNumber012 + 1}.jpg`;

  image.classList.add("bgImage");

  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  //0 1 2
  return number;
}

function init() {
  const randomNumber012 = genRandom();
  paintImage(randomNumber012);
}
function remove() {
  const randomNumber012 = genRandom();
  image.src = `VJS.images/${randomNumber012 + 1}.jpg`;
  body.prepend(image);
  body.removeChild(image);
}

setInterval(remove, 99000);
remove();

setInterval(init, 100000);
init();
