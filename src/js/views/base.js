import { clearLetters } from './lettersView';
import { countTime } from './timerView';

export const elements = {
  game: document.querySelector('.game'),
  menu: document.querySelector('.section-menu'),
  play: document.querySelector('.btn-menu--1'),
  timer: document.querySelector('.timer'),
  lettersContainer: document.querySelector('.section-letters__container'),
  // letterBoxes: Array.from(document.querySelectorAll('.btn-letter-box')),
  formControl: document.querySelector('.form-control'),
};

export const toggleGame = () => {
  elements.game.classList.toggle('hidden');
  elements.menu.classList.toggle('hidden');
};

export const clearWords = () => {
  clearLetters();

  elements.letterBoxes.map(box => {
    box.classList.remove('btn-clicked');
    box.style.pointerEvents = 'auto';
  });
};

export const newGame = () => {
  clearWords();
  countTime();
};

export const isMobile = () => (window.innerWidth > 768 ? false : true);
