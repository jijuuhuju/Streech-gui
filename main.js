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

    // 🛠️ 新しいアセットコンテナと半透明バッジの要素を取得
    const spriteContainer = document.getElementById('active-sprite-container');
    const nameBadge = document.querySelector('.sprite-name-badge');

    const allInputs = document.querySelectorAll('.asset-info-bar .info-input');
    allInputs.forEach(input => {
      input.removeAttribute('readonly');
      input.style.pointerEvents = 'auto';
    });

    // 🛠️ 名前のリアルタイム更新処理（半透明バッジと連動）
    if (inputName) {
      inputName.addEventListener('input', (e) => {
        const newName = e.target.value;
        if (nameBadge) nameBadge.textContent = newName;
        const currentActiveCard = document.querySelector('.asset-card.active span');
        if (currentActiveCard) currentActiveCard.textContent = newName;
      });
    }

    if (inputX || inputY || inputSize || inputDir) {
      const updateSpriteStyle = () => {
        if (!spriteContainer) return;
        const x = inputX && inputX.value !== '' ? parseFloat(inputX.value) : 0;
        const y = inputY && inputY.value !== '' ? parseFloat(inputY.value) : 0;
        const size = inputSize && inputSize.value !== '' ? parseFloat(inputSize.value) : 100;
        const dir = inputDir && inputDir.value !== '' ? parseFloat(inputDir.value) : 90;

        const translateX = x;
        const translateY = -y;
        const scale = size / 100;
        const rotateDeg = dir - 90;

        spriteContainer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotateDeg}deg)`;
        spriteContainer.style.transition = 'transform 0.1s ease-out';
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
        
        if (spriteContainer) {
          spriteContainer.style.transform = `translate(0px, 0px) scale(1) rotate(0deg)`;
        }
      });
    }

    // 🛠️ スプライトカード切り替え時の見た目出し分けロジック
    const assetCards = document.querySelectorAll('.asset-card');
    assetCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        assetCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const cardName = card.querySelector('span').textContent;
        if (inputName) inputName.value = cardName;
        if (nameBadge) nameBadge.textContent = cardName;

        // 🛠️ インデックス（順番）に応じて、スプライト1（画像）とスプライト2（点線モック）の表示スタイルを切り替える
        if (spriteContainer) {
          if (index === 0) {
            spriteContainer.className = 'view-sprite1'; // スプライト1の見た目（画像＋半透明バッジ）
          } else {
            spriteContainer.className = 'view-sprite2'; // スプライト2の見た目（従来の点線枠）
          }
        }
      });
    });

  } catch (error) {
    console.error("Initialization Error:", error);
  }
});
