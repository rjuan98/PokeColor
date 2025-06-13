document.addEventListener('DOMContentLoaded', function () {
    const botaoMudarCor = document.getElementById('troca-de-cor');
    const elementoAlvo = document.body;
    const nomePokemonSpan = document.getElementById('pokemonNome');
    const pokemonInput = document.getElementById('pokemonInput');
    const adivinharBtn = document.getElementById('pokemonCheck');
    const feedbackMessage = document.getElementById('resultado');
    const pokemonImage = document.getElementById('pokemonImagem');
    const container = document.getElementById('container');
    const statsButton = document.getElementById('stats-button');
    const logoLink = document.getElementById('logo-link');
    const scoreDisplay = document.getElementById('score-display');
    const attemptsDisplay = document.getElementById('attempts-display');

    const initialPokemonTemas = [
        { nome: 'Pikachu', dominantColor: '#FFD700', accentColor: '#FF4500', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
        { nome: 'Gardevoir', dominantColor: '#A3E4D7', accentColor: '#FFFFFF', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png' },
        { nome: 'Gengar', dominantColor: '#6A0DAD', accentColor: '#D32F2F', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
        { nome: 'Lucario', dominantColor: '#4169E1', accentColor: '#000000', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png' },
        { nome: 'Umbreon', dominantColor: '#424242', accentColor: '#FFEB3B', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/197.png' },
        { nome: 'Sylveon', dominantColor: '#FFC0CB', accentColor: '#A8DADC', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png' },
        { nome: 'Bulbasaur', dominantColor: '#78C850', accentColor: '#4CAF50', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
        { nome: 'Charmander', dominantColor: '#F08030', accentColor: '#FF4500', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
        { nome: 'Squirtle', dominantColor: '#6890F0', accentColor: '#8B4513', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
        { nome: 'Eevee', dominantColor: '#CD853F', accentColor: '#F5DEB3', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
        { nome: 'Snorlax', dominantColor: '#80B3B3', accentColor: '#E0E0E0', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' },
        { nome: 'Jigglypuff', dominantColor: '#FFC0CB', accentColor: '#FFFFFF', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' },
        { nome: 'Onix', dominantColor: '#A9A9A9', accentColor: '#696969', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png' },
        { nome: 'Mismagius', dominantColor: '#8A2BE2', accentColor: '#FF1493', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/429.png' },
        { nome: 'Arcanine', dominantColor: '#FF4500', accentColor: '#FFD700', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png' },
        { nome: 'Charizard', dominantColor: '#FF4500', accentColor: '#FFD700', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' },
        { nome: 'Blastoise', dominantColor: '#4169E1', accentColor: '#A9A9A9', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png' },
        { nome: 'Venusaur', dominantColor: '#4CAF50', accentColor: '#DDA0DD', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
        { nome: 'Dragonite', dominantColor: '#FFC107', accentColor: '#4CAF50', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png' },
        { nome: 'Greninja', dominantColor: '#424242', accentColor: '#E53935', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/658.png' },
        { nome: 'Tyranitar', dominantColor: '#607D8B', accentColor: '#FFEB3B', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png' },
        { nome: 'Garchomp', dominantColor: '#424242', accentColor: '#E53935', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/445.png' },
        { nome: 'Decidueye', dominantColor: '#4CAF50', accentColor: '#FF9800', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/727.png' },
        { nome: 'Absol', dominantColor: '#E0E0E0', accentColor: '#212121', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/359.png' },
        { nome: 'Aegislash', dominantColor: '#757575', accentColor: '#FFEB3B', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/681.png' },
        { nome: 'Lapras', dominantColor: '#42A5F5', accentColor: '#9C27B0', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png' },
        { nome: 'Volcarona', dominantColor: '#FF5722', accentColor: '#FFFFFF', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/637.png' },
        { nome: 'Togekiss', dominantColor: '#FFFFFF', accentColor: '#F44336', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/468.png' },
        { nome: 'Haxorus', dominantColor: '#4CAF50', accentColor: '#E53935', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/612.png' },
        { nome: 'Reuniclus', dominantColor: '#8BC34A', accentColor: '#FFFFFF', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/579.png' },
        { nome: 'Milotic', dominantColor: '#F8BBD0', accentColor: '#42A5F5', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/350.png' },
        { nome: 'Crobat', dominantColor: '#673AB7', accentColor: '#4CAF50', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/169.png' },
        { nome: 'Aggron', dominantColor: '#424242', accentColor: '#9E9E9E', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/306.png' },
        { nome: 'Hydreigon', dominantColor: '#3F51B5', accentColor: '#FF6F00', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/635.png' },
        { nome: 'Amoonguss', dominantColor: '#E53935', accentColor: '#FFFFFF', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/591.png' }
    ];

    const mewData = {
        nome: 'Mew',
        dominantColor: '#F4A4C2',
        accentColor: '#FFFFFF',
        imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png'
    };

    let pokemonAtualCorreto;
    let pokemonSorteadosNaSessao = [];
    let currentPokemonPool = [...initialPokemonTemas];
    let mewUnlocked = false;
    let totalScore = 0;
    let attemptsInRound = 0;

    scoreDisplay.textContent = 'Pontuação: ' + totalScore;
    attemptsDisplay.textContent = ''; // Inicializa o display de tentativas

    botaoMudarCor.addEventListener('click', function () {
        console.log('Botão "Mudar Cor" clicado: Iniciando nova rodada!');

        let temaEscolhido;
        let indiceAleatorio;

        do {
            if (pokemonSorteadosNaSessao.length === currentPokemonPool.length) {
                pokemonSorteadosNaSessao = [];
                console.log('Todos os Pokémon do pool atual foram sorteados! Reiniciando a lista.');
            }
            indiceAleatorio = Math.floor(Math.random() * currentPokemonPool.length);
            temaEscolhido = currentPokemonPool[indiceAleatorio];
        } while (pokemonSorteadosNaSessao.includes(temaEscolhido.nome));

        pokemonAtualCorreto = temaEscolhido;
        pokemonSorteadosNaSessao.push(temaEscolhido.nome);
        console.log('Pokémon sorteado (e escondido): ' + temaEscolhido.nome + '. Já sorteados: ' + pokemonSorteadosNaSessao.join(', '));

        // Transição de cor suave
        elementoAlvo.style.transition = 'background-color 0.8s ease';
        elementoAlvo.style.backgroundColor = pokemonAtualCorreto.dominantColor;
        container.style.boxShadow = `0 0 30px 10px ${pokemonAtualCorreto.accentColor}`;

        pokemonInput.value = '';
        feedbackMessage.textContent = '';
        feedbackMessage.style.color = 'white';
        nomePokemonSpan.textContent = '?';
        pokemonImage.src = '';
        pokemonImage.style.display = 'none';

        adivinharBtn.style.display = 'block';
        pokemonInput.style.display = 'block';
        pokemonInput.focus();

        attemptsInRound = 0;
        attemptsDisplay.textContent = ''; // Reseta o texto de tentativas
    });

    adivinharBtn.addEventListener('click', function () {
        console.log('Botão "Adivinhar!" clicado: Verificando palpite...');

        const palpiteUsuario = pokemonInput.value.trim().toLowerCase();

        if (!pokemonAtualCorreto) {
            feedbackMessage.textContent = 'Clique em "Mudar Cor" para iniciar uma nova rodada!';
            feedbackMessage.style.color = 'orange';
            return;
        }

        if (palpiteUsuario === pokemonAtualCorreto.nome.toLowerCase()) {
            let pointsAwarded = 0;
            if (attemptsInRound === 0) {
                pointsAwarded = 100;
            } else if (attemptsInRound === 1) {
                pointsAwarded = 50;
            } else {
                pointsAwarded = 20;
            }
            totalScore += pointsAwarded;
            scoreDisplay.textContent = 'Pontuação: ' + totalScore;

            feedbackMessage.innerHTML = `Parabéns! Você acertou o Pokémon: ${pokemonAtualCorreto.nome}! (+${pointsAwarded} pts)<br>Clique em "Estatísticas para Nerds" para ver as cores!`;
            feedbackMessage.style.color = 'green';
            pokemonImage.src = pokemonAtualCorreto.imagem;
            pokemonImage.style.display = 'block';
            nomePokemonSpan.textContent = pokemonAtualCorreto.nome;
            pokemonInput.value = '';
            adivinharBtn.style.display = 'none';
            pokemonInput.style.display = 'none';
            attemptsDisplay.textContent = ''; // Reseta o texto de tentativas

            if (totalScore >= 1150 && !mewUnlocked) {
                mewUnlocked = true;
                currentPokemonPool.push(mewData);
                feedbackMessage.innerHTML += '<br><br>✨ VOCÊ DESBLOQUEOU O LENDÁRIO MEW! ✨<br>Ele agora pode aparecer no jogo!';
                console.log('Mew desbloqueado!');
            }

            attemptsInRound = 0;
        } else {
            attemptsInRound++;
            let penalty = 0;
            if (attemptsInRound > 5) {
                penalty = (attemptsInRound - 5) * 10;
                totalScore -= penalty;
                scoreDisplay.textContent = 'Pontuação: ' + totalScore;
            }

            let penaltyMessage = penalty > 0 ? ` (-${penalty} pts)` : '';
            feedbackMessage.textContent = `Ops! Tente novamente. (${attemptsInRound + 1}ª tentativa para pontuação)${penaltyMessage}`;
            feedbackMessage.style.color = 'red';
            pokemonImage.style.display = 'none';
            nomePokemonSpan.textContent = '?';
            pokemonInput.value = '';

            // Atualiza o display de tentativas
            attemptsDisplay.textContent = `Tentativas: ${attemptsInRound + 1}/6`;
            if (attemptsInRound >= 5) {
                attemptsDisplay.textContent += ' (Penalidade!)';
            }
        }
    });

    pokemonInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            adivinharBtn.click();
        }
    });

    statsButton.addEventListener('click', function () {
        console.log('Botão "Estatísticas para Nerds" clicado!');
        if (pokemonAtualCorreto && pokemonImage.style.display === 'block') {
            feedbackMessage.innerHTML = `
                <strong>Cor Dominante:</strong> <span style="color: ${pokemonAtualCorreto.dominantColor};">${pokemonAtualCorreto.dominantColor}</span><br>
                <strong>Cor de Destaque:</strong> <span style="color: ${pokemonAtualCorreto.accentColor};">${pokemonAtualCorreto.accentColor}</span>
            `;
            feedbackMessage.style.color = 'white';
        } else if (pokemonAtualCorreto) {
            feedbackMessage.textContent = 'Adivinhe o Pokémon primeiro para ver as estatísticas de cores!';
            feedbackMessage.style.color = 'orange';
        } else {
            feedbackMessage.textContent = 'Nenhum Pokémon sorteado ainda. Clique em "Mudar Cor"!';
            feedbackMessage.style.color = 'orange';
        }
    });

    logoLink.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('Logo clicado: Resetando jogo e sorteando novo Pokémon...');

        elementoAlvo.style.transition = 'none'; // Remove a transição para o reset ser imediato
        elementoAlvo.style.backgroundColor = 'var(--primary-color)';
        container.style.boxShadow = '0 0 0px 0px transparent';

        pokemonInput.value = '';
        feedbackMessage.textContent = '';
        feedbackMessage.style.color = 'white';
        nomePokemonSpan.textContent = '?';
        pokemonImage.src = '';
        pokemonImage.style.display = 'none';
        adivinharBtn.style.display = 'block';
        pokemonInput.style.display = 'block';
        attemptsDisplay.textContent = ''; // Reseta o texto de tentativas

        attemptsInRound = 0;
        botaoMudarCor.click();
    });
});