import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import elementInView from '../../../helpers/check-element-visibility';

import './chat-room-styles.css'

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.renderMessages = this.renderMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  componentDidMount() {
    if (elementInView('chat-room__end')) {
      this.scrollToBottom();
    }
  }
  componentDidUpdate() {
    if (elementInView('chat-room__end')) {
      this.scrollToBottom();
    }
  }
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }
  renderMessages(){
    const { messages } = this.props;
    return (
      messages.map((message, i) => {
        const shouldUsernameRender = i === 0 ||
        (i !== 0 && messages.get(i - 1) && messages.get(i - 1).user !== message.user);
        const username = shouldUsernameRender && (
          <div className="chat-room__user">{message.user}</div>
        )
        return (
          <div>
            {username}
            <div className="chat-room__message">{message.message}</div>
          </div>
        )
      })
    );
  }
  render() {
    return (
      <div className="chat-room">
        <div className="chat-room__title">{this.props.title}</div>
        <div className="chat-room__chat">
          {this.renderMessages()}
          <div
            className="chat-room__end"
            ref={(element) => { this.messagesEnd = element }}
          />
        </div>
        <form action="." onSubmit={this.props.submitMessage}>
          <input
            className="chat-room__input"
            value={this.props.value}
            onChange={this.props.onChange}
            type="text"
          />
        </form>
      </div>
    )
  }
}

export default ChatRoom;