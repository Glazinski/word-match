import { elements, isMobile } from './base';

const userWord = new Map();

export const onLetterClick = (e, state) => {
  const { innerHTML, dataset } = e;
  const { id } = dataset;

  // It changes span which is string
  // to dom element
  const doc = new DOMParser().parseFromString(innerHTML, 'text/xml');
  const singleLetter = doc.firstChild.innerHTML;

  e.classList.toggle('btn-clicked');

  if (userWord.has(id)) {
    userWord.delete(id);
  } else {
    userWord.set(id, singleLetter.toLowerCase());
  }

  // Change Map to array join letters
  // and return them to state
  const concatedWord = Array.from(userWord.values()).join('');

  document.querySelector('.curent-word').innerHTML = concatedWord.toUpperCase();

  state.userWord = concatedWord;
  return state.userWord;
};

export const clearLetters = () => {
  document.querySelector('.curent-word').innerHTML = '';
  userWord.clear();
};

export const toggleBindedKeys = () => {
  document.querySelectorAll('.binded-key').forEach(key => key.classList.toggle('hidden'));
};

export const renderRandomLetters = state => {
  // const characters = 'LUCKY';
  const characters = 'UUUNIT';
  const charArr = [...characters];

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
    '118',
  ];

  const generatedLetters = [];

  let buttonsMarkup = '';

  // RANDOM LETTER BOXES
  for (let i = 0; i < 16; i += 1) {
    const bKey = isMobile ? 'hidden' : '';
    const ran = charArr[Math.floor(Math.random() * charArr.length)];
    buttonsMarkup += `
      <div class="letter-container">
         <button id="${ids[i]}" data-id="${ids[i]}" 
         class="btn btn-letter-box section-letters__letter-box">
          <span id="letter" class="above-freeze letter">${ran}</span>
         </button>
         <span class="binded-key ${bKey}">${String.fromCharCode(parseInt(ids[i], 10))}</span>
      </div>
      `;
    // test[i].innerHTML = charArr[Math.floor(Math.random() * charArr.length)];
    generatedLetters.push(ran);
  }
  elements.lettersContainer.insertAdjacentHTML('afterbegin', buttonsMarkup);
  // return state => (state.allLetters = generatedLetters);
  state.allLetters = generatedLetters;
  return state;
};

// document.onclick = () => console.log(userWord);

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
