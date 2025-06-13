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
    const highScoreDisplay = document.getElementById('high-score-display');
    const attemptsProgressBar = document.getElementById('attempts-progress-bar');
    const mainElement = document.querySelector('main'); 

    const initialPokemonTemas = [
        { nome: 'Pikachu', dominantColor: '#FFD700', accentColor: '#FF4500', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
        { nome: 'Gardevoir', dominantColor: '#A3E4D7', accentColor: '#FFFFFF', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png' },
        { nome: 'Gengar', dominantColor: '#6A0DAD', accentColor: '#D32F2F', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
        { nome: 'Lucario', dominantColor: '#4169E1', accentColor: '#000000', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png' },
        { nome: 'Umbreon', dominantColor: '#424242', accentColor: '#FFEB3B', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png' },
        { nome: 'Sylveon', dominantColor: '#FFC0CB', accentColor: '#A8DADC', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png' },
        { nome: 'Bulbasaur', dominantColor: '#78C850', accentColor: '#4CAF50', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
        { nome: 'Charmander', dominantColor: '#F08030', accentColor: '#FF4500', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' },
        { nome: 'Squirtle', dominantColor: '#6890F0', accentColor: '#8B4513', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png' },
        { nome: 'Eevee', dominantColor: '#CD853F', accentColor: '#F5DEB3', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png' },
        { nome: 'Snorlax', dominantColor: '#3A5C6C', accentColor: '#F0E68C', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png' },
        { nome: 'Jigglypuff', dominantColor: '#FFC0CB', accentColor: '#FFFFFF', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png' },
        { nome: 'Onix', dominantColor: '#A9A9A9', accentColor: '#696969', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png' },
        { nome: 'Arcanine', dominantColor: '#FF4500', accentColor: '#FFD700', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png' },
        { nome: 'Dragonite', dominantColor: '#FFC107', accentColor: '#4CAF50', imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png' },
    ];

    const mewData = {
        nome: 'Mew',
        dominantColor: '#F4A4C2',
        accentColor: '#FFFFFF',
        imagem: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'
    };

    let pokemonAtualCorreto;
    let pokemonSorteadosNaSessao = [];
    let currentPokemonPool = [...initialPokemonTemas];
    let mewUnlocked = false;
    let totalScore = 0;
    let highScore = 0;
    let attemptsInRound = 0;
    const MAX_ATTEMPTS = 6;

    function playSound(file, volume = 1.0) {
        const audio = new Audio(`assets/${file}`);
        audio.volume = volume;
        audio.play().catch(e => console.error("Erro ao tocar som:", e));
    }

    function loadHighScore() {
        const storedHighScore = localStorage.getItem('pokecolorHighScore');
        if (storedHighScore) {
            highScore = parseInt(storedHighScore);
        }
        highScoreDisplay.textContent = 'Melhor: ' + highScore;
    }

    function saveHighScore() {
        if (totalScore > highScore) {
            highScore = totalScore;
            localStorage.setItem('pokecolorHighScore', highScore);
            highScoreDisplay.textContent = 'Melhor: ' + highScore;
        }
    }

    function updateAttemptsDisplayAndBar() {
        attemptsDisplay.textContent = `Tentativas: ${attemptsInRound}/${MAX_ATTEMPTS}`;
        if (attemptsInRound >= 5) {
            attemptsDisplay.textContent += ' (Penalidade!)';
        }

        const remainingAttempts = MAX_ATTEMPTS - attemptsInRound;
        const percentage = (remainingAttempts / MAX_ATTEMPTS) * 100;

        attemptsProgressBar.style.width = `${percentage}%`;

        if (percentage > 60) {
            attemptsProgressBar.style.backgroundColor = '#4CAF50';
        } else if (percentage > 30) {
            attemptsProgressBar.style.backgroundColor = '#FFC107';
        } else {
            attemptsProgressBar.style.backgroundColor = '#F44336';
        }

        if (attemptsInRound >= MAX_ATTEMPTS || pokemonImage.style.display === 'block') {
            attemptsProgressBar.parentElement.style.opacity = '0';
            attemptsProgressBar.parentElement.style.pointerEvents = 'none';
        } else {
            attemptsProgressBar.parentElement.style.opacity = '1';
            attemptsProgressBar.parentElement.style.pointerEvents = 'auto';
        }
    }

    botaoMudarCor.addEventListener('click', function () {
        let temaEscolhido;
        let indiceAleatorio;

        do {
            if (pokemonSorteadosNaSessao.length === currentPokemonPool.length) {
                pokemonSorteadosNaSessao = [];
            }
            indiceAleatorio = Math.floor(Math.random() * currentPokemonPool.length);
            temaEscolhido = currentPokemonPool[indiceAleatorio];
        } while (pokemonSorteadosNaSessao.includes(temaEscolhido.nome));

        pokemonAtualCorreto = temaEscolhido;
        pokemonSorteadosNaSessao.push(temaEscolhido.nome);

        elementoAlvo.style.transition = 'background-color 0.8s ease, color 0.8s ease';
        elementoAlvo.style.backgroundColor = pokemonAtualCorreto.dominantColor;
        elementoAlvo.style.color = pokemonAtualCorreto.dominantColor; // SVGs mudam juntos
        container.style.boxShadow = `0 0 30px 10px ${pokemonAtualCorreto.accentColor}`;

        pokemonInput.value = '';
        feedbackMessage.textContent = '';
        feedbackMessage.style.color = 'white';
        nomePokemonSpan.textContent = '?';
        pokemonImage.src = '';
        pokemonImage.style.display = 'none';
        pokemonImage.classList.remove('pokemon-image-reveal'); 

        adivinharBtn.style.display = 'block';
        pokemonInput.style.display = 'block';
        pokemonInput.focus();
        botaoMudarCor.style.display = 'none';

        attemptsInRound = 0;
        updateAttemptsDisplayAndBar();
        
        playSound('confirm.mp3'); 
    });

    adivinharBtn.addEventListener('click', function () {
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
            saveHighScore(); 

            feedbackMessage.innerHTML = `Parabéns! Você acertou o Pokémon: ${pokemonAtualCorreto.nome}! (+${pointsAwarded} pts)<br><span class="info-menor">Clique em "Estatísticas para Nerds" para ver as cores!</span>`;
            feedbackMessage.style.color = 'green';
            pokemonImage.src = pokemonAtualCorreto.imagem;
            pokemonImage.style.display = 'block';
            pokemonImage.classList.add('revealed'); 
            pokemonImage.classList.add('pokemon-image-reveal'); 
            nomePokemonSpan.textContent = pokemonAtualCorreto.nome;
            pokemonInput.value = '';
            adivinharBtn.style.display = 'none';
            pokemonInput.style.display = 'none';
            
            setTimeout(() => {
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);

            updateAttemptsDisplayAndBar();
            
            botaoMudarCor.style.display = 'block';

            if (totalScore >= 1150 && !mewUnlocked) {
                mewUnlocked = true;
                currentPokemonPool.push(mewData);
                feedbackMessage.innerHTML += '<br><br>✨ VOCÊ DESBLOQUEOU O LENDÁRIO MEW! ✨<br>Ele agora pode aparecer no jogo!';
            }
            playSound('correct.mp3', 0.1);
            attemptsInRound = 0;
        } else { 
            attemptsInRound++;
            let penalty = 0;
            if (attemptsInRound > 5) {
                penalty = (attemptsInRound - 5) * 10;
                totalScore -= penalty;
                if (totalScore < 0) totalScore = 0; 
                scoreDisplay.textContent = 'Pontuação: ' + totalScore;
                saveHighScore(); 
            }

            let penaltyMessage = penalty > 0 ? ` (-${penalty} pts)` : '';
            feedbackMessage.textContent = `Ops! Tente novamente. (${attemptsInRound}ª tentativa)${penaltyMessage}`;
            feedbackMessage.style.color = 'red';
            pokemonImage.style.display = 'none';
            pokemonImage.classList.remove('pokemon-image-reveal'); 
            nomePokemonSpan.textContent = '?';
            pokemonInput.value = '';

            if (attemptsInRound === 3) {
                const primeiraLetra = pokemonAtualCorreto.nome[0].toUpperCase();
                feedbackMessage.innerHTML += `<br><span class="info-menor">Dica: O nome começa com <b>${primeiraLetra}</b></span>`;
            }

            updateAttemptsDisplayAndBar();
            
            playSound('bump.mp3'); 

            container.classList.add('shake-animation');
            setTimeout(() => {
                container.classList.remove('shake-animation');
            }, 500); 

            if (attemptsInRound >= MAX_ATTEMPTS) { 
                feedbackMessage.textContent = `Suas tentativas acabaram! Era um ${pokemonAtualCorreto.nome}.`;
                feedbackMessage.style.color = 'red';
                pokemonImage.src = pokemonAtualCorreto.imagem;
                pokemonImage.style.display = 'block';
                pokemonImage.classList.add('revealed'); 
                pokemonImage.classList.add('pokemon-image-reveal'); 
                nomePokemonSpan.textContent = pokemonAtualCorreto.nome;
                pokemonInput.style.display = 'none';
                adivinharBtn.style.display = 'none';
                botaoMudarCor.style.display = 'block'; 
                
                updateAttemptsDisplayAndBar(); 
                
                saveHighScore(); 
                totalScore = 0; 
                scoreDisplay.textContent = 'Pontuação: ' + totalScore; 

                attemptsInRound = 0; 
            }
        }
    });

    pokemonInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            adivinharBtn.click();
        }
    });

    statsButton.addEventListener('click', function () {
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

        saveHighScore(); 
        totalScore = 0;
        scoreDisplay.textContent = 'Pontuação: ' + totalScore;
        loadHighScore(); 
        mewUnlocked = false;
        currentPokemonPool = [...initialPokemonTemas];
        pokemonSorteadosNaSessao = []; 

        elementoAlvo.style.transition = 'none';
        elementoAlvo.style.backgroundColor = 'var(--primary-color)';
        elementoAlvo.style.color = 'var(--primary-color)';
        pokemonInput.value = '';
        pokemonInput.style.display = 'none';
        adivinharBtn.style.display = 'none';
        
        feedbackMessage.textContent = 'Clique em "Mudar Cor" para começar!';
        feedbackMessage.style.color = 'white';
        
        nomePokemonSpan.textContent = '?';
        pokemonImage.src = '';
        pokemonImage.style.display = 'none';
        pokemonImage.classList.remove('pokemon-image-reveal'); 

        attemptsInRound = 0;
        updateAttemptsDisplayAndBar();
        pokemonAtualCorreto = null;

        botaoMudarCor.style.display = 'block';
    });

    scoreDisplay.textContent = 'Pontuação: ' + totalScore;
    elementoAlvo.style.backgroundColor = 'var(--primary-color)';
    elementoAlvo.style.color = 'var(--primary-color)';
    feedbackMessage.textContent = 'Clique em "Mudar Cor" para começar!';
    pokemonInput.style.display = 'none';
    adivinharBtn.style.display = 'none';
    botaoMudarCor.style.display = 'block';
    pokemonImage.classList.remove('pokemon-image-reveal'); 

    loadHighScore(); 

    attemptsProgressBar.parentElement.style.opacity = '0'; 
    attemptsProgressBar.parentElement.style.transition = 'opacity 0.5s ease-out'; 
});