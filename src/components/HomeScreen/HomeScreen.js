// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import containsBadWord from '../../helpers/username-checker';
import { createUsername } from './home-screen-actions';

import './home-screen-styles.css';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCreateUsername = this.handleCreateUsername.bind(this);
    this.focusInput = this.focusInput.bind(this);
  }
  componentDidMount() {
    this.focusInput();
    this.props.usernameInServer && this.props.history.push('/lobby');
  }
  componentWillReceiveProps(nextProps) {
    nextProps.usernameInServer && this.props.history.push('/lobby');
  }
  handleKeyPress: () => void;
  handleKeyPress(event: any) {
    if(event.target instanceof HTMLInputElement) {
      const targetValue = event.target.value;

      this.setState({ username: targetValue });
    }
  }
  focusInput: () => void;
  focusInput() {
    this.usernameInput.focus();
  }
  handleCreateUsername: () => void;
  handleCreateUsername(event) {
    event.preventDefault();
    this.state.username && this.props.createUsername({ username: this.state.username });
  }
  render() {
    return (
      <div className="home-screen">
        <div className="home-screen__content">
          <div className="home-screen__title">Drift Through The Void</div>
          <div className="home-screen__text">Choose a username to begin</div>
          <form action="." onSubmit={(event) => this.handleCreateUsername(event)}>
            <input
              ref={(input) => { this.usernameInput = input }}
              onBlur={() => this.focusInput()}
              className="home-screen__username-input"
              onChange={this.handleKeyPress}
              type="text"
              onSubmit={this.handleCreateUsername}
            />
            <button className="home-screen__username-button" onClick={this.handleCreateUsername}>engage</button>
          </form>
          {this.props.error && <div className="home-screen__error">{this.props.error}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.homeScreen.get('error'),
  usernameInServer: state.homeScreen.get('inServer'),
})
export default withRouter(connect(mapStateToProps, { createUsername })(Lobby));
