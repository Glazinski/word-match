import { elements } from './base';

elements.words = document.querySelector('.list__words');
elements.points = document.querySelector('.list__points');
elements.result = document.querySelector('.points-result');

export const showResults = (word, point, points) => {
  // const wordMarkup = `<li>${word}</li>`;
  const wordMarkup = `<li>${word}</li>`;

  const pointMarkup = `<li>${point > 0 ? point : ''}</li>`;

  // Add word to board which was found in API
  elements.words.insertAdjacentHTML('afterbegin', wordMarkup);
  elements.points.insertAdjacentHTML('afterbegin', pointMarkup);
  // Sum up points from array
  elements.result.innerHTML = points.reduce((a, b) => a + b, 0);

  // Returning function which delets
  // its conent
};

export const clearResults = () => {
  elements.words.innerHTML = '';
  elements.points.innerHTML = '';
  elements.result.innerHTML = '';
};
