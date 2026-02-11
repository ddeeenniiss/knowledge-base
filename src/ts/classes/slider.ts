export class Slider {
  slider: HTMLElement;
  slidesWrapper: HTMLElement;
  slides: HTMLElement[];
  prevBtn: HTMLButtonElement;
  nextBtn: HTMLButtonElement;
  dotsContainer: HTMLElement;
  dots: HTMLButtonElement[] = [];
  index = 0;

  constructor(sliderEl: HTMLElement) {
    this.slider = sliderEl;
    this.slidesWrapper = sliderEl.querySelector<HTMLElement>('.slides')!;
    this.slides = Array.from(sliderEl.querySelectorAll<HTMLElement>('.slide'));
    this.prevBtn = sliderEl.querySelector<HTMLButtonElement>('.prev')!;
    this.nextBtn = sliderEl.querySelector<HTMLButtonElement>('.next')!;
    this.dotsContainer = sliderEl.querySelector<HTMLElement>('.dots')!;

    this.init();
  }

  init() {
    // Dots erzeugen
    this.slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });

    this.prevBtn.addEventListener('click', () => this.goTo(this.index - 1));
    this.nextBtn.addEventListener('click', () => this.goTo(this.index + 1));

    this.goTo(0);
  }

  goTo(i: number) {
    this.index = (i + this.slides.length) % this.slides.length;
    this.slidesWrapper.style.transform = `translateX(-${this.index * 100}%)`;
    this.dots.forEach(d => d.classList.remove('active'));
    this.dots[this.index].classList.add('active');
  }
}
