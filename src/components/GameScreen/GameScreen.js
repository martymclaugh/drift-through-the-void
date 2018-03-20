// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startGame, changePhase } from './game-screen-actions';
import { gamePhases } from '../../helpers/game-phases';
import GenerateResources from '../GenerateResources/GenerateResources';
import PlanetsContainer from '../PlanetsContainer/PlanetsContainer';
import MonumentsContainer from '../MonumentsContainer/MonumentsContainer';

import './game-screen-styles.css';

class GameScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {}

    this.renderPhaseScreen = this.renderPhaseScreen.bind(this);
  }
  componentWillMount() {
    const server = this.props.match.params.slug;

    if (!this.props.games.get(server)) {
      this.props.history.push(`/lobby`);
    }
  }
  componentWillReceiveProps(nextProps) {
    // TODO game starting conditions
    // if (nextProps.playersJoined === nextProps.numberOfPlayers && !nextProps.gameStarted) {

      if (nextProps.users.size > 0 && !nextProps.gameStarted){
        this.props.startGame();
      }
    // }
  }
  renderPhaseScreen: () => void;
  renderPhaseScreen() {
    switch (this.props.phase) {
      case gamePhases.GENERATE_RESOURCES:
        return (
          <GenerateResources
            changePhase={this.props.changePhase}
          />
        );
      case gamePhases.POPULATE_PLANETS:
        return (
          <PlanetsContainer
            changePhase={this.props.changePhase}
          />
        );
      case gamePhases.POPULATE_MONUMENTS:
        return (
          <MonumentsContainer
            changePhase={this.props.changePhase}
          />
        );
      // case gamePhases.PURCHASE_DEVELOPMENTS:
      //   return (
      //     <DevelopmentsContainer
      //       changePhase={this.props.changePhase}
      //     />
      //   );
      default:
        return (
          <GenerateResources
            changePhase={this.props.changePhase}
          />
        );
    }
  }
  render() {
    const playersNeeded = this.props.numberOfPlayers - this.props.playersJoined;
    if (this.props.gameStarted) {
      return (
        <div className='game-screen'>
          {this.renderPhaseScreen()}
        </div>
      )
    }
    return (
      <div>Still waiting for {playersNeeded} players...</div>
    );
  }
}

const mapStateToProps = state => ({
  numberOfPlayers: state.gameScreen.get('numberOfPlayers'),
  playersJoined: state.gameScreen.get('playersJoined'),
  gameStarted: state.gameScreen.get('gameStarted'),
  users: state.gameScreen.get('users'),
  games: state.lobby.get('games'),
  phase: state.gameScreen.get('phase'),
});

export default connect(mapStateToProps, {
  changePhase,
  startGame,
})(GameScreen);
