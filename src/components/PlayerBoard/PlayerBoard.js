// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCargo } from './player-board-actions';
import { sendCargo } from '../../redux/game/game-actions';
import { reduceObjectValues } from '../../helpers/reduce-object-value';
import HeadQuarters from '../HeadQuarters/HeadQuarters';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import PlanetContainer from '../PlanetContainer/PlanetContainer';
import { Props, State } from '../../flow/components/player-board-types';

class PlayerBoard extends Component<Props, State>{

  constructor(props: Props) {
    super(props)

    this.state = {
    }

    this.updateCargo = this.updateCargo.bind(this);
  }

  updateCargo: () => void;
  updateCargo() {
    const { terminals, cargo } = this.props;
    // const death = reduceObjectValues(terminals, 'death');
    const resources = reduceObjectValues(terminals, 'resources')
    let cargoItems = {
      colonists: cargo.get('colonists'),
      soylent: cargo.get('soylent'),
      credits: cargo.get('credits'),
    }
    let distributedResources = cargo.get('distributedResources').toJS();
    const resourceKeys = Object.keys(distributedResources);

    Object.keys(cargoItems).map(key => {
      cargoItems[key] = cargoItems[key] + reduceObjectValues(terminals, key);

      return cargoItems;
    })
    for (var i = 0; i < resources; i ++) {
      const key = resourceKeys[i % resourceKeys.length];
      distributedResources[key] = distributedResources[key] + 1;
    }

    const distributedItems = {
      ...cargoItems,
      distributedResources,
    }
    this.props.updateCargo(distributedItems);
    this.props.sendCargo(distributedItems);
  }
  render() {

    return (
      <div>
        <ResourceDisplay />
        <PlanetContainer />
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

export default connect(mapStateToProps, { updateCargo, sendCargo })(PlayerBoard);
