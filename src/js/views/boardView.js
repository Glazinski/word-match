export const showResults = (word, point, points) => {
   const wordMarkup = `<li>${word}</li>`;
   const pointMarkup = `<li>${point}</li>`;
   // Add word to board which was found in API
   document
      .querySelector('.list__words')
      .insertAdjacentHTML('beforeend', wordMarkup);

   // Prints point to each word
   document
      .querySelector('.list__points')
      .insertAdjacentHTML('beforeend', pointMarkup);

   // Prints accumulated points
   document.querySelector('.points-result').innerHTML = points;
};
