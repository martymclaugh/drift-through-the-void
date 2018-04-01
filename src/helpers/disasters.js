export default {
  globalWarming: {
    cost: 2,
    name: 'Global Warming',
    hitPoints: -2,
  },
  biologicalWarfare: {
    cost: 3,
    name: 'Biological Warfare',
    hitPoints: -3, // to opponents
  },
  invasion: {
    cost: 4,
    hitPoints: -4,
  },
  fascism: {
    cost: 5,
    hitPoints: 0 // lose all resources // anything greater than 5 disasters
  },
}
