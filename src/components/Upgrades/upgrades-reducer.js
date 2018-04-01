import { fromJS, Map } from 'immutable';
import { types } from './upgrades-actions';
import { types as gameScreenTypes } from '../GameScreen/game-screen-actions';

const INITIAL_STATE = fromJS({
    selectedUpgrade: Map(),
    selectedResources: Map(),
});

const upgradesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SELECT_UPGRADE:
            return state.merge(fromJS(action.payload));
        case types.SELECT_RESOURCE:
            const key = Object.keys(action.payload)[0];
            const selectedResources = state.get('selectedResources');

            if (selectedResources.get(key) && selectedResources.get(key) === action.payload[key]) {
                return state.deleteIn(['selectedResources', `${key}`]);
            }
            return state.setIn(['selectedResources', `${key}`], action.payload[key] );
        case gameScreenTypes.CHANGE_PHASE:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default upgradesReducer;
