import { elements } from './base';

let userWord = new Map();

export const onLetterClick = (e, state) => {
   const { innerHTML, dataset } = e.target;
   const { id } = dataset;

   e.target.classList.toggle('btn-clicked');

   if (userWord.has(id)) {
      userWord.delete(id);
   } else userWord.set(id, innerHTML.toLowerCase());

   // Change Map to array join letters
   // and return them to state
   const concatedWord = Array.from(userWord.values()).join('');

   document.querySelector(
      '.curent-word'
   ).innerHTML = concatedWord.toUpperCase();

   return (state.userWord = concatedWord);
};

export const clearLetters = () => {
   document.querySelector('.curent-word').innerHTML = '';
   userWord.clear();
};

// export const renderRandomLetters = () => {
//    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//    const charArr = [...characters];

//    let buttonsMarkup = '';

//    // RANDOM LETTER BOXES
//    for (let i = 0; i < 16; i++) {
//       buttonsMarkup += `<button data-id="${i}" class="btn btn-letter-box section-letters__letter-box">${
//          charArr[Math.floor(Math.random() * charArr.length)]
//       }</button>`;
//       // test[i].innerHTML = charArr[Math.floor(Math.random() * charArr.length)];
//    }

//    elements.lettersContainer.insertAdjacentHTML('afterbegin', buttonsMarkup);
// };

export const renderRandomLetters = () => {
   const characters = 'LUCKY';
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

//document.onclick = () => console.log(userWord);
