// Conjunto de threads;
let arraysThreads = [];

// Variáveis de controle para geração dos valores das matrizes.
const intervaloNumerico = 10;
const quantidadeNumeros = 5;
const quantidadeValoresMatriz = 5;

// Variáveis contendo as matrizes.
const matrizA = geraValoresMatriz(quantidadeValoresMatriz);
const matrizB = geraValoresMatriz(quantidadeValoresMatriz);

// Gera números aleatórios para povoar as matrizes.
function geraValoresConjuntoRandomicos(intervalo, quantidade) {
    let conjunto = [];

    for(let count = 0; count < quantidade; count++) {
        const valor = Number((Math.random() * intervalo).toFixed(0));
        conjunto.push(valor);
    }

    return conjunto;
}

// Gera matriz com os números aleatórios.
function geraValoresMatriz(quantidade) {
    let matriz = [];

    for(let count = 0; count < quantidade; count++) {
        matriz.push(geraValoresConjuntoRandomicos(intervaloNumerico, quantidadeNumeros));
    }

    return matriz;
}

// Gerando as threads.
const work1 = new Worker('worker.js');
const work2 = new Worker('worker.js');
const work3 = new Worker('worker.js');
const work4 = new Worker('worker.js');
const work5 = new Worker('worker.js');

work1.postMessage({
    parteMatrizA: matrizA[0],
    matrizB
});

work2.postMessage({
    parteMatrizA: matrizA[1],
    matrizB
});

work3.postMessage({
    parteMatrizA: matrizA[2],
    matrizB
});

work4.postMessage({
    parteMatrizA: matrizA[3],
    matrizB
});

work5.postMessage({
    parteMatrizA: matrizA[4],
    matrizB
});

work1.onmessage = function(message) {
    const { data } = message;
    console.log(message);
}

work2.onmessage = function(message) {
    const { data } = message;
    console.log(message);
}

work3.onmessage = function(message) {
    const { data } = message;
    console.log(message);
}

work4.onmessage = function(message) {
    const { data } = message;
    console.log(message);
}

work5.onmessage = function(message) {
    const { data } = message;
    console.log(message);
}
    


// Forma de se instanciar threads no JS.
// const worker = new Worker('worker.js');

// const matrizPosicao0 = matrizA[0];
// console.log(matrizPosicao0)

// worker.postMessage({
//     parteMatrizA: matrizA[0],
//     matrizB
// });

// worker.onmessage = function(message) {
//     console.log(message.data);
// }


console.log("Fim do script!")