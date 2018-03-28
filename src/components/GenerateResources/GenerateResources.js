// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCargo, startGame, changePhase } from '../GameScreen/game-screen-actions';
import { sendCargo } from '../../redux/middlewares/socket/Game/game-actions';
import { reduceObjectValues } from '../../helpers/reduce-object-value';
import HeadQuarters from '../HeadQuarters/HeadQuarters';
import ResourceDisplay from '../ResourceDisplay/ResourceDisplay';
import { Props, State } from '../../flow/components/generate-resources-types';

import './generate-resources-styles.css';

class GenerateResources extends Component<Props, State>{

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
    });
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
    }
    this.props.updateCargo(distributedItems);
    this.props.sendCargo(distributedItems);
    // change phases
    setTimeout(() => {
      this.props.changePhase();
    }, 1500)
  }
  render() {
    const { planets } = this.props;
    const planetsArray = planets.keySeq().toArray();
  
    const numberOfTerminals = planetsArray.filter(key =>
      ( planets.getIn([key, 'requiredColonists']) === 0 )).length;

    return (
      <div className="generate-resources">
        <ResourceDisplay />
        <HeadQuarters
          terminalAmount={numberOfTerminals}
          updateCargo={this.updateCargo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const activePlayer = state.gameScreen.get('activePlayer');

  return {
    numberOfHacks: state.headQuarters.get('numberOfHacks'),
    terminals: state.headQuarters.get('terminals'),
    numberOfPlayers: state.gameScreen.get('numberOfPlayers'),
    playersJoined: state.gameScreen.get('playersJoined'),
    gameStarted: state.gameScreen.get('gameStarted'),
    users: state.gameScreen.get('users'),
    cargo: state.gameScreen.getIn(['users', `${activePlayer}`, 'resources']),
    games: state.lobby.get('games'),
    planets: state.gameScreen.getIn(['users', `${activePlayer}`, 'planets']),
  };
}

export default connect(mapStateToProps, {
  updateCargo,
  sendCargo,
})(GenerateResources);
