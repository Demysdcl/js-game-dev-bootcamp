let winner = null;
let plays = 0;

let selectedPlayer = document.getElementById("selected-player");
const squares = document.querySelectorAll(".line > div");
const badge = document.querySelector(".winner");
const familyName = document.getElementById("name");
const image = document.getElementById("image");

const families = {
  stark: {
    name: "Stark",
    class: "stark",
    color: "#323338",
  },
  targaryen: {
    name: "Targaryen",
    class: "targaryen",
    color: "#691a10",
  },
};

changePlayer(families.stark);

function chooseSquare() {
  const element = this.event.target;
  if (element.classList.length > 0) return;

  plays++;
  element.classList.add(currentPlayer.class);

  changePlayer(
    currentPlayer === families.stark ? families.targaryen : families.stark
  );
  checkWinner();
}

function changePlayer(family) {
  currentPlayer = family;
  selectedPlayer.innerHTML = family.name;
}

function checkWinner() {
  if (plays < 5) return;

  if (
    verifyHorizontalAndVertical() ||
    hasSameClass(squares[0], squares[4], squares[8]) ||
    hasSameClass(squares[2], squares[4], squares[6])
  ) {
    const familyWinner = families[winner];

    badge.style.display = "flex";
    familyName.innerHTML = familyWinner.name;
    familyName.style.color = familyWinner.color;
    image.src = `./images/${winner}.jpeg`;
  }
}

function verifyHorizontalAndVertical() {
  let hasWinner = false;
  for (let i = 0; i < 3; i++) {
    if (
      hasSameClass(
        squares[0 + i * 3],
        squares[1 + i * 3],
        squares[2 + i * 3]
      ) ||
      hasSameClass(squares[0 + i], squares[3 + i], squares[6 + i])
    ) {
      hasWinner = true;
      break;
    }
  }
  return hasWinner;
}

function hasSameClass(element1, element2, element3) {
  if (
    !!getClass(element1) &&
    getClass(element1) === getClass(element2) &&
    getClass(element2) === getClass(element3)
  ) {
    winner = getClass(element1);
    return true;
  }
  return false;
}

function getClass(element) {
  return element.classList[0];
}

function restart() {
  badge.style.display = "none";
  plays = 0;
  changePlayer(families.stark);
  squares.forEach((item) => {
    item.classList.remove("stark");
    item.classList.remove("targaryen");
  });
}
