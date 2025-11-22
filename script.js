
// --- Variables principales ---
const FINAL_PHONE = "+33 6 12 34 56 78"; // <-- personnalise ici
const CORRECT = { p1: "JEAN CHRISTOPHE", p2: "", p3: "9" };
let solved = { p1: false, p2: false, p3: false };
let hintsLeft = 3;

// --- Puzzle taquin ---
const TILE_SIZE = 320 / 3; // 320px divisé par 3
const IMAGE_PATH = "https://github.com/thomasbessy/Xmas-project/blob/main/image.jpg"; // Chemin vers ton image
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

