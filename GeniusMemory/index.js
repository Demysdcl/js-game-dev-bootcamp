let order = [];
let clickedOrder = [];
let score = 0;

const colors = [
  document.querySelector(".green"),
  document.querySelector(".red"),
  document.querySelector(".yellow"),
  document.querySelector(".blue"),
];

const shuffleOrder = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;

  console.log(order);

  clickedOrder = [];

  order.forEach((item) => {
    lightColor(colors[item], item + 1);
  });
};

const lightColor = (element, time) => {
  time *= 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, time - 250);

  setTimeout(() => {
    element.classList.remove("selected");
  }, time);
};

const checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    score++;
    alert(`Score: ${score}\nYou're right! Initing the next level`);
    nextLevel();
  }
};

const click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  colors[color].classList.add("selected");

  setTimeout(() => {
    colors[color].classList.remove("selected");
    checkOrder();
  }, 250);
};

const nextLevel = () => {
  shuffleOrder();
};

const gameOver = () => {
  alert(`Score: ${score}\nYou lose\nClick OK to start a new match`);
  order = [];
  clickedOrder = [];
  score = 0;
  playGame();
};

const playGame = () => {
  alert("Welcome to the game Genius!\nIniting new game");
  nextLevel();
};

colors.forEach((item, index) => (item.onclick = () => click(index)));

playGame();
