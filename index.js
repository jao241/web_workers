// Conjunto de threads;
let arraysThreads = [];

// Variáveis de controle para geração dos valores das matrizes.

// Intervalo de numeros gerados (sem limite estipulado).
const intervaloNumerico = 100000000;
// Quantidade de que cada conjunto terá (maior intervalo alcançado: 172).
const quantidadeNumeros = 172;
//  Quantidade de linhas de uma matriz.
const quantidadeValoresMatriz = quantidadeNumeros;

// Armazena os valores acumulados do calculo realizado pelos workers.
const matrizDesordenada = [];
// Armazena os valores ordenados na matriz desordenada.
let matrizFinal = [];

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

// Gerando os web workers e enviando os dados das matrizes para o calculo.
for(let count = 0; count < quantidadeValoresMatriz; count++) {
    arraysThreads[count] = new Worker('worker.js');
    arraysThreads[count].postMessage({
        parteMatrizA: matrizA[count],
        matrizB,
        id: count
    });
}

// Escutando a resposta dos workers.
arraysThreads.forEach((worker) => {
    // Capturando mensagem devolvida.
    worker.onmessage = (message) => {
        const { data } = message;
        // Salvando em um array.
        matrizDesordenada.push(data);
        // Eliminando o worker.
        worker.terminate();
    }
});

setTimeout(() =>{
    console.table(matrizDesordenada);
    matrizFinal = matrizDesordenada.sort((a, b) => a -b);
    // console.table(matrizFinal);
}, 3000);
