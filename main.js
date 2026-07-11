import * as Blockly from 'blockly';

window.addEventListener('DOMContentLoaded', () => {
  try {
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      grid: { space: 20, length: 1, colour: '#e0e0e0', snap: true },
      trashcan: true,
      zoom: { controls: true, wheel: true, startScale: 0.85, maxScale: 2, minScale: 0.4 }
    });

    const loadingScreen = document.getElementById('loading-screen');
    const block1 = document.getElementById('load-block-1');
    const block2 = document.getElementById('load-block-2');

    if (block1 && block2 && loadingScreen) {
      setTimeout(() => { block1.classList.add('drop'); }, 300);
      setTimeout(() => { block2.classList.add('drop'); }, 700);
      setTimeout(() => { loadingScreen.classList.add('fade-out'); }, 1300);
    } else if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
    }

    const runBtn = document.getElementById('run-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const debugBtn = document.getElementById('debug-btn');

    function resetButtons() {
      if (runBtn) runBtn.classList.remove('active');
      if (pauseBtn) pauseBtn.classList.remove('active');
      if (debugBtn) debugBtn.classList.remove('active');
    }

    if (runBtn) {
      runBtn.addEventListener('click', () => {
        resetButtons();
        runBtn.classList.add('active');
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (runBtn && !runBtn.classList.contains('active') && debugBtn && !debugBtn.classList.contains('active')) return;
        resetButtons();
        pauseBtn.classList.add('active');
      });
    }

    if (debugBtn) {
      debugBtn.addEventListener('click', () => {
        resetButtons();
        debugBtn.classList.add('active');
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        resetButtons();
      });
    }

    const assetCards = document.querySelectorAll('.asset-card');
    assetCards.forEach(card => {
      card.addEventListener('click', () => {
        assetCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

  } catch (error) {
    console.error("Initialization Error:", error);
    const fallbackScreen = document.getElementById('loading-screen');
    if (fallbackScreen) {
      fallbackScreen.classList.add('fade-out');
    }
  }
});
