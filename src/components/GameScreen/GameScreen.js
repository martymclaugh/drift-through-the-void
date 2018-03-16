// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCargo, startGame } from './game-screen-actions';
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
      activePlayer: '',
    }

    this.updateCargo = this.updateCargo.bind(this);
  }

  componentWillMount() {
    const server = this.props.match.params.slug;
    if (!this.props.games.get(server)) {
      this.props.history.push(`/lobby`);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('NEXT PROPS', nextProps);
    // if (nextProps.playersJoined === nextProps.numberOfPlayers && !nextProps.gameStarted) {

      if (nextProps.users.size > 0){
        this.props.startGame();
      }
    // }
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
      // server:
    }
    this.props.updateCargo(distributedItems);
    this.props.sendCargo(distributedItems);
  }
  render() {
    const playersNeeded = this.props.numberOfPlayers - this.props.playersJoined;
    if (this.props.gameStarted) {
      return (
        <div className='game-screen'>
          <ResourceDisplay />
          <HeadQuarters
            terminalAmount={7}
            updateCargo={this.updateCargo}
          />
        </div>
      );
    }
    return (
      <div>Still waiting for {playersNeeded} players...</div>
    );
  }
}

const mapStateToProps = state => {
  const activePlayer = state.gameScreen.get('activePlayer');

  return ({
    numberOfHacks: state.headQuarters.get('numberOfHacks'),
    terminals: state.headQuarters.get('terminals'),
    numberOfPlayers: state.gameScreen.get('numberOfPlayers'),
    playersJoined: state.gameScreen.get('playersJoined'),
    gameStarted: state.gameScreen.get('gameStarted'),
    users: state.gameScreen.get('users'),
    cargo: state.gameScreen.getIn(['users', `${activePlayer}`, 'resources']),
    games: state.lobby.get('games'),
  });
}

export default connect(mapStateToProps, {
  updateCargo,
  sendCargo,
  startGame,
})(GameScreen);
