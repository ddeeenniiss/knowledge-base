document.querySelectorAll<HTMLElement>('.box').forEach(box => {
  let isAnimating = false;

  box.addEventListener('mouseenter', (e) => {
    console.log('mouseenter triggered', e.target, 'isAnimating:', isAnimating);

    if (isAnimating) return; // Animation läuft bereits, nicht neu starten
    isAnimating = true;

    console.log('Animation startet jetzt');

    box.classList.add('animate-hover');

    const handleAnimationEnd = () => {
      console.log('Animation beendet');
      box.classList.remove('animate-hover');
      isAnimating = false;
      box.removeEventListener('animationend', handleAnimationEnd);
    };

    box.addEventListener('animationend', handleAnimationEnd);
  });

  box.addEventListener('mousemove', (e) => {
    console.log('mousemove innerhalb Box', e.target);
  });

  box.addEventListener('mouseleave', (e) => {
    console.log('mouseleave triggered', e.target);
  });
});
