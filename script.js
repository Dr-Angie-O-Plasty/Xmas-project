// Puzzle site logic
const FINAL_PHONE = "+33 6 12 34 56 78"; // <-- personnalise ici
const CORRECT = { p1: "JEAN CHRISTOPHE", p2: "B12", p3: "9" };
let solved = { p1:false, p2:false, p3:false };
let hintsLeft = 3;

document.addEventListener('click', e=>{
  const a = e.target.closest('[data-action]');
  if(!a) return;
  const action = a.dataset.action;
  const target = a.dataset.target;
  if(action==='start') start();
  if(action==='show') showSection(target);
  if(action==='submit') submit(target);
  if(action==='hint') giveHint(target);
  if(action==='shuffle') shuffleSlider();
});

function start(){
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('puzzle-area').classList.remove('hidden');
  showSection('p1');
  setupSlider();
}

function showSection(id){
  document.querySelectorAll('.puzzle, #final').forEach(s=>s.classList.add('hidden'));
  const el = document.getElementById(id);
  if(el) el.classList.remove('hidden');
  if(id==='final') updateFinal();
}

function submit(target){
  if(target==='p1'){
    const val = (document.getElementById('p1-answer').value||'').trim().toUpperCase();
    const fb = document.getElementById('p1-feedback');
    if(val===CORRECT.p1){ fb.textContent='Correct — code A47 enregistré.'; solved.p1=true; fb.style.color='#114b3b'; }
    else { fb.textContent='Ce n\'est pas ça. Réessaie.'; fb.style.color='#8b1010'; }
  }
  if(target==='p2'){
    const val = (document.getElementById('p2-answer').value||'').trim().toUpperCase();
    const fb = document.getElementById('p2-feedback');
    if(val===CORRECT.p2){ fb.textContent='Correct — code B12 enregistré.'; solved.p2=true; fb.style.color='#114b3b'; }
    else { fb.textContent='Ce code ne correspond pas.'; fb.style.color='#8b1010'; }
  }
  if(target==='p3'){
    const val = (document.getElementById('p3-answer').value||'').trim().toUpperCase();
    const fb = document.getElementById('p3-feedback');
    if(val===CORRECT.p3){ fb.textContent='Exact — tu as trouvé le bon détective.'; solved.p3=true; fb.style.color='#114b3b'; }
    else { fb.textContent='Mauvaise réponse.'; fb.style.color='#8b1010'; }
  }
  updateFinal();
}

function giveHint(target){
  if(hintsLeft<=0){ alert('Plus d\'indices disponibles.'); return; }
  hintsLeft--; document.getElementById('hints-left').textContent = hintsLeft;
  if(target==='p1') alert('Indice p1: "Vers la gauche pas la droite banane"');
  if(target==='p2') alert('Indice p2: "Nope, je ne peux pas aider."');
  if(target==='p3') alert('Indice p3: "Toute famille vient par deux"');
}

function updateFinal(){
  const all = solved.p1 && solved.p2 && solved.p3;
  const ft = document.getElementById('final-text');
  const fc = document.getElementById('final-content');
  const list = document.getElementById('codes-list');
  list.innerHTML='';
  if(solved.p1) list.innerHTML += '<li>A47</li>';
  if(solved.p2) list.innerHTML += '<li>B12</li>';
  if(solved.p3) list.innerHTML += '<li>C9</li>';
  if(all){
    ft.textContent = 'Bravo — tu as résolu les trois énigmes.';
    fc.classList.remove('hidden');
    document.getElementById('phone-number').textContent = FINAL_PHONE;
  } else {
    ft.textContent = 'Tu dois d\'abord résoudre les 3 énigmes.';
    fc.classList.add('hidden');
  }
}

// --- Slider puzzle implementation ---
const TILE_SOURCES = ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTExZDQ4Ii8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmI5MjNjIi8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmFjYzE1Ii8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxIi8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDZiNmQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1NSUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZmlsbD0iI2ZmZiI+QjEyPC90ZXh0Pjwvc3ZnPg==", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjN2MzYWVkIi8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjk3MzE2Ii8+PC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjM2I4MmY2Ii8+PC9zdmc+"];

let sliderState = []; // array of tile indices, 0..8, with 8 representing empty
function setupSlider(){
  const slider = document.getElementById('slider');
  slider.innerHTML='';
  // create 9 tiles in solved order, the last tile will be empty
  sliderState = [0,1,2,3,4,5,6,7,8];
  for(let i=0;i<9;i++){
    const div = document.createElement('div');
    div.className = 'tile';
    if(i===8){ div.classList.add('hidden'); div.dataset.empty='true'; }
    div.style.backgroundImage = `url('${TILE_SOURCES[i]}')`;
    div.dataset.pos = i;
    div.addEventListener('click', ()=>{ slideTile(i); });
    slider.appendChild(div);
  }
}

function shuffleSlider(){
  // perform random legal moves to shuffle
  for(let k=0;k<200;k++){
    const emptyIndex = sliderState.indexOf(8);
    const moves = possibleMoves(emptyIndex);
    const pick = moves[Math.floor(Math.random()*moves.length)];
    // swap
    [sliderState[emptyIndex], sliderState[pick]] = [sliderState[pick], sliderState[emptyIndex]];
  }
  renderSlider();
}

function renderSlider(){
  const slider = document.getElementById('slider');
  const tiles = slider.querySelectorAll('.tile');
  for(let i=0;i<9;i++){
    const tileIndex = sliderState[i];
    const tile = tiles[i];
    tile.style.backgroundImage = `url('${TILE_SOURCES[tileIndex]}')`;
    if(tileIndex===8) tile.classList.add('hidden'); else tile.classList.remove('hidden');
  }
}

function possibleMoves(emptyIndex){
  const moves = [];
  const r = Math.floor(emptyIndex/3), c = emptyIndex%3;
  const neighbors = [
    [r-1,c],[r+1,c],[r,c-1],[r,c+1]
  ];
  neighbors.forEach(n=>{
    if(n[0]>=0 && n[0]<3 && n[1]>=0 && n[1]<3){
      moves.push(n[0]*3+n[1]);
    }
  });
  return moves;
}

function slideTile(clickedPos){
  const emptyIndex = sliderState.indexOf(8);
  // find index of clickedPos in sliderState
  const tileIndex = sliderState.indexOf(clickedPos);
  // need to move the tile that is currently at some position; simpler approach: we treat sliderState as positions => content mapping
  // instead we'll compute row/col of clickedPos's location in layout (index in array)
  // find the index i such that sliderState[i] === clickedPos
  let iIndex = sliderState.indexOf(clickedPos);
  if(iIndex===-1) return;
  const rClicked = Math.floor(iIndex/3), cClicked = iIndex%3;
  const rEmpty = Math.floor(emptyIndex/3), cEmpty = emptyIndex%3;
  const dist = Math.abs(rClicked-rEmpty)+Math.abs(cClicked-cEmpty);
  if(dist===1){
    // swap content
    [sliderState[iIndex], sliderState[emptyIndex]] = [sliderState[emptyIndex], sliderState[iIndex]];
    renderSlider();
    // check solved
    if(isSliderSolved()){
      document.getElementById('p2-feedback').textContent = 'Image reconstituée ! Regarde le centre pour le code.';
      solved.p2 = true; // optionally auto-solve
    }
  }
}

function isSliderSolved(){
  for(let i=0;i<9;i++){
    if(sliderState[i]!==i) return false;
  }
  return true;
}
