import * as Blockly from 'blockly';

window.addEventListener('DOMContentLoaded', () => {
  try {
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      grid: { space: 20, length: 1, colour: '#e0e0e0', snap: true },
      trashcan: true,
      zoom: { controls: true, wheel: true, startScale: 0.85, maxScale: 2, minScale: 0.4 }
    });

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
  }
});
