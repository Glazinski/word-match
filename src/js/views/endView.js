import state from '../app';

const endGame = () => {
  const res = document.querySelector('.points-result').innerHTML;
  const end = document.querySelector('.end-score');
  const wordsList = document.querySelector('.lists__words');
  const pointsList = document.querySelector('.lists__points');
  const finito = '<div class="end"></div>';
  const listOfAllPoints = state.listOfWords.map(el => `<li>${el}</li>`);
  const listOfAllWords = state.allPoints.map(el => `<li>${el > 0 ? el : ''}</li>`);

  end.classList.remove('hidden');
  gsap.fromTo(end, 0.5, { opacity: 0 }, { opacity: 1, y: 20 });
  document.body.insertAdjacentHTML('afterbegin', finito);

  wordsList.innerHTML = listOfAllPoints.join('');
  pointsList.innerHTML = listOfAllWords.join('');

  document.querySelector('.end-sum-score').innerHTML = res || 0;
};

export default endGame;
