import { elements } from './base';

export const countTime = () => {
   elements.timer.innerHTML = `3:00`;
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

      if (sec <= 15 && min === 0) {
         elements.timer.style.color = '#c73333';
      }

      if (min === 0 && sec === 0) {
         // END THE GAME
      }

      elements.timer.innerHTML = `${min}:${zero}${sec}`;
   }, 1000);

   return timer;
};
