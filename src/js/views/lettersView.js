import { elements } from './base';

let userWord = '';

export const onLetterClick = (e, state) => {
   e.target.classList.toggle('btn-clicked');

   userWord += e.target.innerHTML;
   //e.target.style.pointerEvents = 'none';

   return (state.userWord = userWord.toLowerCase());
};

export const renderRandomLetters = () => {
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const charArr = [...characters];

   let buttonsMarkup = '';

   // RANDOM LETTER BOXES
   for (let i = 0; i < 16; i++) {
      buttonsMarkup += `<button data-id="${i}" class="btn btn-letter-box section-letters__letter-box">${
         charArr[Math.floor(Math.random() * charArr.length)]
      }</button>`;
      // test[i].innerHTML = charArr[Math.floor(Math.random() * charArr.length)];
   }

   elements.lettersContainer.insertAdjacentHTML('afterbegin', buttonsMarkup);
};
