window.onload = function () {

    const divTemp = $('.content-dados-temp');
    $('.content-btn-prontos button').click(async function () {
        //Pegando os dados da requisição da API
        const dadosClima = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.value}&appid=1cc8d7a643f7e29a36219d780f76f91d`);
        const dadosJson = await dadosClima.json();

        //Transformando o json objeto em array
        const dadosArray = Object.keys(dadosJson).map(i => dadosJson[i]);

        //Pego os itens do clima, temperatura e cidade
        const climaDados = dadosArray[1];
        const mainDados = dadosArray[3];
        const infoDados = dadosArray[8];

        //Pego somente as informações que quero que aparece pro usuário
        const pais = infoDados.country;
        const temperatura = mainDados.temp - 273;
        const tempo = climaDados[0].main;
        const umidade = mainDados.humidity;
        const velVentos = dadosArray[5].speed;
        const cidade = dadosArray[11];

        $('#contentBtns').hide();
        divTemp.css({ 'text-align': 'center', 'padding-bottom': '20px'});
        divTemp.append(`<h1 class='cidadePais'>${cidade} | ${pais}</h1>`);
        divTemp.append(`<h1 class='temp'>${temperatura.toFixed(1)} °C</h1>`)
        if (tempo == 'Clouds') divTemp.append(`<h1>Nublado |  <img src="img/nublado.png"></h1>`);
        else if (tempo == 'Rain') divTemp.append(`<h1>Chuvoso |  <img src="img/chuvoso.png"></h1>`);
        else if (tempo == 'Sunny') divTemp.append(`<h1>Ensolarado |  <img src="img/sol.png"></h1>`);
        else if (tempo == 'Cold') divTemp.append(`<h1>Frio |  <img src="img/congelante.png"></h1>`);
        else if (tempo == 'Clear') divTemp.append(`<h1>Limpo |  <img src="img/limpo.png"></h1>`);
        else if (tempo == 'Haze') divTemp.append(`<h1>Nebuloso |  <img src="img/nebuloso.png"></h1>`);
        else divTemp.append(`<h1>${tempo}</h1>`);
        divTemp.append(`<h1 class='umidade'>Umidade: ${umidade}%</h1>`);
        divTemp.append(`<h1 class='ventos'>Velocidade dos ventos: ${velVentos} km/h</h1>`);
    });


    $('#btnLocal').click(async function () {
        if (document.getElementById('inLocal').value == "") return;
        try {
            const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('inLocal').value}&appid=1cc8d7a643f7e29a36219d780f76f91d`)
            const dadosJson = await dados.json();

            const dadosArray = Object.keys(dadosJson).map(i => dadosJson[i]);

            //Pego os itens do clima, temperatura e cidade
            const climaDados = dadosArray[1];
            const mainDados = dadosArray[3];
            let infoDados = dadosArray[8];

            console.log(dadosArray);

            if (dadosArray.length == 14) {
                infoDados = dadosArray[9];
                dadosArray.splice(10, 1);
            }

            //Pego somente as informações que quero que aparece pro usuário
            let pais = infoDados.country;
            const temperatura = mainDados.temp - 273;
            const tempo = climaDados[0].main;
            const umidade = mainDados.humidity;
            const velVentos = dadosArray[5].speed;
            const cidade = dadosArray[11];

            if (pais == undefined) pais = 'N/A';

            $('#contentBtns').hide();
            divTemp.empty();
            divTemp.css({ 'text-align': 'center', 'padding-bottom': '20px' });
            divTemp.append(`<h1 class='cidadePais'>${cidade} | ${pais}</h1>`);
            divTemp.append(`<h1 class='temp'>${temperatura.toFixed(1)} °C</h1>`);
            if (tempo == 'Clouds') divTemp.append(`<h1>Nublado | <img src="img/nublado.png"></h1>`);
            else if (tempo == 'Rain') divTemp.append(`<h1>Chuvoso |  <img src="img/chuvoso.png"></h1>`);
            else if (tempo == 'Sunny') divTemp.append(`<h1>Ensolarado |  <img src="img/sol.png"></h1>`);
            else if (tempo == 'Cold') divTemp.append(`<h1>Frio |  <img src="img/congelante.png"></h1>`);
            else if (tempo == 'Clear') divTemp.append(`<h1>Limpo |  <img src="img/limpo.png"></h1>`);
            else if (tempo == 'Haze') divTemp.append(`<h1>Nebuloso |  <img src="img/nebuloso.png"></h1>`);
            else divTemp.append(`<h1>${tempo}</h1>`);
            divTemp.append(`<h1 class='umidade'>Umidade: ${umidade}%</h1>`);
            divTemp.append(`<h1 class='ventos'>Velocidade dos ventos: ${velVentos} km/h</h1>`);
            document.getElementById('inLocal').value = "";

        }
        catch (e) {
            $('#contentBtns').hide();
            divTemp.empty();
            divTemp.append(`<h1>Não foi possível achar a localização!</h1>`)
            document.getElementById('inLocal').value = "";
        }
    });
}