// import axios from 'axios';

// export default class Hint {
//   constructor(letters) {
//     this.letters = letters;
//     this.data = '';
//     this.attempts = 0;
//   }

//   async getLetter() {
//     try {
//       const ranLet = this.letters[Math.floor(Math.random() * this.letters.length)];
//       console.log(ranLet);
//       const res = await axios(
//         `https://api.datamuse.com/words?sp=${ranLet}*`,
//       );
//       // Returns one word that is longer than
//       // 3 characters
//       // this.data = res.data.find(({ word }) => word.length > 3);
//       const data = res.data.filter(({ word }) => word.length > 3);
//       const ranWord = data[Math.floor(Math.random() * data.length)].word;
//       console.log(data, ranWord);

//       // Checks if letters generated on board
//       // are included in the word from Hint
//       const isInBoard = data.word.split('').map(el => {
//         if (this.letters.join('').includes(el.toUpperCase())) {
//           return true;
//         }
//         return false;
//       });

//       console.log(isInBoard);

//       if (!isInBoard.includes(false)) {
//         this.attempts = data.word.length;
//         this.data = data.word;
//       }
//       // else this.getLetter();
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }
