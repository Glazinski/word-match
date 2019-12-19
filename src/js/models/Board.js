import * as base from '../views/base';

export default class Board {
  constructor(result) {
    this.result = result;
  }

  isWord() {
    const { data, word } = this.result;
    if (data === undefined || data.length === 0) {
      // DO SOMETHING if word won't be found
      const msg = 'No word :(';
      base.showWarning(msg);
      // If word doesn't exist then remove it
      this.word = '';
      this.point = 0;
    } else if (word === data[0].word) {
      // I want points and words to be in board not in result
      this.word = word;

      // Points counting method
      this.point = (word.length * 2) - 4;
    } else console.log('NIE MA', word);
  }
}
