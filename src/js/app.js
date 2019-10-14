import '../main.scss';
import { elements } from './views/base';
import Search from './models/Search';
import * as base from './views/base';
import * as time from './views/timerView';
import * as letters from './views/lettersView';
import Letter from './models/Letter';

const state = {};

// PLAY CONTROLLER
const controlPlay = () => {
   // START GAME
   base.toggleGame();

   // TIME CONTROLLER
   time.countTime();
   // LETTERS CONTROL
   lettersControl();

   // SEARCH CONTROLL
   elements.formControl.addEventListener('submit', e => {
      e.preventDefault();
      searchControll();
   });
};

const lettersControl = () => {
   // RENDER RANDOM LETTER BOXES
   letters.renderRandomLetters();

   // ADD THESE ELEMENTS AFTER RENDER THERM
   elements.letterBoxes = Array.from(
      document.querySelectorAll('.btn-letter-box')
   );

   //state.userWord = new Letter();

   elements.letterBoxes.map(box =>
      box.addEventListener('click', e => letters.onLetterClick(e, state))
   );
};

const searchControll = async () => {
   // If word that user has put is
   // longer than 3 characters then go
   if (state.userWord.length >= 3) {
      state.search = new Search(state.userWord);

      try {
         await state.search.getWord();

         elements.letterBoxes.map(box => {
            box.classList.remove('btn-clicked');
            box.style.pointerEvents = 'auto';
         });
         state.userWord = '';
         letters.clearLetters();
      } catch (err) {
         console.log(err);
      }
   }
};

elements.play.addEventListener('click', controlPlay);
window.onclick = () => console.log('state: ', state);
