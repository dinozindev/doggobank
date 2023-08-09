import selecionaCotacao from "./imprimeCotacao.js";
// armazena na const graficoDolar o canvas de id "graficoDolar"
const graficoDolar = document.getElementById("graficoDolar");

// const graficoParaDolar que representa o novo gráfico criado (new Chart), que usa como base o canvas de id graficoDolar. Possui o tipo de gráfico de linha (type: line), com as legendas inferiores (labels), e com as informações/dados verticais presentes em datasets. 
const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Dólar',
      data: [],
      borderWidth: 1
    }]
  }
});

// function responsável por obter o horário atual quando for invocada. 
function geraHorario() {
  // cria uma nova data armazenada na variável data.
  let data = new Date();
  // armazena na let horario apenas as horas, minutos e segundos do objeto data, separados por dois pontos. 
  let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  // retorna o horário atual. 
  return horario;
}

// function responsável por atualizar os dados do gráfico a cada 5 segundos através da informações passadas função assíncrona conectaAPI. 
function adicionarDados(grafico, tempoAtual, cotacaoAtual) {
  // o valor do horario atual (tempoAtual) será "pushed" para dentro do array labels.  
  grafico.data.labels.push(tempoAtual)
  // o valor da cotação atual (cotacaoAtual) será "pushed" para dentro do array data, contido em datasets.
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(cotacaoAtual)
  })
  grafico.update();
}

// cria o WebWorker armazenado na variável workerDolar.  
let workerDolar = new Worker('./script/workers/workerDolar.js');
// envia a mensagem "usd" para o WebWorker "workerDolar".
workerDolar.postMessage("usd");

// recebe o valor da cotacao atual pela mensagem enviada pelo workerDolar, e atribui o valor ao "event". Esse evento será acionado a cada 5 segundos, devido ao setInterval() presente no workerDolar.  
workerDolar.addEventListener("message", (event) => {
  // atribui à variável tempo o valor retornado pela function geraHorario(), correspondente ao tempo da cotação.
  let tempo = geraHorario();
  // atribui à variável cotacao o valor da propriedade "ask" do event, que corresponde ao valor da cotação atual. 
  let cotacao = event.data.ask;
  // invoca a function selecionaCotacao(), passando como parâmetros a string "dolar", e o valor da cotação atual. 
  selecionaCotacao("dolar", cotacao);
  // invoca a function adicionarDados(), passando como parâmetros o gráfico da cotação do dólar, o tempo atual e a cotação atual, atualizando o gráfico com esses novos dados. 
  adicionarDados(graficoParaDolar, tempo, cotacao);
})


// armazena na const graficoIene o canvas de id "graficoIene"
const graficoIene = document.getElementById("graficoIene");

// const graficoParaIene que representa o novo gráfico criado (new Chart), que usa como base o canvas de id graficoIene.
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      data: [],
      borderWidth: 1,
      borderColor: "#000"
    }]
  }
});

let workerIene = new Worker("./script/workers/workerIene.js");
workerIene.postMessage("iene");

workerIene.addEventListener("message", (e) => {
  let tempo = geraHorario();
  let cotacao = e.data.ask;
  adicionarDados(graficoParaIene, tempo, cotacao);
  selecionaCotacao("iene", cotacao)
})

const graficoEuro = document.getElementById("graficoEuro");

const graficoParaEuro = new Chart(graficoEuro, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Euro',
      data: [],
      borderWidth: 1,
      borderColor: "red",
      backgroundColor: "#f09d9c"
    }]
  }
})

let workerEuro = new Worker("./script/workers/workerEuro.js");
workerEuro.postMessage("euro");

workerEuro.addEventListener("message", (e) => {
  let tempo = geraHorario();
  let cotacao = e.data.ask;
  adicionarDados(graficoParaEuro, tempo, cotacao);
  selecionaCotacao("euro", cotacao);
})




