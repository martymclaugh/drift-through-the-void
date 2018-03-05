import { fromJS } from 'immutable';
import { monumentTypes } from './monument-actions';

const INITIAL_STATE = fromJS([
  {
    id: 'additionalPylon',
    name: 'Additional Pylon',
    requiredColonists: 3,
    pointsIfFirst: 1,
    pointsIfNotFirst: 0,
    firstClaimed: false,
  },
  {
    id: 'promethius',
    name: 'Promethius',
    requiredColonists: 5,
    pointsIfFirst: 2,
    pointsIfNotFirst: 1,
    firstClaimed: false,
  },
  {
    id: 'tesseract',
    name: 'Tesseract',
    requiredColonists: 7,
    pointsIfFirst: 4,
    pointsIfNotFirst: 2,
    firstClaimed: false,
  },
  {
    id: 'spaceLadder',
    name: 'Space Ladder',
    requiredColonists: 9,
    pointsIfFirst: 6,
    pointsIfNotFirst: 3,
    firstClaimed: false,
  },
  {
    id: 'sphereOFear',
    name: "Sphere O' Fear",
    requiredColonists: 11,
    pointsIfFirst: 8,
    pointsIfNotFirst: 4,
    firstClaimed: false,
  },
  {
    id: 'spacePortal',
    name: 'Space Portal',
    requiredColonists: 13,
    pointsIfFirst: 10,
    pointsIfNotFirst: 5,
    firstClaimed: false,
  },
  {
    id: 'spaceChurch',
    name: 'Space Church',
    requiredColonists: 15,
    pointsIfFirst: 12,
    pointsIfNotFirst: 6,
    firstClaimed: false,
  },
]);


const monumentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case monumentTypes.COLONIZE_MONUMENT:
      return state.setIn([action.payload, 'requiredColonists'], state.getIn([action.payload, 'requiredColonists']) - 1);
    default:
      return state;
  }
};

export default monumentReducer;
