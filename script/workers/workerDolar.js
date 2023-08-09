 // recebe a mensagem enviada pela thread principal.
 addEventListener("message", () => {
    // executa uma primeira vez a function conectaAPI(), para que os dados sejam exibidos na tela e o fetch da API seja feito. 
    conectaAPI();
    // invoca a function conectaAPI em um intervalo 5 segundos em um loop infinito até que o site seja fechado. 
    setInterval(() => conectaAPI(), 10000)
 })
 
 // function assíncrona responsável por fazer uma requisição a API de conversão de moedas. 
 async function conectaAPI() {
    // const que armazena os dados obtidos no fetch da API.
    const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    // const que armazena os dados convertidos para json, para que possa ser manipulado pelo JavaScript.
    const conectaJson = await conecta.json();
    // envia a cotação atual para a thread principal. 
    postMessage(conectaJson.USDBRL);
 }

 