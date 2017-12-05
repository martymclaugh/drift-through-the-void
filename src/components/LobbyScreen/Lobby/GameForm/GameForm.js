// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  requestServer,
  recycleServer,
  createGame,
  checkPassword,
} from '../../../../redux/game/game-actions';
import { addLobbyGame } from '../../lobby-screen-actions';
import CheckBox from '../../../shared/CheckBox/CheckBox';

class GameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      isPrivate: false,
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
  }
  handleKeyPress: () => void;
  handleKeyPress(event: any) {
    if(event.target instanceof HTMLInputElement) {
      const targetValue = event.target.value;

      this.setState({ password: targetValue });
    }
  }
  togglePrivate: () => void;
  togglePrivate() {
    this.setState({ isPrivate: !this.state.isPrivate });
  }
  handleCreateGame: () => void;
  handleCreateGame() {
    const game = {
      user: this.props.username,
      server: this.props.server,
      password: this.state.password,
    };
    this.props.createGame({ game });
    this.props.addLobbyGame({
      user: game.user,
      server: game.server,
      isPrivate: !!game.password,
    });
    this.props.handleHideMenus();
  }
  handleCheckPassword: () => void;
  handleCheckPassword() {
    const {
      user,
      server,
    } = this.props.activeGame
    const game = {
      user,
      server,
      password: this.state.password,
    };
    this.props.checkPassword({ game });
    console.log('checking password', game);
  }
  render() {
    const {
      gameDetails,
      activeGame,
      server,
      username,
      error,
    } = this.props;
    const { isPrivate } = this.state;
    const password = (isPrivate || (gameDetails && activeGame.isPrivate)) && (
      <div className="new-game__password">
        <span className="new-game__password-text">Password: </span>
        <input
          onChange={(e) => this.handleKeyPress(e)}
          type="password"
          className="new-game__password-input"
        />
      </div>
    )
    const togglePrivate = !gameDetails && (
      <CheckBox
        isActive={isPrivate}
        onClick={() => this.togglePrivate()}
        text={"Private?"}
      />
    );
    const title = gameDetails ?
                 <div className="new-game__title">Join Game</div> :
                 <div className="new-game__title">Create New Game</div>;
    const onFormSubmit = !gameDetails ? this.handleCreateGame : this.handleCheckPassword;
    const serverName = gameDetails ? activeGame.server : server;
    const host = gameDetails ? activeGame.user : username;

    return (
      <div className="new-game__menu">
        {title}
        <div className="new-game__user">Host: {host}</div>
        <div className="new-game__name">
          Server: <span className="new-game__server">{serverName}</span>
        </div>
        {togglePrivate}
        {password}
        <div>
          <button
            onClick={() => onFormSubmit()}
            className="new-game__create"
          >
            Enter The Void
          </button>
        </div>
        {error && <div className="new-game__error">{error}</div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  server: state.lobby.getIn(['server', 'name']),
  username: state.homeScreen.get('username'),
  error: state.lobby.get('error'),
});
export default connect(mapStateToProps, {
  requestServer,
  recycleServer,
  createGame,
  addLobbyGame,
  checkPassword,
})(GameForm);