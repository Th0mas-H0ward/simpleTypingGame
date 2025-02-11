const blockedModeElement = document.getElementById('blockedMode')
const errorSound = new Audio('https://www.myinstants.com/media/sounds/typing-error.mp3')

document.addEventListener('DOMContentLoaded', () => {
  const blockedModeElement = document.getElementById('blockedMode');
  if (blockedModeElement) {
    blockedModeElement.addEventListener('click', () => {
      errorSound.currentTime = 0;
      errorSound.play().catch(error => console.error('Error while playing:', error));
    });
  } else {
    console.error('Element #blockedMode not found');
  }
});

