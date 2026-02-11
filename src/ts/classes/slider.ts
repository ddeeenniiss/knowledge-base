export class Slider {
  private slider: HTMLElement;
  private slidesWrapper: HTMLElement;
  private slides: HTMLElement[];
  private prevBtn: HTMLButtonElement | null;
  private nextBtn: HTMLButtonElement | null;
  private dotsContainer: HTMLElement | null;
  private dots: HTMLButtonElement[] = [];
  private index: number = 0;

  constructor(slider: HTMLElement) {
    this.slider = slider;
    this.slidesWrapper = slider.querySelector<HTMLElement>('.slides')!;
    this.slides = Array.from(slider.querySelectorAll<HTMLElement>('.slide'));
    this.prevBtn = slider.querySelector<HTMLButtonElement>('.prev');
    this.nextBtn = slider.querySelector<HTMLButtonElement>('.next');
    this.dotsContainer = slider.querySelector<HTMLDivElement>('.dots');

    if (!this.slidesWrapper || !this.slides.length || !this.prevBtn || !this.nextBtn || !this.dotsContainer) {
      console.warn('Slider: Elemente fehlen');
      return;
    }

    this.initDots();
    this.bindEvents();
    this.goTo(0);
  }

  private initDots() {
    this.dotsContainer!.innerHTML = '';
    this.slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer!.appendChild(dot);
      this.dots.push(dot);
    });
  }

  private bindEvents() {
    this.prevBtn!.addEventListener('click', () => this.goTo(this.index - 1));
    this.nextBtn!.addEventListener('click', () => this.goTo(this.index + 1));
  }

  private goTo(i: number) {
    this.index = (i + this.slides.length) % this.slides.length;
    this.slidesWrapper.style.transform = `translateX(-${this.index * 100}%)`;

    this.dots.forEach(d => d.classList.remove('active'));
    this.dots[this.index].classList.add('active');
  }
}
