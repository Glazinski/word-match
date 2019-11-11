import axios from 'axios';
import { proxy } from '../config';

export default class Search {
   constructor(word) {
      this.word = word;
   }

   async getWord() {
      try {
         const res = await axios(
            `http://api.datamuse.com/words?sp=%2A%2A${this.word}%2A%2A&max=1`
         );

         this.data = res.data;
      } catch (err) {
         console.log(err);
      }
   }
}
