// seleciona todas as <ul> com data-attribute [data-lista] e as armazena dentro da const lista.
const lista = document.querySelectorAll('[data-lista]');

// function selecionaCotacao() que recebe como parâmetros o nome da moeda e o valor de sua cotação atual. 
function selecionaCotacao(nome, valor) {
    // para cada <ul> dentro da lista, é feito um forEach, em que, caso o id da <ul> seja igual ao nome da moeda (ex: "dolar" = "dolar"), invoca a function imprimeCotacao, passando como parâmetro a <ul>, o nome da moeda e o valor de sua cotação atual. 
    lista.forEach((listaEscolhida) => {
        if (listaEscolhida.id == nome) {
            imprimeCotacao(listaEscolhida, nome, valor);
        }
    })
}

// cria uma lista de cotações multiplicadas pelos valores de 1, 10, 100 e 1000.
function imprimeCotacao(lista, nome, valor) {
    lista.innerHTML = '';
    // lista com o nome das moedas no plural. 
    const plural = {
        "dolar": "dólares",
        "iene": "ienes",
        "euro": "euros"
    }

    // loop de for, em que há um valor inicial de 1, que será multiplicado por 10 enquanto seu valor for menor ou igual a 1000.
    for (let multiplicador = 1; multiplicador <= 100000; multiplicador *= 10) {
        // uma li é criada para cada iteração do loop de for.
        const listaItem = document.createElement('li');
        // dentro da li, o valor da let multiplicador é adicionado (indica o valor de 1, 10, 100, 1000 ou 10000), juntamente com o nome da moeda (neste caso foi utilizado o operador ternário, em que, caso o multiplicador seja igual a 1, o nome padrão será imprimido. Caso contrário, será imprimido o nome da moeda no plural, correspondente à propriedade presente na const plural). Exibe também o valor convertido, através da multiplicação da conversão da moeda e o valor fixo (valor de 1, 10, 100, 1000 ou 10000 de determinada moeda). O toFixed foi utilizado para evitar um número com mais de duas casas decimais. 
        listaItem.innerHTML = `${multiplicador} ${multiplicador == 1 ? nome : plural[nome]}: R$${(valor * multiplicador).toFixed(2)}`
        // a li criada será adicionada como elemento-filho da <ul> lista.  
        lista.appendChild(listaItem)
    }
}

export default selecionaCotacao;