const coin = document.getElementById('coin');
const leftArea = document.getElementById('left-area');
const rightArea = document.getElementById('right-area');
const coinContainer = document.getElementById('coin-container');
const coinSound = document.getElementById('coin-sound');
const muteBtn = document.getElementById('mute-btn');
const bordaContainer = document.querySelector('.borda-container');

let currentSide = 'cara';
let currentRotation = 0;
let soundMuted = false;

// Gerar borda 3D
function criarBorda3D(quantidade = 40) {
  for (let i = 0; i < quantidade; i++) {
    const slice = document.createElement('div');
    slice.className = 'borda';
    const angle = (360 / quantidade) * i;
    slice.style.transform = `rotateY(${angle}deg) translateZ(75px)`;
    bordaContainer.appendChild(slice);
  }
}
criarBorda3D();

function girarMoeda(resultado) {
  const voltasBase = 6;
  let delta = 0;

  if (resultado !== currentSide) {
    delta = 180;
    currentSide = resultado;
  }

  currentRotation += voltasBase * 360 + delta;
  coin.style.transform = `rotateY(${currentRotation}deg)`;

  if (!soundMuted) {
    coinSound.currentTime = 0;
    coinSound.play();
  }
}

function resultadoAleatorio() {
  return Math.random() < 0.5 ? 'cara' : 'coroa';
}

leftArea.addEventListener('click', () => girarMoeda('cara'));
rightArea.addEventListener('click', () => girarMoeda('coroa'));
coinContainer.addEventListener('click', () => girarMoeda(resultadoAleatorio()));

muteBtn.addEventListener('click', () => {
  soundMuted = !soundMuted;
  muteBtn.innerHTML = soundMuted
    ? '<i class="bi bi-volume-mute-fill"></i>'
    : '<i class="bi bi-volume-up-fill"></i>';
});
