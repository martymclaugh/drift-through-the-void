// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCargo } from './game-screen-actions';
import { sendCargo } from '../../redux/socket/game-actions';
import { reduceObjectValues } from '../../helpers/reduce-object-value';
import HeadQuarters from '../HeadQuarters/HeadQuarters';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import PlanetContainer from '../PlanetContainer/PlanetContainer';
import MonumentsContainer from '../MonumentsContainer/MonumentsContainer';
import { Props, State } from '../../flow/components/game-screen-types';

import './game-screen-styles.css';

class GameScreen extends Component<Props, State>{

  constructor(props: Props) {
    super(props)

    this.state = {
    }

    this.updateCargo = this.updateCargo.bind(this);
  }

  componentWillMount() {
    const server = this.props.match.params.slug;
    if (!this.props.games.get(server)) {
      this.props.history.push(`/lobby`);
    }
  }
  updateCargo: () => void;
  updateCargo() {
    const { terminals, cargo } = this.props;
    // const death = reduceObjectValues(terminals, 'death');
    const resources = reduceObjectValues(terminals, 'resources')
    let cargoItems = {
      colonists: cargo.getIn(['resources', 'colonists']),
      soylent: cargo.getIn(['resources', 'soylent']),
      credits: cargo.getIn(['resources', 'credits']),
    }
    let distributedResources = cargo.getIn(['resources', 'distributedResources']).toJS();
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
    const payload = {
      data: distributedItems,
      // server:
    }
    this.props.updateCargo(distributedItems);
    this.props.sendCargo(distributedItems);
  }
  render() {

    return (
      <div className='game-screen'>
        {/* <MonumentsContainer /> */}
        <ResourceDisplay />
        {/* <PlanetContainer /> */}
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
  cargo: state.gameScreen.get('resources'),
  games: state.lobby.get('games'),
});

export default connect(mapStateToProps, {
  updateCargo,
  sendCargo,
})(GameScreen);
