import { Slider } from '../classes/slider';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLElement>('.slider').forEach(sliderEl => {
    new Slider(sliderEl);
  });
});
 