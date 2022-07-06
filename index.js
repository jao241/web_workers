// Conjunto de threads;
let arraysThreads = [];

// Variáveis de controle para geração dos valores das matrizes.

// Intervalo de numeros gerados (sem limite estipulado).
const intervaloNumerico = 10;
// Quantidade de que cada conjunto terá (maior intervalo alcançado: 172).
const quantidadeNumeros = 10;
//  Quantidade de linhas de uma matriz.
const quantidadeValoresMatriz = quantidadeNumeros;

// Armazena os valores acumulados do calculo realizado pelos workers.
const matrizDesordenada = [];
// Armazena os valores ordenados na matriz desordenada.
let matrizFinal = [];

// Variáveis contendo as matrizes.
const matrizA = geraValoresMatriz(quantidadeValoresMatriz);
const matrizB = geraValoresMatriz(quantidadeValoresMatriz);

// Gerando os web workers e enviando os dados das matrizes para o calculo.
geraWorkers();
// Escutando a resposta dos workers.
escutaWorkers();

// Exibição do resultado final.
setTimeout(() =>{
    console.log("Valores na matriz desordenada: ");
    console.table(matrizDesordenada);
    console.log('\n');
    console.log("Valores das matrizes resultantes: ");
    console.table(matrizDesordenada.map((array) => {
        return array.matrizResultante;
    }));
}, 3000);

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

function geraWorkers() {
    for(let count = 0; count < quantidadeValoresMatriz; count++) {
        // novo web worker
        arraysThreads[count] = new Worker('worker.js');
        // Enviando dados para a thread.
        arraysThreads[count].postMessage({
            parteMatrizA: matrizA[count],
            matrizB,
            id: count
        });
    }
}

function escutaWorkers() {
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
}

