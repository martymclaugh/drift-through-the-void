export const reduceObjectValues = (items, prop) => {
  return items.reduce((acc, currItem) => {
    if (currItem.value.amount.hasOwnProperty(prop)){
      return acc + currItem.value.amount[prop];
    } else {
      return acc
    }
  }, 0);
}
