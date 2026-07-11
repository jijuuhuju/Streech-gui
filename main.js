window.addEventListener('DOMContentLoaded', () => {
  try {
    const runBtn = document.getElementById('run-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const debugBtn = document.getElementById('debug-btn');

    const inputName = document.querySelector('.asset-info-bar .info-item:nth-child(1) .info-input');
    const inputX = document.querySelector('.asset-info-bar .info-item:nth-child(2) .info-input');
    const inputY = document.querySelector('.asset-info-bar .info-item:nth-child(3) .info-input');
    const inputSize = document.querySelector('.asset-info-bar .info-item:nth-child(4) .info-input');
    const inputDir = document.querySelector('.asset-info-bar .info-item:nth-child(5) .info-input');

    const stageSprite = document.querySelector('.sprite-mock-cat');

    const allInputs = document.querySelectorAll('.asset-info-bar .info-input');
    allInputs.forEach(input => {
      input.removeAttribute('readonly');
      input.style.pointerEvents = 'auto';
    });

    if (inputName) {
      inputName.addEventListener('input', (e) => {
        const newName = e.target.value;
        if (stageSprite) stageSprite.textContent = newName;
        const currentActiveCard = document.querySelector('.asset-card.active span');
        if (currentActiveCard) currentActiveCard.textContent = newName;
      });
    }

    if (inputX || inputY || inputSize || inputDir) {
      const updateSpriteStyle = () => {
        if (!stageSprite) return;
        const x = inputX && inputX.value !== '' ? parseFloat(inputX.value) : 0;
        const y = inputY && inputY.value !== '' ? parseFloat(inputY.value) : 0;
        const size = inputSize && inputSize.value !== '' ? parseFloat(inputSize.value) : 100;
        const dir = inputDir && inputDir.value !== '' ? parseFloat(inputDir.value) : 90;

        const translateX = x;
        const translateY = -y;
        const scale = size / 100;
        const rotateDeg = dir - 90;

        stageSprite.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotateDeg}deg)`;
        stageSprite.style.transition = 'transform 0.1s ease-out';
      };

      if (inputX) inputX.addEventListener('input', updateSpriteStyle);
      if (inputY) inputY.addEventListener('input', updateSpriteStyle);
      if (inputSize) inputSize.addEventListener('input', updateSpriteStyle);
      if (inputDir) inputDir.addEventListener('input', updateSpriteStyle);
      
      updateSpriteStyle();
    }

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
        if (inputX) inputX.value = 0;
        if (inputY) inputY.value = 0;
        if (inputSize) inputSize.value = 100;
        if (inputDir) inputDir.value = 90;
        
        if (stageSprite) {
          stageSprite.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
        }
      });
    }

    const assetCards = document.querySelectorAll('.asset-card');
    assetCards.forEach(card => {
      card.addEventListener('click', () => {
        assetCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const cardName = card.querySelector('span').textContent;
        if (inputName) inputName.value = cardName;
        if (stageSprite) stageSprite.textContent = cardName;
      });
    });

  } catch (error) {
    console.error("Initialization Error:", error);
  }
});
