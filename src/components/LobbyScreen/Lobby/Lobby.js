import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestServer, recycleServer } from '../../../redux/game/game-actions';
import { clearError } from '../lobby-screen-actions';
import Games from './Games/Games';
import GameForm from './GameForm/GameForm';

import './lobby-styles.css';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showGameForm: false,
      activeGame: null,
      showGameDetails: false,
    }

    this.renderContent = this.renderContent.bind(this);
    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.handleGameClick = this.handleGameClick.bind(this);
    this.handleHideMenus = this.handleHideMenus.bind(this);
  }
  onNewGameClick: () => void;
  onNewGameClick() {
    if (!this.state.showGameForm) {
      this.props.requestServer();
    } else {
      this.props.recycleServer(this.props.server.get('name'));
    }
    this.setState({
      showGameForm: true,
      ...this.state.showGameForm && { isPrivate: false },
    });
  }
  handleHideMenus: () => void;
  handleHideMenus(){
    if (this.state.showGameForm) {
      this.props.recycleServer(this.props.server.get('name'));
    }
    if (this.props.error) {
      this.props.clearError();
    }
    this.setState({
      showGameForm: false,
      activeGame: null,
      showGameDetails: false,
    });
  }
  handleGameClick: () => void;
  handleGameClick(game) {
    this.setState({
      showGameForm: false,
      showGameDetails: true,
      activeGame: game,
    });
  }
  renderContent: () => void;
  renderContent() {
    const {
      showGameForm,
      isPrivate,
      showGameDetails,
    } = this.state
    if (showGameForm || showGameDetails) {
      return (
        <GameForm
          gameDetails={showGameDetails}
          handleHideMenus={() => this.handleHideMenus()}
          activeGame={this.state.activeGame}
        />
      );
    }
    return (
      <Games
        handleGameClick={this.handleGameClick}
        games={this.props.games}
      />
    )
  }
  render() {
    const {
      showGameForm,
      showGameDetails,
    } = this.state;
    const onButtonClick = !showGameForm && !showGameDetails ?
                         this.onNewGameClick :
                         this.handleHideMenus;
    const buttonText = showGameForm || showGameDetails ?
                      <span className="new-game__button-cancel">&#215;</span> :
                      <span className="new-game__button-plus">&#43;</span>;

    return (
      <div className="lobby">
        <div className="lobby__title">{this.props.title}</div>
        <button
          onClick={() => onButtonClick()}
          className="new-game__button"
        >
          {buttonText}
        </button>
        <div className="lobby__content">
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  server: state.lobby.get('server'),
  username: state.homeScreen.get('username'),
  games: state.lobby.get('games'),
  error: state.lobby.get('error'),
});
export default connect(mapStateToProps, {
  requestServer,
  recycleServer,
  clearError,
})(Lobby);
