// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitLobbyMessage, addLobbyMessage } from './lobby-screen-actions';
import {
  joinLobbyRoom,
  leaveLobbyRoom,
  startTyping,
  stopTyping,
  joinGame,
} from '../../redux/game/game-actions';
import ChatRoom from '../shared/ChatRoom/ChatRoom';
import Lobby from './Lobby/Lobby';
import { Props, State } from '../../flow/components/lobby-screen-types';

import './lobby-screen-styles.css';

class LobbyScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.joinGame = this.joinGame.bind(this);
  }
  componentDidMount(){
    if (this.props.username) {
      this.props.joinLobbyRoom();
    }
    // push them back to homescreen to create username
    !this.props.username && this.props.history.push('/');
  }
  componentWillUnmount() {
    this.props.leaveLobbyRoom();
  }
  joinGame: () => void;
  joinGame(server) {
    this.props.joinGame({
      user: this.props.username,
      server,
    });
    this.props.history.push(`/game/${server}`);
  }
  handleKeyPress: (event: any) => void;
  handleKeyPress(event) {
    const { value } = event.target;

    if (this.state.message.length === 0 && value.length === 1) {
      this.props.startTyping({ username: this.props.username });
    } else if (value.length === 0) {
      this.props.stopTyping({ username: this.props.username });
    }
    this.setState({ message: value });
  }
  handleSubmit: (event: any) => void;
  handleSubmit(event) {
      event.preventDefault();
    if (this.state.message.length > 0) {
      const submittedMessage = {
        user: this.props.username,
        message: this.state.message,
      }
      this.props.addLobbyMessage(submittedMessage);
      this.props.submitLobbyMessage(submittedMessage);
      this.setState({ message: '' });
    }
  }
  render() {
    return (
      <div className="lobby-screen">
        <div className="lobby-screen__welcome">WELCOME, {this.props.username}!</div>
        <Lobby
          title={"Games"}
          joinGame={this.joinGame}
        />
        <ChatRoom
          title={"Lobby Chat"}
          usersTyping={this.props.usersTyping}
          currentUser={this.props.username}
          user={this.props.username}
          messages={this.props.messages}
          value={this.state.message}
          onChange={(e) => this.handleKeyPress(e)}
          submitMessage={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.homeScreen.get('username'),
  messages: state.lobby.get('messages'),
  usersTyping: state.lobby.get('usersTyping'),
});

export default withRouter(connect(mapStateToProps, {
  submitLobbyMessage,
  addLobbyMessage,
  joinLobbyRoom,
  joinGame,
  leaveLobbyRoom,
  startTyping,
  stopTyping,
})(LobbyScreen));
