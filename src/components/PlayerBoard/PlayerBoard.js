// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toJS } from 'immutable';
import HeadQuarters from '../HeadQuarters/HeadQuarters';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import { updateCargo } from './player-board-actions';
import { reduceObjectValues } from '../../helpers/reduce-object-value';

type State = {}

type Props = {}


class PlayerBoard extends Component<Props, State>{

  state: State

  constructor(props: Props) {
    super(props)

    this.state = {
    }

    this.updateCargo = this.updateCargo.bind(this);
  }

  updateCargo: () => void;
  updateCargo() {
    const { terminals, cargo } = this.props;
    const death = reduceObjectValues(terminals, 'death');
    const resources = reduceObjectValues(terminals, 'resources')
    const cargoItems = {
      colonists: cargo.get('colonists'),
      soylent: cargo.get('soylent'),
      credits: cargo.get('credits'),
    }

    const distributedResources = cargo.get('distributedResources').toJS()
    const resourceKeys = Object.keys(distributedResources);

    Object.keys(cargoItems).map(key => {
      cargoItems[key] = cargoItems[key] + reduceObjectValues(terminals, key)
    })
    const length = resourceKeys.length;
    for (var i = 0; i < resources; i ++) {
      distributedResources[resourceKeys[i % length]] = distributedResources[resourceKeys[i % length]] + 1;
    }

    const distributedItems = {
      ...cargoItems,
      distributedResources,
    }
    this.props.updateCargo(distributedItems);
  }
  render() {

    return (
      <div>
        PLAYER BOARD
        <ResourceDisplay />
        <HeadQuarters
          terminalAmount={7}
          updateCargo={this.updateCargo}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  numberOfHacks: state.headQuarters.get('numberOfHacks'),
  terminals: state.headQuarters.get('terminals'),
  cargo: state.playerBoard
});

export default connect(mapStateToProps, { updateCargo })(PlayerBoard);
