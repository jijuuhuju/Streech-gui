import * as Blockly from 'blockly';

// Blocklyを本家風の設定で初期化
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  grid: { space: 20, length: 1, colour: '#e0e0e0', snap: true },
  trashcan: true,
  zoom: { controls: true, wheel: true, startScale: 0.85, maxScale: 2, minScale: 0.4 }
});

// ⏳ ロード画面アニメーションの連動
const loadingScreen = document.getElementById('loading-screen');
const block1 = document.getElementById('load-block-1');
const block2 = document.getElementById('load-block-2');

setTimeout(() => { block1.classList.add('drop'); }, 400);
setTimeout(() => { block2.classList.add('drop'); }, 900);
setTimeout(() => { loadingScreen.classList.add('fade-out'); }, 1500);

// コントロールボタン周りの連動ロジック
const runBtn = document.getElementById('run-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const debugBtn = document.getElementById('debug-btn');

function resetButtons() {
  runBtn.classList.remove('active');
  pauseBtn.classList.remove('active');
  debugBtn.classList.remove('active');
}

runBtn.addEventListener('click', () => {
  resetButtons();
  runBtn.classList.add('active');
});

pauseBtn.addEventListener('click', () => {
  if (!runBtn.classList.contains('active') && !debugBtn.classList.contains('active')) return;
  resetButtons();
  pauseBtn.classList.add('active');
});

debugBtn.addEventListener('click', () => {
  resetButtons();
  debugBtn.classList.add('active');
});

stopBtn.addEventListener('click', () => {
  resetButtons();
});

// スプライト一覧のカード切り替え処理
const assetCards = document.querySelectorAll('.asset-card');
assetCards.forEach(card => {
  card.addEventListener('click', () => {
    assetCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});
