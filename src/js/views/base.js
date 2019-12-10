import { clearLetters } from './lettersView';
// import countTime from './timerView';

export const elements = {
  game: document.querySelector('.game'),
  menu: document.querySelector('.section-menu'),
  play: document.querySelector('.btn-menu--1'),
  howtoBtn: document.querySelector('.btn-menu--2'),
  timer: document.querySelector('.timer'),
  lettersContainer: document.querySelector('.section-letters__container'),
  // letterBoxes: Array.from(document.querySelectorAll('.btn-letter-box')),
  formControl: document.querySelector('.form-control'),
  howto: document.querySelector('.section-howto'),
};

export const countTime = () => {
  elements.timer.style.color = '#90ee90';
  elements.timer.innerHTML = '3:00';
  let min = 2;
  let sec = 60;
  let zero = '';

  const timer = setInterval(() => {
    if (sec === 0) {
      min -= 1;
      sec = 60;
    }

    if (sec <= 10) {
      zero = '0';
    } else zero = '';

    sec -= 1;

    // WHEN TIME ENDS
    if (sec === 0 && min === 0) {
      clearInterval(timer);
    }

    if (sec <= 15 && min === 0) {
      elements.timer.style.color = '#c73333';
    }

    elements.timer.innerHTML = `${min}:${zero}${sec}`;
  }, 1000);

  return timer;
};

export const toggleGame = () => {
  elements.game.classList.toggle('hidden');
  elements.menu.classList.toggle('hidden');
};

export const clearWords = () => {
  clearLetters();

  elements.letterBoxes.forEach(box => {
    box.classList.remove('btn-clicked');
    box.style.pointerEvents = 'auto';
  });
};

export const newGame = () => {
  clearWords();
  countTime();
};

export const isMobile = () => (!(window.innerWidth > 768));

export const showWarning = warning => {
  const testMarkup = `
    <div class="warning-rule ">${warning}</div>
  `;

  document.querySelector('.section-letters').insertAdjacentHTML('beforeend', testMarkup);

  setTimeout(() => {
    document.querySelector('.warning-rule').remove();
  }, 2500);
};

