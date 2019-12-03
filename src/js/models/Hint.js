import axios from 'axios';

export default class Hint {
  constructor(letters) {
    this.letters = letters;
  }

  async getLetter() {
    try {
      const ranLet = this.letters[Math.floor(Math.random() * this.letters.length)];
      console.log(ranLet);
      const res = await axios(
        `https://api.datamuse.com/words?sp=${ranLet}*`,
      );
      // Returns one word that is longer than
      // 3 characters
      this.data = res.data.find(({ word }) => word.length > 3);
    } catch (err) {
      console.log(err);
    }
  }
}
