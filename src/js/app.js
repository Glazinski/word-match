import '../main.scss';
import { elements } from './views/base';
import Search from './models/Search';
import * as base from './views/base';
import * as time from './views/timerView';
import * as letters from './views/lettersView';
import * as board from './views/boardView';
import Board from './models/Board';

const state = {
   points: 0
};

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

   // ADD THESE ELEMENTS AFTER RENDER THEM TO elements object
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
         // Clear userWord from state
         state.userWord = '';
         // Clear Map with letters and
         // innerHTML of current word
         letters.clearLetters();

         // Checks if the word exists
         state.board = new Board(state.search);
         state.board.doesWordExist();

         // Use second fuction in Board
         // to sum up points in state
         state.points = state.board.doesWordExist()(state.points);

         // Result after user's input
         const { word, point } = state.board;
         board.showResults(word, point, state.points);
      } catch (err) {
         console.log(err);
      }
   } else console.log('word is shorter than 3 char');
};

elements.play.addEventListener('click', controlPlay);
window.onclick = () => console.log('state: ', state);
