const Grafo = () => {
  let vertices = [];

  return {
    inserirAresta(pai, id, peso) {
      if (vertices[pai]) {
        vertices[pai].push({ id, peso });
      } else {
        vertices[pai] = [{ id, peso }];
      }
    },
    getVertices: () => vertices,
    getArestas: (id) => vertices[id],
    getLength: () => vertices.length,
  };
};

const FilaPrioridade = () => {
  let info = [];

  return {
    inserir: (id, distancia) => info.push({ id, distancia }),
    removerMenor() {
      let idxMenor = 0;
      for (let i = 1; i < info.length; i++) {
        if (info[i].distancia < info[idxMenor].distancia) {
          idxMenor = i;
        }
      }
      return info.splice(idxMenor, 1)[0].id;
    },
    editar(id, distancia) {
      for (let i = 0; i < info.length; i++) {
        if (info[i].id === id) {
          info[i].distancia = distancia;
          break;
        }
      }
    },
    ehVazia: () => info.length === 0,
    log: () => console.log(info),
  };
};

const dijkstra = (grafo, s) => {
  let nVertices = grafo.getLength();
  let maduro = [];
  let pai = [];
  let dist = [];
  for (let v = 0; v < nVertices; v++) {
    pai[v] = -1;
    maduro[v] = false;
    dist[v] = Number.MAX_SAFE_INTEGER;
  }
  pai[s] = s;
  dist[s] = 0;
  let PQ = FilaPrioridade();
  for (let v = 0; v < nVertices; v++) {
    PQ.inserir(v, dist[v]);
  }
  while (!PQ.ehVazia()) {
    let y = PQ.removerMenor();
    if (dist[y] === Number.MAX_SAFE_INTEGER) break; // achou uma floresta
    grafo.getArestas(y).forEach((a) => {
      if (!maduro[a.id]) {
        if (dist[a.id] > dist[y] + a.peso) {
          dist[a.id] = dist[y] + a.peso;
          PQ.editar(a.id, dist[a.id]);
          pai[a.id] = y;
        }
      }
    });
    maduro[y] = true;
  }
  return { pai, dist };
};

let grafo = Grafo();

var lines = [
  [1, 4, 7],
  [5, 1, 2],
  [3, 5, 3],
  [2, 5, 2],
  [6, 5, 2],
];

let S = parseInt(lines.shift());

let line = lines.shift();
while (line) {
  let [origem, destino, peso] = line;
  grafo.inserirAresta(origem, destino, peso);
  grafo.inserirAresta(destino, origem, peso);
  line = lines.shift();
}
console.log(grafo.getVertices());
console.log(dijkstra(grafo, S));
