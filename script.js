const cardsArray = ['👨', '👨', '👩', '👩', '👶', '👶', '👧', '👧', '👦', '👦', '❤️', '❤️'];

let canFlip = true;
let revealedCards = [];
let matchedCards = [];
let memoryCards = document.getElementById('memory-cards');
let revealDiv = document.getElementById('reveal');
let body = document.body;

// Função para embaralhar o array de cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Embaralha o array de cartas antes de criar as cartas
shuffle(cardsArray);

// Função para criar as cartas e adicioná-las ao DOM
function createCard(card, index) {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.index = index;
    div.innerHTML = `<span class="symbol">${card}</span>`;
    div.addEventListener('click', handleCardClick);
    memoryCards.appendChild(div);
}

// Função para lidar com o clique em uma carta
function handleCardClick(event) {
    if (!canFlip) return;
    const clickedCard = event.target.closest('.card');
    const index = clickedCard.dataset.index;
    if (!revealedCards.includes(index) && !matchedCards.includes(index)) {
        revealCard(clickedCard, index);
    }
}

// Função para revelar uma carta
function revealCard(card, index) {
    card.classList.add('revealed');
    revealedCards.push(index);
    if (revealedCards.length === 2) {
        canFlip = false;
        setTimeout(checkMatch, 1000);
    }
}

// Função para verificar se as duas cartas reveladas são iguais
function checkMatch() {
    const [index1, index2] = revealedCards;
    const card1 = document.querySelector(`.card[data-index="${index1}"]`);
    const card2 = document.querySelector(`.card[data-index="${index2}"]`);
    if (cardsArray[index1] === cardsArray[index2]) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(index1, index2);
        revealedCards = [];
        if (matchedCards.length === cardsArray.length) {
            revealGender();
        } else {
            canFlip = true;
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('revealed');
            card2.classList.remove('revealed');
            revealedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Função para revelar o sexo do bebê
function revealGender() {
    memoryCards.style.display = 'none';
    body.style.backgroundColor = '#ff69b4';
    const revealDiv = document.getElementById('reveal');
    revealDiv.textContent = 'MENINA';
    revealDiv.style.color = 'white';
    revealDiv.style.fontSize = '48px';
    revealDiv.style.textAlign = 'center';
    revealDiv.style.lineHeight = '200px';
    revealDiv.classList.remove('hidden');
}

cardsArray.forEach(createCard);
