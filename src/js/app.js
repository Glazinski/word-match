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

   Array.from(document.querySelectorAll('.btn-control')).map(item =>
      item.addEventListener('click', searchControll)
   );
   // elements.formControl.addEventListener('submit', e => {
   //    e.preventDefault();
   //    searchControll(e);
   // });
};

const lettersControl = () => {
   // RENDER RANDOM LETTER BOXES
   letters.renderRandomLetters();

   // ADD THESE ELEMENTS AFTER RENDER THEM TO elements object
   elements.letterBoxes = Array.from(
      document.querySelectorAll('.btn-letter-box')
   );

   elements.letterBoxes.map(box =>
      box.addEventListener('click', e => letters.onLetterClick(e, state))
   );
};

const searchControll = async e => {
   // If word that user has put is
   // longer than 3 characters then go
   e.preventDefault();
   const { type } = e.target.dataset;
   console.log(e.target.dataset);
   if (type === 'enter') {
      if (state.userWord && state.userWord.length >= 3) {
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
   } else if (type === 'cancel') {
      base.clearWords();
      state.userWord = '';
   } else if (type === 'home') {
      base.toggleGame();
   } else if (type === 'new-game') {
      //base.newGame()
      //location.reload(true);
      base.toggleGame();
      controlPlay();
   }
};

elements.play.addEventListener('click', controlPlay);
window.onclick = () => console.log('state: ', state);
