const qttFeudo = 6;
const carruagemCapacidade = 10;

const impostos = [0, 10, 10, 10, 10, 10];

const caminhos = [
  [1, 4, 7],
  [5, 1, 2],
  [3, 5, 3],
  [2, 5, 2],
  [6, 5, 2],
];

const vertices = {};

function inserirAresta(pai, id, peso) {
  if (vertices[pai]) {
    vertices[pai].filhos.push({ id, peso, imposto: impostos[id - 1] });
  } else {
    vertices[pai] = {
      filhos: [{ id, peso, imposto: impostos[id - 1] }],
      imposto: impostos[pai - 1],
    };
  }
}

caminhos.forEach((item) => {
  const [origem, destino, peso] = item;
  inserirAresta(origem, destino, peso);
  inserirAresta(destino, origem, peso);
});

function verificarDistancia(id, pai) {
  const raiz = vertices[id];
  let distancia = 0;
  let nos = raiz.filhos.filter((item) => item.id !== pai);
  let no = nos.shift();
  while (no) {
    let nosDoFilho = vertices[no.id];
    if (nosDoFilho.filhos.length < 2) {
      distancia += no.peso * 2 * Math.ceil(no.imposto / carruagemCapacidade);
      raiz.imposto += no.imposto;
    } else {
      const { distanciaAtual, imposto } = verificarDistancia(no.id, id);
      distancia += distanciaAtual;
      distancia += no.peso * 2 * Math.ceil(imposto / carruagemCapacidade);
    }
    no = nos.shift();
  }
  return { distanciaAtual: distancia, imposto: raiz.imposto };
}

console.log(verificarDistancia(1, null).distanciaAtual);
