export function initSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const slidesWrapper = slider.querySelector<HTMLElement>('.slides')!;
  const slides = slider.querySelectorAll<HTMLElement>('.slide');
  const prev = slider.querySelector<HTMLButtonElement>('.prev');
  const next = slider.querySelector<HTMLButtonElement>('.next');
  const dotsContainer = slider.querySelector<HTMLDivElement>('.dots');

  if (!slidesWrapper || !slides.length || !prev || !next || !dotsContainer) return;

  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll<HTMLButtonElement>('.dot');

  function goTo(i: number) {
    index = (i + slides.length) % slides.length;
    slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));

  goTo(0);
}

// Direkt beim Import ausführen
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
});
