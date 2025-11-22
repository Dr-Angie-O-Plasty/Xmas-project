
// --- Variables principales ---
const FINAL_PHONE = "+33 6 12 34 56 78"; // <-- personnalise ici
const CORRECT = { p1: "JEAN CHRISTOPHE", p2: "", p3: "9" };
let solved = { p1: false, p2: false, p3: false };
let hintsLeft = 3;

// --- Puzzle taquin ---
const TILE_SIZE = 320 / 3; // 320px divisé par 3
const IMAGE_PATH = "https://raw.githubusercontent.com/thomasbessy/Xmas-project/main/image.jpg";
let sliderState = []; // ordre des tuiles (indices 0..8, 8 = vide)

// --- Gestion des clics ---
document.addEventListener('click', e => {
  const a = e.target.closest('[data-action]');
  if (!a) return;
  const action = a.dataset.action;
  const target = a.dataset.target;
  if (action === 'start') start();
  if (action === 'show') showSection(target);
  if (action === 'submit') submit(target);
  if (action === 'hint') giveHint(target);
  if (action === 'shuffle') shuffleSlider();
});

// --- Fonctions principales ---
function start() {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('puzzle-area').classList.remove('hidden');
  showSection('p1');
  setupSlider();
}

function showSection(id) {
  document.querySelectorAll('.puzzle, #final').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
  if (id === 'final') updateFinal();
}

function submit(target) {
  if (target === 'p1') {
    const val = (document.getElementById('p1-answer').value || '').trim().toUpperCase();
    const fb = document.getElementById('p1-feedback');
    if (val === CORRECT.p1) {
      fb.textContent = 'Correct — code enregistré.';
      solved.p1 = true;
      fb.style.color = '#114b3b';
    } else {
      fb.textContent = 'Ce n\'est pas ça. Réessaie.';
      fb.style.color = '#8b1010';
    }
  }
  if (target === 'p2') {
    // La validation se fait automatiquement quand le puzzle est résolu
    const fb = document.getElementById('p2-feedback');
    if (solved.p2) {
      fb.textContent = 'Image reconstituée ! Bravo.';
      fb.style.color = '#114b3b';
    } else {
      fb.textContent = 'Le puzzle n\'est pas encore résolu.';
      fb.style.color = '#8b1010';
    }
  }
  if (target === 'p3') {
    const val = (document.getElementById('p3-answer').value || '').trim().toUpperCase();
    const fb = document.getElementById('p3-feedback');
    if (val === CORRECT.p3) {
      fb.textContent = 'Exact — tu sembles être la bonne personne.';
      solved.p3 = true;
      fb.style.color = '#114b3b';
    } else {
      fb.textContent = 'Mauvaise réponse.';
      fb.style.color = '#8b1010';
    }
  }
  updateFinal();
}

function giveHint(target) {
  if (hintsLeft <= 0) { alert('Plus d\'indices disponibles.'); return; }
  hintsLeft--; document.getElementById('hints-left').textContent = hintsLeft;
  if (target === 'p1') alert('Indice p1 : "Vers la gauche pas la droite banane"');
  if (target === 'p2') alert('Indice p2 : "Reconstitue l\'image !"');
  if (target === 'p3') alert('Indice p3 : "Toute famille vient par deux"');
}

function updateFinal() {
  const all = solved.p1 && solved.p2 && solved.p3;
  const ft = document.getElementById('final-text');
  const fc = document.getElementById('final-content');
  const list = document.getElementById('codes-list');
  list.innerHTML = '';
  if (solved.p1) list.innerHTML += '<li>A47</li>';
  if (solved.p2) list.innerHTML += '<li>B12</li>';
  if (solved.p3) list.innerHTML += '<li>C9</li>';
  if (all) {
    ft.textContent = 'Bravo — tu as résolu les trois énigmes.';
    fc.classList.remove('hidden');
    document.getElementById('phone-number').textContent = FINAL_PHONE;
  } else {
    ft.textContent = 'Tu dois d\'abord résoudre les 3 énigmes.';
    fc.classList.add('hidden');
  }
}

// --- Taquin : initialisation et rendu ---
function setupSlider() {
  const slider = document.getElementById('slider');
  slider.innerHTML = '';
  sliderState = [0,1,2,3,4,5,6,7,8]; // ordre initial
  for (let i = 0; i < 9; i++) {
    const div = document.createElement('div');
    div.className = 'tile';
    if (i === 8) { div.classList.add('hidden'); div.dataset.empty = 'true'; }
    div.style.backgroundImage = `url('${IMAGE_PATH}')`;
    div.style.backgroundSize = "320px 320px";
    const row = Math.floor(i / 3), col = i % 3;
    div.style.backgroundPosition = `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`;
    div.dataset.pos = i;
    div.addEventListener('click', () => { slideTile(i); });
    slider.appendChild(div);
  }
}

function shuffleSlider() {
  // Mélange le puzzle avec des mouvements légaux
  for (let k = 0; k < 200; k++) {
    const emptyIndex = sliderState.indexOf(8);
    const moves = possibleMoves(emptyIndex);
    const pick = moves[Math.floor(Math.random() * moves.length)];
    [sliderState[emptyIndex], sliderState[pick]] = [sliderState[pick], sliderState[emptyIndex]];
  }
  renderSlider();
}

function renderSlider() {
  const slider = document.getElementById('slider');
  const tiles = slider.querySelectorAll('.tile');
  for (let i = 0; i < 9; i++) {
    const tileIndex = sliderState[i];
    const tile = tiles[i];
    const row = Math.floor(tileIndex / 3), col = tileIndex % 3;
    tile.style.backgroundImage = `url('${IMAGE_PATH}')`;
    tile.style.backgroundSize = "320px 320px";
    tile.style.backgroundPosition = `-${col * TILE_SIZE}px -${row * TILE_SIZE}px`;
    if (tileIndex === 8) tile.classList.add('hidden'); else tile.classList.remove('hidden');
  }
}

function possibleMoves(emptyIndex) {
  const moves = [];
  const r = Math.floor(emptyIndex / 3), c = emptyIndex % 3;
  const neighbors = [
    [r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]
  ];
  neighbors.forEach(n => {
    if (n[0] >= 0 && n[0] < 3 && n[1] >= 0 && n[1] < 3) {
      moves.push(n[0] * 3 + n[1]);
    }
  });
  return moves;
}

function slideTile(clickedPos) {
  const emptyIndex = sliderState.indexOf(8);
  const tileIndex = sliderState.indexOf(clickedPos);
  if (tileIndex === -1) return;
  const rClicked = Math.floor(tileIndex / 3), cClicked = tileIndex % 3;
  const rEmpty = Math.floor(emptyIndex / 3), cEmpty = emptyIndex % 3;
  const dist = Math.abs(rClicked - rEmpty) + Math.abs(cClicked - cEmpty);
  if (dist === 1) {
    [sliderState[tileIndex], sliderState[emptyIndex]] = [sliderState[emptyIndex], sliderState[tileIndex]];
    renderSlider();
    if (isSliderSolved()) {
      document.getElementById('p2-feedback').textContent = 'Image reconstituée ! Bravo.';
      solved.p2 = true;
      updateFinal();
    }
  }
}

function isSliderSolved() {
  for (let i = 0; i < 9; i++) {
    if (sliderState[i] !== i) return false;
  }
  return true;
}
