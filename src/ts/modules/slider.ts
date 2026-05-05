import { Slider } from '../classes/slider';

function initSliders() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('.slider'));

  if (els.length === 0) {
    const observer = new MutationObserver((mutations, obs) => {
      const found = Array.from(document.querySelectorAll<HTMLElement>('.slider'));
      if (found.length > 0) {
        obs.disconnect();
        found.forEach((el) => {
          try {
            new Slider(el);
          } catch (err) {}
        });
      }
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
    setTimeout(() => { try { observer.disconnect(); } catch (e) {} }, 10000);
    return;
  }

  els.forEach((el) => {
    try {
      new Slider(el);
    } catch (err) {}
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSliders);
} else {
  initSliders();
}

export { initSliders };
