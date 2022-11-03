export function shuffle(cardsList, shuffleAmount: number): void {
  if (shuffleAmount <= 0 || typeof shuffleAmount !== 'number') return;
  for (let i = 0; i < shuffleAmount; i++) {
    const location1 = Math.floor(Math.random() * cardsList.length);
    const location2 = Math.floor(Math.random() * cardsList.length);
    const tmp = cardsList[location1];

    cardsList[location1] = cardsList[location2];
    cardsList[location2] = tmp;
  }
}
