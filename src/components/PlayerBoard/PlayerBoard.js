// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toJS } from 'immutable';
import HeadQuarters from '../HeadQuarters/HeadQuarters';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import { updateStorage } from './player-board-actions';
import { reduceObjectValues } from '../../helpers/reduce-object-value';

type State = {}

type Props = {}


class PlayerBoard extends Component<Props, State>{

  state: State

  constructor(props: Props) {
    super(props)

    this.state = {
    }

    this.updateStorage = this.updateStorage.bind(this);
  }

  updateStorage: () => void;
  updateStorage() {
    const { terminals, storage } = this.props;
    const death = reduceObjectValues(terminals, 'death');
    const resources = reduceObjectValues(terminals, 'resources')
    const storageItems = {
      colonists: storage.get('colonists'),
      soylent: storage.get('soylent'),
      credits: storage.get('credits'),
    }

    const distributedResources = storage.get('distributedResources').toJS()
    const resourceKeys = Object.keys(distributedResources);

    Object.keys(storageItems).map(key => {
      storageItems[key] = storageItems[key] + reduceObjectValues(terminals, key)
    })
    const length = resourceKeys.length;
    for (var i = 0; i < resources; i ++) {
      distributedResources[resourceKeys[i % length]] = distributedResources[resourceKeys[i % length]] + 1;
    }

    const distributedItems = {
      ...storageItems,
      distributedResources,
    }
    this.props.updateStorage({ distributedItems });
  }
  render() {

    return (
      <div>
        PLAYER BOARD
        <ResourceDisplay />
        <HeadQuarters
          terminalAmount={7}
          updateStorage={this.updateStorage}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  numberOfHacks: state.headQuarters.get('numberOfHacks'),
  terminals: state.headQuarters.get('terminals'),
  storage: state.playerBoard
});

export default connect(mapStateToProps, { updateStorage })(PlayerBoard);
