import { Slider } from '../classes/slider';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLElement>('.slider').forEach(el => {
    new Slider(el);
  });
});
