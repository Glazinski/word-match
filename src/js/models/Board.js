export default class Board {
   constructor(result) {
      this.result = result;
   }

   doesWordExist() {
      const { data, word } = this.result;
      if (data === undefined || data == 0) {
         console.log('Tablica pusta');
         // If word doesn't exist then remove it
         this.word = '';
         this.points = '';
      } else {
         console.log(this.result);

         if (word === data[0].word) {
            this.word = word; // I want points and words in board not result
            this.points = Math.ceil(word.length / 2) - 1;
            console.log('ELO', this.points);
         } else console.log('NIE MA', word);
      }
   }
}
