const data = [
    {
        "image": "./assets/chili.png",
        "name": "chili"
    },
    {
        "image": "./assets/grapes.png",
        "name": "grapes"
    },
    {
        "image": "./assets/lemon.png",
        "name": "lemon"
    },
    {
        "image": "./assets/orange.png",
        "name": "orange"
    },
    {
        "image": "./assets/pineapple.png",
        "name": "pineapple"
    },
    {
        "image": "./assets/strawberry.png",
        "name": "strawberry"
    },
    {
        "image": "./assets/tomato.png",
        "name": "tomato"
    },
    {
        "image": "./assets/watermelon.png",
        "name": "watermelon"
    },
    {
        "image": "./assets/cherries.png",
        "name": "cherries"
    }
]

document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.querySelector('.grid-container');
    const timerDisplay = document.querySelector('.timer');
    const scoreDisplay = document.querySelector('.score');
    const attemptsDisplay = document.querySelector('.attempts');
    const rowsInput = document.getElementById('rows');
    const columnsInput = document.getElementById('columns');
    const difficultySelect = document.getElementById('timerDifficulty');

    let cardsChosen = [];
    let cardsChosenIds = [];
    let cardsWon = [];
    let timer;
    let maxTime;
    let timeRemaining;
    let score = 0;
    let matches = 0;
    let attempts = 0;

    function calculateScore(attempts, matches) {
        return Math.floor((matches / attempts) * 100.0);
    }

    function createBoard() {
        gridContainer.innerHTML = '';
        let totalCards = parseInt(rowsInput.value) * parseInt(columnsInput.value);

        if (totalCards % 2 !== 0) {
            totalCards++; 
        }

        let gameData = [];
        for (let i = 0; i < totalCards / 2; i++) {
            gameData.push(data[i % data.length], data[i % data.length]); 
        }

        const shuffled = shuffleCards(gameData);
        for (let i = 0; i < totalCards; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', i);

            const front = document.createElement('div');
            front.classList.add('front');
            front.style.backgroundImage = `url('${shuffled[i].image}')`;

            const back = document.createElement('div');
            back.classList.add('back');

            card.appendChild(front);
            card.appendChild(back);
            gridContainer.appendChild(card);

            card.addEventListener('click', flipCard);
        }

        gridContainer.style.gridTemplateColumns = `repeat(${columnsInput.value}, 120px)`;
        gridContainer.style.gridTemplateRows = `repeat(${rowsInput.value}, 140px)`;
    }


    function shuffleCards(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function flipCard() {
        const cardId = parseInt(this.getAttribute('data-id'));
        const dataIndex = cardId % data.length;

        if (!cardsChosenIds.includes(cardId)) {
            cardsChosen.push(data[dataIndex].name);
            cardsChosenIds.push(cardId);
            this.classList.add('flipped');
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }


    function checkForMatch() {
        const cards = document.querySelectorAll('.card.flipped');
        attempts++;
        if (cards.length === 2) {
            const firstCard = cards[0];
            const secondCard = cards[1];

            const firstCardImage = firstCard.querySelector('.front').style.backgroundImage;
            const secondCardImage = secondCard.querySelector('.front').style.backgroundImage;

            if (firstCard === secondCard) {
                firstCard.classList.remove('flipped');  // Unflip the card
            } else if (firstCardImage === secondCardImage) {
                matches++;
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.style.visibility = 'hidden';
                secondCard.style.visibility = 'hidden';
                cardsWon.push(firstCard);
            } else {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
            }
            score = calculateScore(attempts, matches);
            scoreDisplay.textContent = score;
            attemptsDisplay.textContent = attempts;
            cardsChosen = [];
            cardsChosenIds = [];

            if (document.querySelectorAll('.card.matched').length === document.querySelectorAll('.card').length) {
                clearInterval(timer);
                alert(`Вітаємо!\nВи впорались за ${maxTime - timeRemaining}с зробивши ${attempts} спроб.`);
            }

            attemptsDisplay.textContent = attempts;
        }
    }



    function startGame() {
        clearInterval(timer);
        cardsWon = [];
        score = 0;
        matches = 0;
        attempts = 0;
        scoreDisplay.textContent = '0';
        const rows = parseInt(rowsInput.value);
        const columns = parseInt(columnsInput.value);
        if ((rows * columns) % 2 !== 0) { 
            alert("Кількість карток має бути парна.");
            return; 
        }
        createBoard();
        startTimer();
    }

    function restartGame() {
        startGame(); 
    }

    function startTimer() {
        let difficulty = difficultySelect.value;
        switch (difficulty) {
            case 'easy':
                maxTime = 180;
                timeRemaining = 180;
                break;
            case 'normal':
                maxTime = 120;
                timeRemaining = 120;
                break;
            case 'hard':
                maxTime = 60;
                timeRemaining = 60;
                break;
            default:
                maxTime = 120;
                timeRemaining = 120;
        }
        timerDisplay.textContent = timeRemaining;
        timer = setInterval(function () {
            timeRemaining--;
            timerDisplay.textContent = timeRemaining;
            if (timeRemaining <= 0) {
                alert('Час вийшов! Ви програли :(');
                clearInterval(timer);
            }
        }, 1000);
    }




    document.querySelector('.start-button').addEventListener('click', startGame);
    document.querySelector('.restart-button').addEventListener('click', restartGame);

});

