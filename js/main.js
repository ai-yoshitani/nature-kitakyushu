// アーバンネイチャー北九州 - メインJS

// ハンバーガーメニュー
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // モバイルナビのリンククリックで閉じる
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // アコーディオン
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');
      // 同じグループ内の他を閉じる（任意）
      // item.parentElement.querySelectorAll('.accordion__item').forEach(i => i.classList.remove('active'));
      item.classList.toggle('active', !wasActive);
    });
  });

  // タブフィルタ
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.category;
        const grid = tabGroup.nextElementSibling;
        if (grid) {
          grid.querySelectorAll('[data-category]').forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
              item.style.display = '';
            } else {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });

  // スムーススクロール（アンカーリンク）
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // フォームバリデーション
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
        // メールバリデーション
        if (field.type === 'email' && field.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(field.value)) {
            field.classList.add('error');
            valid = false;
          }
        }
      });

      // プライバシーポリシー同意チェック
      const privacyCheck = form.querySelector('input[name="privacy"]');
      if (privacyCheck && !privacyCheck.checked) {
        valid = false;
        alert('プライバシーポリシーへの同意が必要です。');
        return;
      }

      if (valid) {
        alert('送信が完了しました（デモ）');
        form.reset();
      } else {
        alert('必須項目を入力してください。');
      }
    });
  });
});
