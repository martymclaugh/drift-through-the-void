// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import elementInView from '../../../helpers/check-element-visibility';
import { Props, State } from '../../../flow/components/chat-room-types';

import './chat-room-styles.css'

class ChatRoom extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.renderMessages = this.renderMessages.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.renderUsersTyping = this.renderUsersTyping.bind(this);
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
  messagesEnd: any;
  scrollToBottom: () => void;
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);

    // $FlowFixMe
    node && node.scrollIntoView({ behavior: "smooth" });
  }
  renderMessages: () => void;
  renderMessages() {
    const { messages } = this.props;
    return (
      messages.map((message, i) => {
        const shouldUsernameRender = i === 0 ||
        (i !== 0 && messages.get(i - 1) && messages.get(i - 1).user !== message.user);
        const username = shouldUsernameRender && (
          <div key={`${message.user} ${message.message}`} className="chat-room__user">{message.user}</div>
        )
        return (
          <div
            key={`${i} ${message.message}`}
            className="chat-room__message"
          >
            {username}
            <div className="chat-room__message-content">{message.message}</div>
          </div>
        )
      })
    );
  }
  renderUsersTyping: () => void;
  renderUsersTyping() {
    const { usersTyping } = this.props;
    const users = usersTyping.filter(user => user !== this.props.currentUser);
    const { size } = users;

    let text;
    if (size > 0) {
      if (size === 1) {
        text = `${users.get(0)} is typing`;
      } else if (size === 2) {
        text = `${users.get(0)} and ${users.get(1)} are typing`;
      } else if (size > 2) {
        text = 'several people are typing';
      }
      return (
        <div className="chat-room__users-typing">
          {text}
        </div>
      )
    }

    return <div className="chat-room__spacer" />;
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
        {this.renderUsersTyping()}
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
