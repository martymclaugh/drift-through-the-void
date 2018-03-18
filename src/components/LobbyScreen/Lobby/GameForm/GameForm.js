// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  requestServer,
  recycleServer,
  createGame,
  checkPassword,
} from '../../../../redux/middlewares/socket/Lobby/lobby-actions';
import CheckBox from '../../../shared/CheckBox/CheckBox';
import DropDownMenu from '../../../shared/DropDownMenu/DropDownMenu';
import Button from '../../../shared/Button/Button';
import { Props, State } from '../../../../flow/components/game-form-types';

import './game-form-styles.css';

class GameForm extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      isPrivate: false,
      numberOfPlayers: 2,
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleDropdownSelection = this.handleDropdownSelection.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {
      gameDetails,
      activeGame
    } = nextProps;

    if (gameDetails && activeGame.get('isPrivate') && nextProps.passwordVerified) {
      this.props.joinGame(activeGame.get('server'));
    }
  }
  handleKeyPress: (e: any) => void;
  handleKeyPress(event) {
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
      numberOfPlayers: this.state.numberOfPlayers,
      password: this.state.password,
    };
    this.props.createGame({ game });
    this.props.joinGame(game.server);
  }
  handleDropdownSelection: () => void;
  handleDropdownSelection(value) {
    this.setState({
      numberOfPlayers: value,
    });
  }
  handleCheckPassword: () => void;
  handleCheckPassword() {
    const {
      user,
      server,
      playersJoined,
      isPrivate,
      numberOfPlayers,
    } = this.props.activeGame.toJS();

    const game = {
      user,
      server,
      password: this.state.password,
      playersJoined,
      numberOfPlayers,
    };
    if (isPrivate) {
      this.props.checkPassword({ game });
    } else {
      this.props.joinGame(server);
    }
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
    const availableSlots = !gameDetails || activeGame.get('playersJoined') < activeGame.get('numberOfPlayers');
    const password = (isPrivate || (gameDetails && activeGame.get('isPrivate') && availableSlots)) && (
      <div className="new-game__password">
        <span className="new-game__password-text">Password: </span>
        <input
          onChange={(event) => this.handleKeyPress(event)}
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
    const dropdown = !gameDetails && (
      <DropDownMenu
        items={[
          { name: 2, value: 2 },
          { name: 3, value: 3 },
          { name: 4, value: 4 },
        ]}
        handleDropdownSelection={this.handleDropdownSelection}
      />
    )
    const onFormSubmit = !gameDetails ? this.handleCreateGame : this.handleCheckPassword;
    const serverName = gameDetails ? activeGame.get('server') : server;
    const host = gameDetails ? activeGame.get('user') : username;
    const playersJoined = gameDetails && <span className="new-game__user">{activeGame.get('playersJoined')}</span>;
    const button = availableSlots && (
      <Button onClick={() => onFormSubmit()}>Enter The Void</Button>
    )

    return (
      <div className="new-game__menu">
        {title}
        <div className="new-game__user">Host: {host}</div>
        <div className="new-game__name">
          Server: <span className="new-game__server">{serverName && serverName.replace('-', ' ')}</span>
        </div>
        <div className="new-game__user">
          Players Ready: {playersJoined}
        </div>
        {dropdown}
        {togglePrivate}
        {password}
        {button}
        {gameDetails && !availableSlots && <div className="new-game__error">Game is full.</div>}
        {error && <div className="new-game__error">{error}</div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  server: state.lobby.getIn(['server', 'name']),
  username: state.homeScreen.get('username'),
  error: state.lobby.get('error'),
  passwordVerified: state.lobby.get('passwordVerified'),
});
export default connect(mapStateToProps, {
  requestServer,
  recycleServer,
  createGame,
  checkPassword,
})(GameForm);
