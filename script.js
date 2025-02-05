const RANDOM_QUOTE_API_URL = 'https://api.allorigins.win/raw?url=https://zenquotes.io/api/random';
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const keySound = new Audio('https://www.myinstants.com/media/sounds/typewriter.mp3');
const errorSound = new Audio('https://www.myinstants.com/media/sounds/typing-error.mp3')
const completionSound = new Audio('https://www.myinstants.com/media/sounds/ding-sound-effect_2.mp3')
const iconUrls = [
  'https://cdn-icons-png.flaticon.com/512/10769/10769319.png',
  'https://cdn-icons-png.flaticon.com/512/1014/1014393.png',
  'https://cdn-icons-png.flaticon.com/512/171/171322.png',
  'https://cdn-icons-png.flaticon.com/512/64/64673.png'
];

function randomPosition() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  const x = Math.random() * (windowWidth * 2) - (windowWidth / 2);
  const y = Math.random() * (windowHeight * 2) - (windowHeight / 2);
  
  return { x, y };
}

function createTypewriterIcon() {
  const body = document.body;
  const icon = document.createElement('img');

  icon.classList.add('typewriter-icon');
  icon.src = iconUrls[Math.floor(Math.random() * iconUrls.length)];
  
  const startPos = randomPosition();
  icon.style.left = `${startPos.x}px`;
  icon.style.top = `${startPos.y}px`;
  
  const scale = 0.5 + Math.random() * 0.5;
  icon.style.transform = `rotate(45deg) scale(${scale})`;
  
  body.appendChild(icon);

  function moveIcon() {
      const endPos = randomPosition();
      icon.style.left = `${endPos.x}px`;
      icon.style.top = `${endPos.y}px`;
  }

  setTimeout(moveIcon, 100);
  setInterval(moveIcon, 10000);
}

for (let i = 0; i < 30; i++) {
  createTypewriterIcon();
}

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')
  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character == characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
      keySound.currentTime = 0;
      keySound.play().catch(error => console.error('Error while playing:', error));
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
      errorSound.currentTime = 0;
      errorSound.play().catch(error => console.error('Error while playing:', error));
    }
  })

  if (correct) {
    completionSound.currentTime = 0;
    completionSound.play().catch(error => console.error('Error while playing:', error));
    renderNewQuote()
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL, { cache: 'no-store' }) // Запрос без кеша
    .then(response => response.json()) 
    .then(data => data[0].q);
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime

function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timerElement.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()



