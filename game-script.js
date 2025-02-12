const RANDOM_QUOTE_API_URL = 'https://api.adviceslip.com/advice';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const finishButtonElement = document.getElementById('doneButton')
const keySound = new Audio('https://www.myinstants.com/media/sounds/typewriter.mp3');
const errorSound = new Audio('https://www.myinstants.com/media/sounds/typing-error.mp3');
const completionSound = new Audio('https://www.myinstants.com/media/sounds/ding-sound-effect_2.mp3');
let score = 0;
const finishSound = new Audio('https://www.myinstants.com/media/sounds/correcto_Xgyp04B.mp3')

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character == characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
      keySound.currentTime = 0;
      keySound.play().catch(error => console.error('Error while playing:', error));
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
      errorSound.currentTime = 0;
      errorSound.play().catch(error => console.error('Error while playing:', error));
    }
  })

  if (correct) {
    completionSound.currentTime = 0;
    completionSound.play().catch(error => console.error('Error while playing:', error));
    score++;
    renderNewQuote();
  }
})

finishButtonElement.addEventListener('click', () => {
  clearInterval(timerInterval);

  document.getElementById('quoteDisplay').remove();
  document.getElementById('quoteInput').remove();
  document.getElementById('doneButton').remove();

  const timerElement = document.getElementById('timer');
  timerElement.textContent = 'Your time: ' + timerElement.textContent;

  const scoreContainerElement = document.createElement('div');
  scoreContainerElement.classList.add('score-container');

  const totalSeconds = getTimerTime();
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  scoreContainerElement.textContent = `Your score is ${score} points for ${minutes} minutes and ${seconds} seconds.`;

  scoreContainerElement.innerHTML = scoreContainerElement.textContent.replace(/\d+/g, '<span style="color: green;">$&</span>');

  const quoteContainer = document.getElementById('quoteContainer');
  quoteContainer.appendChild(scoreContainerElement);

  finishSound.play().catch(error => console.error('Error while playing:', error));
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL, { cache: 'no-store' })
    .then(response => response.json())
    .then(data => data.slip.advice);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  })
  quoteInputElement.value = null;
}

let startTime;
let timerInterval;

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  timerInterval = setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

startTimer();
renderNewQuote();