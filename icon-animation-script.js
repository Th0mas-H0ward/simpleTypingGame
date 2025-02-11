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

function createFloatingIcon() {
  const body = document.body;
  const icon = document.createElement('img');

  icon.classList.add('floating-icon');
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
  createFloatingIcon();
}
