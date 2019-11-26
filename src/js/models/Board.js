export default class Board {
  constructor(result) {
    this.result = result;
  }

  isWord() {
    const { data, word } = this.result;
    if (data === undefined || data == 0) {
      // DO SOMETHING if word won't be found
      console.log('Tablica pusta');
      // If word doesn't exist then remove it
      this.word = '';
      this.point = 0;
    } else if (word === data[0].word) {
      // I want points and words to be in board not in result
      this.word = word;

      // Points counting method
      this.point = Math.ceil(word.length / 2) - 1;
    } else console.log('NIE MA', word);
  }
}
