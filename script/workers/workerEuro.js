addEventListener("message", () => {
    conectaAPI();
    setInterval(() => conectaAPI(), 10000);
})

async function conectaAPI() {
    const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/EUR-BRL");
    const conectaJson = await conecta.json();
    postMessage(conectaJson.EURBRL);
}