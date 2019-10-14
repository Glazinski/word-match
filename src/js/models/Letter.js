export default class Letter {
   constructor(letter) {
      this.letter = letter;
      this.userWord = new Map();
   }

   setUserWord(id) {
      if (this.userWord.has(id)) {
         this.userWord.delete(id);
      } else this.userWord.set(id, this.letter.toLowerCase());
   }

   clearUserWord() {
      this.userWord.clear();
   }
}
