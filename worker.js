// Realiza calculo parcial da multiplicação da matriz.
function multiplicacaoParcialMatriz(elementoMatrizA, matrizB) {
    let somatorioLinha = 0;
    let matrizResultante = [];
    let matrizResultanteCount = 0;

    for(let countInterno = 0; countInterno < matrizB.length; countInterno++) {
        let linhaMatrizB = matrizB[countInterno];

        for(let countC = 0; countC < linhaMatrizB.length; countC++){
            somatorioLinha += elementoMatrizA[countC] * matrizB[countInterno][countC];
        }
        matrizResultante[matrizResultanteCount] = somatorioLinha;
        matrizResultanteCount++;
        somatorioLinha = 0;
    }

    return matrizResultante;
}

onmessage = function(message) {
    const { data } = message;
    const matrizResultante = multiplicacaoParcialMatriz(data.parteMatrizA, data.matrizB);    

    this.self.postMessage({matrizResultante, id: data.id});
}