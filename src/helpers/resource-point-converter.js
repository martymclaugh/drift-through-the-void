import { resourceMap } from './resource-map';

export const calculateResourcePoints = (type, amount) => {
  const { increment } = resourceMap[type];
  let previous = increment;
  let result = 0;

  for(let i = 0; i < amount; i ++) {
    result += previous;
    previous += increment;
  }

  return result;
}
