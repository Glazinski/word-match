export default class Board {
   constructor(result) {
      this.result = result;
   }

   doesWordExist() {
      const { data, word } = this.result;
      if (data === undefined || data == 0) {
         // DO SOMETHING if word won't be found
         console.log('Tablica pusta');
         // If word doesn't exist then remove it
         this.word = '';
         this.point = '';
      } else {
         if (word === data[0].word) {
            // I want points and words to be in board not in result
            this.word = word;
            // Points counting method
            this.point = Math.ceil(word.length / 2) - 1;

            // Returning a function which sum up
            // points to the global state
         } else console.log('NIE MA', word);
      }

      return points => (this.point ? (points += this.point) : null);
   }
}
