import Filter from 'bad-words';
const filterBadWords = new Filter();

function containsBadWord(name) {
  const removedWords = ['hell', 'hells', 'ass'];
  removedWords.map(word => filterBadWords.removeWords(word));
  return filterBadWords.clean(name).includes('***');
}

export default containsBadWord;
