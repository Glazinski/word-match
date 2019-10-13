import { elements } from './base';

export const countTime = () => {
   let min = 2;
   let sec = 60;
   let zero = '';

   const timer = setInterval(() => {
      if (sec <= 10) {
         zero = '0';
      } else zero = '';

      if (sec === 0) {
         min--;
         sec = 60;
      }

      sec--;

      // WHEN TIME ENDS
      if (sec === 0 && min === 0) {
         clearInterval(timer);
      }

      elements.timer.innerHTML = `${min}:${zero}${sec}`;
   }, 1000);
};
