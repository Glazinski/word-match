import '../main.scss';
import Search from './models/Search';
import * as base from './views/base';
import * as letters from './views/lettersView';
import * as board from './views/boardView';
import Board from './models/Board';

const state = {
  listOfWords: [],
  allPoints: [],
};

const lettersControl = () => {
  // RENDER RANDOM LETTER BOXES
  letters.renderRandomLetters();

  // ADD THESE ELEMENTS AFTER RENDER THEM TO elements object
  base.elements.letterBoxes = Array.from(document.querySelectorAll('.btn-letter-box'));

  base.elements.letterBoxes
    .forEach(box => box.addEventListener('click', e => letters.onLetterClick(e.target, state)));
};

const searchControll = async e => {
  // If word that user has put is
  // longer than 3 characters then go
  e.preventDefault();
  const { type } = e.target.closest('.btn-control').dataset;
  if (type === 'enter') {
    if (state.userWord && state.userWord.length >= 3) {
      state.search = new Search(state.userWord);

      try {
        await state.search.getWord();

        base.elements.letterBoxes.forEach(box => {
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

        state.board.isWord();
        const { word, point } = state.board;

        // If word that user entered has been already
        // entered earlier it won't appear on the screen
        if (!state.listOfWords.includes(word)) {
          state.listOfWords.push(word);
          state.allPoints.push(point);

          // Result after user's input
          board.showResults(word, point, state.allPoints);
        }
      } catch (err) {
        console.log(err);
      }
    } else console.log('word is shorter than 3 char');
  } else if (type === 'cancel') {
    base.clearWords();
    state.userWord = '';
  } else if (type === 'home') {
    window.location.reload(true);
  } else if (type === 'new-game') {
    // Clears timer and starts it from the beginning
    clearInterval(state.time);

    //  DANGEROUS it changes state to
    // its original form
    //  for (const key in state) {
    //    if (key !== 'points' && key !== 'time') {
    //      delete state[key];
    //    } else state[key] = 0;
    //  }

    Object.keys(state).forEach(key => {
      if (key !== 'points' && key !== 'time') {
        delete state[key];
      } else state[key] = 0;
    });

    /* CLEAR DOM */

    // Sets new time
    state.time = base.countTime();

    base.clearWords();

    // Call function which clear the board
    board.clearResults();
  }
};

// PLAY CONTROLLER
const controlPlay = () => {
  // START GAME
  base.toggleGame();

  // TIME CONTROLLER
  state.time = base.countTime();
  // LETTERS CONTROL
  lettersControl();

  // SEARCH CONTROLL

  Array.from(document.querySelectorAll('.btn-control'))
    .map(item => item.addEventListener('click', searchControll));
  // elements.formControl.addEventListener('submit', e => {
  //    e.preventDefault();
  //    searchControll(e);
  // });
};

base.elements.play.addEventListener('click', controlPlay);
window.onclick = () => console.log('state: ', state);

// Logic with key pressing
document.addEventListener('keypress', event => {
  // 1 - 49, ..., 4 - 52
  // q - 113, w - 119, e - 101, r - 114
  // a - 97, s - 115, d - 100, f - 102
  // z - 122, x - 120, c - 99, v - 118

  const { key, keyCode } = event;
  const clickedLetter = document.getElementById(`${key.toLowerCase().charCodeAt(0)}`);

  // On key click
  if (clickedLetter) letters.onLetterClick(clickedLetter, state);

  // Toggle keymap on spacebar click
  if (keyCode === 32) {
    letters.toggleBindedKeys();
  }
});

// ONLY FOR TESTING
controlPlay();
