onmessage = function(message) {
    // Dados enviados ao worker.
    const { data } = message;

    // Matriz contendo o resultado da multiplicação de matriz.
    const matrizResultante = multiplicacaoParcialMatriz(data.parteMatrizA, data.matrizB);    

    // Forma de chamar o metodo.
    this.self.postMessage({matrizResultante, id: data.id});
}

// Realiza calculo parcial da multiplicação da matriz.
function multiplicacaoParcialMatriz(elementoMatrizA, matrizB) {
    // Armazena o somatório da multiplicação de linha da matriz A e a matriz B.
    let somatorioLinha = 0;
    // Armazena o resultado final do calculo.
    let matrizResultante = [];
    // Contador para a matriz resultante.
    let matrizResultanteCount = 0;

    // Passando as linhas da matriz B.
    for(let countInterno = 0; countInterno < matrizB.length; countInterno++) {
        let linhaMatrizB = matrizB[countInterno];

        // Calculo de linha.
        for(let countC = 0; countC < linhaMatrizB.length; countC++){
            somatorioLinha += elementoMatrizA[countC] * matrizB[countInterno][countC];
        }
        matrizResultante[matrizResultanteCount] = somatorioLinha;
        matrizResultanteCount++;
        somatorioLinha = 0;
    }

    return matrizResultante;
}