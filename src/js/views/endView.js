import state from '../app';

const endGame = () => {
  const res = document.querySelector('.points-result').innerHTML;
  const end = document.querySelector('.end-score');
  const finito = '<div class="end"></div>';

  end.classList.remove('hidden');
  gsap.fromTo(end, 0.5, { opacity: 0 }, { opacity: 1, y: 20 });
  document.body.insertAdjacentHTML('afterbegin', finito);

  document.querySelector('.end-sum-score').innerHTML = res || '0';
};

export default endGame;
