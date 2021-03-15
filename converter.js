const frase = "hoje eu programei em Python arogramei";

// const alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");

const palavras = frase.split(" ");

const maior = palavras.sort((a, b) => b.length - a.length)[0];

const palavrasSelecionadas = new Set(
  palavras
    .filter((item) => item.length === maior.length)
    .sort((a, b) => (a < b ? -1 : 1))
);

let novaFrase = frase;

palavrasSelecionadas.forEach((item) => {
  novaFrase = novaFrase.replace(new RegExp(item, "g"), item[0] + ".");
});

console.log(novaFrase);
console.log([...palavrasSelecionadas].length);
palavrasSelecionadas.forEach((item) => {
  console.log(`${item[0]}. = ${item}`);
});
