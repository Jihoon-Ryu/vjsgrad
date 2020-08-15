const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(randomNumber012) {
  //이미지 소환
  const image = new Image();
  image.src = `VJS.images/${randomNumber012 + 1}.jpg`;
  //이미지 크기 조절 CSS
  image.classList.add("bgImage");
  //?
  body.prepend(image);
  //내용물을 이미지 안에 넣기
  image.appendChild(".js-clock", ".js-form", ".js-greetings", ".js-toDoForm");
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

init();
