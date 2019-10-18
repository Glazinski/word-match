export const showResults = (word, points) => {
   const wordMarkup = `<li>${word}</li>`;
   const pointsMarkup = `<li>${points}</li>`;
   console.log(word);
   // Add word which was correct to board
   document
      .querySelector('.list__words')
      .insertAdjacentHTML('beforeend', wordMarkup);

   document
      .querySelector('.list__points')
      .insertAdjacentHTML('beforeend', pointsMarkup);
};
