// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submitLobbyMessage, addLobbyMessage } from './lobby-screen-actions';
import ChatRoom from '../shared/ChatRoom/ChatRoom';
import Lobby from './Lobby/Lobby';

import './lobby-screen-styles.css';

class LobbyScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount(){
    // push them back to homescreen to create username
    !this.props.username && this.props.history.push('/');
  }
  handleKeyPress: () => void;
  handleKeyPress(event: any) {
    this.setState({ message: event.target.value });
  }
  handleSubmit: () => void;
  handleSubmit(event: any) {
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
          onNewGameClick={this.toggleNewGameMenu}
        />
        <ChatRoom
          title={"Lobby Chat"}
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
});

export default withRouter(connect(mapStateToProps, { submitLobbyMessage, addLobbyMessage })(LobbyScreen));
