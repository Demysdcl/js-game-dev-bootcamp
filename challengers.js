let [conjuntoA, conjuntoB] = ["abcdef", "ABCDE"];

const menor = conjuntoA.length <= conjuntoB.length ? conjuntoA : conjuntoB;
const maior = conjuntoA.length <= conjuntoB.length ? conjuntoB : conjuntoA;

let combinacao = "";

for (let x = 0; x < menor.length; x++) {
  combinacao += conjuntoA[x];
  combinacao += conjuntoB[x];
}

console.log(combinacao + maior.substring(menor.length, maior.length));
