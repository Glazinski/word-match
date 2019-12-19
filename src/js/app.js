import '../main.scss';
import Search from './models/Search';
import * as base from './views/base';
import * as letters from './views/lettersView';
import * as board from './views/boardView';
import Board from './models/Board';

const state = {
  listOfWords: [],
  allPoints: [],
  allLetters: [],
  hintAttempts: 4,
};

export default state;

const lettersControl = () => {
  // RENDER RANDOM LETTER BOXES
  letters.renderRandomLetters(state);

  // ADD THESE ELEMENTS AFTER RENDER THEM TO elements object
  base.elements.letterBoxes = [...document.querySelectorAll('.btn-letter-box')];

  // gsap.to('.btn-letter-box', 0.8, { rotation: 360, transformOrigin: '50% 50%' });
  // gsap.fromTo('.btn-letter-box', 0.8, { scale: 0.9 },
  //   { rotation: 360, transformOrigin: '50% 50%', scale: 1 });
  gsap.fromTo('.btn-letter-box', 0.6, { scale: 0.9 }, { scale: 1 });

  base.elements.letterBoxes
    .forEach(box => box.addEventListener('click', e => letters.onLetterClick(e.target, state)));
};

// It will run game after restart
window.onload = () => {
  const reloading = sessionStorage.getItem('reloading');
  if (reloading) {
    sessionStorage.removeItem('reloading');
    controlPlay();
  }
};

const restartGame = () => {
  sessionStorage.setItem('reloading', 'true');
  document.location.reload();
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
        base.clearWords();
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
        } else {
          // If the same word has been entered
          // more than once show warning message
          const msg = 'You cannot enter the same word';
          base.showWarning(msg);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const msg = 'Word has to be longer than 2 characters';
      base.showWarning(msg);
    }
  } else if (type === 'cancel') {
    base.clearWords();
    state.userWord = '';
  } else if (type === 'home') {
    document.location.reload();
  } else if (type === 'new-game') {
    // Reload page and start game
    restartGame();
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
  [...document.querySelectorAll('.btn-control')]
    .map(item => item.addEventListener('click', searchControll));

  // HINT Control
  // base.elements.hint = document.querySelector('.hint');
  // base.elements.hint.addEventListener('click', hintControl);
};

// HINT Control
// TODO int the future
// const hintControl = async () => {
//   try {
//     // If user has used all hints
//     // then more hints are blocked
//     if (state.hintAttempts !== 0) {
//       state.hintAttempts -= 1;
//       // Only if there is no word from Hint
//       // generate new Hint
//       if (!state.hint || state.hint.data.length === 0) {
//         state.hint = new Hint(state.allLetters);
//         await state.hint.getLetter();
//       }

//       [...document.querySelectorAll('.letter')].some(el => {
//         if (el.innerHTML === state.hint.data[0].toUpperCase()) {
//           el.parentNode.click();
//           state.hint.data = state.hint.data.substr(1);
//           // state.hint.attempts -= 1;
//           return true;
//         }
//       });

//       if (state.hint.data.length === 0) document.querySelector('.btn-control--enter').click();
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// Logic with key pressing
document.addEventListener('keydown', event => {
  // 1 - 49, ..., 4 - 52
  // q - 113, w - 119, e - 101, r - 114
  // a - 97, s - 115, d - 100, f - 102
  // z - 122, x - 120, c - 99, v - 118
  const { key, keyCode } = event;
  const clickedLetter = document.getElementById(`${key.toLowerCase().charCodeAt(0)}`);

  if (keyCode === 13) {
    event.preventDefault();
    document.querySelector('.btn-control--enter').click();
  // eslint-disable-next-line brace-style
  }
  else if (keyCode === 32) {
  // Toggle keymap on spacebar click
    letters.toggleBindedKeys();
  // eslint-disable-next-line brace-style
  }
  // On key click
  else if (clickedLetter) letters.onLetterClick(clickedLetter, state);
});

base.elements.play.addEventListener('click', controlPlay);

// HOWTO
base.elements.howtoBtn.addEventListener('click', () => {
  base.elements.menu.classList.toggle('hidden');
  base.elements.howto.classList.toggle('hidden');
});
