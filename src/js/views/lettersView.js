import { elements } from './base';

let userWord = new Map();

export const onLetterClick = (e, state) => {
   const { innerHTML, dataset } = e;
   const { id } = dataset;

   e.classList.toggle('btn-clicked');

   console.log(e);

   if (userWord.has(id)) {
      userWord.delete(id);
   } else {
      userWord.set(id, innerHTML.toLowerCase());
   }

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

export const renderRandomLetters = () => {
   const ids = [
      '49',
      '50',
      '51',
      '52',
      '113',
      '119',
      '101',
      '114',
      '97',
      '115',
      '100',
      '102',
      '122',
      '120',
      '99',
      '118'
   ];
   const characters = 'LUCKY';
   const charArr = [...characters];

   //const generatedLetters = [];

   let buttonsMarkup = '';

   // RANDOM LETTER BOXES
   for (let i = 0; i < 16; i++) {
      let ran = charArr[Math.floor(Math.random() * charArr.length)];
      buttonsMarkup += `<button id="${ids[i]}" data-id="${ids[i]}" class="btn btn-letter-box section-letters__letter-box">${ran}</button>`;
      // test[i].innerHTML = charArr[Math.floor(Math.random() * charArr.length)];
      //generatedLetters.push(ran);
   }
   elements.lettersContainer.insertAdjacentHTML('afterbegin', buttonsMarkup);
   //return state => (state.allLetters = generatedLetters);
};

document.onclick = () => console.log(userWord);

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

// export const renderRandomLetters = () => {
//    const characters = 'LUCKY';
//    const charArr = [...characters];

//    let buttonsMarkup = '';

//    // RANDOM LETTER BOXES
//    for (let i = 0; i < 16; i++) {
//       const ran = charArr[Math.floor(Math.random() * charArr.length)];
//       buttonsMarkup += `<button data-id="${ran
//          .toLowerCase()
//          .charCodeAt(
//             0
//          )}" class="btn btn-letter-box section-letters__letter-box">${ran}</button>`;
//       // test[i].innerHTML = charArr[Math.floor(Math.random() * charArr.length)];
//    }

//    elements.lettersContainer.insertAdjacentHTML('afterbegin', buttonsMarkup);
// };
